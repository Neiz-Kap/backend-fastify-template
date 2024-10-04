import { FastifyReply } from 'fastify'

import { RESPONSE } from './constants'

export const ERRORS = {
  invalidToken: new Error('Token is invalid.'),
  userExists: new Error('User already exists'),
  userNotExists: new Error('User not exists'),
  userCredError: new Error('Invalid credential'),
  tokenError: new Error('Invalid Token'),
}

export function handleServerError(reply: FastifyReply, error: unknown) {
  return (
    reply
      .status(RESPONSE.INTERNAL_SERVER_ERROR)
      // eslint-disable-next-line
      .send({ status: RESPONSE.INTERNAL_SERVER_ERROR, message: error?.message })
  )
}
