import 'dotenv/config'
import CONFIG from './config/config'
import express from 'express'
import mongoose from 'mongoose'
import router from './routes'
import cors from 'cors'
import authRoutes from './routes/Auth'
import userRoutes from './routes/User'

// Create app
const app = express()
app.use(cors())

// Connect to mongo
mongoose.connect(CONFIG.mongo.url, CONFIG.mongo.settings)
  .then(() => {
    startServer()
    console.log('Connected to mongoDB')
  })
  .catch((err: Error) => new Error(err.message))

// Only start server if Mongo Connects
function startServer () {
  app.use((req, res, next) => {
    // Log the request
    console.log(`Incoming -> [Method: ${req.method}] - [Url: ${req.url}]`)
    res.on('finish', () => {
      // Log the response
      console.log(`Incoming -> [Method: ${req.method}] - [Url: ${req.url}] - [Status: ${res.statusCode}]`)
    })
    next()
  })

  // Define routes
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())
  app.use('/auth', authRoutes)
  app.use('/user', userRoutes)
  app.use(router)
}

export { app }
