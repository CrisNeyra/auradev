import { Link } from 'react-router-dom'
import fondoPortafolio from '../img/portafolio.jpg'
import {
  proyectos,
  getProyectoHref,
  isLinkExterno,
} from '../data/proyectos.js'
import Reveal from './Reveal.jsx'
import './Portafolio.css'

function ProyectoCard({ proyecto, delay }) {
  const href = getProyectoHref(proyecto)
  const externo = isLinkExterno(proyecto)

  const contenido = (
    <>
      <div className="proyecto-card__cover">
        <img
          className="proyecto-card__img"
          src={proyecto.imagen}
          alt={`Captura del proyecto ${proyecto.nombre}`}
          loading="lazy"
        />
        <span className="proyecto-card__categoria">{proyecto.categoria}</span>
      </div>
      <div className="proyecto-card__body">
        <h3 className="proyecto-card__nombre">{proyecto.nombre}</h3>
        <p className="proyecto-card__desc">{proyecto.descripcion}</p>
        <ul className="proyecto-card__tags">
          {proyecto.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </>
  )

  if (externo) {
    return (
      <Reveal as="article" className="proyecto-card" delay={delay}>
        <a
          className="proyecto-card__link"
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={`Ver proyecto ${proyecto.nombre}`}
        >
          {contenido}
        </a>
      </Reveal>
    )
  }

  return (
    <Reveal as="article" className="proyecto-card" delay={delay}>
      <Link
        className="proyecto-card__link"
        to={href}
        aria-label={`Ver proyecto ${proyecto.nombre}`}
      >
        {contenido}
      </Link>
    </Reveal>
  )
}

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
            <ProyectoCard key={p.slug} proyecto={p} delay={(i % 3) * 90} />
          ))}
        </div>
      </div>
    </section>
  )
}
