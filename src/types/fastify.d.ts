import { Context } from '~/app';

declare module 'fastify' {
  interface FastifyRequest {
    appContext: Context;
  }

}