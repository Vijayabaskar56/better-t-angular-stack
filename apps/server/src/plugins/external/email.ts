import fastifyView from '@fastify/view';
import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import path from 'node:path';
import fs from 'node:fs';

/**
 * This plugin enables email sending functionality with Handlebars templates.
 *
 * @see {@link https://github.com/fastify/fastify-view}
 * @see {@link https://nodemailer.com/}
 */
export const autoConfig = {
    transport: {
        host: 'smtp.example.com', // SMTP server host
        port: 465, // SMTP server port
        secure: true, // Use TLS
        auth: {
            user: 'your_username', // SMTP username
            pass: 'your_password', // SMTP password
        },
    },
    templateDir: path.join(__dirname, '../templates'), // Directory for email templates
};

export default async function mailerPlugin(fastify, opts) {
    // Register @fastify/view for Handlebars integration
    fastify.register(fastifyView, {
        engine: { handlebars },
        root: opts.templateDir,
        viewExt: 'hbs',
    });

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport(opts.transport);

    // Decorate Fastify instance with mailer functionality
    fastify.decorate('sendMail', async (templateName, data, mailOptions) => {
        const templatePath = path.join(opts.templateDir, `${templateName}.hbs`);
        const template = fs.readFileSync(templatePath, 'utf-8');
        const compiledTemplate = handlebars.compile(template);
        const html = compiledTemplate(data);

        return transporter.sendMail({
            ...mailOptions,
            html,
        });
    });
}

// Add TypeScript declarations
declare module 'fastify' {
    interface FastifyInstance {
        sendMail(templateName: string, data: Record<string, any>, mailOptions: nodemailer.SendMailOptions): Promise<nodemailer.SentMessageInfo>;
    }
}
