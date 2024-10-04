import { z } from 'zod'

import { SortOrder } from '../type'

export const dbId = z.string({ message: 'id is required' }).uuid()

export const params = z.object({
  id: dbId,
})

export const paginationSchema = z.object({
  page: z.string().default('1'),
  pageSize: z.string().min(1).max(2).default('5'),
  orderBy: z.nativeEnum(SortOrder).default(SortOrder.ASC),
})

export type PaginationParams = z.infer<typeof paginationSchema>
