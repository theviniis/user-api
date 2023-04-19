/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import authRoutes from './authRoutes'
import userRoutes from './userRoute'

const router = Router()

router.use('/auth', authRoutes)
router.use('/user', userRoutes)

export default router
