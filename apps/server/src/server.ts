import Fastify from 'fastify'
import fp from 'fastify-plugin'
import 'dotenv/config'
// Import library to exit fastify process, gracefully (if possible)
import closeWithGrace from 'close-with-grace'

// Import your application as a normal plugin.
import serviceApp from './index'
import path from 'node:path'
import type { ListenOptions } from 'node:net'
import { fileURLToPath } from 'node:url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * Do not use NODE_ENV to determine what logger (or any env related feature) to use
 * @see {@link https://www.youtube.com/watch?v=HMM7GJC5E2o}
 */
function getLoggerOptions() {
    // Only if the program is running in an interactive terminal
    if (process.stdout.isTTY) {
        return {
            level: 'info',
            file: path.join(__dirname, '../logs/app.log')
        }
    }

    return { level: process.env.LOG_LEVEL ?? 'silent' }
}

const app = Fastify({
    logger: {
        level: 'info',
        sync: false // Set to true in development if needed
    },
    ajv: {
        customOptions: {
            coerceTypes: 'array', // change type of data to match type keyword
            removeAdditional: 'all' // Remove additional body properties
        }
    }
})

async function init() {
    console.log('Starting server...')
    // Register your application as a normal plugin.
    // fp must be used to override default error handler
    app.register(fp(serviceApp))

    // Delay is the number of milliseconds for the graceful close to finish
    closeWithGrace(
        { delay: process.env.FASTIFY_CLOSE_GRACE_DELAY! ? Number(process.env.FASTIFY_CLOSE_GRACE_DELAY) : 500 },
        async ({ err }) => {
            if (err != null) {
                app.log.error(err)
            }

            await app.close()
        }
    )

    await app.ready()

    try {
        // Start listening.
        await app.listen(
            {
                port: 3000,
                host: '127.0.0.1',
                backlog: 511
            } as ListenOptions,
            (err: Error | null, address: string) => {
                if (err) {
                    console.error(err)
                    process.exit(1)
                }
                console.log(`⚡ Server listening at ${address}`)
                app.log.info(`⚡ Server listening at ${address}`)
            }
        )
    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}

init()
