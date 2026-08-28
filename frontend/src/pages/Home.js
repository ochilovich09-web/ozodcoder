import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { courses as localCourses } from '../data/courses'
import { fetchCourses } from '../api/courses'
import CourseCard from '../components/CourseCard'
import Reveal from '../components/Reveal'
import { useAuth } from '../context/AuthContext'
import { useProgress } from '../context/ProgressContext'
import { SparkleIcon, BadgeIcon, UnlockIcon, CodeIcon } from '../components/icons'

const stats = [
  { value: '10k+', label: 'Faol Talabalar' },
  { value: '50+', label: "Ekspert O'qituvchilar" },
  { value: '200+', label: 'Video Darslar' },
  { value: '4.9', label: "O'rtacha Baho" },
]

const whyUs = [
  {
    icon: BadgeIcon,
    title: "Ekspert O'qituvchilar",
    text: "Haqiqiy sanoat tajribasiga ega mutaxassislardan to'g'ridan-to'g'ri o'rganing.",
  },
  {
    icon: UnlockIcon,
    title: 'Amaliy Kirish',
    text: "Bir marta to'lov va konteyngga abadiy ega bo'ling, xohlagan vaqtda qayta ko'ring.",
  },
  {
    icon: CodeIcon,
    title: 'Amaliy Loyihalar',
    text: "Nazariyani tashqariga chiqing, portfelingizni mustahkam funksional loyihalar bilan to'ldiring.",
  },
]

export default function Home() {
  const { isAuthenticated } = useAuth()
  const { getCourseProgressPercent } = useProgress()
  const [allCourses, setAllCourses] = useState(localCourses)

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

  const featured = allCourses[0]
  const popular = allCourses.slice(0, 4)

  const continueLearning = []
  for (const course of allCourses) {
    const percent = getCourseProgressPercent(course.id, course.lessons.length)
    if (percent > 0 && percent < 100) {
      continueLearning.push({ ...course, percent })
    }
  }

  return (
    <div>
      {/* Hero */}
      <section className="hero">
        <div aria-hidden className="hero__dot-grid" />
        <div className="container hero__grid">
          <div>
            <span className="hero__badge">
              <SparkleIcon /> Yangi kurslar qo'shildi
            </span>
            <h1 className="hero__title">
              OzodCoder bilan <span className="hero__title-accent">Texnologiyalar</span> Kelajagini
              O'zlashtiring
            </h1>
            <p className="hero__text">
              Sanoatning yetakchi onlayn kurslari bilan malakangizni oshiring. Haqiqiy loyihalar
              yaratib, mutaxassislardan o'rganing va kompaniyalar qidirayotgan dasturchiga
              aylaning.
            </p>
            <div className="hero__actions">
              <Link to="/kurslar" className="btn btn-primary">
                Boshlash →
              </Link>
              <Link to={`/kurslar/${featured.id}`} className="btn btn-outline">
                Dasturni Ko'rish
              </Link>
            </div>
          </div>
          <div className="hero__image-frame">
            <img
              src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1000&auto=format&fit=crop"
              alt="O'quvchi kompyuterda dars ko'rmoqda"
            />
            <div className="hero__image-shade" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats">
        <div className="container stats__grid">
          {stats.map((s) => (
            <div key={s.label} className="stats__item">
              <div className="stats__value">{s.value}</div>
              <div className="stats__label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Continue learning */}
      {isAuthenticated && continueLearning.length > 0 && (
        <section className="section container">
          <Reveal>
            <div className="section-header">
              <h2 className="section-title">Davom eting</h2>
              <p className="section-subtitle">Boshlagan kurslaringizni yakunlab qo'ying.</p>
            </div>
          </Reveal>

          <div className="course-grid course-grid--4">
            {continueLearning.slice(0, 4).map((course, idx) => (
              <Reveal key={course.id} delay={idx * 90}>
                <CourseCard course={course} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Popular courses */}
      <section className="section container">
        <Reveal>
          <div className="section-header">
            <h2 className="section-title">O'quv Dasturini O'rganing</h2>
            <p className="section-subtitle">
              Sanoatning yetakchi kurslari bilan zamonaviy dasturiy ta'minot ishlab chiqishni
              o'zlashtiring.
            </p>
          </div>
        </Reveal>

        <div className="course-grid course-grid--4">
          {popular.map((course, idx) => (
            <Reveal key={course.id} delay={idx * 90}>
              <CourseCard course={course} />
            </Reveal>
          ))}
        </div>

        <div className="section-footer">
          <Link to="/kurslar" className="btn btn-outline">
            Barcha kurslarni ko'rish →
          </Link>
        </div>
      </section>

      {/* Why us */}
      <section className="section--tint">
        <div className="container section" style={{ textAlign: 'center' }}>
          <Reveal>
            <h2 className="section-title">Nima uchun OzodCoder ni tanlash kerak?</h2>
          </Reveal>
          <div className="why-grid">
            {whyUs.map((item, idx) => (
              <Reveal key={item.title} delay={idx * 90}>
                <div
                  className="why-card glow-card"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect()
                    e.currentTarget.style.setProperty('--glow-x', `${e.clientX - rect.left}px`)
                    e.currentTarget.style.setProperty('--glow-y', `${e.clientY - rect.top}px`)
                  }}
                >
                  <div className="why-card__icon">
                    <item.icon />
                  </div>
                  <h3 className="why-card__title">{item.title}</h3>
                  <p className="why-card__text">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="hero">
        <Reveal className="container section" style={{ textAlign: 'center' }}>
          <h2 className="section-title">Dasturlash sayohatingizni bugun boshlang</h2>
          <p className="section-subtitle" style={{ maxWidth: '28rem', margin: '8px auto 0' }}>
            10,000+ dasturchiga qo'shiling va o'z martabangizni keyingi bosqichga olib chiqing.
          </p>
          <Link to="/kurslar" className="btn btn-primary" style={{ marginTop: 24, display: 'inline-flex' }}>
            Kurslarni Ko'rish
          </Link>
        </Reveal>
      </section>
    </div>
  )
}
