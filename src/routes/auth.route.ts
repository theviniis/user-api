/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { authUserUseController } from '../useCases/authUser/authUser.controller'
import { refreshTokenUserController } from '../useCases/refreshToken/refreshTokenUser.controller'
import { createUserController } from '../useCases/createUser/createUser.controller'

const router = Router()

// Routes
router.post('/signin', authUserUseController.handle)
router.post('/signup', createUserController.handle)
router.post('/refresh-token', refreshTokenUserController.handle)

export default router
