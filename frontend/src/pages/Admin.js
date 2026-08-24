import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { fetchCourses, createCourseApi, updateCourseApi, deleteCourseApi } from '../api/courses'
import { categories as baseCategories } from '../data/courses'
import { toEmbedUrl } from '../utils/youtube'

const emptyForm = {
  id: '',
  title: '',
  subtitle: '',
  category: '',
  level: 'Beginner',
  price: '',
  oldPrice: '',
  duration: '',
  instructor: '',
  thumbnail: '',
  description: '',
}

const emptyLesson = { id: '', title: '', duration: '', videoUrl: '' }

export default function Admin() {
  const { user, isAuthenticated } = useAuth()
  const [courses, setCourses] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [lessons, setLessons] = useState([])
  const [lessonForm, setLessonForm] = useState(emptyLesson)
  const [editingId, setEditingId] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    loadCourses()
  }, [])

  function loadCourses() {
    fetchCourses()
      .then((data) => setCourses(data))
      .catch(() => setError('Kurslarni yuklab bo\'lmadi'))
  }

  const allCategories = [...baseCategories]
  for (const course of courses) {
    if (!allCategories.includes(course.category)) {
      allCategories.push(course.category)
    }
  }

  if (!isAuthenticated || user.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  function addLesson() {
    if (!lessonForm.id || !lessonForm.title || !lessonForm.videoUrl) {
      alert('Dars uchun id, nom va video havola talab qilinadi')
      return
    }
    const normalizedLesson = { ...lessonForm, videoUrl: toEmbedUrl(lessonForm.videoUrl) }
    setLessons([...lessons, normalizedLesson])
    setLessonForm(emptyLesson)
  }

  function removeLesson(id) {
    setLessons(lessons.filter((l) => l.id !== id))
  }

  function startEdit(course) {
    setEditingId(course.id)
    setForm({
      id: course.id,
      title: course.title,
      subtitle: course.subtitle || '',
      category: course.category,
      level: course.level,
      price: course.price,
      oldPrice: course.oldPrice || '',
      duration: course.duration || '',
      instructor: course.instructor || '',
      thumbnail: course.thumbnail || '',
      description: course.description || '',
    })
    setLessons(course.lessons || [])
    window.scrollTo(0, 0)
  }

  function resetForm() {
    setEditingId(null)
    setForm(emptyForm)
    setLessons([])
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!form.id || !form.title || !form.category || !form.price) {
      setError('Id, nom, kategoriya va narx to\'ldirilishi shart')
      return
    }

    const payload = {
      ...form,
      price: Number(form.price),
      oldPrice: form.oldPrice ? Number(form.oldPrice) : undefined,
      lessons,
    }

    try {
      if (editingId) {
        await updateCourseApi(editingId, payload)
      } else {
        await createCourseApi(payload)
      }
      resetForm()
      loadCourses()
    } catch (err) {
      setError(err.message)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Kursni o\'chirishga ishonchingiz komilmi?')) return
    try {
      await deleteCourseApi(id)
      loadCourses()
      if (editingId === id) resetForm()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="container" style={{ paddingTop: 40, paddingBottom: 40 }}>
      <h1 className="page-title">Admin panel</h1>
      <p className="page-subtitle">Kurslarni qo'shish, tahrirlash va o'chirish.</p>

      {error && <p className="error-text" style={{ marginTop: 16 }}>{error}</p>}

      <form onSubmit={handleSubmit} className="admin-form">
        <input
          placeholder="Id (slug, masalan: react-asoslari)"
          value={form.id}
          onChange={(e) => setForm({ ...form, id: e.target.value })}
          disabled={Boolean(editingId)}
          className="field"
        />
        <input
          placeholder="Kurs nomi"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="field"
        />
        <input
          placeholder="Subtitr"
          value={form.subtitle}
          onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
          className="field"
        />
        <input
          placeholder="Kategoriya (yangisini yozing yoki mavjudidan tanlang)"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          list="category-options"
          className="field"
        />
        <datalist id="category-options">
          {allCategories.map((cat) => (
            <option key={cat} value={cat} />
          ))}
        </datalist>
        <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} className="field">
          <option value="Beginner">Beginner</option>
          <option value="Junior">Junior</option>
          <option value="Middle">Middle</option>
        </select>
        <input
          placeholder="Narx ($)"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="field"
        />
        <input
          placeholder="Eski narx ($) - ixtiyoriy"
          type="number"
          value={form.oldPrice}
          onChange={(e) => setForm({ ...form, oldPrice: e.target.value })}
          className="field"
        />
        <input
          placeholder="Davomiyligi (masalan: 10 soat)"
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
          className="field"
        />
        <input
          placeholder="O'qituvchi"
          value={form.instructor}
          onChange={(e) => setForm({ ...form, instructor: e.target.value })}
          className="field"
        />
        <input
          placeholder="Rasm havolasi (URL)"
          value={form.thumbnail}
          onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
          className="field admin-form__full"
        />
        <textarea
          placeholder="Tavsif"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="field admin-form__full"
          rows={3}
        />

        <div className="admin-form__full">
          <h3 style={{ marginBottom: 8, fontSize: '0.875rem', fontWeight: 600 }}>Darslar</h3>
          <ul className="admin-lessons-list">
            {lessons.map((l) => (
              <li key={l.id} className="admin-lesson-row">
                <span>{l.title} ({l.duration})</span>
                <button type="button" onClick={() => removeLesson(l.id)} style={{ color: 'var(--color-error)' }}>
                  O'chirish
                </button>
              </li>
            ))}
          </ul>
          <div className="admin-lesson-fields">
            <input
              placeholder="Dars id (l1)"
              value={lessonForm.id}
              onChange={(e) => setLessonForm({ ...lessonForm, id: e.target.value })}
              className="field"
            />
            <input
              placeholder="Dars nomi"
              value={lessonForm.title}
              onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
              className="field"
            />
            <input
              placeholder="Davomiyligi (8:12)"
              value={lessonForm.duration}
              onChange={(e) => setLessonForm({ ...lessonForm, duration: e.target.value })}
              className="field"
            />
            <input
              placeholder="Video havola"
              value={lessonForm.videoUrl}
              onChange={(e) => setLessonForm({ ...lessonForm, videoUrl: e.target.value })}
              className="field"
            />
          </div>
          <button type="button" onClick={addLesson} className="btn btn-outline btn-sm" style={{ marginTop: 8 }}>
            + Dars qo'shish
          </button>
        </div>

        <div className="admin-actions admin-form__full">
          <button type="submit" className="btn btn-primary">
            {editingId ? 'Kursni yangilash' : "Kurs qo'shish"}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="btn btn-outline">
              Bekor qilish
            </button>
          )}
        </div>
      </form>

      <h2 style={{ marginTop: 40, marginBottom: 16, fontSize: '1.25rem', fontWeight: 600 }}>Mavjud kurslar</h2>
      <ul className="admin-course-list">
        {courses.map((course) => (
          <li key={course.id} className="admin-course-row">
            <div>
              <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>{course.title}</p>
              <p className="text-muted" style={{ fontSize: '0.75rem' }}>
                {course.id} · {course.category} · ${course.price}
              </p>
            </div>
            <div className="admin-actions">
              <button onClick={() => startEdit(course)} className="btn btn-outline btn-sm">
                Tahrirlash
              </button>
              <button onClick={() => handleDelete(course.id)} className="btn btn-danger-outline btn-sm">
                O'chirish
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
