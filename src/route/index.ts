import { FastifyInstance } from 'fastify'

async function routes(server: FastifyInstance) {
  server.register(require('./user.route'), { prefix: 'user' })
  server.register(require('./staff.route'), { prefix: 'staff' })
  server.register(require('./post.route'), { prefix: 'post' })
}

export default routes
