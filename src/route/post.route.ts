import { FastifyInstance } from 'fastify'

import { postController } from '../controller/post.controller'

async function routes(server: FastifyInstance) {
  server.get('/:id', postController.getOne)
  server.get('/', postController.getAll)
  server.post('/', postController.create)
  server.patch('/:id', postController.update)
  server.delete('/:id', postController.deleteOne)
}

export default routes
