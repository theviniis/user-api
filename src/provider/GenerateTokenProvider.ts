import { sign } from 'jsonwebtoken'
import CONFIG from '../config'

class GenerateTokenProvider {
  execute (userId: string, expiresIn = '15m') {
    const token = sign(
      {},
      CONFIG.token.access,
      { subject: userId, expiresIn }
    )
    return token
  }
}

const generateTokenProvider = new GenerateTokenProvider()

export { GenerateTokenProvider, generateTokenProvider }
