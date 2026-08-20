// Progress va Favorites uchun backend so'rovlari.
// Har bir so'rov Authorization header orqali JWT token yuboradi.

const BASE = import.meta.env.VITE_API_URL || '/api'

function authHeaders() {
  const token = localStorage.getItem('ozodcoder_token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

async function handleResponse(res) {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.message || `So'rov xatoligi: ${res.status}`)
  }
  return res.json()
}

// --- Progress ---

export async function fetchProgress() {
  const res = await fetch(`${BASE}/progress`, { headers: authHeaders() })
  return handleResponse(res)
}

export async function toggleLessonProgress(courseId, lessonId) {
  const res = await fetch(`${BASE}/progress/toggle`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ courseId, lessonId }),
  })
  return handleResponse(res)
}

// --- Favorites ---

export async function fetchFavorites() {
  const res = await fetch(`${BASE}/favorites`, { headers: authHeaders() })
  return handleResponse(res)
}

export async function toggleFavoriteApi(courseId) {
  const res = await fetch(`${BASE}/favorites/toggle`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ courseId }),
  })
  return handleResponse(res)
}
