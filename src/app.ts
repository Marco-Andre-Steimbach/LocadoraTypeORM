import express, { Application, json } from 'express'
import 'express-async-errors'
import moviesRouter from './routers/movieRouter'
import errorHandlerMiddleware from './middlewares/errorHandler.middleware'

const app: Application = express()
app.use(json())
app.use(moviesRouter)
app.use(errorHandlerMiddleware)

export default app