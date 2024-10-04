import { type FastifyReply, type FastifyRequest } from 'fastify'
import * as JWT from 'jsonwebtoken'

import { PaginationParams } from '@/modules/common/helper/validation'

import { RESPONSE } from '../common/helper/constants'
import { ERRORS, handleServerError } from '../common/helper/errors'
import { utils } from '../common/helper/utils'
import { IdType } from '../common/type'
import { ILoginBody } from './user.schema'
import { UserService, userService } from './user.service'
import { UserCreateBody, UserCreateDto, UserLoginDto } from './user.type'

class UserController {
  constructor(protected userService: UserService) {}
  public getOne = async (req: FastifyRequest<{ Params: IdType }>, reply: FastifyReply) => {
    try {
      req.log.debug('Getting user by id')

      const user = await this.userService.getById(req.params.id)
      reply.code(RESPONSE.SUCCESS).send(user)
    } catch (err) {
      handleServerError(reply, err)
    }
  }

  public getAll = async (req: FastifyRequest<{ Querystring: PaginationParams }>, reply: FastifyReply) => {
    try {
      req.log.debug('Getting all users with pagination')

      const users = await this.userService.getAll(req.query)
      reply.code(RESPONSE.SUCCESS).send(users)
    } catch (err) {
      handleServerError(reply, err)
    }
  }

  public signup = async (req: FastifyRequest<{ Body: UserCreateBody }>, reply: FastifyReply) => {
    const { repeatedPassword, ...userDto } = req.body
    try {
      const createdUser = await this.userService.signup(userDto, req.getEnvs().JWT_SECRET)

      reply.code(RESPONSE.CREATED).send(createdUser)
    } catch (err) {
      handleServerError(reply, err)
    }
  }

  public login = async (req: FastifyRequest<{ Body: ILoginBody }>, reply: FastifyReply) => {
    const { email, password } = req.body
    // return reply.code(RESPONSE.SUCCESS).send(req.body)

    try {
      const user = await this.userService.getOneByEmail(email)
      if (!user) return reply.code(RESPONSE.NOT_FOUND).send(ERRORS.userNotExists)

      const checkPass = await utils.compareHash(password, user.password)
      if (!checkPass) return reply.code(RESPONSE.BAD_REQUEST.CODE).send(ERRORS.userCredError)

      const token = JWT.sign({ id: user.id, email: user.email }, req.getEnvs().JWT_SECRET)

      return reply.code(RESPONSE.SUCCESS).send({ token, user })
    } catch (err) {
      return handleServerError(reply, err)
    }
  }

  public updateOne = async (req: FastifyRequest, reply: FastifyReply) => {}
  public deleteOne = async (req: FastifyRequest, reply: FastifyReply) => {}
}

export const userController = new UserController(userService)
