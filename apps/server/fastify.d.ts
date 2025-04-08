// src/types/fastify.d.ts
import type { FastifyEnvOptions } from '@fastify/env';
import 'fastify';
import type EventEmitter from 'node:events';
import type { FastifyBetterAuthOptions } from 'fastify-better-auth'
// Import other plugin types as needed, e.g., your auth plugin's types.

declare module 'fastify' {
    interface FastifyInstance {
        // For your custom auth plugin
        auth: FastifyBetterAuthOptions['auth']
        // For your redis plugin
        // redis: ;
        emitter: EventEmitter;
        sendMail(templateName: string, data: Record<string, any>, mailOptions: nodemailer.SendMailOptions): Promise<nodemailer.SentMessageInfo>;
        config: FastifyEnvOptions

        // Extend with other plugins loaded from plugins/external or plugins/custom
        // e.g.:
        // email: { send: (to: string, subject: string, body: string) => Promise<void> };
        // websocket: { ... };
    }
}
