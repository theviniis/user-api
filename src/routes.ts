import { Router } from 'express'

const router = Router()

// Heath check
router.get('/hey', (req, res) => res.status(200).json({ message: 'ho!' }))

// Error Handling
router.use((req, res) => {
  const error = new Error('Route not found')
  console.log(error.message)
  return res.status(404).json({ message: error.message })
})

export default router
