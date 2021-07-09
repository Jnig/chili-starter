import { server } from '~/app';

import * as UserController from '~/user/UserController';

const s = {
  CreateUser: {
    additionalProperties: false,
    properties: { email: { type: 'string' }, name: { type: 'string' } },
    required: ['email', 'name'],
    type: 'object',
  },
  UpdateUser: {
    additionalProperties: false,
    properties: { email: { type: 'string' }, name: { type: 'string' } },
    type: 'object',
  },
  UserResponse: {
    additionalProperties: false,
    properties: {
      email: { type: 'string' },
      id: { type: 'number' },
      name: { type: 'string' },
    },
    required: ['email', 'id', 'name'],
    type: 'object',
  },
};

server.route({
  method: 'POST',
  url: '/api/users',
  schema: {
    tags: ['UserController'],
    operationId: 'create',
    body: s.CreateUser,
    response: { 200: s.UserResponse },
  },
  config: {
    auth: UserController.routes.create.auth,
  },
  async handler(req: any, rep: any) {
    return UserController.create(req.appContext, req.body || {});
  },
});

server.route({
  method: 'POST',
  url: '/api/users/:id',
  schema: {
    tags: ['UserController'],
    operationId: 'update',
    params: { type: 'object', properties: { id: { type: 'number' } } },
    body: s.UpdateUser,
    response: { 200: s.UserResponse },
  },
  config: {
    auth: UserController.routes.update.auth,
  },
  async handler(req: any, rep: any) {
    return UserController.update(req.appContext, req.params.id, req.body || {});
  },
});

server.route({
  method: 'GET',
  url: '/api/users',
  schema: {
    tags: ['UserController'],
    operationId: 'list',
    response: { 200: { type: 'array', items: s.UserResponse } },
  },
  config: {
    auth: UserController.routes.list.auth,
  },
  async handler(req: any, rep: any) {
    return UserController.list(req.appContext);
  },
});
