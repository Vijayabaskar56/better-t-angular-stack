import fp from 'fastify-plugin';
import fastifySchedule from '@fastify/schedule';

/**
 * This plugins enables the use of CORS.
 *
 * @see {@link https://github.com/fastify/fastify-schedule}
 */
export default fp(async (fastify, opts) => {
 await fastify.register(fastifySchedule, opts);
});
