import Review from '../models/Review.js'
import Course from '../models/Course.js'

async function recalculateCourseRating(courseId) {
  const reviews = await Review.find({ courseId })
  const ratingCount = reviews.length
  let rating = 0
  if (ratingCount > 0) {
    const total = reviews.reduce((sum, r) => sum + r.rating, 0)
    rating = Math.round((total / ratingCount) * 10) / 10
  }
  await Course.findOneAndUpdate({ id: courseId }, { rating, ratingCount })
}

export async function getCourseReviews(req, res) {
  try {
    const reviews = await Review.find({ courseId: req.params.courseId })
      .populate('user', 'name')
      .sort({ createdAt: -1 })
    res.json(reviews)
  } catch (err) {
    res.status(500).json({ message: 'Server xatoligi', error: err.message })
  }
}

export async function upsertReview(req, res) {
  try {
    const { courseId, rating, comment } = req.body
    if (!courseId || !rating) {
      return res.status(400).json({ message: 'courseId va rating talab qilinadi' })
    }
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Baho 1 dan 5 gacha bo\'lishi kerak' })
    }

    const review = await Review.findOneAndUpdate(
      { user: req.userId, courseId },
      { rating, comment },
      { new: true, upsert: true, setDefaultsOnInsert: true },
    ).populate('user', 'name')

    await recalculateCourseRating(courseId)

    res.json(review)
  } catch (err) {
    res.status(500).json({ message: 'Server xatoligi', error: err.message })
  }
}

export async function deleteReview(req, res) {
  try {
    const { courseId } = req.params
    const review = await Review.findOneAndDelete({ user: req.userId, courseId })
    if (!review) {
      return res.status(404).json({ message: 'Sharh topilmadi' })
    }

    await recalculateCourseRating(courseId)

    res.json({ message: "Sharh o'chirildi" })
  } catch (err) {
    res.status(500).json({ message: 'Server xatoligi', error: err.message })
  }
}
