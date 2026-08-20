import User from '../models/User.js'

export async function getFavorites(req, res) {
  try {
    const user = await User.findById(req.userId)
    if (!user) return res.status(404).json({ message: 'Foydalanuvchi topilmadi' })
    res.json({ favorites: user.favorites })
  } catch (err) {
    res.status(500).json({ message: 'Server xatoligi', error: err.message })
  }
}

export async function toggleFavorite(req, res) {
  try {
    const { courseId } = req.body
    if (!courseId) return res.status(400).json({ message: 'courseId talab qilinadi' })

    const user = await User.findById(req.userId)
    if (!user) return res.status(404).json({ message: 'Foydalanuvchi topilmadi' })

    const idx = user.favorites.indexOf(courseId)
    if (idx >= 0) {
      user.favorites.splice(idx, 1)
    } else {
      user.favorites.push(courseId)
    }
    await user.save()
    res.json({ favorites: user.favorites })
  } catch (err) {
    res.status(500).json({ message: 'Server xatoligi', error: err.message })
  }
}
