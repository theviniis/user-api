import { type Request, type Response } from 'express'
import { refreshTokenUserUseCase } from './refreshTokenUser.useCase'

class RefreshTokenUserController {
  async handle (req: Request<unknown, unknown, { refreshToken: string }>, res: Response) {
    const { refreshToken } = req.body
    const token = await refreshTokenUserUseCase.execute(refreshToken)
    return res.json(token)
  }
}
const refreshTokenUserController = new RefreshTokenUserController()

export { RefreshTokenUserController, refreshTokenUserController }
