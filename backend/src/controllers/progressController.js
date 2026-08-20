import Progress from '../models/Progress.js'

export async function getAllProgress(req, res) {
  try {
    const records = await Progress.find({ user: req.userId })
    res.json(records)
  } catch (err) {
    res.status(500).json({ message: 'Server xatoligi', error: err.message })
  }
}

export async function toggleLesson(req, res) {
  try {
    const { courseId, lessonId } = req.body
    if (!courseId || !lessonId) {
      return res.status(400).json({ message: 'courseId va lessonId talab qilinadi' })
    }

    let record = await Progress.findOne({ user: req.userId, courseId })
    if (!record) {
      record = await Progress.create({ user: req.userId, courseId, completedLessons: [lessonId] })
      return res.json(record)
    }

    const idx = record.completedLessons.indexOf(lessonId)
    if (idx >= 0) {
      record.completedLessons.splice(idx, 1)
    } else {
      record.completedLessons.push(lessonId)
    }
    await record.save()
    res.json(record)
  } catch (err) {
    res.status(500).json({ message: 'Server xatoligi', error: err.message })
  }
}
