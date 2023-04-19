import dotenv from 'dotenv'

dotenv.config()

const MONGO_USERNAME = process.env.MONGO_USERNAME ?? ''
const MONGO_PASSWORD = process.env.MONGO_PASSWORD ?? ''
const MONGO_URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@services.idth87b.mongodb.net/`
const SERVER_PORT = process.env.SERVER_PORT ?? 3333
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET ?? ''
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET ?? ''

const CONFIG = {
  mongo: {
    url: MONGO_URI,
    settings: {
      retryWrites: true,
      w: 'majority'
    }
  },
  server: {
    port: SERVER_PORT
  },
  token: {
    access: ACCESS_TOKEN_SECRET,
    refresh: REFRESH_TOKEN_SECRET
  }
} as const

export default CONFIG
