import type { FastifyInstance, FastifyPluginCallback } from 'fastify';
import fp from 'fastify-plugin';
import mongoose, { type ObjectId } from 'mongoose';

declare module 'fastify' {
 interface FastifyInstance {
  mongoose: mongoose.Connection;
  objectId: (id: string) => ObjectId;
 }
}

const mongoosePlugin: FastifyPluginCallback = async (fastify, opts) => {
 const dbUrl = fastify.config.DATABASE_URL;
 const dbName = fastify.config.DATABASE_NAME;

 if (!dbUrl) {
  throw new Error('DATABASE_URL environment variable is not set');
 }
 if (!dbName) {
  throw new Error('DATABASE_NAME environment variable is not set');
 }

 try {
  // Connect mongoose to the database URL
  await mongoose.connect(dbUrl, {
   dbName,
   // You can add more options here if needed, e.g. useNewUrlParser, useUnifiedTopology
  });

  fastify.log.info('MongoDB connected from plugin ');

  // Use the specific database connection
  const connection = mongoose.connection.useDb(dbName);

  // Decorate fastify instance with connection and helper
  fastify.decorate('mongoose', connection);
  fastify.decorate('objectId', function (this: FastifyInstance, id: string): ObjectId {
   if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid ID format');
   }
   return new mongoose.Types.ObjectId(id) as unknown as ObjectId;
  });

  // Optional: handle connection errors after initial connect
  connection.on('error', (err) => {
   fastify.log.error('MongoDB connection error:', err);
  });

  // Optional: handle disconnection
  connection.on('disconnected', () => {
   fastify.log.warn('MongoDB disconnected');
  });

 } catch (err) {
  fastify.log.error('MongoDB connection error:', err);
  process.exit(1);
 }
};

export default fp(mongoosePlugin, {
 name: 'mongoose-plugin',
 // You can specify dependencies here if needed, e.g. fastify-plugin dependencies
});


