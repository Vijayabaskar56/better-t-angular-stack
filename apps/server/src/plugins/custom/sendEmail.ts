import path from 'node:path'
import nodemailer from 'nodemailer'
import hbs from 'nodemailer-express-handlebars'
import type { FastifyInstance } from 'fastify'
import type { SendMailParams } from '@server/types'
import fp from 'fastify-plugin'

declare module 'fastify' {
    export interface FastifyInstance {
        sendEmail: (
            params: SendMailParams,
        ) => Promise<{
            status: boolean
            message: string
        }>
    }
}

async function sendEmailPlugin(
    fastify: FastifyInstance,
    options: Record<string, unknown>,
) {
    try {
        const { MAIL, PASS } = fastify.config

        if (!MAIL || !PASS) {
            fastify.log.error('Missing MAIL or PASS configuration')
            throw new Error('Missing MAIL or PASS configuration')
        }

        const transporter = nodemailer.createTransport({
            host: 'sg1-ts103.a2hosting.com',
            port: 465,
            auth: {
                user: MAIL as string,
                pass: PASS as string,
            },
            tls: {
                rejectUnauthorized: false,
            },
        })

        const viewPath = path.resolve('./src/views')

        const handlebarOptions = {
            viewEngine: {
                extname: '.handlebars',
                partialsDir: viewPath,
                layoutsDir: viewPath,
                defaultLayout: undefined,
            },
            viewPath: viewPath,
            extName: '.handlebars',
        }

        transporter.use('compile', hbs(handlebarOptions))

        fastify.decorate('sendEmail', async (params: SendMailParams) => {
            try {
                const { APP_NAME, MAIL } = fastify.config
                if (!APP_NAME || !MAIL) {
                    fastify.log.error('Missing APP_NAME or MAIL configuration')
                    return {
                        status: false,
                        message: 'Missing APP_NAME or MAIL configuration',
                    }
                }

                const info = {
                    from: `${APP_NAME.toUpperCase()}<${MAIL}>`,
                    to: params.email,
                    subject: params.subject,
                    template: params.template,
                    context: params.context,
                }

                const result = await transporter.sendMail(info)

                if (result.messageId) {
                    return {
                        status: true,
                        message: 'commonmessage.mailsendsuccess',
                    }
                }
                return {
                    status: false,
                    message: 'commonmessage.mailsenderror',
                }
            } catch (error: unknown) {
                fastify.log.error(
                    `Failed to send email to ${params.email}: ${(error as Error).message
                    }`,
                )
                return {
                    status: false,
                    message: `Failed to send email to ${params.email}: ${(error as Error).message
                        }`,
                }
            }
        })
    } catch (error: unknown) {
        fastify.log.error(
            `Failed to initialize email sending service: ${(error as Error).message
            }`,
        )
        throw new Error(
            `Failed to initialize email sending service: ${(error as Error).message
            }`,
        )
    }
}

export default fp(sendEmailPlugin, {
    name: 'sendEmail-plugin',
})
