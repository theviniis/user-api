import { type Request, type Response } from 'express'
import { refreshTokenUserUseCase } from './refreshTokenUser.useCase'

async function refreshTokenUserController (req: Request<unknown, unknown, { refreshToken: string }>, res: Response) {
  const { refreshToken } = req.body
  const token = await refreshTokenUserUseCase.validate(refreshToken)
  return res.json(token)
}

export { refreshTokenUserController }
