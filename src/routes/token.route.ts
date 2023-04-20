/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { tokenController } from '../controllers/token.controller'

const router = Router()

// Routes
// router.get('/:token', userController.getAll)
router.post('/new', tokenController.create)
router.post('/validate', tokenController.validate)

export default router
