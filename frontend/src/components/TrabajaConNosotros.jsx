import fondoTrabaja from '../img/trabaja-con-nosotros.jpg'
import Reveal from './Reveal.jsx'
import './TrabajaConNosotros.css'

const pilares = [
  {
    titulo: 'Trabajo en equipo',
    texto:
      'Construimos juntos: ideas compartidas, feedback honesto y objetivos comunes en cada sprint.',
  },
  {
    titulo: 'Grandes objetivos',
    texto:
      'Apuntamos alto. Cada proyecto es una oportunidad de entregar impacto real para el cliente.',
  },
  {
    titulo: 'Resiliencia',
    texto:
      'Los desafíos técnicos se atraviesan con calma, método y la convicción de encontrar la mejor solución.',
  },
  {
    titulo: 'Aprendizaje constante',
    texto:
      'La tecnología cambia rápido. Nos mantenemos curiosos, actualizados y abiertos a mejorar siempre.',
  },
  {
    titulo: 'Voluntad y ganas',
    texto:
      'La diferencia la hacen las personas con impulso: compromiso, proactividad y ganas de hacer bien las cosas.',
  },
]

/** Sección de cultura / “Trabajá con nosotros”. */
export default function TrabajaConNosotros() {
  return (
    <section id="trabaja" className="seccion trabaja">
      <div
        className="trabaja__bg"
        aria-hidden="true"
        style={{ backgroundImage: `url(${fondoTrabaja})` }}
      />
      <div className="contenedor trabaja__inner">
        <Reveal className="seccion-head trabaja__head">
          <span className="seccion-eyebrow">Trabajá con nosotros</span>
          <h2 className="seccion-titulo">
            Cultura que impulsa resultados
          </h2>
          <p className="seccion-sub">
            En AuraDev creemos que el mejor software nace de equipos con
            propósito: colaboración, resiliencia y ganas de aprender todos los
            días.
          </p>
        </Reveal>

        <div className="trabaja__grid">
          {pilares.map((p, i) => (
            <Reveal className="trabaja__item" key={p.titulo} delay={i * 60}>
              <h3>{p.titulo}</h3>
              <p>{p.texto}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="trabaja__cta" delay={280}>
          <p>¿Querés sumarte o colaborar con el estudio?</p>
          <a href="#contacto" className="btn btn-rojo">
            Escribinos
          </a>
        </Reveal>
      </div>
    </section>
  )
}
