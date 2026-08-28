import { Router } from 'express'
import { getCourseReviews, upsertReview, deleteReview } from '../controllers/reviewController.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.get('/:courseId', getCourseReviews)
router.post('/', requireAuth, upsertReview)
router.delete('/:courseId', requireAuth, deleteReview)

export default router
