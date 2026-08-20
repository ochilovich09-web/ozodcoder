import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const navLinkClass = ({ isActive }) =>
  `text-sm font-medium transition-colors ${
    isActive ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
  }`

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 border-b border-border-light bg-surface/90 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between px-4 py-4 md:px-8">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold text-primary">
          <span className="flex h-8 w-8 items-center justify-center rounded bg-primary text-on-primary">
            O
          </span>
          OzodCoder
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <NavLink to="/kurslar" className={navLinkClass}>
            Kurslar
          </NavLink>
          <NavLink to="/" className={navLinkClass} end>
            Biz Haqimizda
          </NavLink>
          <NavLink to="/sevimlilar" className={navLinkClass}>
            Sevimlilar
          </NavLink>
          {isAuthenticated && user.role === 'admin' && (
            <NavLink to="/admin" className={navLinkClass}>
              Admin
            </NavLink>
          )}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-sm text-on-surface-variant">Salom, {user.name}</span>
              <button
                onClick={logout}
                className="rounded-md border border-outline-variant px-4 py-2 text-sm font-medium text-on-surface hover:bg-surface-container"
              >
                Chiqish
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/kirish"
                className="text-sm font-medium text-on-surface-variant hover:text-primary"
              >
                Kirish
              </Link>
              <Link
                to="/royxatdan-otish"
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-on-primary transition hover:bg-primary/90"
              >
                Boshlash
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menyuni ochish"
        >
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-border-light bg-surface px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            <NavLink to="/kurslar" className={navLinkClass} onClick={() => setOpen(false)}>
              Kurslar
            </NavLink>
            <NavLink to="/sevimlilar" className={navLinkClass} onClick={() => setOpen(false)}>
              Sevimlilar
            </NavLink>
            {isAuthenticated && user.role === 'admin' && (
              <NavLink to="/admin" className={navLinkClass} onClick={() => setOpen(false)}>
                Admin
              </NavLink>
            )}
            {isAuthenticated ? (
              <button onClick={logout} className="text-left text-sm font-medium text-on-surface">
                Chiqish ({user.name})
              </button>
            ) : (
              <>
                <Link to="/kirish" className="text-sm font-medium" onClick={() => setOpen(false)}>
                  Kirish
                </Link>
                <Link
                  to="/royxatdan-otish"
                  className="rounded-md bg-primary px-4 py-2 text-center text-sm font-medium text-on-primary"
                  onClick={() => setOpen(false)}
                >
                  Boshlash
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
