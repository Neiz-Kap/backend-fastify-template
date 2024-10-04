import { FastifyReply, FastifyRequest } from 'fastify'

import { RESPONSE } from '../common/helper/constants'
import { handleServerError } from '../common/helper/errors'

// export const createPost = async (request: FastifyRequest, reply: FastifyReply) => {
//   try {
//     const { id, email } = request['authUser'];
//     const post = await prisma.post.create({
//       data: {
//         content: request.body['content'],
//         createdBy: {
//           connect: {
//             id: id,
//           },
//         },
//         viewCount: 0,
//       },
//     });
//     reply.status(RESPONSE.SUCCESS).send({ data: post });
//   } catch (e) {
//     handleServerError(reply, e);
//   }
// };

class PostController {
  // constructor(protected postService: PostService) {}

  async getOne(req: FastifyRequest, reply: FastifyReply) {}
  async getAll(req: FastifyRequest, reply: FastifyReply) {}
  async create(req: FastifyRequest, reply: FastifyReply) {}
  async update(req: FastifyRequest, reply: FastifyReply) {}
  async deleteOne(req: FastifyRequest, reply: FastifyReply) {}
}

export const postController = new PostController()
