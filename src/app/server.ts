import fastify from 'fastify';

export const server = fastify({ logger: { prettyPrint: true } });