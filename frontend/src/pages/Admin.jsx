import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { fetchCourses, createCourseApi, updateCourseApi, deleteCourseApi } from '../api/courses'

const emptyForm = {
  id: '',
  title: '',
  subtitle: '',
  category: 'Frontend',
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

  if (!isAuthenticated || user.role !== 'admin') {
    return <Navigate to="/" replace />
  }

  function addLesson() {
    if (!lessonForm.id || !lessonForm.title || !lessonForm.videoUrl) {
      alert('Dars uchun id, nom va video havola talab qilinadi')
      return
    }
    setLessons([...lessons, lessonForm])
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
    <div className="mx-auto max-w-content px-4 py-10 md:px-8">
      <h1 className="font-display text-3xl font-bold text-on-surface">Admin panel</h1>
      <p className="mt-2 text-on-surface-variant">Kurslarni qo'shish, tahrirlash va o'chirish.</p>

      {error && <p className="mt-4 text-sm text-error">{error}</p>}

      <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-4 rounded-lg border border-border-light p-6 md:grid-cols-2">
        <input
          placeholder="Id (slug, masalan: react-asoslari)"
          value={form.id}
          onChange={(e) => setForm({ ...form, id: e.target.value })}
          disabled={Boolean(editingId)}
          className="rounded-md border border-outline-variant px-3 py-2 text-sm"
        />
        <input
          placeholder="Kurs nomi"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="rounded-md border border-outline-variant px-3 py-2 text-sm"
        />
        <input
          placeholder="Subtitr"
          value={form.subtitle}
          onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
          className="rounded-md border border-outline-variant px-3 py-2 text-sm"
        />
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="rounded-md border border-outline-variant px-3 py-2 text-sm"
        >
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Dizayn">Dizayn</option>
          <option value="AI">AI</option>
        </select>
        <select
          value={form.level}
          onChange={(e) => setForm({ ...form, level: e.target.value })}
          className="rounded-md border border-outline-variant px-3 py-2 text-sm"
        >
          <option value="Beginner">Beginner</option>
          <option value="Junior">Junior</option>
          <option value="Middle">Middle</option>
        </select>
        <input
          placeholder="Narx ($)"
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="rounded-md border border-outline-variant px-3 py-2 text-sm"
        />
        <input
          placeholder="Eski narx ($) - ixtiyoriy"
          type="number"
          value={form.oldPrice}
          onChange={(e) => setForm({ ...form, oldPrice: e.target.value })}
          className="rounded-md border border-outline-variant px-3 py-2 text-sm"
        />
        <input
          placeholder="Davomiyligi (masalan: 10 soat)"
          value={form.duration}
          onChange={(e) => setForm({ ...form, duration: e.target.value })}
          className="rounded-md border border-outline-variant px-3 py-2 text-sm"
        />
        <input
          placeholder="O'qituvchi"
          value={form.instructor}
          onChange={(e) => setForm({ ...form, instructor: e.target.value })}
          className="rounded-md border border-outline-variant px-3 py-2 text-sm"
        />
        <input
          placeholder="Rasm havolasi (URL)"
          value={form.thumbnail}
          onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
          className="rounded-md border border-outline-variant px-3 py-2 text-sm md:col-span-2"
        />
        <textarea
          placeholder="Tavsif"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="rounded-md border border-outline-variant px-3 py-2 text-sm md:col-span-2"
          rows={3}
        />

        <div className="md:col-span-2">
          <h3 className="mb-2 text-sm font-semibold text-on-surface">Darslar</h3>
          <ul className="mb-3 space-y-1">
            {lessons.map((l) => (
              <li key={l.id} className="flex items-center justify-between rounded border border-outline-variant px-3 py-2 text-sm">
                <span>{l.title} ({l.duration})</span>
                <button type="button" onClick={() => removeLesson(l.id)} className="text-error">
                  O'chirish
                </button>
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            <input
              placeholder="Dars id (l1)"
              value={lessonForm.id}
              onChange={(e) => setLessonForm({ ...lessonForm, id: e.target.value })}
              className="rounded-md border border-outline-variant px-3 py-2 text-sm"
            />
            <input
              placeholder="Dars nomi"
              value={lessonForm.title}
              onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })}
              className="rounded-md border border-outline-variant px-3 py-2 text-sm"
            />
            <input
              placeholder="Davomiyligi (8:12)"
              value={lessonForm.duration}
              onChange={(e) => setLessonForm({ ...lessonForm, duration: e.target.value })}
              className="rounded-md border border-outline-variant px-3 py-2 text-sm"
            />
            <input
              placeholder="Video havola"
              value={lessonForm.videoUrl}
              onChange={(e) => setLessonForm({ ...lessonForm, videoUrl: e.target.value })}
              className="rounded-md border border-outline-variant px-3 py-2 text-sm"
            />
          </div>
          <button
            type="button"
            onClick={addLesson}
            className="mt-2 rounded-md border border-outline-variant px-3 py-2 text-sm font-medium hover:bg-surface-container"
          >
            + Dars qo'shish
          </button>
        </div>

        <div className="flex gap-3 md:col-span-2">
          <button type="submit" className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-on-primary hover:bg-primary/90">
            {editingId ? 'Kursni yangilash' : 'Kurs qo\'shish'}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="rounded-md border border-outline-variant px-5 py-2.5 text-sm font-medium">
              Bekor qilish
            </button>
          )}
        </div>
      </form>

      <h2 className="mt-10 mb-4 font-display text-xl font-semibold text-on-surface">Mavjud kurslar</h2>
      <ul className="divide-y divide-border-light rounded-lg border border-border-light">
        {courses.map((course) => (
          <li key={course.id} className="flex items-center justify-between px-4 py-3">
            <div>
              <p className="text-sm font-medium text-on-surface">{course.title}</p>
              <p className="text-xs text-on-surface-variant">{course.id} · {course.category} · ${course.price}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => startEdit(course)} className="rounded-md border border-outline-variant px-3 py-1.5 text-xs font-medium hover:bg-surface-container">
                Tahrirlash
              </button>
              <button onClick={() => handleDelete(course.id)} className="rounded-md border border-error px-3 py-1.5 text-xs font-medium text-error hover:bg-error-container">
                O'chirish
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
