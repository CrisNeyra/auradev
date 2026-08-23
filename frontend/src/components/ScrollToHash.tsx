import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/** Al cambiar de ruta, scrollea al hash o al tope. */
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

    let timeoutId: ReturnType<typeof setTimeout> | undefined
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
