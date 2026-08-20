import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import { courses as localCourses } from '../data/courses'
import { fetchCourses } from '../api/courses'
import CourseCard from '../components/CourseCard'

export default function Favorites() {
  const { favorites } = useFavorites()
  const [allCourses, setAllCourses] = useState(localCourses)

  // Boshqa sahifalar kabi avval backenddan urinamiz, aks holda namuna ma'lumot bilan qolamiz
  useEffect(() => {
    fetchCourses()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setAllCourses(data)
        }
      })
      .catch(() => {
        // Backend mavjud emas - namuna ma'lumot bilan davom etamiz
      })
  }, [])

  const favoriteCourses = allCourses.filter((c) => favorites.includes(c.id))

  return (
    <div className="mx-auto max-w-content px-4 py-12 md:px-8">
      <h1 className="font-display text-3xl font-bold text-on-surface">Sevimli Kurslar</h1>
      <p className="mt-2 text-on-surface-variant">Siz belgilagan sevimli kurslar shu yerda.</p>

      {favoriteCourses.length === 0 ? (
        <div className="mt-10 rounded-lg border border-dashed border-outline-variant py-16 text-center">
          <p className="text-on-surface-variant">Hali sevimli kurslar yo'q.</p>
          <Link to="/kurslar" className="mt-3 inline-block text-sm font-medium text-primary hover:underline">
            Kurslarni ko'rish →
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favoriteCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  )
}
