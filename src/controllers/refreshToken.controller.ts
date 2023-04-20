import { type Request, type Response } from 'express'
import { refreshTokenUserUseCase } from '../useCases/refreshTokenUser.useCase'

export class RefreshTokenController {
  async validate (req: Request<unknown, unknown, { refreshToken: string }>, res: Response) {
    const { refreshToken } = req.body
    const token = await refreshTokenUserUseCase.validate(refreshToken)
    return res.json(token)
  }
}

export const refreshTokenController = new RefreshTokenController()
