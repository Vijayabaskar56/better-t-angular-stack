import fastifyWebsocket, { type WebsocketPluginOptions } from '@fastify/websocket';
import type { FastifyInstance } from 'fastify';

/**
 * This plugin enables WebSocket support for Fastify.
 *
 * @see {@link https://github.com/fastify/fastify-websocket}
 */
export const autoConfig = {
    options: {
        maxPayload: 1048576, // Maximum payload size in bytes
        options: {
        },
    } as WebsocketPluginOptions,
};

export default async function websocketPlugin(fastify: FastifyInstance, opts: WebsocketPluginOptions) {
    // Register the WebSocket plugin
    fastify.register(fastifyWebsocket, opts);
}
