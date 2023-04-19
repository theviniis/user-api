import { type Response, type Request, type NextFunction } from 'express'

class BadRequest extends Error {
  public statusCode: number
  constructor (message: string, statusCode = 400) {
    super(message)
    this.statusCode = statusCode
  }
}

function errorHandling (err: BadRequest, req: Request, res: Response, next: NextFunction) {
  res
    .status(err.statusCode)
    .json({
      message: err.message,
      status: false
    })
}

export { errorHandling, BadRequest }
