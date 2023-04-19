import { type Request, type Response } from 'express'
import { CreateUserUseCase } from './createUser.useCase'
import { type IUser } from '../../entities/UserSchema'

class CreateUserController {
  public async handle (request: Request<unknown, unknown, IUser>, response: Response) {
    const { username, password, email } = request.body
    const createUserUseCase = new CreateUserUseCase()
    const user = await createUserUseCase.execute({
      username, password, email
    })
    return response.json(user)
  }
}

export { CreateUserController }

export const createUserController = new CreateUserController()
