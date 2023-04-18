import { type NextFunction, type Request, type Response } from 'express'
import User from '../models/User'

async function readUser (req: Request, res: Response, next: NextFunction) {
  const token = req.params.userId
  const user = await User.findOne({ token })
  if (user) {
    return res.status(200).json({
      username: user.username,
      email: user.email,
      createdAt: user.createdAt
    })
  } else {
    return res.status(400).json({ message: 'User not found' })
  }
}

async function readAllUsers (req: Request, res: Response, next: NextFunction) {
  return await User.find()
    .then((users) => {
      if (users) {
        return res.status(200).json(users)
      } else {
        return res.status(404).json({ message: 'Users not found' })
      }
    })
    .catch((error: Error) => res.status(500).json({ error }))
}

async function updateUser (req: Request, res: Response, next: NextFunction) {
  const id = req.params.userId
  return await User.findById(id)
    .then(async (user) => {
      if (user) {
        user.set(req.body)
        return await user
          .save()
          .then(() => res.status(201).json({ message: 'User information updated' }))
          .catch((error: Error) => res.status(500).json({ error }))
      } else {
        return res.status(404).json({ message: 'User not found' })
      }
    })
    .catch((error: Error) => res.status(500).json({ error }))
}

async function deleteUser (req: Request, res: Response, next: NextFunction) {
  const id = req.params.userId
  return await User.findByIdAndDelete(id)
    .then((user) => {
      if (user) {
        return res.status(201).json({ message: 'User was deleted from database' })
      } else {
        return res.status(404).json({ message: 'User not found' })
      }
    })
    .catch((error: Error) => res.status(500).json({ error }))
}

export default { readUser, readAllUsers, deleteUser, updateUser }
