import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import courseRoutes from './routes/courseRoutes.js'
import progressRoutes from './routes/progressRoutes.js'
import favoritesRoutes from './routes/favoritesRoutes.js'
import reviewRoutes from './routes/reviewRoutes.js'

const app = express()

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json())

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

app.use('/api/auth', authRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/progress', progressRoutes)
app.use('/api/favorites', favoritesRoutes)
app.use('/api/reviews', reviewRoutes)

app.use((req, res) => {
  res.status(404).json({ message: 'Route topilmadi' })
})

const PORT = process.env.PORT || 5000

connectDB().then(() => {
  app.listen(PORT)
})
