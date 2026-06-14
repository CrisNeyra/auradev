import fondoServicios from '../img/servicios.jpg'
import Reveal from './Reveal.jsx'
import './Servicios.css'

const servicios = [
  {
    icono: '⌘',
    titulo: 'Software a Medida',
    texto:
      'Programas y plataformas diseñados desde cero para resolver las necesidades específicas de tu negocio.',
  },
  {
    icono: '◐',
    titulo: 'Aplicaciones Web y Móviles',
    texto:
      'Apps rápidas, modernas y responsivas que funcionan perfecto en cualquier dispositivo.',
  },
  {
    icono: '⚙',
    titulo: 'Automatizaciones',
    texto:
      'Automatizamos tareas y procesos repetitivos para que ahorres tiempo y reduzcas errores.',
  },
  {
    icono: '◎',
    titulo: 'Sistemas CRM',
    texto:
      'CRMs a medida para gestionar clientes, ventas y relaciones comerciales en un solo lugar.',
  },
  {
    icono: '⇄',
    titulo: 'Integraciones y APIs',
    texto:
      'Conectamos tus herramientas y servicios mediante APIs e integraciones a medida.',
  },
  {
    icono: '✦',
    titulo: 'Soporte y Mantenimiento',
    texto:
      'Acompañamiento continuo, mejoras y soporte para que tu software siga creciendo contigo.',
  },
]

export default function Servicios() {
  return (
    <section id="servicios" className="seccion servicios">
      <div
        className="servicios__bg"
        aria-hidden="true"
        style={{ backgroundImage: `url(${fondoServicios})` }}
      />
      <div className="contenedor servicios__contenedor">
        <div className="servicios__top">
          <Reveal className="seccion-head">
            <span className="seccion-eyebrow">Nuestros Servicios</span>
            <h2 className="seccion-titulo">
              Soluciones digitales de todo tipo
            </h2>
            <p className="seccion-sub">
              Cubrimos cada etapa: desde la idea hasta el software funcionando en
              producción.
            </p>
          </Reveal>

          <div className="servicios__visual" aria-hidden="true">
            <div className="servicios__code">
              <div className="servicios__dots">
                <span /><span /><span />
              </div>
              <pre>
{`const aura = crear({
  software: "a medida",
  automatizar: true,
  crm: "integrado",
});

aura.lanzar(); // 🚀`}
              </pre>
            </div>
            <div className="servicios__blob servicios__blob--amarillo" />
            <div className="servicios__blob servicios__blob--rojo" />
          </div>
        </div>

        <div className="servicios__grid">
          {servicios.map((s, i) => (
            <Reveal as="article" className="servicio-card" key={i} delay={(i % 3) * 90}>
              <div className="servicio-card__icono">{s.icono}</div>
              <h3 className="servicio-card__titulo">{s.titulo}</h3>
              <p className="servicio-card__texto">{s.texto}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
