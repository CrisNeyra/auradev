import { Link } from 'react-router-dom'
import fondoPortafolio from '../img/portafolio.jpg'
import { proyectos, getProyectoHref, type Proyecto } from '../data/proyectos'
import Reveal from './Reveal.jsx'
import './Portafolio.css'

function ProyectoCard({ proyecto }: { proyecto: Proyecto }) {
  return (
    <article className="proyecto-card">
      <Link
        className="proyecto-card__link"
        to={getProyectoHref(proyecto)}
        aria-label={`Ver detalle de ${proyecto.nombre}`}
      >
        <div className="proyecto-card__cover">
          <img
            className="proyecto-card__img"
            src={proyecto.imagen}
            alt={`Captura del proyecto ${proyecto.nombre}`}
            loading="lazy"
            decoding="async"
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
      </Link>
    </article>
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
          {proyectos.map((p) => (
            <Reveal key={p.slug}>
              <ProyectoCard proyecto={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
