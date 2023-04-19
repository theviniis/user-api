import { Router } from 'express'
import authRoutes from './auth.routes'
import userRoutes from './user.routes'
import { ensureAuthenticated } from '../middleware/ensureAuthenticated.middleware'

const router = Router()

const data = [
  { id: '1', name: 'balão' },
  { id: '2', name: 'bola' }
]

router.get('/', ensureAuthenticated, (req, res) => res.json(data))
router.use('/auth', authRoutes)
router.use('/user', userRoutes)

export default router
