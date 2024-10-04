import { FastifyInstance } from 'fastify'

import postRoutes from '../post/post.route'
import userRoutes from '../user/user.route'
import { ModuleTag } from './type'

async function routes(server: FastifyInstance) {
  server.register(postRoutes, { prefix: ModuleTag.POST })
  server.register(userRoutes, { prefix: ModuleTag.USER })
}

export default routes
