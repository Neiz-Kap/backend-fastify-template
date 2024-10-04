import { App } from '@/server'

/** Handler for exit */
export const exitHandler = (app: App, exitCode: number) => {
  app.close(() => {
    app.log.info('Server closed')
    process.exit(exitCode)
  })
}

/** Error Handling  */
export const unexpectedErrorHandler = (app: App, error: Error) => {
  app.log.error(error, 'unexpectedErrorHandler')
  exitHandler(app, 1)
}

/** Application shutdown */
export const gracefullyShutdown = (app: App) => {
  app.log.info('Attempting to gracefully shutdown the app...')
  exitHandler(app, 0)
}
