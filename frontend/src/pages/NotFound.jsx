import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="not-found">
      <h1 className="not-found__code">404</h1>
      <p className="not-found__text">Bu sahifa topilmadi.</p>
      <Link to="/" className="btn btn-primary" style={{ marginTop: 24 }}>
        Bosh sahifaga qaytish
      </Link>
    </div>
  )
}
