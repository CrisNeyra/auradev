import { Link } from 'react-router-dom'
import logo from '../img/AuraDev.jpg'
import {
  EMAIL,
  WHATSAPP_DISPLAY,
  urlWhatsApp,
} from '../config/contacto.js'
import './Footer.css'

const enlaces = [
  { to: '/#inicio', label: 'Inicio' },
  { to: '/#servicios', label: 'Servicios' },
  { to: '/#portafolio', label: 'Portafolio' },
  { to: '/#nosotros', label: 'Quiénes Somos' },
  { to: '/#contacto', label: 'Contacto' },
]

export default function Footer() {
  const anio = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="contenedor footer__inner">
        <div className="footer__brand">
          <Link to="/#inicio" className="footer__logo">
            <img
              src={logo}
              alt="AuraDev"
              className="footer__logo-img"
              decoding="async"
            />
          </Link>
          <p>
            Estudio de desarrollo digital. Software a medida, automatizaciones,
            CRM e integraciones.
          </p>
        </div>

        <nav className="footer__nav">
          <h4>Navegación</h4>
          <ul>
            {enlaces.map((e) => (
              <li key={e.to}>
                <Link to={e.to}>{e.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__contacto">
          <h4>Contacto</h4>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <a href={urlWhatsApp()} target="_blank" rel="noreferrer">
            {WHATSAPP_DISPLAY}
          </a>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="contenedor footer__bottom-inner">
          <span>© {anio} AuraDev. Todos los derechos reservados.</span>
          <span className="footer__barra" aria-hidden="true" />
        </div>
      </div>
    </footer>
  )
}
