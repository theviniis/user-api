/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { authUserUseController } from '../useCases/authUser/authUser.controller'
import { refreshTokenUserController } from '../useCases/refreshToken/refreshTokenUser.controller'

const router = Router()

// Routes
router.post('/signin', authUserUseController.signin)
router.post('/signup', authUserUseController.signup)
router.post('/token/validate', refreshTokenUserController)

export default router
