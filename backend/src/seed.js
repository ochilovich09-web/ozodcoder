// Bazani namuna kurslar bilan to'ldirish uchun skript.
// Ishlatish: npm run seed
import 'dotenv/config'
import { connectDB } from './config/db.js'
import Course from './models/Course.js'
import mongoose from 'mongoose'

const courses = [
  {
    id: 'react-tailwind',
    title: 'React va Tailwind Maxorati',
    subtitle: 'Zamonaviy Veb Ilovalar Yaratish',
    category: 'Frontend',
    level: 'Middle',
    price: 89.99,
    oldPrice: 129.99,
    rating: 4.8,
    ratingCount: 2145,
    students: 15432,
    duration: '12.5 soat',
    instructor: 'Aziz Karimov',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop',
    description: "Zamonaviy frontend stekini o'zlashtiring. React va Tailwind CSS yordamida kuchli interfeyslar yarating.",
    lessons: [
      { id: 'l1', title: "Vite va React o'rnatish", duration: '8:12', videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk' },
      { id: 'l2', title: 'JSX va Komponentlar tushunchasi', duration: '14:40', videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk' },
      { id: 'l3', title: "Props va ma'lumot oqimi", duration: '11:05', videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk' },
    ],
  },
  {
    id: 'nodejs-api',
    title: 'Node.js bilan API Yaratish',
    category: 'Backend',
    level: 'Middle',
    price: 45.0,
    rating: 4.6,
    ratingCount: 980,
    students: 8210,
    duration: '9 soat',
    instructor: 'Dilnoza Yusupova',
    thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=800&auto=format&fit=crop',
    description: "Express va MongoDB yordamida RESTful API'lar yaratishni o'rganing.",
    lessons: [
      { id: 'l1', title: 'Express asoslari', duration: '10:00', videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk' },
      { id: 'l2', title: 'MongoDB ulash', duration: '15:30', videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk' },
    ],
  },
  {
    id: 'python-ml',
    title: "Ma'lumotlar ilmi uchun Python",
    category: 'AI',
    level: 'Beginner',
    price: 49.99,
    rating: 4.7,
    ratingCount: 1523,
    students: 20344,
    duration: '15 soat',
    instructor: 'Jasur Toshpulatov',
    thumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=800&auto=format&fit=crop',
    description: "Ma'lumotlarni tahlil qilish uchun Python asoslarini o'rganing.",
    lessons: [
      { id: 'l1', title: 'Python sintaksisi', duration: '9:20', videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk' },
      { id: 'l2', title: 'NumPy va Pandas', duration: '17:10', videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk' },
    ],
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Dizayn Asoslari',
    category: 'Dizayn',
    level: 'Beginner',
    price: 39.99,
    rating: 4.6,
    ratingCount: 891,
    students: 6700,
    duration: '8 soat',
    instructor: 'Nilufar Rashidova',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop',
    description: "Figma yordamida UI/UX dizaynining asosiy tamoyillarini o'rganing.",
    lessons: [
      { id: 'l1', title: 'Figma interfeysi', duration: '10:10', videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk' },
      { id: 'l2', title: 'Rang va tipografiya', duration: '11:35', videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk' },
    ],
  },
]

async function seed() {
  await connectDB()
  await Course.deleteMany({})
  await Course.insertMany(courses)
  console.log(`✅ ${courses.length} ta kurs bazaga qo'shildi`)
  await mongoose.disconnect()
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Seed xatoligi:', err)
  process.exit(1)
})
