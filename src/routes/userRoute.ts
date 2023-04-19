/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { userController } from '../useCases/createUser/User.controller'
import { ensureAuthenticated } from '../middleware/ensureAuthenticatedMiddleware'

const router = Router()

// Routes
router.get('/', userController.getAll)
router.get('/:userId', userController.getById)
router.get('/update/:id', userController.update)
router.get('/get/:email', userController.getByEmail)
router.delete('/delete/:userId', ensureAuthenticated, userController.deleteById)

export default router
