import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-content flex-col items-center px-4 py-24 text-center">
      <h1 className="font-display text-5xl font-bold text-primary">404</h1>
      <p className="mt-3 text-on-surface-variant">Bu sahifa topilmadi.</p>
      <Link to="/" className="mt-6 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-on-primary">
        Bosh sahifaga qaytish
      </Link>
    </div>
  )
}
