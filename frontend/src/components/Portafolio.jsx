import fondoPortafolio from '../img/portafolio.jpg'
import Reveal from './Reveal.jsx'
import './Portafolio.css'

const proyectos = [
  {
    nombre: 'Nexus CRM',
    categoria: 'Sistema CRM',
    descripcion:
      'Plataforma de gestión de clientes y ventas con tablero en tiempo real para una empresa comercial.',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    color: 'rojo',
  },
  {
    nombre: 'AutoFlow',
    categoria: 'Automatización',
    descripcion:
      'Automatización de facturación y reportes que ahorra más de 40 horas de trabajo manual al mes.',
    tags: ['Python', 'APIs', 'n8n'],
    color: 'amarillo',
  },
  {
    nombre: 'TiendaViva',
    categoria: 'E-commerce',
    descripcion:
      'Tienda online a medida con pasarela de pagos, gestión de stock y panel de administración.',
    tags: ['Next.js', 'Stripe', 'Tailwind'],
    color: 'negro',
  },
  {
    nombre: 'RutaApp',
    categoria: 'App Móvil',
    descripcion:
      'Aplicación móvil de logística para seguimiento de entregas y optimización de rutas.',
    tags: ['React Native', 'Maps API'],
    color: 'amarillo',
  },
  {
    nombre: 'DataPulse',
    categoria: 'Software a Medida',
    descripcion:
      'Dashboard analítico que centraliza métricas de negocio desde múltiples fuentes de datos.',
    tags: ['React', 'Express', 'Charts'],
    color: 'rojo',
  },
  {
    nombre: 'ConectaAPI',
    categoria: 'Integración',
    descripcion:
      'Integración de sistemas internos con servicios externos mediante una API unificada.',
    tags: ['Node.js', 'REST', 'Webhooks'],
    color: 'negro',
  },
]

export default function Portafolio() {
  return (
    <section id="portafolio" className="seccion seccion-alt portafolio">
      <div
        className="portafolio__bg"
        aria-hidden="true"
        style={{ backgroundImage: `url(${fondoPortafolio})` }}
      />
      <div className="contenedor portafolio__contenedor">
        <Reveal className="seccion-head">
          <span className="seccion-eyebrow">Portafolio</span>
          <h2 className="seccion-titulo">Proyectos que hemos construido</h2>
          <p className="seccion-sub">
            Una muestra del tipo de soluciones que desarrollamos para nuestros
            clientes.
          </p>
        </Reveal>

        <div className="portafolio__grid">
          {proyectos.map((p, i) => (
            <Reveal as="article" className="proyecto-card" key={i} delay={(i % 3) * 90}>
              <div className={`proyecto-card__cover proyecto-card__cover--${p.color}`}>
                <span className="proyecto-card__categoria">{p.categoria}</span>
                <span className="proyecto-card__inicial">
                  {p.nombre.charAt(0)}
                </span>
              </div>
              <div className="proyecto-card__body">
                <h3 className="proyecto-card__nombre">{p.nombre}</h3>
                <p className="proyecto-card__desc">{p.descripcion}</p>
                <ul className="proyecto-card__tags">
                  {p.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
