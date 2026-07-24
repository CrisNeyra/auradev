import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '../img/AuraDev.jpg'
import './Navbar.css'

const enlaces = [
  { to: '/#inicio', label: 'Inicio' },
  { to: '/#servicios', label: 'Servicios' },
  { to: '/#portafolio', label: 'Portafolio' },
  { to: '/#nosotros', label: 'Quiénes Somos' },
  { to: '/#contacto', label: 'Contacto' },
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
        <Link to="/#inicio" className="navbar__logo" onClick={cerrar}>
          <img
            src={logo}
            alt="AuraDev"
            className="navbar__logo-img"
            decoding="async"
          />
        </Link>

        <nav className={`navbar__links ${abierto ? 'is-open' : ''}`}>
          <ul>
            {enlaces.map((e) => (
              <li key={e.to}>
                <Link to={e.to} onClick={cerrar}>
                  {e.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="navbar__actions">
          <Link
            to="/#contacto"
            className="btn btn-rojo navbar__cta"
            onClick={cerrar}
          >
            Hablemos
          </Link>
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
              <li key={e.to}>
                <Link to={e.to} onClick={cerrar}>
                  {e.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to="/#contacto"
            className="btn btn-rojo navbar__cta"
            onClick={cerrar}
          >
            Hablemos
          </Link>
        </nav>
      </div>
    </header>
  )
}
