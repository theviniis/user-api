import { hash } from 'bcryptjs'
import User from '../../entities/User'
import { BadRequest } from '../../middleware/errorHandlingMiddleware'
import { refreshTokenUserUseCase } from '../refreshToken/refreshTokenUser.useCase'

const userUserCase = {
  getAll: async function () {
    try {
      return await User.find()
    } catch {
      throw new BadRequest('Error while getting data')
    }
  },

  getById: async function (userId: string) {
    try {
      const user = await User.findById(userId)
      if (!user) {
        throw new BadRequest('User id not found', 404)
      }
      return user
    } catch {
      throw new BadRequest('Error while reading data', 404)
    }
  },

  getByEmail: async function (email: string) {
    try {
      const user = await User.findOne({ email })
      if (!user) {
        throw new BadRequest('User email not found', 404)
      }
      return user
    } catch {
      throw new BadRequest('User email not found', 404)
    }
  },

  async getByTokenId (tokenId: string) {
    return await refreshTokenUserUseCase.getById(tokenId)
      .then(async (token) => token && await userUserCase
        .getById(token.userId))
      .catch((err: Error) => { throw new Error(err.message) })
  },

  deleteById: async function (userId: string) {
    try {
      const user = await User.findByIdAndDelete(userId)
      if (!user) {
        throw new BadRequest('User id not found', 404)
      }
      return user
    } catch {
      throw new BadRequest('User id not found', 404)
    }
  },

  update: async function (userId: string, body: Record<'username' | 'password' | 'email', string>) {
    try {
      await User.findByIdAndUpdate(userId, body)
      return await this.getById(userId)
    } catch {
      throw new BadRequest('User id not found', 404)
    }
  },

  create: async function ({ username, email, password }: Record<'username' | 'email' | 'password', string>) {
    const userAlreadyExists = await User.findOne({ email })
    if (userAlreadyExists) {
      throw new BadRequest('Email already in use', 409)
    }
    const hashPassword = await hash(password, 10)
    const user =
      await new User(
        { username, email, password: hashPassword }
      ).save()
    return user
  }
}

export { userUserCase }
