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

    app.listen({ port: app.config.API_PORT, host: app.config.API_HOST })
  } catch (error) {
    console.error(error)
  }
}

initApp()
