import dayjs from 'dayjs'
import RefreshTokenModel from '../useCases/refreshToken/RefreshTokenSchema'
import { BadRequest } from '../middleware/errorHandlingMiddleware'

class GenerateRefreshToken {
  async execute (userId: string) {
    const expiresIn = dayjs().add(15, 'days').unix()
    const refreshToken = await new RefreshTokenModel({ userId, expiresIn })
      .save()
      .catch((err: Error) => { throw new BadRequest(err.message, 409) })
    return refreshToken
  }
}

const generateRefreshToken = new GenerateRefreshToken()

export { GenerateRefreshToken, generateRefreshToken }
