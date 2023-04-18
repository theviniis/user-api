/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import controller from '../controllers/User'

const router = Router()

// Routes
router.get('/', controller.readAllUsers)
router.get('/get/:userId', controller.readUser)
router.patch('/update/:userId', controller.updateUser)
router.delete('/delete/:userId', controller.deleteUser)

export default router
