import { Router } from 'express'
import authRoutes from './auth.route'
import userRoutes from './user.route'
import tokenRoutes from './token.route'
import { ensureAuthenticated } from '../middleware/ensureAuthenticated.middleware'

const router = Router()

const data = [
  { id: '1', name: 'balão' },
  { id: '2', name: 'bola' }
]
router.get('/', ensureAuthenticated, (req, res) => res.json(data))
router.use('/auth', authRoutes)
router.use('/user', userRoutes)
router.use('/token', tokenRoutes)

export default router
