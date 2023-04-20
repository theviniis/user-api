import { type Response, type NextFunction, type Request } from 'express'
import { tokenUseCase } from '../useCases/token.useCase'

export class TokenController {
  create (req: Request<unknown, unknown, { email: string }>, res: Response, next: NextFunction) {
    const { email } = req.body
    const token = tokenUseCase.create(email)
    console.log(token)
    return res.status(200).json({ token })
  }

  validate (req: Request<unknown, unknown, { token: string }>, res: Response, next: NextFunction) {
    const { token } = req.body
    const isTokenValid = tokenUseCase.validate(token)

    return res.json(isTokenValid)
  }
}

export const tokenController = new TokenController()
