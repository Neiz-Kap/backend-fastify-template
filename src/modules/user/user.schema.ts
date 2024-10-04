import { z } from 'zod'

export const loginSchemaBody = z
  .object({
    username: z.string().max(32),
    email: z.string().max(32).describe('Some description for email'),
    password: z.string().max(32),
  })
  .describe('User Login Body Schema')

export type ILoginBody = z.infer<typeof loginSchemaBody>
