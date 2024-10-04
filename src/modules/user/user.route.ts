import { FastifyInstance } from 'fastify'

import { paginationSchema, params } from '../common/helper/validation'
import { ModuleTag } from '../common/type'
import { userController } from './user.controller'
import { loginSchemaBody } from './user.schema'

const tags = [ModuleTag.USER]

async function userRoutes(server: FastifyInstance) {
  server.get('/:id', { schema: { params, tags, description: 'Get one user by their id' } }, userController.getOne)
  server.get(
    '/',
    {
      schema: {
        querystring: paginationSchema,
        tags,
        description: 'Get many users with pagination',
      },
    },
    userController.getAll,
  )
  server.post('/signup', { schema: { tags, description: 'Sign up an user and refresh tokens' } }, userController.signup)
  server.post(
    '/login',
    {
      schema: {
        body: loginSchemaBody,
        tags,
        description: 'Login an user by login and password and refresh tokens',
      },
    },
    userController.login,
  )
  server.patch(
    '/:id',
    { schema: { tags, description: 'Update user properties by user their id' } },
    userController.updateOne,
  )
  server.delete(
    '/:id',
    { schema: { tags, description: 'Delete one user from database by their id' } },
    userController.deleteOne,
  )
}

export default userRoutes
