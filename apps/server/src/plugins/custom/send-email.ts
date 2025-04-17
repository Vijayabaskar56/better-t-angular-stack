import path from 'node:path';
import fastifyView, { type FastifyViewOptions } from '@fastify/view';
import type { SendMailParams } from '@server/types';  // Adjust path
import type { FastifyInstance, FastifyPluginAsync } from 'fastify';
import fp from 'fastify-plugin';
import handlebars from 'handlebars';
import nodemailer from 'nodemailer';

export interface MailerPluginOptions {
 transportOptions: nodemailer.TransportOptions;  // Nodemailer transport options
 defaultFrom: string;        // Optional default 'from' address
 viewOptions?: FastifyViewOptions; // Options for fastify-view
}

const mailerPlugin: FastifyPluginAsync<MailerPluginOptions> = async (fastify, options) => {
 const { transportOptions, defaultFrom, viewOptions } = options;

 if (!transportOptions) {
  throw new Error('transportOptions are required');
 }

 // 1. Register @fastify/view
 await fastify.register(fastifyView, {
  engine: { handlebars: handlebars },
  root: path.join('./src/views'), // Adjust path to your views directory
  ...viewOptions, // Merge in any user-provided view options
 });

 // 2. Create Nodemailer Transporter
 const transporter = nodemailer.createTransport(transportOptions);

 // 3. Decorate Fastify with sendEmail function
 fastify.decorate('sendEmail', async (params: SendMailParams) => {
  try {
   const { template, context, email, subject } = params;

   // a. Render the Handlebars template using fastify.view
   const html = await fastify.view(`${template}.handlebars`, context);  // Assumes .handlebars extension

   // b. Construct Mail Options
   const mailOptions: nodemailer.SendMailOptions = {
    from: defaultFrom, // Use the defaultFrom if provided, otherwise rely on transport options
    to: email,
    subject: subject,
    html: html,
   };

   // c. Send the email
   const info = await transporter.sendMail(mailOptions);
   console.log(info);
   fastify.log.info(`Email sent to ${email}: ${info.messageId} , ${info.response} , ${params}`);

   return { status: true, message: 'commonmessage.mailsendsuccess' };

  } catch (error: unknown) {
   fastify.log.error(`Failed to send email to ${params.email}: ${(error as Error).message}`);
   return { status: false, message: `Failed to send email to ${params.email}: ${(error as Error).message}` };
  }
 });

};

export const autoConfig = (fastify: FastifyInstance) => {
 return {
  transportOptions: {
   host: 'mail.techares.com', // Replace with your SMTP server
   port: 587,
   secure: false, // true for 465, false for other ports
   auth: {
    user: 'hello@techares.com', // Your email address
    pass: 'euhEuzX.^y_', // Your email password
   },
   tls: {
    rejectUnauthorized: false,
   },
  } as nodemailer.TransportOptions,
  defaultFrom: 'hello@techares.com',
  viewOptions: {},
 };
};

declare module 'fastify' {
 interface FastifyInstance {
  sendEmail: (params: SendMailParams) => Promise<{ status: boolean; message: string; }>;
 }
}
export default fp(mailerPlugin, {
 name: 'custom-mailer',
 fastify: '4.x || 5.x', // Or whatever Fastify version you're using
});

