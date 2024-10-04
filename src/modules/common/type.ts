import { FastifyRequest } from 'fastify'
import { z } from 'zod'

import { Prisma, User } from '@prisma/client'

import { dbId } from '@/modules/common/helper/validation'

export type Id = z.infer<typeof dbId>
export type IdType = { id: Id }

export enum ModuleTag {
  USER = 'user',
  POST = 'post',
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export type SortOrderType = `${SortOrder}`

export interface IUserRequest extends FastifyRequest {
  body: Prisma.UserCreateInput
  authUser: User
}

// export interface IUserAuthToken {
//   id: number
//   email: string
// }

// export interface IGetPresign {
//   fileName: string
// }

// export interface IPutPresign {
//   userId: number
//   fileName: string
// }
