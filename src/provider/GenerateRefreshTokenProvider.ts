import dayjs from 'dayjs'
import RefreshTokenModel from '../entities/RefreshToken'
import { BadRequest } from '../middleware/errorHandlingMiddleware'

async function generateRefreshToken (userId: string) {
  const expiresIn = dayjs().add(15, 'days').unix()
  try {
    const token = await new RefreshTokenModel({ userId, expiresIn }).save()
    return token
  } catch {
    throw new BadRequest('Cannot create token', 409)
  }
}

export { generateRefreshToken }
