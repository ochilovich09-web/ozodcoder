import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form.email, form.password)
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <h1 className="auth-title">Kirish</h1>
      <p className="auth-subtitle">Hisobingizga kiring</p>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="field-group">
          <label>Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="field"
          />
        </div>
        <div className="field-group">
          <label>Parol</label>
          <input
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="field"
          />
        </div>

        {error && <p className="error-text">{error}</p>}

        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? 'Kirilmoqda...' : 'Kirish'}
        </button>
      </form>

      <p className="auth-footer">
        Hisobingiz yo'qmi?{' '}
        <Link to="/royxatdan-otish" className="link-primary">
          Ro'yxatdan o'ting
        </Link>
      </p>
    </div>
  )
}
