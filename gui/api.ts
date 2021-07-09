/* eslint-disable */

import { AxiosInstance, AxiosRequestConfig, ResponseType } from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor(instance: AxiosInstance) {
    this.instance = instance;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  private mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.instance.defaults.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<T> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = (format && this.format) || void 0;

    if (requestParams.method !== "GET" && !body) {
      body = {};
    }

    try {
      const { data } = await this.instance.request({
        ...requestParams,
        headers: {
          ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
          ...(requestParams.headers || {}),
        },
        params: query,
        responseType: responseFormat,
        data: body,
        url: path,
      });
      return data;
    } catch (err) {
      err.message += ` [${err.config.method}] ${err.config.url}`;
      if (err.response) {
        err.data = err.response.data;
      }

      throw err;
    }
  };
}

/**
 * @title Test swagger
 * @version 0.1.0
 * @externalDocs https://swagger.io
 *
 * Testing the Fastify swagger API
 */
export class Api<SecurityDataType extends unknown = any> extends HttpClient<SecurityDataType> {
  users = {
    /**
     * No description
     *
     * @tags UserController
     * @name Create
     * @request POST:/api/users
     */
    create: (body: { email: string; name: string }, params: RequestParams = {}) =>
      this.request<{ email: string; id: number; name: string }, any>({
        path: `/api/users`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags UserController
     * @name List
     * @request GET:/api/users
     */
    list: (params: RequestParams = {}) =>
      this.request<{ email: string; id: number; name: string }[], any>({
        path: `/api/users`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags UserController
     * @name Update
     * @request POST:/api/users/{id}
     */
    update: (id: number, body: { email?: string; name?: string }, params: RequestParams = {}) =>
      this.request<{ email: string; id: number; name: string }, any>({
        path: `/api/users/${id}`,
        method: "POST",
        body: body,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
