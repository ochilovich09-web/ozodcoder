import { useEffect, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { getCourseById as getLocalCourseById } from '../data/courses'
import { fetchCourseById } from '../api/courses'
import { useFavorites } from '../context/FavoritesContext'
import { useProgress } from '../context/ProgressContext'
import { StarIcon, UsersIcon, ClockIcon, TeacherIcon, HeartIcon, VideoIcon, InfinityIcon, CheckIcon } from '../components/icons'

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

  const percent = getCourseProgressPercent(course.id, course.lessons.length)
  const favorite = isFavorite(course.id)
  const firstLesson = course.lessons[0]

  return (
    <div className="container detail-grid">
      <div>
        <span className="detail-eyebrow">
          {course.category} · {course.level}
        </span>
        <h1 className="detail-title">{course.title}</h1>
        <p className="detail-desc">{course.description}</p>

        <div className="detail-meta">
          <span className="detail-meta__item"><StarIcon style={{ color: 'var(--color-warning)' }} /> {course.rating} ({course.ratingCount} baholar)</span>
          <span className="detail-meta__item"><UsersIcon /> {course.students.toLocaleString()} o'quvchi</span>
          <span className="detail-meta__item"><ClockIcon /> {course.duration}</span>
          <span className="detail-meta__item"><TeacherIcon /> {course.instructor}</span>
        </div>

        <div className="detail-image">
          <img src={course.thumbnail} alt={course.title} />
        </div>

        {percent > 0 && (
          <div className="detail-progress">
            <div className="detail-progress__row">
              <span style={{ fontWeight: 500 }}>Progress</span>
              <span className="text-muted">{percent}%</span>
            </div>
            <div className="progress-track progress-track--lg">
              <div className="progress-fill" style={{ width: `${percent}%` }} />
            </div>
          </div>
        )}

        <div className="syllabus">
          <h2 className="syllabus__title">Syllabus</h2>
          <ul className="syllabus__list">
            {course.lessons.map((lesson, idx) => (
              <li key={lesson.id}>
                <Link to={`/kurslar/${course.id}/darslar/${lesson.id}`} className="syllabus__link">
                  <span className="syllabus__left">
                    <span className={`syllabus__index ${isLessonComplete(course.id, lesson.id) ? 'syllabus__index--done' : ''}`}>
                      {isLessonComplete(course.id, lesson.id) ? <CheckIcon /> : idx + 1}
                    </span>
                    <span className="syllabus__title-text">{lesson.title}</span>
                  </span>
                  <span className="syllabus__duration">{lesson.duration}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <aside className="detail-aside">
        <div className="detail-price">
          <span className="detail-price__current">${course.price}</span>
          {course.oldPrice && <span className="detail-price__old">${course.oldPrice}</span>}
        </div>
        {firstLesson ? (
          <Link to={`/kurslar/${course.id}/darslar/${firstLesson.id}`} className="btn btn-primary btn-block" style={{ marginTop: 16 }}>
            Hozir Yozilish
          </Link>
        ) : (
          <p className="detail-empty-lessons">Darslar hali qo'shilmagan</p>
        )}
        <button
          onClick={() => toggleFavorite(course.id)}
          className="btn btn-outline btn-block"
          style={{ marginTop: 12, color: favorite ? 'var(--color-error)' : undefined }}
        >
          <HeartIcon filled={favorite} />
          {favorite ? 'Sevimlilarda' : "Sevimlilarga qo'shish"}
        </button>

        <ul className="detail-facts">
          <li><VideoIcon /> {course.lessons.length} ta video dars</li>
          <li><ClockIcon /> Jami {course.duration}</li>
          <li><InfinityIcon /> To'liq umrbod kirish huquqi</li>
        </ul>
      </aside>
    </div>
  )
}
