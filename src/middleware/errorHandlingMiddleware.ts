import { type Response, type Request } from 'express'

class BadRequest extends Error {
  public statusCode: number
  constructor (message: string, statusCode = 400) {
    super(message)
    this.statusCode = statusCode
  }
}

function errorHandling (err: BadRequest, req: Request, res: Response) {
  res
    .status(err.statusCode)
    .json({
      message: err.message,
      success: false
    })
}

export { errorHandling, BadRequest }