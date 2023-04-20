import { sign } from 'jsonwebtoken'
import CONFIG from '../config'

export class GenerateTokenProvider {
  execute (userID: string, expiresIn = '15m') {
    const token = sign(
      {},
      CONFIG.token.access,
      { subject: userID, expiresIn }
    )
    return token
  }
}

export const generateTokenProvider = new GenerateTokenProvider()
