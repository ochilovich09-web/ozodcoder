import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import { fetchFavorites, toggleFavoriteApi } from '../api/user'

const FavoritesContext = createContext(null)
const STORAGE_KEY = 'ozodcoder_favorites'

export function FavoritesProvider({ children }) {
  const { isAuthenticated } = useAuth()
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Har doim localStorage'ga ham yozamiz - mehmon foydalanuvchi uchun zaxira
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  // Tizimga kirganda backenddan sevimlilarni yuklab olamiz
  useEffect(() => {
    if (!isAuthenticated) return
    fetchFavorites()
      .then((data) => setFavorites(data.favorites))
      .catch(() => {
        // Backend ishlamayotgan bo'lsa, localStorage'dagi qiymat bilan davom etamiz
      })
  }, [isAuthenticated])

  async function toggleFavorite(courseId) {
    // UI darhol yangilanadi (optimistic update)
    if (favorites.includes(courseId)) {
      setFavorites(favorites.filter((id) => id !== courseId))
    } else {
      setFavorites([...favorites, courseId])
    }

    if (isAuthenticated) {
      try {
        await toggleFavoriteApi(courseId)
      } catch {
        // So'rov muvaffaqiyatsiz bo'lsa, localStorage holati saqlanib qoladi;
        // keyingi sahifa yangilanishida backend bilan qayta sinxronlanadi.
      }
    }
  }

  function isFavorite(courseId) {
    return favorites.includes(courseId)
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider')
  return ctx
}
