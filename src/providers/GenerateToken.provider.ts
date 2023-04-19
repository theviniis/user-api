import { sign } from 'jsonwebtoken'
import CONFIG from '../config'

export class GenerateTokenProvider {
  execute (userEmail: string, expiresIn = '15m') {
    const token = sign(
      {},
      CONFIG.token.access,
      { subject: userEmail, expiresIn }
    )
    return token
  }
}

export const generateTokenProvider = new GenerateTokenProvider()
