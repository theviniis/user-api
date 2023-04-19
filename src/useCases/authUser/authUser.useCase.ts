import { compare } from 'bcryptjs'
import User from '../../entities/UserSchema'
import { BadRequest } from '../../middleware/errorHandlingMiddleware'
import { generateRefreshToken } from '../../provider/GenerateRefreshTokenProvider'
import { generateTokenProvider } from '../../provider/GenerateTokenProvider'
import { refreshTokenUserUseCase } from '../refreshToken/refreshTokenUser.useCase'

type IRequest = Record<'username' | 'password', string>

async function getUserByUsername (username: string) {
  const user = await User.findOne({ username })
  if (!user) throw new BadRequest('User does not exists')
  return user
}

class AuthUserUseCase {
  async execute ({ username, password }: IRequest) {
    try {
      const user = await getUserByUsername(username)
      const passwordMatch = await compare(password, user.password)
      if (!passwordMatch) throw new BadRequest('Password incorrect')
      const token = generateTokenProvider.execute(user.username)
      await refreshTokenUserUseCase.removeAllRefreshTokenFromDB(String(user._id))
      const refreshToken = await generateRefreshToken.execute(String(user?._id))
      return { token, refreshToken }
    } catch {
      throw new BadRequest('User not found', 404)
    }
  }
}

const authUserUseCase = new AuthUserUseCase()

export { AuthUserUseCase, authUserUseCase, type IRequest }
