// Oddiy chiziqli SVG ikonkalar (emoji o'rniga) — barchasi currentColor bilan ishlaydi

export function StarIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" {...props}>
      <path d="M12 2.5l2.9 6.3 6.9.7-5.2 4.7 1.6 6.8L12 17.6l-6.2 3.4 1.6-6.8L2.2 9.5l6.9-.7L12 2.5z" />
    </svg>
  )
}

export function UsersIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" {...props}>
      <path d="M17 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 5 18.5V20" />
      <circle cx="9.5" cy="7.5" r="3.5" />
      <path d="M19 20v-1.5a3.5 3.5 0 0 0-2.5-3.35" />
      <path d="M15 4.15a3.5 3.5 0 0 1 0 6.7" />
    </svg>
  )
}

export function ClockIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </svg>
  )
}

export function TeacherIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" {...props}>
      <path d="M22 9L12 5 2 9l10 4 10-4z" />
      <path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" />
    </svg>
  )
}

export function HeartIcon({ filled, ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" {...props}>
      <path d="M12 20.5s-7.5-4.6-9.8-9.2C.7 8 2 4.7 5.2 3.9c2-.5 4 .3 5 2 1-1.7 3-2.5 5-2 3.2.8 4.5 4.1 3 7.4-2.3 4.6-9.8 9.2-9.8 9.2z" />
    </svg>
  )
}

export function VideoIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" {...props}>
      <rect x="2.5" y="6" width="13" height="12" rx="2" />
      <path d="M15.5 10.5l6-3.2v9.4l-6-3.2" />
    </svg>
  )
}

export function InfinityIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" {...props}>
      <path d="M6.5 15.5a4 4 0 1 1 0-7c2.5 0 3.5 2 5.5 3.5s3 3.5 5.5 3.5a4 4 0 1 0 0-7c-2.5 0-3.5 2-5.5 3.5s-3 3.5-5.5 3.5z" />
    </svg>
  )
}

export function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" {...props}>
      <path d="M5 12.5l4.5 4.5L19 7" />
    </svg>
  )
}

export function SparkleIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12" {...props}>
      <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />
    </svg>
  )
}

export function BadgeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" {...props}>
      <circle cx="12" cy="9" r="6" />
      <path d="M8.5 14.2L7 21l5-2.5L17 21l-1.5-6.8" />
    </svg>
  )
}

export function UnlockIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" {...props}>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 7.5-2" />
    </svg>
  )
}

export function CodeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" {...props}>
      <path d="M8 8l-5 4 5 4" />
      <path d="M16 8l5 4-5 4" />
      <path d="M13.5 6l-3 12" />
    </svg>
  )
}

export function WarningIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" {...props}>
      <path d="M12 3.5l10 17.5H2L12 3.5z" />
      <path d="M12 10v4" />
      <circle cx="12" cy="17.2" r="0.2" fill="currentColor" />
    </svg>
  )
}
