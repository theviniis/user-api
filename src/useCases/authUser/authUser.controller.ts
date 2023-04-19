import { type Request, type Response } from 'express'
import { authUserUseCase, type ISignUp, type IRequest } from './authUser.useCase'

class AuthUserUseController {
  async signup (request: Request<unknown, unknown, ISignUp>, response: Response) {
    const { username, password, email } = request.body
    const user = await authUserUseCase.signup({ username, password, email })
    return response.status(200).json(user)
  }

  async signin (request: Request<unknown, unknown, IRequest>, response: Response) {
    const { email, password } = request.body
    const token = await authUserUseCase.signin({ email, password })
    return response.json(token)
  }
}

const authUserUseController = new AuthUserUseController()

export { AuthUserUseController, authUserUseController }
