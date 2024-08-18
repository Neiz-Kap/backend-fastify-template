import { FromSchema, type JSONSchema } from 'json-schema-to-ts'

import type { FastifyEnvOptions } from '@fastify/env'

export const awsConfig = {
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
  AWS_REGION: process.env.AWS_REGION,
}

export const awsBucketName = process.env.AWS_BUCKET_NAME
export const linkExpireTime = process.env.AWS_LINK_EXPIRE

const schema = {
  type: 'object',
  required: ['DATABASE_URL', 'JWT_SECRET'],
  properties: {
    API_HOST: {
      type: 'string',
      default: '0.0.0.0',
    },
    API_PORT: {
      type: 'number',
      default: 3000,
    },
    DATABASE_URL: {
      type: 'string',
    },
    LOG_LEVEL: {
      type: 'string',
      enum: ['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'], //  "fatal" | "error" | "warn" | "info" | "debug" | "trace"
      default: 'info',
    },
    JWT_SECRET: {
      type: 'string',
    },
    NODE_ENV: {
      type: 'string',
    },
  },
} as const satisfies JSONSchema

export type EnvSchema = FromSchema<typeof schema>

const envConfig: FastifyEnvOptions = {
  confKey: 'config',
  schema,
  data: process.env,
  dotenv: true,
}

export default envConfig
