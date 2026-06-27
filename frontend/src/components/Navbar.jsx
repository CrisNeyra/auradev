import { useState, useEffect } from 'react'
import logo from '../img/AuraDev.jpg'
import './Navbar.css'

const enlaces = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#portafolio', label: 'Portafolio' },
  { href: '#nosotros', label: 'Quiénes Somos' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [abierto, setAbierto] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const cerrar = () => setAbierto(false)

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="contenedor navbar__inner">
        <a href="#inicio" className="navbar__logo" onClick={cerrar}>
          <img
            src={logo}
            alt="AuraDev"
            className="navbar__logo-img"
            decoding="async"
          />
        </a>

        <nav className={`navbar__links ${abierto ? 'is-open' : ''}`}>
          <ul>
            {enlaces.map((e) => (
              <li key={e.href}>
                <a href={e.href} onClick={cerrar}>
                  {e.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="navbar__actions">
          <a
            href="#contacto"
            className="btn btn-rojo navbar__cta"
            onClick={cerrar}
          >
            Hablemos
          </a>
          <button
            className={`navbar__burger ${abierto ? 'is-open' : ''}`}
            aria-label="Abrir menú"
            aria-expanded={abierto}
            onClick={() => setAbierto((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <nav className={`navbar__drawer ${abierto ? 'is-open' : ''}`}>
          <ul>
            {enlaces.map((e) => (
              <li key={e.href}>
                <a href={e.href} onClick={cerrar}>
                  {e.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contacto" className="btn btn-rojo navbar__cta" onClick={cerrar}>
            Hablemos
          </a>
        </nav>
      </div>
    </header>
  )
}
