import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import IconBullet from './icons/IconBullet.jsx'
import './ServicioModal.css'

interface ServicioOpcion {
  texto: string
  detalle: string
}

interface Servicio {
  titulo: string
  resumen: string
  imagen: string
  opciones: ServicioOpcion[]
}

interface ServicioModalProps {
  servicio: Servicio | null
  isOpen: boolean
  onClose: () => void
}

function prefiereMenosMovimiento() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  )
}

const FOCUSABLE =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

export default function ServicioModal({ servicio, isOpen, onClose }: ServicioModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const reduceMotion = prefiereMenosMovimiento()

  useEffect(() => {
    if (!isOpen) return

    previousFocusRef.current = document.activeElement as HTMLElement | null
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const modal = modalRef.current
    const focusables = modal?.querySelectorAll<HTMLElement>(FOCUSABLE)
    const first = focusables?.[0]
    const last = focusables?.[focusables.length - 1]
    first?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }

      if (e.key === 'Tab' && focusables?.length) {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', onKeyDown)
      const prev = previousFocusRef.current
      if (prev && 'focus' in prev && typeof prev.focus === 'function') {
        prev.focus()
      }
    }
  }, [isOpen, onClose])

  if (!servicio) return null

  const motionProps = reduceMotion
    ? {
        initial: { opacity: 1 },
        animate: { opacity: 1 },
        exit: { opacity: 1 },
        transition: { duration: 0 },
      }
    : {
        initial: { opacity: 0, scale: 0.9, y: 20 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.9, y: 20 },
        transition: { type: 'spring', damping: 25, stiffness: 300 },
      }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: reduceMotion ? 1 : 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: reduceMotion ? 1 : 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
            onClick={onClose}
          />

          <div className="modal-wrapper">
            <motion.div
              ref={modalRef}
              className="modal-content"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-servicio-titulo"
              {...motionProps}
            >
              <button
                type="button"
                className="modal-close"
                onClick={onClose}
                aria-label="Cerrar modal"
              >
                &times;
              </button>

              <div className="modal-header">
                <div
                  className="modal-header__img-bg"
                  style={{ backgroundImage: `url(${servicio.imagen})` }}
                />
                <div className="modal-header__overlay" />
                <div className="modal-header__text">
                  <h2 id="modal-servicio-titulo" className="modal-titulo">
                    {servicio.titulo}
                  </h2>
                  <p className="modal-resumen">{servicio.resumen}</p>
                </div>
              </div>

              <div className="modal-body">
                <h3 className="modal-body__titulo">¿Qué incluye este servicio?</h3>
                <div className="modal-puntos-grid">
                  {servicio.opciones.map((opcion, index) => (
                    <motion.div
                      key={index}
                      className="modal-punto-card"
                      initial={reduceMotion ? false : { opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { delay: 0.1 + index * 0.05 }
                      }
                    >
                      <div className="modal-punto-header">
                        <IconBullet className="modal-punto-icono" />
                        <h4 className="modal-punto-titulo">{opcion.texto}</h4>
                      </div>
                      <p className="modal-punto-detalle">{opcion.detalle}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="modal-footer">
                <p className="modal-footer-texto">
                  ¿Te interesa este servicio para tu negocio?
                </p>
                <a href="#contacto" className="btn btn-rojo" onClick={onClose}>
                  Solicitar presupuesto
                </a>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
