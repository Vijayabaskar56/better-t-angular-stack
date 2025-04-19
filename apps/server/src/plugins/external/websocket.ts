// plugins/websocket.ts
import type { FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import websocket from '@fastify/websocket';

declare module 'fastify' {
 interface FastifyInstance {
  broadcast: (message: string) => void;
 }

 interface FastifyWebSocketNamespace {
  on: (event: 'connection' | 'close', listener: (socket: WebSocket) => void) => void;
 }
}

const websocketPlugin: FastifyPluginAsync = async (fastify) => {
 // Register the websocket plugin first
 await fastify.register(websocket, {
  options: {
   maxPayload: 1048576 // 1MB
  }
 });

 fastify.decorate('broadcast', (message: string) => {
  for (const client of fastify.websocketServer.clients) {
   if (client.readyState === 1) { // 1 = OPEN
    client.send(message);
   }
  }
 });

 fastify.get('/ws', { websocket: true }, (connection, req) => {
  connection.on('message', (message: string) => {
   fastify.log.info(`Received message: ${message}`);
   connection.send(`ACK: ${message}`);
  });

  connection.on('close', () => {
   fastify.log.info('WebSocket connection closed');
  });
 });
};

export default fp(websocketPlugin, {
 name: 'websocket-plugin'
});


