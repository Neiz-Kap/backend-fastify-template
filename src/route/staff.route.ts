import { FastifyInstance } from 'fastify'

import { staffController } from '../controller/staff.controller'

async function routes(server: FastifyInstance) {
  server.get('/:id', staffController.getOne)
  server.get('/', staffController.getAll)
  server.post('/', staffController.create)
  server.patch('/:id', staffController.update)
  server.delete('/:id', staffController.deleteOne)
}

export default routes
