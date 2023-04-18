/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import controller from '../controllers/Auth'

const router = Router()

// Routes
router.post('/signin', controller.signIn)
router.post('/signup', controller.createUser)
router.post('/validate', controller.validateToken)

export default router
