import type { FastifyInstance } from 'fastify';
import { EventEmitter } from 'node:events';

// Create a singleton EventEmitter instance
const emitter = new EventEmitter();

// Export plugin configuration (optional)
export const autoConfig = {
 maxListeners: 20, // Set maximum listeners to prevent memory leaks
};

/**
 * Custom EventEmitter plugin for Fastify
 * @see {@link https://nodejs.org/api/events.html}
 */
export default async function eventEmitterPlugin(fastify: FastifyInstance, opts: Record<string, unknown>) {
 // Decorate Fastify instance with the emitter
 fastify.decorate('emitter', emitter);

 // Optional: Cleanup logic
 fastify.addHook('onClose', (instance, done) => {
  emitter.removeAllListeners();
  done();
 });
}
