import 'dotenv/config'
import { app } from './app'
import CONFIG from './config/config'

const PORT = CONFIG.server.port

app.listen(
  PORT,
  () => { console.log(`Server running on https://localhost:${PORT}/`) }
)
