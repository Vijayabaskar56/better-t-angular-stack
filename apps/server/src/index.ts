import path from 'node:path';

import fastifyAutoload from '@fastify/autoload';
import * as trpcFastify from '@trpc/server/adapters/fastify';
import type { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { createContext } from './lib/context';
import appRouter from './routers';

export default async function serviceApp(
 fastify: FastifyInstance,
 opts: FastifyPluginOptions
) {
 // biome-ignore lint/performance/noDelete: This option only serves testing purpose
 delete opts.skipOverride;
 // This loads all external plugins defined in plugins/external
 // those should be registered first as your custom plugins might depend on them
 await fastify.register(fastifyAutoload, {
  dir: path.join(__dirname, 'plugins/external'),
  options: { ...opts },
  autoHooks: true,
  cascadeHooks: true
 });

 // This loads all your custom plugins defined in plugins/custom
 // those should be support plugins that are reused
 // through your application
 fastify.register(fastifyAutoload, {
  dir: path.join(__dirname, 'plugins/custom'),
  options: { ...opts }
 });
 // This loads all Routers defined in routers/ with trpc
 fastify.register(trpcFastify.fastifyTRPCPlugin, {
  prefix: '/api/trpc',
  trpcOptions: {
   router: appRouter,
   createContext: createContext
  }
 });

 fastify.setErrorHandler((err, request, reply) => {
  fastify.log.error(
   {
    err,
    request: {
     method: request.method,
     url: request.url,
     query: request.query,
     params: request.params
    }
   },
   'Unhandled error occurred'
  );

  reply.code(err.statusCode ?? 500);

  let message = 'Internal Server Error';
  if (err.statusCode && err.statusCode < 500) {
   message = err.message;
  }

  return { message };
 });

 // An attacker could search for valid URLs if your 404 error handling is not rate limited.
 fastify.setNotFoundHandler(
  {
   preHandler: fastify.rateLimit({
    max: 3,
    timeWindow: 500
   })
  },
  (request, reply) => {
   request.log.warn(
    {
     request: {
      method: request.method,
      url: request.url,
      query: request.query,
      params: request.params
     }
    },
    'Resource not found'
   );

   reply.code(404);

   return { message: 'Not Found' };
  });
}
