import JWT from 'jsonwebtoken'

import { PaginationParams } from '@/modules/common/helper/validation'

import { utils } from '../common/helper/utils'
import { Id } from '../common/type'
import { IUserRepository, userRepository } from './user.repository'
import { UserCreateDto, UserWithoutPassword } from './user.type'

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  public async getOneByEmail(email: string) {
    const user = await this.userRepository.getOneByEmail(email)
    return user
  }

  public async getById(id: Id) {
    const user = await this.userRepository.getById(id)
    return user
  }

  public async getAll(pagination: PaginationParams) {
    const user = await this.userRepository.getAll(pagination)
    return user
  }

  public async signup(
    userDto: UserCreateDto,
    jwtSecret: string,
  ): Promise<{ token: string; user: UserWithoutPassword }> {
    const { password, email } = userDto

    const userExist = await this.getOneByEmail(email)

    if (userExist) {
      throw new Error('User already exists')
    }

    const hashedPassword = await utils.genSalt(10, password)
    const newUser = await this.userRepository.createOne({
      ...userDto,
      password: hashedPassword,
    })

    const token = JWT.sign({ id: newUser.id, email: newUser.email }, jwtSecret)

    const { password: _, ...userWithoutPassword } = newUser
    return { token, user: userWithoutPassword }
  }

  async login(userDto: UserCreateDto): Promise<{ token: string; user: UserWithoutPassword }> {
    const { password, email } = userDto
    const userExist = await this.userRepository.getOneByEmail(email)

    if (!userExist) {
      throw new Error('User already exists')
    }

    return { token: '', user: userExist }
  }
}

export const userService = new UserService(userRepository)
