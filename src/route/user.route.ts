import { FastifyInstance } from 'fastify'

import { userController } from '../controller/user.controller'

async function routes(server: FastifyInstance) {
  server.get('/:id', userController.getOne)
  server.get('/', userController.getAll)
  server.post('/', userController.create)
  server.patch('/:id', userController.update)
  server.delete('/:id', userController.deleteOne)
}

export default routes
