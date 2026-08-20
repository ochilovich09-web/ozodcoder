import { Link } from 'react-router-dom'
import { courses } from '../data/courses'
import CourseCard from '../components/CourseCard'

const stats = [
  { value: '10k+', label: 'Faol Talabalar' },
  { value: '50+', label: "Ekspert O'qituvchilar" },
  { value: '200+', label: 'Video Darslar' },
  { value: '4.9', label: "O'rtacha Baho" },
]

const whyUs = [
  {
    title: "Ekspert O'qituvchilar",
    text: "Haqiqiy sanoat tajribasiga ega mutaxassislardan to'g'ridan-to'g'ri o'rganing.",
  },
  {
    title: 'Amaliy Kirish',
    text: "Bir marta to'lov va konteyngga abadiy ega bo'ling, xohlagan vaqtda qayta ko'ring.",
  },
  {
    title: 'Amaliy Loyihalar',
    text: "Nazariyani tashqariga chiqing, portfelingizni mustahkam funksional loyihalar bilan to'ldiring.",
  },
]

export default function Home() {
  const featured = courses[0]
  const popular = courses.slice(0, 4)

  return (
    <div>
      {/* Hero */}
      <section className="bg-background-subtle">
        <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-8 md:py-24">
          <div>
            <span className="mb-4 inline-block rounded-full bg-primary-container/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
              Yangi kurslar qo'shildi
            </span>
            <h1 className="font-display text-4xl font-bold leading-tight text-on-surface md:text-5xl">
              OzodCoder bilan <span className="text-primary">Texnologiyalar</span> Kelajagini
              O'zlashtiring
            </h1>
            <p className="mt-4 max-w-md text-base text-on-surface-variant">
              Sanoatning yetakchi onlayn kurslari bilan malakangizni oshiring. Haqiqiy loyihalar
              yaratib, mutaxassislardan o'rganing va kompaniyalar qidirayotgan dasturchiga
              aylaning.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/kurslar"
                className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-on-primary transition hover:bg-primary/90"
              >
                Boshlash →
              </Link>
              <Link
                to={`/kurslar/${featured.id}`}
                className="rounded-md border border-outline-variant bg-surface-container-lowest px-6 py-3 text-sm font-semibold text-on-surface transition hover:bg-surface-container"
              >
                Dasturni Ko'rish
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg shadow-level2">
            <img
              src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1000&auto=format&fit=crop"
              alt="O'quvchi kompyuterda dars ko'rmoqda"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border-light bg-surface-container-lowest">
        <div className="mx-auto grid max-w-content grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4 md:px-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-2xl font-bold text-primary md:text-3xl">
                {s.value}
              </div>
              <div className="mt-1 text-sm text-on-surface-variant">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Popular courses */}
      <section className="mx-auto max-w-content px-4 py-16 md:px-8">
        <div className="mb-8 text-center">
          <h2 className="font-display text-3xl font-bold text-on-surface">
            O'quv Dasturini O'rganing
          </h2>
          <p className="mt-2 text-on-surface-variant">
            Sanoatning yetakchi kurslari bilan zamonaviy dasturiy ta'minot ishlab chiqishni
            o'zlashtiring.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {popular.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/kurslar"
            className="rounded-md border border-outline-variant px-6 py-3 text-sm font-semibold text-on-surface hover:bg-surface-container"
          >
            Barcha kurslarni ko'rish →
          </Link>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-surface-container-low">
        <div className="mx-auto max-w-content px-4 py-16 text-center md:px-8">
          <h2 className="font-display text-3xl font-bold text-on-surface">
            Nima uchun OzodCoder ni tanlash kerak?
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {whyUs.map((item) => (
              <div key={item.title} className="rounded-lg bg-surface-container-lowest p-6 shadow-level1">
                <h3 className="font-display text-lg font-semibold text-on-surface">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-on-surface-variant">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-background-subtle">
        <div className="mx-auto max-w-content px-4 py-16 text-center md:px-8">
          <h2 className="font-display text-2xl font-bold text-on-surface md:text-3xl">
            Dasturlash sayohatingizni bugun boshlang
          </h2>
          <p className="mx-auto mt-2 max-w-md text-on-surface-variant">
            10,000+ dasturchiga qo'shiling va o'z martabangizni keyingi bosqichga olib chiqing.
          </p>
          <Link
            to="/kurslar"
            className="mt-6 inline-block rounded-md bg-primary px-6 py-3 text-sm font-semibold text-on-primary hover:bg-primary/90"
          >
            Kurslarni Ko'rish
          </Link>
        </div>
      </section>
    </div>
  )
}
