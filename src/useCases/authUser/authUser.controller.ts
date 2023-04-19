import { type Request, type Response } from 'express'
import { AuthUserUseCase, type IRequest } from './authUser.useCase'

class AuthUserUseController {
  async handle (request: Request<unknown, unknown, IRequest>, response: Response) {
    const { username, password } = request.body
    const authUserUseCase = new AuthUserUseCase()
    const token = await authUserUseCase.execute({ username, password })
    return response.json(token)
  }
}

const authUserUseController = new AuthUserUseController()

export { AuthUserUseController, authUserUseController }
