import db from '../../entities/RefreshToken'
import { generateTokenProvider, generateRefreshToken } from '../../provider'
import { BadRequest } from '../../middleware/errorHandlingMiddleware'
import dayjs from 'dayjs'

class RefreshTokenUserUseCase {
  isRefreshTokenExpired (expireDate: number): boolean {
    return dayjs().isAfter(dayjs.unix(expireDate))
  }

  async createNewRefreshToken (userId: string) {
    await this.removeAllRefreshTokenFromDB(userId)
    return await generateRefreshToken.execute(userId)
  }

  async removeAllRefreshTokenFromDB (userId: string) {
    return await db.deleteMany({ userId })
  }

  async execute (refreshToken: string) {
    try {
      const DB_TOKEN = await db.findById(refreshToken)
      if (!DB_TOKEN) { throw new BadRequest('Token not found') }
      const token = generateTokenProvider.execute(String(DB_TOKEN._id))
      const isRefreshTokenExpired = this.isRefreshTokenExpired(DB_TOKEN.expiresIn)
      if (isRefreshTokenExpired) {
        const newRefreshToken = await this.createNewRefreshToken(DB_TOKEN.userId)
        return { token, refreshToken: newRefreshToken }
      }
      return { token }
    } catch {
      throw new BadRequest('Refresh token not found', 404)
    }
  }
}

const refreshTokenUserUseCase = new RefreshTokenUserUseCase()

export { RefreshTokenUserUseCase, refreshTokenUserUseCase }
