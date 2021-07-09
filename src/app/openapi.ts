import swagger from 'fastify-swagger'
import { readFileSync, writeFileSync } from 'fs';
import {server} from './server'

server.register(swagger, {
  routePrefix: '/documentation',
  swagger: {
    info: {
      title: 'Test swagger',
      description: 'Testing the Fastify swagger API',
      version: '0.1.0'
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here'
    },
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false
  },
  exposeRoute: true
})

server.ready(async () => {
  const oas: any = server.swagger();

  const file = `${process.cwd()}/openapi.json`;
  const schema = JSON.stringify(oas, null, 2);
  
  let old = '';
  try {
    old = readFileSync(file, 'utf-8');
    // eslint-disable-next-line no-empty
  } catch (err) {}

  if (old !== schema) {
    writeFileSync(file, schema);
  }
});
