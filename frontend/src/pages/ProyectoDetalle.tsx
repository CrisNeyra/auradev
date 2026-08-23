import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WhatsAppFloat from '../components/WhatsAppFloat'
import { getProyectoBySlug, hasUrlVivo } from '../data/proyectos'
import './ProyectoDetalle.css'

/** Página de caso: copy, tags y CTA si hay URL viva. */
export default function ProyectoDetalle() {
  const { slug } = useParams()
  const proyecto = getProyectoBySlug(slug)

  if (!proyecto) {
    return (
      <>
        <Navbar />
        <main
          id="contenido"
          tabIndex={-1}
          className="proyecto-detalle proyecto-detalle--404"
        >
          <div className="contenedor">
            <h1>Proyecto no encontrado</h1>
            <p>El proyecto que buscás no existe o fue movido.</p>
            <Link to="/#portafolio" className="btn btn-rojo">
              Volver al portafolio
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main id="contenido" tabIndex={-1} className="proyecto-detalle">
        <div className="contenedor proyecto-detalle__inner">
          <Link to="/#portafolio" className="proyecto-detalle__back">
            ← Volver al portafolio
          </Link>

          <div className="proyecto-detalle__hero">
            <img
              src={proyecto.imagen}
              alt={`Captura del proyecto ${proyecto.nombre}`}
            />
            <span className="proyecto-detalle__categoria">{proyecto.categoria}</span>
          </div>

          <div className="proyecto-detalle__content">
            <h1>{proyecto.nombre}</h1>
            <p className="proyecto-detalle__desc">{proyecto.descripcionLarga}</p>

            <div className="proyecto-detalle__contexto">
              <section className="proyecto-detalle__bloque">
                <h2>Problema que resuelve</h2>
                <p>{proyecto.problema}</p>
              </section>
              <section className="proyecto-detalle__bloque">
                <h2>Por qué este stack</h2>
                <p>{proyecto.porQueStack}</p>
              </section>
              <section className="proyecto-detalle__bloque">
                <h2>Desafío técnico</h2>
                <p>{proyecto.desafio}</p>
              </section>
            </div>

            <ul className="proyecto-detalle__tags">
              {proyecto.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>

            <div className="proyecto-detalle__actions">
              {hasUrlVivo(proyecto) && (
                <a
                  href={proyecto.url}
                  className="btn btn-rojo"
                  target="_blank"
                  rel="noreferrer"
                >
                  Ver proyecto
                </a>
              )}
              <Link to="/#contacto" className="btn btn-borde">
                Consultar por este proyecto
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
