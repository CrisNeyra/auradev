import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import WhatsAppFloat from '../components/WhatsAppFloat.jsx'
import { getProyectoBySlug, hasUrlVivo } from '../data/proyectos.js'
import './ProyectoDetalle.css'

export default function ProyectoDetalle() {
  const { slug } = useParams()
  const proyecto = getProyectoBySlug(slug)

  if (!proyecto) {
    return (
      <>
        <Navbar />
        <main className="proyecto-detalle proyecto-detalle--404">
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
      <main className="proyecto-detalle">
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
