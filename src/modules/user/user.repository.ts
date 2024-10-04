import { Prisma, PrismaClient } from '@prisma/client'

import { PaginationParams } from '@/modules/common/helper/validation'

import { Id } from '../common/type'
import { IUser, UserCreateDto, UserUpdateDto } from './user.type'

const prisma = new PrismaClient()

export interface IUserRepository {
  createOne(document: UserCreateDto): Promise<IUser>
  getById(id: Id): Promise<IUser | null>
  getOneByEmail(email: string): Promise<IUser | null>
  getAll(pagination: PaginationParams): Promise<IUser[] | []>
  update(id: Id, update: UserUpdateDto): Promise<IUser | null>
  deleteOne(id: Id): Promise<boolean>
}

class UserRepository implements IUserRepository {
  private readonly model: Prisma.UserDelegate

  constructor(model: Prisma.UserDelegate) {
    this.model = model
  }

  async createOne(document: UserCreateDto): Promise<IUser> {
    return await this.model.create({ data: document })
  }

  async getById(id: Id): Promise<IUser | null> {
    return await this.model.findUnique({ where: { id } })
  }

  async getOneByEmail(email: string): Promise<IUser | null> {
    return await this.model.findUnique({ where: { email } })
  }

  async getAll(pagination: PaginationParams): Promise<IUser[] | []> {
    const { pageSize, page, orderBy } = pagination

    return await this.model.findMany({
      take: +pageSize,
      skip: (+page - 1) * +pageSize,
      orderBy: { createdAt: orderBy },
    })
  }

  async update(id: Id, update: Prisma.UserUpdateInput): Promise<IUser | null> {
    return await this.model.update({ where: { id }, data: update })
  }

  async deleteOne(id: Id): Promise<boolean> {
    await this.model.delete({ where: { id } })
    return true
  }
}

export const userRepository = new UserRepository(prisma.user)
