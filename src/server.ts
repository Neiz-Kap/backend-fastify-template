import fastify from 'fastify'
import fastifyFileUpload from 'fastify-file-upload'

import fastifyCors from '@fastify/cors'
import fastifyEnv from '@fastify/env'
import fastifyFormBody from '@fastify/formbody'
import fastifyHelmet from '@fastify/helmet'
import fastifyMultipart from '@fastify/multipart'

import corsConfig from './config/cors.config'
import envConfig, { EnvSchema } from './config/env.config'
import formBodyConfig from './config/formBody.config'
import helmetConfig from './config/helmet.config'
import loggerConfig from './config/logger.config'
import routes from './route'

declare module 'fastify' {
  export interface FastifyInstance {
    config: EnvSchema
  }
}

export const createApp = async () => {
  const server = fastify({
    logger: loggerConfig,
  })
  await server.register(fastifyEnv, envConfig)
  await server.register(fastifyFormBody, formBodyConfig)
  await server.register(fastifyCors, corsConfig)
  await server.register(fastifyHelmet, helmetConfig)

  await server.get('/', async (_, reply) => {
    return reply.status(200).send({ message: 'Working' })
  })

  await server.register(routes, { prefix: '/api' })

  return server
}
