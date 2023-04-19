import { compare } from 'bcryptjs'
import { BadRequest } from '../../middleware/errorHandlingMiddleware'
import { generateRefreshToken } from '../../provider/GenerateRefreshTokenProvider'
import { generateTokenProvider } from '../../provider/GenerateTokenProvider'
import { refreshTokenUserUseCase } from '../refreshToken/refreshTokenUser.useCase'
import { userUserCase } from '../createUser/User.useCase'
import db from '../../entities/User'

type IRequest = Record<'email' | 'password', string>

type ISignUp = Record<'username' | 'email' | 'password', string>
class AuthUserUseCase {
  async signup ({ username, password, email }: ISignUp) {
    const user = await db.findOne({ email })
    if (user) {
      throw new BadRequest('User email already exists')
    }
    return await userUserCase.create({ username, email, password })
  }

  async signin ({ email, password }: IRequest) {
    try {
      const user = await userUserCase.getByEmail(email)
      if (!user) throw new BadRequest('User not found', 404)
      const passwordMatch = await compare(password, user.password)
      if (passwordMatch) {
        const token = generateTokenProvider.execute(user.email)
        await refreshTokenUserUseCase.removeAllRefreshTokenFromDB(String(user._id))
        const refreshToken = await generateRefreshToken.execute(String(user?._id))
        return { token, refreshToken }
      } else { throw new BadRequest('Password incorrect') }
    } catch {
      throw new BadRequest('User not found', 404)
    }
  }
}

const authUserUseCase = new AuthUserUseCase()

export { AuthUserUseCase, authUserUseCase, type IRequest, type ISignUp }
