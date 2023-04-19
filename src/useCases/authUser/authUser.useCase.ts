import { compare } from 'bcryptjs'
import { BadRequest } from '../../middleware/errorHandlingMiddleware'
import { generateTokenProvider } from '../../provider/GenerateTokenProvider'
import { refreshTokenUserUseCase } from '../refreshToken/refreshTokenUser.useCase'
import { userUserCase } from '../createUser/User.useCase'
import db from '../../entities/User'

type IRequest = Record<'email' | 'password', string>

type ISignUp = Record<'username' | 'email' | 'password', string>

const authUserUseCase = {
  signup: async function ({ username, password, email }: ISignUp) {
    const user = await db.findOne({ email })
    if (user) {
      throw new BadRequest('User email already exists')
    }
    return await userUserCase.create({ username, email, password })
  },

  signin: async function ({ email, password }: IRequest) {
    const user = await userUserCase.getByEmail(email)
    if (user) {
      const userId = String(user._id)
      const passwordMatch = await compare(password, user.password)
      if (!passwordMatch) throw new BadRequest('Password incorrect', 404)
      const token = generateTokenProvider.execute(userId)
      const refresh = await refreshTokenUserUseCase.execute(userId)
      return { token, refresh }
    } else {
      throw new BadRequest('User email not found', 404)
    }
  }
}

export { authUserUseCase, type IRequest, type ISignUp }
