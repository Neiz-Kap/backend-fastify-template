import { z } from 'zod'

import { SortOrder } from '../type'

export const dbId = z.number({ message: 'id is required' })

export const params = z.object({
  id: dbId,
})

export const paginationSchema = z.object({
  page: z.string().default('1'),
  pageSize: z.string().min(1).max(2).default('5'),
  orderBy: z.nativeEnum(SortOrder).default(SortOrder.ASC),
})

export type PaginationParams = z.infer<typeof paginationSchema>
