import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import fondoPortafolio from '../img/portafolio.jpg'
import { proyectos, getProyectoHref } from '../data/proyectos.js'
import Reveal from './Reveal.jsx'
import Skeleton from './Skeleton.jsx'
import './Portafolio.css'

function ProyectoCardSkeleton() {
  return (
    <div className="proyecto-card">
      <div className="proyecto-card__cover">
        <Skeleton type="rect" />
      </div>
      <div className="proyecto-card__body">
        <Skeleton type="title" />
        <Skeleton type="text" />
        <Skeleton type="text" style={{ width: '60%' }} />
        <div className="proyecto-card__tags" style={{ marginTop: '10px' }}>
          <Skeleton type="text" style={{ width: '50px', borderRadius: '999px' }} />
          <Skeleton type="text" style={{ width: '50px', borderRadius: '999px' }} />
        </div>
      </div>
    </div>
  )
}

function ProyectoCard({ proyecto, delay }) {
  return (
    <motion.article 
      className="proyecto-card" 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      whileHover={{ 
        y: -10, 
        transition: { duration: 0.3 }
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
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular carga de datos para mostrar el Skeleton
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

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
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <ProyectoCardSkeleton key={i} />
              ))
            : proyectos.map((p, i) => (
                <ProyectoCard key={p.slug} proyecto={p} delay={(i % 3) * 90} />
              ))}
        </div>
      </div>
    </section>
  )
}
