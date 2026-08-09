import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import fondoPortafolio from '../img/portafolio.jpg'
import { proyectos, getProyectoHref, type Proyecto } from '../data/proyectos'
import Reveal from './Reveal.jsx'
import './Portafolio.css'

function ProyectoCard({ proyecto, delay }: { proyecto: Proyecto; delay: number }) {
  return (
    <motion.article
      className="proyecto-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      whileHover={{
        y: -10,
        transition: { duration: 0.3 },
      }}
    >
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
          />
          <motion.span
            className="proyecto-card__categoria"
            whileHover={{ scale: 1.1 }}
          >
            {proyecto.categoria}
          </motion.span>
        </div>
        <div className="proyecto-card__body">
          <h3 className="proyecto-card__nombre">{proyecto.nombre}</h3>
          <p className="proyecto-card__desc">{proyecto.descripcion}</p>
          <ul className="proyecto-card__tags">
            {proyecto.tags.map((t) => (
              <motion.li
                key={t}
                whileHover={{ backgroundColor: '#FFD700', color: '#000' }}
              >
                {t}
              </motion.li>
            ))}
          </ul>
        </div>
      </Link>
    </motion.article>
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
