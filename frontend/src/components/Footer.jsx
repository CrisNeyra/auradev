import './Footer.css'

const enlaces = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#portafolio', label: 'Portafolio' },
  { href: '#nosotros', label: 'Quiénes Somos' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Footer() {
  const anio = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="contenedor footer__inner">
        <div className="footer__brand">
          <a href="#inicio" className="footer__logo">
            <span className="footer__logo-mark">A</span>
            Aura<span className="acento-rojo">Dev</span>
          </a>
          <p>
            Estudio de desarrollo digital. Software a medida, automatizaciones,
            CRM e integraciones.
          </p>
        </div>

        <nav className="footer__nav">
          <h4>Navegación</h4>
          <ul>
            {enlaces.map((e) => (
              <li key={e.href}>
                <a href={e.href}>{e.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__contacto">
          <h4>Contacto</h4>
          <a href="mailto:hola@auradev.com">hola@auradev.com</a>
          <a href="https://wa.me/0000000000" target="_blank" rel="noreferrer">
            +00 000 000 000
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
