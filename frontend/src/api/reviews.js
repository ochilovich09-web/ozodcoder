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

export async function fetchReviews(courseId) {
  const res = await fetch(`${BASE}/reviews/${courseId}`)
  return handleResponse(res)
}

export async function submitReview(courseId, rating, comment) {
  const res = await fetch(`${BASE}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ courseId, rating, comment }),
  })
  return handleResponse(res)
}

export async function deleteReview(courseId) {
  const res = await fetch(`${BASE}/reviews/${courseId}`, {
    method: 'DELETE',
    headers: authHeaders(),
  })
  return handleResponse(res)
}
