import { Router } from 'express'
import {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from '../controllers/courseController.js'
import { requireAuth, requireAdmin } from '../middleware/auth.js'

const router = Router()

router.get('/', getCourses)
router.get('/:id', getCourseById)

// Admin-only
router.post('/', requireAuth, requireAdmin, createCourse)
router.put('/:id', requireAuth, requireAdmin, updateCourse)
router.delete('/:id', requireAuth, requireAdmin, deleteCourse)

export default router
