import { type Request, type Response, type NextFunction } from 'express'
import { BadRequest } from './errorHandlingMiddleware'
import { verify } from 'jsonwebtoken'
import CONFIG from '../config'

export function ensureAuthenticated (req: Request, res: Response, next: NextFunction) {
  const authorization = req.headers.authorization
  if (!authorization) throw new BadRequest('Token is missing', 401)
  const token = authorization.split(' ')[1]
  try {
    verify(token, CONFIG.token.access)
    next()
  } catch (err) {
    throw new BadRequest('Token invalid', 401)
  }
}
