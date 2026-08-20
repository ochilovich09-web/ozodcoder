import { useEffect, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { getCourseById as getLocalCourseById } from '../data/courses'
import { fetchCourseById } from '../api/courses'
import { useFavorites } from '../context/FavoritesContext'
import { useProgress } from '../context/ProgressContext'

export default function CourseDetail() {
  const { courseId } = useParams()
  const [course, setCourse] = useState(() => getLocalCourseById(courseId))
  const [notFound, setNotFound] = useState(false)
  const { isFavorite, toggleFavorite } = useFavorites()
  const { isLessonComplete, getCourseProgressPercent } = useProgress()

  useEffect(() => {
    setNotFound(false)
    fetchCourseById(courseId)
      .then((data) => setCourse(data))
      .catch(() => {
        // Backend'da topilmasa, mahalliy namuna ma'lumotga tayanamiz
        const local = getLocalCourseById(courseId)
        if (local) {
          setCourse(local)
        } else {
          setNotFound(true)
        }
      })
  }, [courseId])

  if (notFound) return <Navigate to="/kurslar" replace />
  if (!course) return null

  const percent = getCourseProgressPercent(course.id)
  const favorite = isFavorite(course.id)
  const firstLesson = course.lessons[0]

  return (
    <div className="mx-auto max-w-content px-4 py-10 md:px-8">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-primary">
            {course.category} · {course.level}
          </span>
          <h1 className="mt-2 font-display text-3xl font-bold text-on-surface md:text-4xl">
            {course.title}
          </h1>
          <p className="mt-3 text-on-surface-variant">{course.description}</p>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-on-surface-variant">
            <span>⭐ {course.rating} ({course.ratingCount} baholar)</span>
            <span>👥 {course.students.toLocaleString()} o'quvchi</span>
            <span>⏱ {course.duration}</span>
            <span>🧑‍🏫 {course.instructor}</span>
          </div>

          <div className="mt-8 overflow-hidden rounded-lg border border-border-light">
            <img src={course.thumbnail} alt={course.title} className="aspect-video w-full object-cover" />
          </div>

          {percent > 0 && (
            <div className="mt-6">
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-medium text-on-surface">Progress</span>
                <span className="text-on-surface-variant">{percent}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-high">
                <div
                  className="h-full rounded-full bg-secondary-container transition-all"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          )}

          <div className="mt-10">
            <h2 className="mb-4 font-display text-xl font-semibold text-on-surface">Syllabus</h2>
            <ul className="divide-y divide-border-light rounded-lg border border-border-light">
              {course.lessons.map((lesson, idx) => (
                <li key={lesson.id}>
                  <Link
                    to={`/kurslar/${course.id}/darslar/${lesson.id}`}
                    className="flex items-center justify-between px-4 py-3 hover:bg-surface-container-low"
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                          isLessonComplete(course.id, lesson.id)
                            ? 'bg-success-emerald text-white'
                            : 'bg-surface-container-high text-on-surface-variant'
                        }`}
                      >
                        {isLessonComplete(course.id, lesson.id) ? '✓' : idx + 1}
                      </span>
                      <span className="text-sm font-medium text-on-surface">{lesson.title}</span>
                    </span>
                    <span className="text-xs text-on-surface-variant">{lesson.duration}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="h-fit rounded-lg border border-border-light bg-surface-container-lowest p-6 shadow-level1">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl font-bold text-primary">${course.price}</span>
            {course.oldPrice && (
              <span className="text-sm text-on-surface-variant line-through">
                ${course.oldPrice}
              </span>
            )}
          </div>
          {firstLesson ? (
            <Link
              to={`/kurslar/${course.id}/darslar/${firstLesson.id}`}
              className="mt-4 block rounded-md bg-primary px-4 py-3 text-center text-sm font-semibold text-on-primary hover:bg-primary/90"
            >
              Hozir Yozilish
            </Link>
          ) : (
            <p className="mt-4 rounded-md border border-outline-variant px-4 py-3 text-center text-sm text-on-surface-variant">
              Darslar hali qo'shilmagan
            </p>
          )}
          <button
            onClick={() => toggleFavorite(course.id)}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-md border border-outline-variant px-4 py-3 text-sm font-semibold text-on-surface hover:bg-surface-container"
          >
            {favorite ? '❤️ Sevimlilarda' : '🤍 Sevimlilarga qo\'shish'}
          </button>

          <ul className="mt-6 space-y-2 text-sm text-on-surface-variant">
            <li>📹 {course.lessons.length} ta video dars</li>
            <li>⏱ Jami {course.duration}</li>
            <li>♾ To'liq umrbod kirish huquqi</li>
          </ul>
        </aside>
      </div>
    </div>
  )
}
