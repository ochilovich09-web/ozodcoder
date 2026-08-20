import { Router } from 'express'
import { getAllProgress, toggleLesson } from '../controllers/progressController.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.get('/', requireAuth, getAllProgress)
router.post('/toggle', requireAuth, toggleLesson)

export default router
