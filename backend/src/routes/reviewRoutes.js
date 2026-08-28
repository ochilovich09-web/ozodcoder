import { Router } from 'express'
import { getCourseReviews, upsertReview } from '../controllers/reviewController.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.get('/:courseId', getCourseReviews)
router.post('/', requireAuth, upsertReview)

export default router
