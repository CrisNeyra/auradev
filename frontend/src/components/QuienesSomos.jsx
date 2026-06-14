import Reveal from './Reveal.jsx'
import './QuienesSomos.css'

const valores = [
  {
    titulo: 'Calidad',
    texto: 'Código limpio, escalable y mantenible en cada proyecto.',
  },
  {
    titulo: 'Compromiso',
    texto: 'Tu objetivo es el nuestro. Acompañamos cada etapa del proceso.',
  },
  {
    titulo: 'Innovación',
    texto: 'Usamos las mejores tecnologías para resolver problemas reales.',
  },
]

const socios = [
  { inicial: 'A', nombre: 'Socio 1', rol: 'Co-fundador y Desarrollo' },
  { inicial: 'D', nombre: 'Socio 2', rol: 'Co-fundador y Producto' },
]

export default function QuienesSomos() {
  return (
    <section id="nosotros" className="seccion nosotros">
      <div className="contenedor nosotros__inner">
        <Reveal className="nosotros__texto">
          <span className="seccion-eyebrow">Quiénes Somos</span>
          <h2 className="seccion-titulo">
            Un estudio digital con visión de socios
          </h2>
          <p className="nosotros__parrafo">
            AuraDev nace de la unión de dos socios apasionados por la tecnología
            y los buenos productos. Combinamos experiencia técnica y visión de
            negocio para transformar ideas en software que genera resultados.
          </p>
          <p className="nosotros__parrafo">
            Trabajamos de cerca con cada cliente, entendiendo su negocio para
            entregar soluciones a medida, escalables y pensadas para crecer.
          </p>

          <div className="nosotros__valores">
            {valores.map((v) => (
              <div className="valor" key={v.titulo}>
                <h4>{v.titulo}</h4>
                <p>{v.texto}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="nosotros__socios" delay={120}>
          {socios.map((s) => (
            <div className="socio-card" key={s.nombre}>
              <div className="socio-card__avatar">{s.inicial}</div>
              <div>
                <h4>{s.nombre}</h4>
                <span>{s.rol}</span>
              </div>
            </div>
          ))}
          <div className="nosotros__sello">
            <strong>AuraDev</strong>
            <span>Estudio de Desarrollo Digital</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
