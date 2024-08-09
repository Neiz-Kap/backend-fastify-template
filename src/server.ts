import fastify from 'fastify'
import pino from 'pino'

import loadConfig from './config'
import routes from './route'

loadConfig()

const port = +process.env.API_PORT || 5000

const startServer = async () => {
  try {
    const server = fastify({
      logger: pino({ level: 'info' }),
    })
    server.register(import('@fastify/formbody'))
    server.register(import('@fastify/cors'))
    server.register(import('@fastify/helmet'))

    server.register(routes, { prefix: '/api' })
    server.setErrorHandler((error, request, reply) => {
      server.log.error(error)
    })

    server.get('/', async (_, reply) => {
      return reply.status(200).send({ message: 'Working' })
    })

    for (const signal of ['SIGINT', 'SIGTERM']) {
      process.on(signal, () =>
        server.close().then((err) => {
          console.warn(`Close application on ${signal}`)
          process.exit(err ? 1 : 0)
        }),
      )
    }

    server.listen({ port })
  } catch (error) {
    console.error(error)
  }
}

for (const signal of ['unhandledRejection', 'uncaughtException']) {
  process.on(signal, (error: Error) => {
    console.error(`Close application on ${error.message}`)
    process.exit(1)
  })
}

startServer()
