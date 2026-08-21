# OzodCoder — Online Kurslar Sayti

OzodCoder o'quv markazi uchun bitiruv loyihasi sifatida qurilgan online ta'lim platformasi. Foydalanuvchi kurslarni ko'rishi, kategoriya bo'yicha filtrlashi, qidirishi, video darslarni tomosha qilishi, o'z progressini kuzatishi va kurslarni sevimlilarga qo'shishi mumkin. Admin kurslarni qo'shishi, tahrirlashi va o'chirishi mumkin.

## Jonli havolalar

- **Sayt:** https://ozodcoder.vercel.app
- **Backend API:** https://ozodcoder-production.up.railway.app/api/health

## Texnologiyalar

**Frontend:** React, React Router, hand-written CSS (CSS custom properties), Vite
**Backend:** Node.js, Express, MongoDB (Mongoose), JWT autentifikatsiya
**Deploy:** Vercel (frontend), Railway (backend), MongoDB Atlas (baza)

## Loyiha tuzilishi

```
ozodcoder/
├── frontend/          # React ilova (Vite)
│   └── src/
│       ├── pages/         # Bosh sahifa, Kurslar, Kurs tafsiloti, Dars, Sevimlilar, Kirish/Ro'yxat, Admin
│       ├── components/    # Navbar, Footer, CourseCard, icons
│       ├── context/       # Favorites, Progress, Auth (React Context)
│       ├── data/          # Namuna kurs ma'lumotlari (backend ulanmaguncha)
│       └── index.css      # Barcha uslub — dizayn tokenlari CSS custom property sifatida
└── backend/            # Express API
    └── src/
        ├── models/         # User, Course, Progress (Mongoose sxemalari)
        ├── routes/         # /api/auth, /api/courses, /api/progress, /api/favorites
        ├── controllers/    # Route logikasi
        └── middleware/     # JWT autentifikatsiya middleware
```

## O'rnatish va ishga tushirish

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# .env faylida MONGO_URI va JWT_SECRET ni sozlang
npm run seed      # bazaga namuna kurslarni qo'shadi
npm run dev       # http://localhost:5000
```

MongoDB lokal ishlashi kerak (yoki MongoDB Atlas'dan bepul cluster oling va MONGO_URI'ni shunga moslang).

### 2. Frontend

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
```

Frontend backend bilan ulangan (`src/api/courses.js`, `src/api/user.js`), lekin backend ishlamasa ham ishlashda davom etadi: `Courses`, `CourseDetail` va `Lesson` sahifalari avval backendga so'rov yuboradi, muvaffaqiyatsiz bo'lsa `src/data/courses.js` dagi namuna ma'lumotga qaytadi (fallback). `vite.config.js` da `/api` so'rovlari avtomatik `localhost:5000` ga proxy qilinadi.

Progress va Favorites context'lari ham xuddi shunday ishlaydi: tizimga kirilgan bo'lsa backendga (`/api/progress`, `/api/favorites`) yozadi, doim localStorage'ga ham zaxira saqlaydi.

Deploy qilingan holatda (masalan Vercel'da) `/api` proxy ishlamaydi, shuning uchun `frontend/.env` da `VITE_API_URL` ni backend'ning to'liq havolasiga o'rnating (masalan `VITE_API_URL=https://ozodcoder-production.up.railway.app/api`).

## Asosiy funksiyalar

- Bosh sahifa, mashhur kurslar, statistikalar
- Kurslar ro'yxati — kategoriya filtri (Frontend/Backend/Dizayn/AI) va nom bo'yicha qidiruv
- Kurs tafsiloti sahifasi — syllabus, o'qituvchi, reyting
- Video dars sahifasi — YouTube embed, oldingi/keyingi dars navigatsiyasi
- Progress kuzatish — har bir darsni "tugallandi" deb belgilash, foizli progress bar
- Sevimli kurslar — qo'shish/olib tashlash, alohida sahifada ko'rish
- Ro'yxatdan o'tish / Kirish — JWT autentifikatsiya (backend)
- Admin panel (`/admin`) — faqat `role: "admin"` bo'lgan foydalanuvchiga ko'rinadi, kurs qo'shish/tahrirlash/o'chirish
- To'liq responsive dizayn (mobil va desktop)

## Admin huquqini berish

Yangi ro'yxatdan o'tgan foydalanuvchi standart holatda `student` bo'ladi. Kimnidir admin qilish uchun MongoDB Atlas'da (Database → Browse Collections → `users`) shu foydalanuvchi hujjatini tahrirlab, `role` maydonini `"student"` dan `"admin"` ga o'zgartiring, so'ng saytda qayta login qiling (yangi token admin huquqini o'z ichiga oladi).

## Muallif eslatmasi

Ushbu loyiha "Academic Precision" dizayn tizimi (`design-reference/DESIGN.md`) asosida qurilgan — ranglar, tipografiya va shakllar shu spetsifikatsiyaga mos, `frontend/src/index.css` da CSS custom property sifatida yozilgan.
