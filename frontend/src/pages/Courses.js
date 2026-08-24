import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { courses as localCourses, categories as baseCategories } from '../data/courses'
import { fetchCourses } from '../api/courses'
import CourseCard from '../components/CourseCard'
import { WarningIcon } from '../components/icons'
import { useAuth } from '../context/AuthContext'

export default function Courses() {
  const { isAuthenticated } = useAuth()
  const [activeCategory, setActiveCategory] = useState('Barchasi')
  const [query, setQuery] = useState('')
  const [allCourses, setAllCourses] = useState(localCourses)
  const [usingLiveData, setUsingLiveData] = useState(false)

  useEffect(() => {
    fetchCourses()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setAllCourses(data)
          setUsingLiveData(true)
        }
      })
      .catch(() => {
        // Backend mavjud emas - namuna ma'lumot bilan davom etamiz
      })
  }, [])

  if (!isAuthenticated) {
    return <Navigate to="/royxatdan-otish" replace />
  }

  const filtered = allCourses.filter((c) => {
    const matchesCategory = activeCategory === 'Barchasi' || c.category === activeCategory
    const matchesQuery = c.title.toLowerCase().includes(query.trim().toLowerCase())
    return matchesCategory && matchesQuery
  })

  const categories = [...baseCategories]
  for (const course of allCourses) {
    if (!categories.includes(course.category)) {
      categories.push(course.category)
    }
  }

  return (
    <div className="container" style={{ paddingTop: 48, paddingBottom: 48 }}>
      <div className="page-header">
        <h1 className="page-title">Barcha Kurslar</h1>
        <p className="page-subtitle">Kategoriya bo'yicha filtrlang yoki kurs nomi bo'yicha qidiring.</p>
        {!usingLiveData && (
          <p className="notice">
            <WarningIcon /> Backend serverga ulanilmadi — namuna ma'lumotlar ko'rsatilmoqda.
          </p>
        )}
      </div>

      <div className="filters">
        <div className="filters__chips">
          {['Barchasi', ...categories].map((cat) => {
            let chipClass = 'chip'
            if (activeCategory === cat) chipClass = 'chip chip--active'
            return (
              <button key={cat} onClick={() => setActiveCategory(cat)} className={chipClass}>
                {cat}
              </button>
            )
          })}
        </div>

        <div className="search-input">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Kurs nomini qidiring..."
            className="field"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="empty-state">Hech qanday kurs topilmadi. Boshqa so'z bilan qidirib ko'ring.</p>
      ) : (
        <div className="course-grid course-grid--3">
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  )
}
