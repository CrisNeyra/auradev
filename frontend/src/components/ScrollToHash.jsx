import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }

    const id = hash.replace('#', '')
    const scroll = () => {
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }

    let timeoutId
    const frame = requestAnimationFrame(() => {
      scroll()
      // Reintento corto por si el Home aún monta secciones pesadas
      timeoutId = setTimeout(scroll, 50)
    })

    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(timeoutId)
    }
  }, [pathname, hash])

  return null
}
