import { type Request, type Response } from 'express'
import User, { type IUser } from '../models/User'
import jwt from 'jsonwebtoken'
import CONFIG from '../config/config'
import bcryptjs from 'bcryptjs'
import { createJwtToken } from '../utils/createJwtToken'

async function signIn (req: Request<unknown, unknown, { username: string, password: string }>, res: Response) {
  const { username, password } = req.body
  const user = await User.findOne({ username })
  if (user) {
    const token = jwt.sign({ username, password }, CONFIG.token.access, { expiresIn: '15m' })
    const passwordMatch = await bcryptjs.compare(password, user.password)
    console.log(passwordMatch)
    return (passwordMatch) && res.status(200).json({
      token,
      user_email: user.email,
      user_username: user.username
    })
  } else {
    return res.status(404).json({ message: 'User not found' })
  }
}

function validateToken (req: Request, res: Response) {
  const authHeader = req.headers.authorization
  const token = authHeader?.split(' ')[1]
  if (token) {
    jwt.verify(token, CONFIG.token.access)
    return res.status(200).json({ code: 'jwt_auth_valid_token', data: { status: 200 } })
  } else {
    return res.status(401).json({ message: 'Token not provided' })
  }
}

async function createUser (req: Request<unknown, unknown, IUser>, res: Response) {
  const { username, email, password } = req.body
  const token = createJwtToken({ username, email, password })
  const alreadyRegistered = !!await User.findOne({ email })
  if (alreadyRegistered) {
    return res.status(300).json({ message: 'Email already registered' })
  }
  const user = new User({ username, email, password, token })
  return await user
    .save()
    .then(() => res.status(201).json({
      message: 'User created',
      results: {
        username,
        email,
        password
      }
    }))
    .catch((error: Error) => res.status(500).json({ error }))
}

export default { validateToken, signIn, createUser }
