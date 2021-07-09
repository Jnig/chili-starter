import { FastifyReply, FastifyRequest } from "fastify";
import { server } from "./server";

export class Context {
 token!: string | undefined;

 req!: FastifyRequest;

 reply!: FastifyReply;
}

// improves performance see: https://www.fastify.io/docs/latest/Decorators/
server.decorateRequest('appContext', '');

server.addHook('onRequest', async function authValidate(req: FastifyRequest, reply: FastifyReply) {


  const appContext = new Context();

  appContext.req = req;
  appContext.reply = reply;
  appContext.token = req.headers.authorization;

  req.appContext = appContext;
})