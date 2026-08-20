import { useEffect, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { getCourseById as getLocalCourseById } from '../data/courses'
import { fetchCourseById } from '../api/courses'
import { useProgress } from '../context/ProgressContext'

export default function Lesson() {
  const { courseId, lessonId } = useParams()
  const [course, setCourse] = useState(() => getLocalCourseById(courseId))
  const [notFound, setNotFound] = useState(false)
  const { isLessonComplete, toggleLessonComplete, getCourseProgressPercent } = useProgress()

  useEffect(() => {
    setNotFound(false)
    fetchCourseById(courseId)
      .then((data) => setCourse(data))
      .catch(() => {
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

  const lessonIndex = course.lessons.findIndex((l) => l.id === lessonId)
  const lesson = course.lessons[lessonIndex]

  if (!lesson) return <Navigate to={`/kurslar/${course.id}`} replace />

  const prevLesson = course.lessons[lessonIndex - 1]
  const nextLesson = course.lessons[lessonIndex + 1]
  const completed = isLessonComplete(course.id, lesson.id)
  const percent = getCourseProgressPercent(course.id)

  return (
    <div className="mx-auto max-w-content px-4 py-8 md:px-8">
      <div className="mb-4 flex items-center justify-between text-sm">
        <Link to={`/kurslar/${course.id}`} className="text-primary hover:underline">
          ← {course.title}
        </Link>
        <span className="text-on-surface-variant">
          Dars {lessonIndex + 1} / {course.lessons.length} · {percent}% tugallandi
        </span>
      </div>

      <div className="overflow-hidden rounded-lg border border-border-light bg-black shadow-level2">
        <div className="aspect-video w-full">
          <iframe
            className="h-full w-full"
            src={lesson.videoUrl}
            title={lesson.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-xl font-semibold text-on-surface">{lesson.title}</h1>
          <p className="text-sm text-on-surface-variant">{lesson.duration}</p>
        </div>
        <button
          onClick={() => toggleLessonComplete(course.id, lesson.id)}
          className={`rounded-md px-5 py-2.5 text-sm font-semibold transition ${
            completed
              ? 'bg-success-emerald text-white'
              : 'border border-outline-variant text-on-surface hover:bg-surface-container'
          }`}
        >
          {completed ? '✓ Tugallandi' : "Tugallandi deb belgilash"}
        </button>
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-border-light pt-6">
        {prevLesson ? (
          <Link
            to={`/kurslar/${course.id}/darslar/${prevLesson.id}`}
            className="rounded-md border border-outline-variant px-4 py-2 text-sm font-medium text-on-surface hover:bg-surface-container"
          >
            ← Oldingi dars
          </Link>
        ) : (
          <span />
        )}
        {nextLesson ? (
          <Link
            to={`/kurslar/${course.id}/darslar/${nextLesson.id}`}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-on-primary hover:bg-primary/90"
          >
            Keyingi dars →
          </Link>
        ) : (
          <Link
            to={`/kurslar/${course.id}`}
            className="rounded-md bg-secondary px-4 py-2 text-sm font-medium text-on-secondary hover:bg-secondary/90"
          >
            Kursni yakunlash →
          </Link>
        )}
      </div>
    </div>
  )
}
