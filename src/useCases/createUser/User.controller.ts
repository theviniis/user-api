import { type Request, type Response } from 'express'
import { userUserCase } from './User.useCase'
import { type IUser } from '../../entities/User'
import { BadRequest } from '../../middleware/errorHandlingMiddleware'

class UserController {
  async getAll (request: Request, response: Response) {
    const users = await userUserCase.getAll()
    return response.status(200).json(users)
  }

  async getById (request: Request, response: Response) {
    const { userId } = request.params
    try {
      const user = await userUserCase.getById(userId)
      console.log(user)
      return response.status(200).json(user)
    } catch {
      throw new BadRequest('User id not found', 404)
    }
  }

  async getByEmail (request: Request<unknown, unknown, IUser>, response: Response) {
    const { email } = request.body
    const user = await userUserCase.getByEmail(email)
    return response.status(200).json(user)
  }

  async deleteById (request: Request, response: Response) {
    const { userId } = request.params
    await userUserCase.deleteById(userId)
    return response.status(200).json({ message: 'User deleted' })
  }

  async update (request: Request<{ id: string }, unknown, Record<'username' | 'password' | 'email' | 'id', string>>, response: Response) {
    const id = request.params.id
    const user = await userUserCase.update(id, request.body)
    return response.status(200).json(user)
  }

  async create (request: Request<unknown, unknown, IUser>, response: Response) {
    const { username, password, email } = request.body
    const user = await userUserCase.create({
      username, password, email
    })
    return response.json({ username: user.username, email: user.email, createdAt: user.createdAt, _id: String(user._id) })
  }
}

const userController = new UserController()

export { UserController, userController }
