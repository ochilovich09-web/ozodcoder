# OzodCoder — Online Kurslar Sayti

OzodCoder o'quv markazi uchun bitiruv loyihasi sifatida qurilgan online ta'lim platformasi. Foydalanuvchi kurslarni ko'rishi, kategoriya bo'yicha filtrlashi, qidirishi, video darslarni tomosha qilishi, o'z progressini kuzatishi va kurslarni sevimlilarga qo'shishi mumkin.

## Texnologiyalar

**Frontend:** React, React Router, Tailwind CSS, Vite
**Backend:** Node.js, Express, MongoDB (Mongoose), JWT autentifikatsiya

## Loyiha tuzilishi

```
ozodcoder/
├── frontend/          # React ilova (Vite)
│   └── src/
│       ├── pages/         # Bosh sahifa, Kurslar, Kurs tafsiloti, Dars, Sevimlilar, Kirish/Ro'yxat
│       ├── components/    # Navbar, Footer, CourseCard
│       ├── context/       # Favorites, Progress, Auth (React Context)
│       └── data/          # Namuna kurs ma'lumotlari (backend ulanmaguncha)
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

## Asosiy funksiyalar

- Bosh sahifa, mashhur kurslar, statistikalar
- Kurslar ro'yxati — kategoriya filtri (Frontend/Backend/Dizayn/AI) va nom bo'yicha qidiruv
- Kurs tafsiloti sahifasi — syllabus, o'qituvchi, reyting
- Video dars sahifasi — YouTube embed, oldingi/keyingi dars navigatsiyasi
- Progress kuzatish — har bir darsni "tugallandi" deb belgilash, foizli progress bar
- Sevimli kurslar — qo'shish/olib tashlash, alohida sahifada ko'rish
- Ro'yxatdan o'tish / Kirish — JWT autentifikatsiya (backend)
- To'liq responsive dizayn (mobil va desktop)

## Muallif eslatmasi

Ushbu loyiha "Academic Precision" dizayn tizimi (`stitch_aesthetic_style_generator` papkasidagi DESIGN.md) asosida qurilgan — ranglar, tipografiya va shakllar shu spetsifikatsiyaga mos.

**Keyingi qadamlar (o'zingiz qo'shishingiz kerak bo'lgan qismlar):**
- Admin panel UI (backend'da admin route'lar tayyor: POST/PUT/DELETE `/api/courses`, lekin frontend'da sahifa yo'q — buni o'zingiz yozing, bu ham "mustaqil qism" talabiga mos keladi)
- `npm install` qilib, ikkala serverni ham ishga tushirib real test qiling — men tarmoqqa ulanmagan muhitda ishlaganim uchun kodni faqat sintaksis jihatdan tekshira oldim, browser'da hali sinalmagan
- MongoDB Atlas yoki lokal Mongo o'rnatib, `npm run seed` ni ishlatib ko'ring
- Taqdimotga tayyorlanishda har bir context (`AuthContext`, `FavoritesContext`, `ProgressContext`) qanday ishlashini o'zingizga tushuntirib ko'ring — bu haqda savol berishlari mumkin
