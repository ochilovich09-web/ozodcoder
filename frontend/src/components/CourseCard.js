import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import { useProgress } from '../context/ProgressContext'
import { HeartIcon, StarIcon } from './icons'

export default function CourseCard({ course }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const { getCourseProgressPercent } = useProgress()
  const favorite = isFavorite(course.id)
  const percent = getCourseProgressPercent(course.id, course.lessons.length)

  return (
    <div className="course-card">
      <Link to={`/kurslar/${course.id}`}>
        <div className="course-card__thumb">
          <img src={course.thumbnail} alt={course.title} />
          <span className="course-card__level">{course.level}</span>
        </div>
      </Link>

      <button
        onClick={() => toggleFavorite(course.id)}
        aria-label="Sevimlilarga qo'shish"
        className={`course-card__favorite ${favorite ? 'course-card__favorite--active' : ''}`}
      >
        <HeartIcon filled={favorite} />
      </button>

      <div className="course-card__body">
        <span className="course-card__category">{course.category}</span>
        <Link to={`/kurslar/${course.id}`}>
          <h3 className="course-card__title">{course.title}</h3>
        </Link>
        {course.rating > 0 && (
          <div className="course-card__rating">
            <StarIcon style={{ color: 'var(--color-warning)' }} />
            <span style={{ fontWeight: 500, color: 'var(--color-on-surface)' }}>{course.rating}</span>
            <span>({course.ratingCount})</span>
          </div>
        )}
        <p className="course-card__desc">{course.description}</p>

        <div className="course-card__footer">
          <span className="course-card__price">${course.price}</span>
          <Link to={`/kurslar/${course.id}`} className="course-card__link">
            Yozilish →
          </Link>
        </div>

        {percent > 0 && (
          <div style={{ paddingTop: 4 }}>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${percent}%` }} />
            </div>
            <span className="progress-label">{percent}% tugallandi</span>
          </div>
        )}
      </div>
    </div>
  )
}
