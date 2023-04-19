import { hash } from 'bcryptjs'
import User, { type IUser } from '../../entities/UserSchema'
import { BadRequest } from '../../middleware/errorHandlingMiddleware'

class CreateUserUseCase {
  async execute ({ username, email, password }: IUser) {
    // Check if user already exists
    const userAlreadyExists = await User.findOne({ email })
    if (userAlreadyExists) {
      throw new BadRequest('Email already in use', 409)
    }

    // Create a new user
    const hashPassword = await hash(password, 10)
    const user = await new User({ username, email, password: hashPassword })
      .save()
    return user
  }
}

export { CreateUserUseCase }
