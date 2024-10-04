import { Prisma, type User } from '@prisma/client'

export type IUser = User
export type UserWithoutPassword = Omit<IUser, 'password'>

export type UserCreateDto = Prisma.UserCreateInput // || Exclude<User, 'id'>
export interface UserCreateBody extends UserCreateDto {
  repeatedPassword: string
}

export interface UserLoginDto {
  email: string
  password: string
}

export type UserUpdateDto = Prisma.UserCreateInput // || Partial<UserCreateDto>
