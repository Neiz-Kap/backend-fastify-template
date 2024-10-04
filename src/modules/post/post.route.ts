import { FastifyInstance } from 'fastify'

import { ModuleTag } from '../common/type'
import { postController } from './post.controller'

const tags = [ModuleTag.POST]

async function postRoutes(server: FastifyInstance) {
  server.get('/:id', { schema: { tags } }, postController.getOne)
  server.get('/', { schema: { tags } }, postController.getAll)
  server.post('/', { schema: { tags } }, postController.create)
  server.patch('/:id', { schema: { tags } }, postController.update)
  server.delete('/:id', { schema: { tags } }, postController.deleteOne)
}

export default postRoutes
