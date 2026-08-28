import { useEffect, useRef, useState } from 'react'

// Element ekranga kirganda pastdan yumshoq chiqib keladi (bir marta ishlaydi)
export default function Reveal({ children, delay = 0, className = '', style = {} }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.15 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  let revealClass = 'reveal'
  if (visible) revealClass = 'reveal reveal--visible'

  return (
    <div ref={ref} className={`${revealClass} ${className}`} style={{ ...style, transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}
