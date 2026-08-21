import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import { fetchProgress, toggleLessonProgress } from '../api/user'

const ProgressContext = createContext(null)
const STORAGE_KEY = 'ozodcoder_progress'

// Shakli: { [courseId]: { [lessonId]: true } }
export function ProgressProvider({ children }) {
  const { isAuthenticated } = useAuth()
  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : {}
    } catch {
      return {}
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  }, [progress])

  // Tizimga kirganda backenddagi progress yozuvlarini o'z shaklimizga o'giramiz
  useEffect(() => {
    if (!isAuthenticated) return
    fetchProgress()
      .then((records) => {
        const shaped = {}
        for (const record of records) {
          const lessonsDone = {}
          for (const lessonId of record.completedLessons) {
            lessonsDone[lessonId] = true
          }
          shaped[record.courseId] = lessonsDone
        }
        setProgress(shaped)
      })
      .catch(() => {
        // Backend ishlamayotgan bo'lsa, localStorage'dagi qiymat bilan davom etamiz
      })
  }, [isAuthenticated])

  async function toggleLessonComplete(courseId, lessonId) {
    const courseProgress = { ...(progress[courseId] || {}) }
    if (courseProgress[lessonId]) {
      delete courseProgress[lessonId]
    } else {
      courseProgress[lessonId] = true
    }
    setProgress({ ...progress, [courseId]: courseProgress })

    if (isAuthenticated) {
      try {
        await toggleLessonProgress(courseId, lessonId)
      } catch {
        // So'rov muvaffaqiyatsiz bo'lsa ham UI holati saqlanadi
      }
    }
  }

  function isLessonComplete(courseId, lessonId) {
    const courseProgress = progress[courseId] || {}
    return Boolean(courseProgress[lessonId])
  }

  function getCourseProgressPercent(courseId, totalLessons) {
    if (!totalLessons) return 0
    const courseProgress = progress[courseId] || {}
    const completed = Object.keys(courseProgress).length
    return Math.round((completed / totalLessons) * 100)
  }

  return (
    <ProgressContext.Provider
      value={{ progress, toggleLessonComplete, isLessonComplete, getCourseProgressPercent }}
    >
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider')
  return ctx
}
