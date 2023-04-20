import jwt, { sign } from 'jsonwebtoken'
import CONFIG from '../config'
import { BadRequest } from '../middleware'

export class TokenUseCase {
  create (email: string, expiresIn = '15m') {
    try {
      return sign(
        { email },
        CONFIG.token.access,
        { expiresIn }
      )
    } catch {
      throw new BadRequest('Email not valid', 404)
    }
  }

  validate (token: string) {
    try {
      jwt.verify(token, CONFIG.token.access)
      return { message: 'Token valid' }
    } catch {
      return { message: 'Token invalid' }
    }
  }
}

export const tokenUseCase = new TokenUseCase()
