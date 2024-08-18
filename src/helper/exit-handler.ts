import { FastifyInstance } from 'fastify'

/** Handler for exit */
export const exitHandler = (app: FastifyInstance, exitCode: number) => {
  app.close(() => {
    app.log.info('Server closed')
    process.exit(exitCode)
  })
}

/** Error Handling  */
export const unexpectedErrorHandler = (app: FastifyInstance, error: Error) => {
  app.log.error(error)
  exitHandler(app, 1)
}

/** Application shutdown */
export const gracefullyShutdown = (app: FastifyInstance) => {
  app.log.info('Attempting to gracefully shutdown the app...')
  exitHandler(app, 0)
}
