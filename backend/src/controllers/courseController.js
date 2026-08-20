import Course from '../models/Course.js'

export async function getCourses(req, res) {
  try {
    const { category, search } = req.query
    const filter = {}
    if (category && category !== 'Barchasi') filter.category = category
    if (search) filter.title = { $regex: search, $options: 'i' }

    const courses = await Course.find(filter).sort({ createdAt: -1 })
    res.json(courses)
  } catch (err) {
    res.status(500).json({ message: 'Server xatoligi', error: err.message })
  }
}

export async function getCourseById(req, res) {
  try {
    const course = await Course.findOne({ id: req.params.id })
    if (!course) return res.status(404).json({ message: 'Kurs topilmadi' })
    res.json(course)
  } catch (err) {
    res.status(500).json({ message: 'Server xatoligi', error: err.message })
  }
}

// --- Admin panel uchun ---

export async function createCourse(req, res) {
  try {
    const course = await Course.create(req.body)
    res.status(201).json(course)
  } catch (err) {
    res.status(400).json({ message: "Kurs yaratishda xatolik", error: err.message })
  }
}

export async function updateCourse(req, res) {
  try {
    const course = await Course.findOneAndUpdate({ id: req.params.id }, req.body, { new: true })
    if (!course) return res.status(404).json({ message: 'Kurs topilmadi' })
    res.json(course)
  } catch (err) {
    res.status(400).json({ message: "Kursni yangilashda xatolik", error: err.message })
  }
}

export async function deleteCourse(req, res) {
  try {
    const course = await Course.findOneAndDelete({ id: req.params.id })
    if (!course) return res.status(404).json({ message: 'Kurs topilmadi' })
    res.json({ message: "Kurs o'chirildi" })
  } catch (err) {
    res.status(500).json({ message: 'Server xatoligi', error: err.message })
  }
}
