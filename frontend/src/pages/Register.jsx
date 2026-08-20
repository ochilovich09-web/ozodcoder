import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await register(form.name, form.email, form.password)
      navigate('/')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <h1 className="auth-title">Ro'yxatdan o'tish</h1>
      <p className="auth-subtitle">Yangi hisob yarating</p>

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="field-group">
          <label>Ism</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="field"
          />
        </div>
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
            minLength={6}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="field"
          />
        </div>

        {error && <p className="error-text">{error}</p>}

        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? 'Yaratilmoqda...' : "Ro'yxatdan o'tish"}
        </button>
      </form>

      <p className="auth-footer">
        Hisobingiz bormi?{' '}
        <Link to="/kirish" className="link-primary">
          Kirish
        </Link>
      </p>
    </div>
  )
}
