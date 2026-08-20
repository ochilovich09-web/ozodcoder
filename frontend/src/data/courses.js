// Namuna kurslar ma'lumoti.
// Backend ulanganda bu fayl o'rniga src/api/courses.js orqali serverdan olinadi.

export const categories = ['Frontend', 'Backend', 'Dizayn', 'AI']

export const courses = [
  {
    id: 'react-tailwind',
    title: "React va Tailwind Maxorati",
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
    thumbnail:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop',
    description:
      "Zamonaviy frontend stekini o'zlashtiring. React va Tailwind CSS yordamida kuchli, moslashuvchan va yuqori interaktiv foydalanuvchi interfeyslarini yaratishni o'rganing.",
    lessons: [
      { id: 'l1', title: "Vite va React o'rnatish", duration: '8:12', videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk' },
      { id: 'l2', title: 'JSX va Komponentlar tushunchasi', duration: '14:40', videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk' },
      { id: 'l3', title: "Props va ma'lumot oqimi", duration: '11:05', videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk' },
      { id: 'l4', title: 'Holatni boshqarish (useState)', duration: '16:22', videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk' },
      { id: 'l5', title: 'Tailwind bilan uslublash', duration: '13:50', videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk' },
    ],
  },
  {
    id: 'nodejs-api',
    title: "Node.js bilan API Yaratish",
    subtitle: 'Backend',
    category: 'Backend',
    level: 'Middle',
    price: 45.0,
    rating: 4.6,
    ratingCount: 980,
    students: 8210,
    duration: '9 soat',
    instructor: 'Dilnoza Yusupova',
    thumbnail:
      'https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=800&auto=format&fit=crop',
    description:
      "Express va MongoDB yordamida kuchli, ko'ngildagidek RESTful API'lar yaratishni o'rganing.",
    lessons: [
      { id: 'l1', title: 'Express asoslari', duration: '10:00', videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk' },
      { id: 'l2', title: 'Route va Middleware', duration: '12:15', videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk' },
      { id: 'l3', title: 'MongoDB ulash', duration: '15:30', videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk' },
      { id: 'l4', title: 'JWT autentifikatsiya', duration: '18:45', videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk' },
    ],
  },
  {
    id: 'python-ml',
    title: "Ma'lumotlar ilmi uchun Python",
    subtitle: 'AI',
    category: 'AI',
    level: 'Beginner',
    price: 49.99,
    rating: 4.7,
    ratingCount: 1523,
    students: 20344,
    duration: '15 soat',
    instructor: 'Jasur Toshpulatov',
    thumbnail:
      'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=800&auto=format&fit=crop',
    description:
      "Ma'lumotlarni tahlil qilish va vizualizatsiya qilish uchun Python asoslarini o'rganing.",
    lessons: [
      { id: 'l1', title: 'Python sintaksisi', duration: '9:20', videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk' },
      { id: 'l2', title: 'NumPy va Pandas', duration: '17:10', videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk' },
      { id: 'l3', title: "Ma'lumotlar vizualizatsiyasi", duration: '13:00', videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk' },
    ],
  },
  {
    id: 'llm-ai',
    title: 'LLMlar bilan AI Dasturlash',
    subtitle: 'AI',
    category: 'AI',
    level: 'Middle',
    price: 89.99,
    rating: 4.9,
    ratingCount: 764,
    students: 5310,
    duration: '11 soat',
    instructor: 'Kamola Sultonova',
    thumbnail:
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop',
    description:
      "Katta til modellari (LLM) bilan dasturlar yaratish, prompt injenering va integratsiya usullarini o'zlashtiring.",
    lessons: [
      { id: 'l1', title: 'LLM asoslari', duration: '10:40', videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk' },
      { id: 'l2', title: 'API orqali integratsiya', duration: '14:05', videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk' },
    ],
  },
  {
    id: 'react-advanced-projects',
    title: 'Murakkab React Loyihalar',
    subtitle: 'Frontend',
    category: 'Frontend',
    level: 'Junior',
    price: 59.99,
    rating: 4.5,
    ratingCount: 612,
    students: 4200,
    duration: '10 soat',
    instructor: 'Aziz Karimov',
    thumbnail:
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=800&auto=format&fit=crop',
    description:
      "Real loyihalar orqali React'ni chuqur o'zlashtiring: hooks, kontekst va performance optimizatsiyasi.",
    lessons: [
      { id: 'l1', title: 'Custom Hooks yaratish', duration: '12:30', videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk' },
      { id: 'l2', title: 'Context API chuqur', duration: '15:00', videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk' },
      { id: 'l3', title: 'Performance optimizatsiya', duration: '18:20', videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk' },
    ],
  },
  {
    id: 'nodejs-jwt-auth',
    title: 'Node.js JWT Autentifikatsiya',
    subtitle: 'Backend',
    category: 'Backend',
    level: 'Junior',
    price: 45.0,
    rating: 4.4,
    ratingCount: 389,
    students: 3100,
    duration: '7 soat',
    instructor: 'Dilnoza Yusupova',
    thumbnail:
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    description:
      "Xavfsiz autentifikatsiya tizimlarini yaratishni JWT, bcrypt va best practice'lar orqali o'rganing.",
    lessons: [
      { id: 'l1', title: 'JWT nima?', duration: '8:00', videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk' },
      { id: 'l2', title: "Parolni shifrlash (bcrypt)", duration: '9:45', videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk' },
    ],
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Dizayn Asoslari',
    subtitle: 'Dizayn',
    category: 'Dizayn',
    level: 'Beginner',
    price: 39.99,
    rating: 4.6,
    ratingCount: 891,
    students: 6700,
    duration: '8 soat',
    instructor: 'Nilufar Rashidova',
    thumbnail:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop',
    description:
      "Figma yordamida foydalanuvchi tajribasi va interfeys dizaynining asosiy tamoyillarini o'rganing.",
    lessons: [
      { id: 'l1', title: 'Figma interfeysi', duration: '10:10', videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk' },
      { id: 'l2', title: 'Rang va tipografiya', duration: '11:35', videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk' },
      { id: 'l3', title: 'Wireframe yaratish', duration: '14:50', videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk' },
    ],
  },
  {
    id: 'design-systems',
    title: 'Dizayn Tizimlari (Design Systems)',
    subtitle: 'Dizayn',
    category: 'Dizayn',
    level: 'Middle',
    price: 54.99,
    rating: 4.7,
    ratingCount: 455,
    students: 2980,
    duration: '9.5 soat',
    instructor: 'Nilufar Rashidova',
    thumbnail:
      'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=800&auto=format&fit=crop',
    description:
      'Kompaniyalar uchun izchil va masshtablanuvchi dizayn tizimlarini qanday qurishni o\'rganing.',
    lessons: [
      { id: 'l1', title: 'Token va komponentlar', duration: '13:00', videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk' },
      { id: 'l2', title: 'Figma komponent kutubxonasi', duration: '16:40', videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk' },
    ],
  },
]

export function getCourseById(id) {
  return courses.find((c) => c.id === id)
}
