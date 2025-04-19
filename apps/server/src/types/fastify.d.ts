import type { FastifyInstance as BaseFastifyInstance } from 'fastify';
import type { BetterAuthInstance } from 'better-auth';
import type { EventEmitter } from 'node:events';
import type { SendMailParams } from '../types';
import type Redis from 'ioredis';
import type { WebsocketPluginOptions } from '@fastify/websocket';

export interface EnhancedFastifyInstance extends BaseFastifyInstance {
 // external plugins
 config: {
  PORT: number;
  COOKIE_SECRET: string;
  COOKIE_NAME: string;
  COOKIE_SECURED: boolean;
  RATE_LIMIT_MAX: number;
  UPLOAD_DIRNAME: string;
  UPLOAD_TASKS_DIRNAME: string;
  DATABASE_URL: string;
  FASTIFY_CLOSE_GRACE_DELAY: number;
  LOG_LEVEL: string;
  CORS_ORIGIN: string;
  APP_NAME: string;
  SUPPORTMAIL: string;
  IMAGEURL: string;
  MAIL_FOOTER: string;
  MAIL: string;
  PASS: string;
  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_PASSWORD: string;
  S3_ENDPOINT: string;
  S3_SECRET_KEY: string;
  S3_ACCESS_ID: string;
  S3_REGION: string;
  S3_BUCKET: string;
  DATABASE_NAME: string;
 };
 emitter: EventEmitter;

 sendEmail: (params: SendMailParams) => Promise<{ status: boolean; message: string; }>;

 // Optional plugins
 redis?: Redis;  // Only available if redis plugin is enabled
 // Custom plugins
 ws: WebsocketPluginOptions;
 auth: {
  api: BetterAuthInstance;
 };
}

