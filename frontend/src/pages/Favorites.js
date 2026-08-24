import { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import { courses as localCourses } from '../data/courses'
import { fetchCourses } from '../api/courses'
import CourseCard from '../components/CourseCard'
import { useAuth } from '../context/AuthContext'

export default function Favorites() {
  const { isAuthenticated } = useAuth()
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

  if (!isAuthenticated) {
    return <Navigate to="/royxatdan-otish" replace />
  }

  return (
    <div className="container" style={{ paddingTop: 48, paddingBottom: 48 }}>
      <h1 className="page-title">Sevimli Kurslar</h1>
      <p className="page-subtitle">Siz belgilagan sevimli kurslar shu yerda.</p>

      {favoriteCourses.length === 0 ? (
        <div className="favorites-empty">
          <p className="text-muted">Hali sevimli kurslar yo'q.</p>
          <Link to="/kurslar" className="link-primary" style={{ marginTop: 12, display: 'inline-block' }}>
            Kurslarni ko'rish →
          </Link>
        </div>
      ) : (
        <div className="course-grid course-grid--3" style={{ marginTop: 32 }}>
          {favoriteCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  )
}
