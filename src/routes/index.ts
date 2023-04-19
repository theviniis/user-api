/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import authRoutes from './auth.route'

const router = Router()

router.use('/auth', authRoutes)

export default router
