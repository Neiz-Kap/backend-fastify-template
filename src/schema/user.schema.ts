import { z } from 'zod'

export const loginSchemaBody = z.object({
  username: z.string().max(32).describe('Some description for username'),
  email: z.string().max(32).describe('Some description for email'),
  password: z.string().max(32),
})

export type ILoginBody = z.infer<typeof loginSchemaBody>
