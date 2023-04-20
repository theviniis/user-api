import { Router } from 'express'
import { authUserUseController } from '../controllers/authUser.controller'
import { refreshTokenController } from '../controllers/refreshToken.controller'

const router = Router()

// Routes
router.post('/signin', authUserUseController.signin)
router.post('/signup', authUserUseController.signup)

router.post('/refresh-token/validate', refreshTokenController.validate)

export default router
