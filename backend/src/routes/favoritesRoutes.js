import { Router } from 'express'
import { getFavorites, toggleFavorite } from '../controllers/favoritesController.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.get('/', requireAuth, getFavorites)
router.post('/toggle', requireAuth, toggleFavorite)

export default router
