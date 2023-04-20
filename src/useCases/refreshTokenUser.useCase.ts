import { RefreshToken } from '../entities'
import dayjs from 'dayjs'
import { userUserCase } from './'
import { tokenUseCase } from './token.useCase'

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

  async validate (tokenId: string): Promise<{ token?: string, message: string, status: boolean }> {
    const refreshToken = await this.getById(tokenId)

    const invalidObject = {
      message: 'Refresh token invalid',
      status: false
    }

    if (!refreshToken) {
      return invalidObject
    }

    const user = await userUserCase.getByTokenId(tokenId)
    if (!user) {
      return invalidObject
    }

    const isTokenExpired = this.isExpired(refreshToken.expiresIn)
    if (isTokenExpired) {
      return invalidObject
    }

    const token = tokenUseCase.create(user.email, '15d')

    return { token, message: 'Refresh token valid', status: true }
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
      if (!isExpired) { return refreshToken }
      await this.removeAllRefreshTokens(userId)
    }
    return await this.createRefreshToken(userId)
  }

} as const

export { refreshTokenUserUseCase }
