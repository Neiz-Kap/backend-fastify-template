import { z } from 'zod'
import { zodToJsonSchema } from 'zod-to-json-schema'

import type { FastifyEnvOptions } from '@fastify/env'

// export const awsConfig = {
//   AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
//   AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
//   AWS_REGION: process.env.AWS_REGION,
// }

// export const awsBucketName = process.env.AWS_BUCKET_NAME
// export const linkExpireTime = process.env.AWS_LINK_EXPIRE

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'testing']),
  API_HOST: z.string().default('127.0.0.1'),
  API_PORT: z.number().min(3000).max(8000).default(3000),
  DATABASE_URL: z.string().min(10),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent']).default('debug'),
  JWT_SECRET: z.string().min(1),
  ENABLE_SWAGGER: z.boolean().default(false),
})

export type EnvSchema = z.infer<typeof envSchema>

// TODO: ability to take the envData separately from fastify config?
const envConfig: FastifyEnvOptions = {
  confKey: 'config',
  schema: zodToJsonSchema(envSchema),
  data: process.env,
  dotenv: true,
}

export default envConfig
