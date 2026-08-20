// Backend bilan aloqa qiluvchi funksiyalar.
// vite.config.js da /api so'rovlari avtomatik localhost:5000 ga proxy qilinadi.

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

export async function fetchCourses({ category, search } = {}) {
  const params = new URLSearchParams()
  if (category && category !== 'Barchasi') params.set('category', category)
  if (search) params.set('search', search)

  const res = await fetch(`${BASE}/courses?${params.toString()}`)
  return handleResponse(res)
}

export async function fetchCourseById(id) {
  const res = await fetch(`${BASE}/courses/${id}`)
  return handleResponse(res)
}

// --- Admin panel uchun ---

export async function createCourseApi(course) {
  const res = await fetch(`${BASE}/courses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(course),
  })
  return handleResponse(res)
}

export async function updateCourseApi(id, course) {
  const res = await fetch(`${BASE}/courses/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(course),
  })
  return handleResponse(res)
}

export async function deleteCourseApi(id) {
  const res = await fetch(`${BASE}/courses/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
  return handleResponse(res)
}
