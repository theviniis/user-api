import jwt from 'jsonwebtoken'
import CONFIG from '../config/config'
import { type IUser } from '../models'

function createJwtToken (user: IUser): string {
  return jwt.sign(user, CONFIG.token.access, { expiresIn: '15m' })
}

export { createJwtToken }
