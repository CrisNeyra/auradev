import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import hero0Mp4 from '../img/hero0.mp4'
import hero0Webm from '../img/hero0.webm'
import hero0Poster from '../img/hero0.jpg'
import hero1Mp4 from '../img/hero1.mp4'
import hero1Webm from '../img/hero1.webm'
import hero1Poster from '../img/hero1.jpg'
import './Hero.css'

const videos = [
  { webm: hero0Webm, mp4: hero0Mp4, poster: hero0Poster },
  { webm: hero1Webm, mp4: hero1Mp4, poster: hero1Poster },
]

function prefiereMenosMovimiento() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export default function Hero() {
  const [activo, setActivo] = useState(0)
  const seccionRef = useRef(null)
  const videoRefs = useRef([])
  const activoRef = useRef(activo)
  const visibleRef = useRef(true)

  useEffect(() => {
    activoRef.current = activo
  }, [activo])

  // Reproduce el video activo cuando cambia (si esta visible y se permite movimiento)
  useEffect(() => {
    if (prefiereMenosMovimiento()) return
    const v = videoRefs.current[activo]
    if (v && visibleRef.current) {
      v.currentTime = 0
      const p = v.play()
      if (p && typeof p.catch === 'function') p.catch(() => {})
    }
  }, [activo])

  // Pausa los videos cuando el Hero no esta en pantalla
  useEffect(() => {
    if (prefiereMenosMovimiento()) return
    const seccion = seccionRef.current
    if (!seccion || typeof IntersectionObserver === 'undefined') return

    const obs = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting
        const v = videoRefs.current[activoRef.current]
        if (!v) return
        if (entry.isIntersecting) {
          const p = v.play()
          if (p && typeof p.catch === 'function') p.catch(() => {})
        } else {
          videoRefs.current.forEach((el) => el && el.pause())
        }
      },
      { threshold: 0.15 }
    )

    obs.observe(seccion)
    return () => obs.disconnect()
  }, [])

  const avanzar = () => setActivo((i) => (i === 0 ? 1 : 0))

  return (
    <section id="inicio" className="hero" ref={seccionRef}>
      <div className="hero__video-layer" aria-hidden="true">
        {videos.map((v, i) => (
          <video
            key={i}
            ref={(el) => {
              videoRefs.current[i] = el
            }}
            className={`hero__video ${activo === i ? 'is-activo' : ''}`}
            poster={v.poster}
            muted
            autoPlay={i === 0}
            playsInline
            preload={i === 0 ? 'auto' : 'metadata'}
            onEnded={avanzar}
          >
            <source src={v.webm} type="video/webm" />
            <source src={v.mp4} type="video/mp4" />
          </video>
        ))}
      </div>

      <div className="hero__scrim" aria-hidden="true" />

      <div className="contenedor hero__inner">
        <div className="hero__content">
          <span className="hero__badge">Estudio de Desarrollo Digital</span>
          <h1 className="hero__title">
            Construimos el <span className="acento-amarillo">software</span> que
            tu negocio <span className="acento-rojo">necesita.</span>
          </h1>
          <p className="hero__text">
            En AuraDev diseñamos y desarrollamos soluciones digitales a medida:
            aplicaciones, automatizaciones, sistemas CRM e integraciones que
            hacen crecer tu empresa.
          </p>
          <div className="hero__actions">
            <motion.a 
              href="#contacto" 
              className="btn btn-rojo"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contáctanos
            </motion.a>
            <motion.a 
              href="#portafolio" 
              className="btn btn-borde"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ver proyectos
            </motion.a>
          </div>

          <div className="hero__stats">
            {[
              { n: '+30', t: 'Proyectos entregados' },
              { n: '100%', t: 'A medida' },
              { n: '24/7', t: 'Soporte continuo' }
            ].map((s, i) => (
              <motion.div 
                key={i} 
                className="hero__stat"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.15 }}
              >
                <strong>{s.n}</strong>
                <span>{s.t}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
