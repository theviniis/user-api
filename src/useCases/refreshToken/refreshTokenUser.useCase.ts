import RefreshToken from '../../entities/RefreshToken'
import dayjs from 'dayjs'
import { userUserCase } from '../createUser/User.useCase'
import { generateTokenProvider } from '../../provider'

const refreshTokenUserUseCase = {
  getById: async function (tokenId: string) {
    return await RefreshToken.findById(tokenId)
      .catch((err: Error) => {
        throw new Error(err.message)
      })
  },

  getByUserId: async function (userId: string) {
    return await RefreshToken.findOne({ userId })
      .catch((err: Error) => {
        throw new Error(err.message)
      })
  },

  async validate (tokenId: string) {
    const refreshToken = await this.getById(tokenId)
    if (!refreshToken) throw new Error('Token not found')
    const user = await userUserCase.getByTokenId(tokenId)
    if (!user) throw new Error('User not found')
    const token = generateTokenProvider.execute(user.email)
    return { token }
  },

  removeAllRefreshTokens: async function (userId: string) {
    return await RefreshToken.deleteMany({ userId })
      .catch((err: Error) => {
        throw new Error(err.message)
      })
  },

  isExpired: function (date: number): boolean {
    return dayjs().isAfter(dayjs.unix(date))
  },

  createRefreshToken: async function (userId: string, expiresInDays = 15) {
    const user = await userUserCase.getById(userId)
    if (!user) throw new Error('User not found')
    const expiresIn = dayjs().add(expiresInDays, 'days').unix()
    return await new RefreshToken({
      userId,
      expiresIn
    })
      .save()
      .catch((err: Error) => {
        throw new Error(err.message)
      })
  },

  execute: async function (userId: string) {
    const refreshToken = await this.getByUserId(userId)
    if (refreshToken) {
      const isExpired = this.isExpired(refreshToken.expiresIn)
      if (!isExpired) return refreshToken
      await this.removeAllRefreshTokens(userId)
    }
    return await this.createRefreshToken(userId)
  }

} as const

export { refreshTokenUserUseCase }
