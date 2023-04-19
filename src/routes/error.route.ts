import { BadRequest } from '../middleware/errorHandlingMiddleware'
import router from './index'

// Heath check
router.get('/hey', (req, res) => res.status(200).json({ message: 'ho!' }))

// Error Handling
router.use((req, res) => {
  const error = new BadRequest('Route not found')
  console.log(error.message)
  return res.status(404).json({ message: error.message })
})
