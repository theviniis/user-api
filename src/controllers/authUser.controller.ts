import { type Request, type Response } from 'express'
import { authUserUseCase, type ISignUp, type IRequest } from '../useCases/authUser.useCase'

const authUserUseController = {

  signup: async function (request: Request<unknown, unknown, ISignUp>, response: Response) {
    const { username, password, email } = request.body
    const user = await authUserUseCase.signup({ username, password, email })
    return response.status(200).json(user)
  },

  signin: async function (request: Request<unknown, unknown, IRequest>, response: Response) {
    const { email, password } = request.body
    const token = await authUserUseCase.signin({ email, password })
    return response.json(token)
  }
}
export { authUserUseController }
