import fastify from 'fastify'
import fastifyFileUpload from 'fastify-file-upload'
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod'

import { fastifyCors } from '@fastify/cors'
import fastifyEnv from '@fastify/env'
import fastifyFormBody from '@fastify/formbody'
import fastifyHelmet from '@fastify/helmet'
import fastifyMultipart from '@fastify/multipart'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'

import corsConfig from './config/cors.config'
import envConfig, { EnvSchema } from './config/env.config'
import formBodyConfig from './config/formBody.config'
import helmetConfig from './config/helmet.config'
import loggerConfig from './config/logger.config'
import { swaggerConfig, swaggerUiConfig } from './config/swagger.config'
import routes from './route'

declare module 'fastify' {
  export interface FastifyInstance {
    config: EnvSchema
  }
}

export const createApp = async () => {
  const server = fastify({ logger: loggerConfig }).withTypeProvider<ZodTypeProvider>()
  await server.register(fastifyEnv, envConfig)
  await server.register(fastifyFormBody, formBodyConfig)
  await server.register(fastifyCors, corsConfig)
  await server.register(fastifyHelmet, helmetConfig)

  if (server.config.ENABLE_SWAGGER) {
    await server.register(fastifySwagger, swaggerConfig(server.config.API_HOST, server.config.API_PORT))
    await server.register(fastifySwaggerUI, swaggerUiConfig)
  }

  // Add schema validator and serializer
  server.setValidatorCompiler(validatorCompiler)
  server.setSerializerCompiler(serializerCompiler)

  /** All validation errors will be added a .statusCode property set to 400. This guarantees that the default error handler will set the status code of the response to 400 */
  server.setErrorHandler((error, request, reply) => {
    server.log.error(error, `This error has status code ${error.statusCode}`)
    reply.status(error.statusCode).send({ ...error })
  })

  server.get('/', async (_, reply) => {
    return reply.status(200).send({ message: 'Working' })
  })

  server.get('/error', async () => {
    throw new Error('kaboom')
  })

  await server.register(routes, { prefix: '/api' })

  return server
}
