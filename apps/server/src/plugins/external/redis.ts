import fastifyRedis from '@fastify/redis';
import type { FastifyInstance } from 'fastify';

export const autoConfig = (fastify: FastifyInstance) => {
 return {
  host: fastify.config.REDIS_HOST,
  port: fastify.config.REDIS_HOST ?? 6379,
  password: fastify.config.REDIS_PASSWORD ?? '',
 };
};

/**
 * This plugin allows to connect to Redis
 *
 * @see {@link https://github.com/fastify/fastify-redis}
 */
export default fastifyRedis;
