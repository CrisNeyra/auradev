import { motion, AnimatePresence } from 'framer-motion'
import IconBullet from './icons/IconBullet.jsx'
import './ServicioModal.css'

export default function ServicioModal({ servicio, isOpen, onClose }) {
  if (!servicio) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <div className="modal-wrapper">
            <motion.div
              className="modal-content"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <button className="modal-close" onClick={onClose} aria-label="Cerrar modal">
                &times;
              </button>

              <div className="modal-header">
                <div 
                  className="modal-header__img-bg" 
                  style={{ backgroundImage: `url(${servicio.imagen})` }}
                />
                <div className="modal-header__overlay" />
                <div className="modal-header__text">
                  <h2 className="modal-titulo">{servicio.titulo}</h2>
                  <p className="modal-resumen">{servicio.resumen}</p>
                </div>
              </div>

              <div className="modal-body">
                <h3 className="modal-body__titulo">¿Qué incluye este servicio?</h3>
                <div className="modal-puntos-grid">
                  {servicio.opciones.map((opcion, index) => (
                    <motion.div 
                      key={index} 
                      className="modal-punto-card"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                      <div className="modal-punto-header">
                        <IconBullet className="modal-punto-icono" />
                        <h4 className="modal-punto-titulo">{opcion.texto}</h4>
                      </div>
                      <p className="modal-punto-detalle">{opcion.detalle}</p>
                    </motion.div>
                  ))}
                </div>
                
                <div className="modal-footer">
                  <p className="modal-footer-texto">¿Te interesa este servicio para tu negocio?</p>
                  <a href="#contacto" className="btn btn-rojo" onClick={onClose}>
                    Solicitar presupuesto
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
