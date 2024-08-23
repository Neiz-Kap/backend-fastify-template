import { jsonSchemaTransform } from 'fastify-type-provider-zod'

import { SwaggerOptions } from '@fastify/swagger'
import { FastifySwaggerUiOptions } from '@fastify/swagger-ui'

export const swaggerConfig = (host: string, port: number) => {
  const config = {
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'Swagger Documentation',
        description: 'Testing the Fastify swagger API',
        version: '0.1.0',
      },
      servers: [
        {
          url: `http://${host}:${port}`,
          description: 'Development server',
        },
      ],
      tags: [
        { name: 'user', description: 'User related end-points' },
        { name: 'post', description: 'Post related end-points' },
        { name: 'staff', description: 'Staff related end-points' },
      ],
      components: {
        securitySchemes: {
          apiKey: {
            type: 'apiKey',
            name: 'apiKey',
            in: 'header',
          },
        },
      },
    },
    transform: jsonSchemaTransform,
  } satisfies SwaggerOptions

  return config
}

export const swaggerUiConfig = {
  routePrefix: '/docs',
  theme: { title: 'Fastify Swagger UI' },
} satisfies FastifySwaggerUiOptions
