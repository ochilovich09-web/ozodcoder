import { useEffect, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { getCourseById as getLocalCourseById } from '../data/courses'
import { fetchCourseById } from '../api/courses'
import { useProgress } from '../context/ProgressContext'
import { useAuth } from '../context/AuthContext'
import { CheckIcon } from '../components/icons'
import { toEmbedUrl } from '../utils/youtube'

export default function Lesson() {
  const { courseId, lessonId } = useParams()
  const [course, setCourse] = useState(() => getLocalCourseById(courseId))
  const [notFound, setNotFound] = useState(false)
  const { isAuthenticated } = useAuth()
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
  if (!isAuthenticated) return <Navigate to="/royxatdan-otish" replace />
  if (!course) return null

  const lessonIndex = course.lessons.findIndex((l) => l.id === lessonId)
  const lesson = course.lessons[lessonIndex]

  if (!lesson) return <Navigate to={`/kurslar/${course.id}`} replace />

  const prevLesson = course.lessons[lessonIndex - 1]
  const nextLesson = course.lessons[lessonIndex + 1]
  const completed = isLessonComplete(course.id, lesson.id)
  const percent = getCourseProgressPercent(course.id, course.lessons.length)
  let completeButtonClass = 'btn-complete'
  if (completed) completeButtonClass = 'btn-complete btn-complete--done'

  return (
    <div className="container" style={{ paddingTop: 32, paddingBottom: 32 }}>
      <div className="lesson-top">
        <Link to={`/kurslar/${course.id}`} className="lesson-top__back">
          ← {course.title}
        </Link>
        <span className="text-muted">
          Dars {lessonIndex + 1} / {course.lessons.length} · {percent}% tugallandi
        </span>
      </div>

      <div className="lesson-player">
        <div className="lesson-player__frame">
          <iframe
            src={toEmbedUrl(lesson.videoUrl)}
            title={lesson.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>

      <div className="lesson-meta">
        <div>
          <h1 className="lesson-meta__title">{lesson.title}</h1>
          <p className="lesson-meta__duration">{lesson.duration}</p>
        </div>
        <button
          onClick={() => toggleLessonComplete(course.id, lesson.id)}
          className={completeButtonClass}
        >
          {completed && <CheckIcon />}
          {completed ? 'Tugallandi' : "Tugallandi deb belgilash"}
        </button>
      </div>

      <div className="lesson-nav">
        {prevLesson ? (
          <Link to={`/kurslar/${course.id}/darslar/${prevLesson.id}`} className="btn btn-outline">
            ← Oldingi dars
          </Link>
        ) : (
          <span />
        )}
        {nextLesson ? (
          <Link to={`/kurslar/${course.id}/darslar/${nextLesson.id}`} className="btn btn-primary">
            Keyingi dars →
          </Link>
        ) : (
          <Link to={`/kurslar/${course.id}`} className="btn btn-secondary">
            Kursni yakunlash →
          </Link>
        )}
      </div>
    </div>
  )
}
