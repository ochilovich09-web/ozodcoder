import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

function navLinkClass({ isActive }) {
  if (isActive) return 'nav-link nav-link--active'
  return 'nav-link'
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <header className="navbar">
      <div className="container navbar__row">
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-mark">&gt;_</span>
          OzodCoder
        </Link>

        <nav className="navbar__nav">
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

        <div className="navbar__actions">
          {isAuthenticated ? (
            <div className="navbar__user">
              <span className="navbar__greeting">Salom, {user.name}</span>
              <button onClick={logout} className="btn btn-outline btn-sm">
                Chiqish
              </button>
            </div>
          ) : (
            <>
              <Link to="/kirish" className="nav-link">
                Kirish
              </Link>
              <Link to="/royxatdan-otish" className="btn btn-primary btn-sm">
                Boshlash
              </Link>
            </>
          )}
        </div>

        <button className="navbar__toggle" onClick={() => setOpen((v) => !v)} aria-label="Menyuni ochish">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="navbar__mobile">
          <nav className="navbar__mobile-nav">
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
              <button onClick={logout} className="nav-link" style={{ textAlign: 'left' }}>
                Chiqish ({user.name})
              </button>
            ) : (
              <>
                <Link to="/kirish" className="nav-link" onClick={() => setOpen(false)}>
                  Kirish
                </Link>
                <Link to="/royxatdan-otish" className="btn btn-primary" onClick={() => setOpen(false)}>
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
