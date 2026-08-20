import { useEffect, useState } from 'react'
import { courses as localCourses, categories } from '../data/courses'
import { fetchCourses } from '../api/courses'
import CourseCard from '../components/CourseCard'

export default function Courses() {
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

  const filtered = allCourses.filter((c) => {
    const matchesCategory = activeCategory === 'Barchasi' || c.category === activeCategory
    const matchesQuery = c.title.toLowerCase().includes(query.trim().toLowerCase())
    return matchesCategory && matchesQuery
  })

  return (
    <div className="mx-auto max-w-content px-4 py-12 md:px-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-on-surface">Barcha Kurslar</h1>
        <p className="mt-2 text-on-surface-variant">
          Kategoriya bo'yicha filtrlang yoki kurs nomi bo'yicha qidiring.
        </p>
        {!usingLiveData && (
          <p className="mt-2 text-xs text-warning-amber">
            ⚠ Backend serverga ulanilmadi — namuna ma'lumotlar ko'rsatilmoqda.
          </p>
        )}
      </div>

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {['Barchasi', ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                activeCategory === cat
                  ? 'bg-primary text-on-primary'
                  : 'border border-outline-variant text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Kurs nomini qidiring..."
            className="w-full rounded-md border border-outline-variant bg-surface-container-lowest px-4 py-2 text-sm focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-on-surface-variant">
          Hech qanday kurs topilmadi. Boshqa so'z bilan qidirib ko'ring.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  )
}
