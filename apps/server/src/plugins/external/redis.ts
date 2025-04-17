import fastifyRedis from '@fastify/redis';
import type { FastifyInstance } from 'fastify';

export const autoConfig = (fastify: FastifyInstance) => {
 return {
  url: "rediss://default:AVnUAAIjcDFhOTg4MDk5YmZmMmY0Y2JhODEyMjk2ZWViYTUzYTM5MXAxMA@relaxed-cougar-22996.upstash.io:6379"
 };
 // {
 //  host: fastify.config.REDIS_HOST,
 //  port: fastify.config.REDIS_HOST ?? 6379,
 //  password: fastify.config.REDIS_PASSWORD ?? '', // Optional
 // };
};

/**
 * This plugin allows to connect to Redis
 *
 * @see {@link https://github.com/fastify/fastify-redis}
 */
export default fastifyRedis;
