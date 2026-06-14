import { useRef, useState, useEffect } from 'react'
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
  const refs = [useRef(null), useRef(null)]
  const visibleRef = useRef(true)

  // Reproduce el video activo cuando cambia (si esta visible y se permite movimiento)
  useEffect(() => {
    if (prefiereMenosMovimiento()) return
    const v = refs[activo].current
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
        const v = refs[activo].current
        if (!v) return
        if (entry.isIntersecting) {
          const p = v.play()
          if (p && typeof p.catch === 'function') p.catch(() => {})
        } else {
          refs.forEach((r) => r.current && r.current.pause())
        }
      },
      { threshold: 0.15 }
    )

    obs.observe(seccion)
    return () => obs.disconnect()
  }, [activo])

  const avanzar = () => setActivo((i) => (i === 0 ? 1 : 0))

  return (
    <section id="inicio" className="hero" ref={seccionRef}>
      <div className="hero__video-layer" aria-hidden="true">
        {videos.map((v, i) => (
          <video
            key={i}
            ref={refs[i]}
            className={`hero__video ${activo === i ? 'is-activo' : ''}`}
            poster={v.poster}
            muted
            autoPlay={i === 0}
            playsInline
            preload="metadata"
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
            <a href="#contacto" className="btn btn-rojo">
              Contáctanos
            </a>
            <a href="#portafolio" className="btn btn-borde">
              Ver proyectos
            </a>
          </div>

          <div className="hero__stats">
            <div className="hero__stat">
              <strong>+30</strong>
              <span>Proyectos entregados</span>
            </div>
            <div className="hero__stat">
              <strong>100%</strong>
              <span>A medida</span>
            </div>
            <div className="hero__stat">
              <strong>24/7</strong>
              <span>Soporte continuo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
