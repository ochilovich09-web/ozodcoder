import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import { useProgress } from '../context/ProgressContext'

export default function CourseCard({ course }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const { getCourseProgressPercent } = useProgress()
  const favorite = isFavorite(course.id)
  const percent = getCourseProgressPercent(course.id)

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-border-light bg-surface-container-lowest shadow-level1 transition hover:-translate-y-0.5 hover:border-primary hover:shadow-level2">
      <Link to={`/kurslar/${course.id}`} className="block">
        <div className="relative aspect-video w-full overflow-hidden bg-surface-container">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
          <span className="absolute right-2 top-2 rounded-full bg-surface-container-lowest/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-on-surface">
            {course.level}
          </span>
        </div>
      </Link>

      <button
        onClick={() => toggleFavorite(course.id)}
        aria-label="Sevimlilarga qo'shish"
        className="absolute left-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-surface-container-lowest/90 text-lg"
      >
        {favorite ? '❤️' : '🤍'}
      </button>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-xs font-semibold uppercase tracking-wide text-primary">
          {course.category}
        </span>
        <Link to={`/kurslar/${course.id}`}>
          <h3 className="font-display text-base font-semibold leading-snug text-on-surface hover:text-primary">
            {course.title}
          </h3>
        </Link>
        <p className="line-clamp-2 text-sm text-on-surface-variant">{course.description}</p>

        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="font-display text-lg font-bold text-primary">${course.price}</span>
          <Link
            to={`/kurslar/${course.id}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            Yozilish →
          </Link>
        </div>

        {percent > 0 && (
          <div className="pt-1">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-container-high">
              <div
                className="h-full rounded-full bg-secondary-container transition-all"
                style={{ width: `${percent}%` }}
              />
            </div>
            <span className="mt-1 block text-xs text-on-surface-variant">{percent}% tugallandi</span>
          </div>
        )}
      </div>
    </div>
  )
}
