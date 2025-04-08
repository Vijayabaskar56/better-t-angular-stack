import path from 'node:path'

import fastifyAutoload from '@fastify/autoload'
import * as trpcFastify from '@trpc/server/adapters/fastify'
import type { FastifyBaseLogger, FastifyInstance, FastifyPluginOptions, FastifyTypeProviderDefault } from 'fastify'
import type { IncomingMessage, Server, ServerResponse } from 'node:http'
import appRouter from './routers'
import { connectDB } from './db'

export default async function serviceApp(
	fastify: FastifyInstance<
		Server<typeof IncomingMessage, typeof ServerResponse>,
		IncomingMessage,
		ServerResponse<IncomingMessage>,
		FastifyBaseLogger,
		FastifyTypeProviderDefault
	>,
	opts: FastifyPluginOptions
) {
	connectDB()

	// biome-ignore lint/performance/noDelete: <explanation>
	delete opts.skipOverride // This option only serves testing purpose
	// This loads all external plugins defined in plugins/external
	// those should be registered first as your custom plugins might depend on them
	await fastify.register(fastifyAutoload, {
		dir: path.join(__dirname, 'plugins/external'),
		options: { ...opts },
		autoHooks: true,
		cascadeHooks: true
	})

	// This loads all your custom plugins defined in plugins/custom
	// those should be support plugins that are reused
	// through your application
	fastify.register(fastifyAutoload, {
		dir: path.join(__dirname, 'plugins/custom'),
		options: { ...opts }
	})
	// This loads all plugins defined in routes
	// // define your routes in one of these
	fastify.register(trpcFastify.fastifyTRPCPlugin, {
		prefix: '/api/trpc',
		trpcOptions: {
			router: appRouter
		}
	})

	fastify.setErrorHandler((err, request, reply) => {
		console.log("🚀 ~ :50 ~ fastify.setErrorHandler ~ err:", err)
		fastify.log.error(
			{
				err,
				request: {
					method: request.method,
					url: request.url,
					query: request.query,
					params: request.params
				}
			},
			'Unhandled error occurred'
		)

		reply.code(err.statusCode ?? 500)

		let message = 'Internal Server Error'
		if (err.statusCode && err.statusCode < 500) {
			message = err.message
		}

		return { message }
	})

	// An attacker could search for valid URLs if your 404 error handling is not rate limited.
	fastify.setNotFoundHandler(
		{
			preHandler: fastify.rateLimit({
				max: 3,
				timeWindow: 500
			})
		},
		(request, reply) => {
			request.log.warn(
				{
					request: {
						method: request.method,
						url: request.url,
						query: request.query,
						params: request.params
					}
				},
				'Resource not found'
			)

			reply.code(404)

			return { message: 'Not Found' }
		})
}
