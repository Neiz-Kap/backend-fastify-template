import { gracefullyShutdown, unexpectedErrorHandler } from './helper/exit-handler'
import { createApp } from './server'

const initApp = async () => {
  try {
    const app = await createApp()

    for (const signal of ['unhandledRejection', 'uncaughtException']) {
      process.on(signal, (error: Error) => unexpectedErrorHandler(app, error))
    }

    for (const signal of ['SIGINT', 'SIGTERM']) {
      process.on(signal, () => gracefullyShutdown(app))
    }

    // ** All validation errors will be added a .statusCode property set to 400. This guarantees that the default error handler will set the status code of the response to 400 *
    app.setErrorHandler((error, request, reply) => {
      app.log.error(error, `This error has status code ${error.statusCode}`)
      reply.status(error.statusCode).send(error)
    })

    app.listen({ port: app.config.API_PORT, host: app.config.API_HOST })
  } catch (error) {
    console.error(error)
  }
}

initApp()
