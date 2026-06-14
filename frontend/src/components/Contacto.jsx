import { useState } from 'react'
import Reveal from './Reveal.jsx'
import './Contacto.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

const estadoInicial = { nombre: '', email: '', mensaje: '', website: '' }

export default function Contacto() {
  const [form, setForm] = useState(estadoInicial)
  const [estado, setEstado] = useState('idle') // idle | enviando | ok | error
  const [error, setError] = useState('')

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const validar = () => {
    if (!form.nombre.trim()) return 'Por favor, ingresá tu nombre.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return 'Ingresá un email válido.'
    if (form.mensaje.trim().length < 10)
      return 'El mensaje debe tener al menos 10 caracteres.'
    return ''
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const errorValidacion = validar()
    if (errorValidacion) {
      setEstado('error')
      setError(errorValidacion)
      return
    }

    setEstado('enviando')
    setError('')

    try {
      const res = await fetch(`${API_URL}/api/contacto`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'No se pudo enviar el mensaje.')
      }

      setEstado('ok')
      setForm(estadoInicial)
    } catch (err) {
      setEstado('error')
      setError(
        err.message ||
          'No se pudo enviar el mensaje. Intentá nuevamente más tarde.'
      )
    }
  }

  return (
    <section id="contacto" className="seccion seccion-alt contacto">
      <div className="contenedor contacto__inner">
        <Reveal className="contacto__info">
          <span className="seccion-eyebrow">Contacto</span>
          <h2 className="seccion-titulo">Hagamos realidad tu proyecto</h2>
          <p className="seccion-sub">
            Contanos qué necesitás y te respondemos a la brevedad. Sin
            compromiso.
          </p>

          <ul className="contacto__datos">
            <li>
              <span className="contacto__icono">✉</span>
              <div>
                <strong>Email</strong>
                <a href="mailto:hola@auradev.com">hola@auradev.com</a>
              </div>
            </li>
            <li>
              <span className="contacto__icono">☏</span>
              <div>
                <strong>WhatsApp</strong>
                <a
                  href="https://wa.me/0000000000"
                  target="_blank"
                  rel="noreferrer"
                >
                  +00 000 000 000
                </a>
              </div>
            </li>
            <li>
              <span className="contacto__icono">◍</span>
              <div>
                <strong>Redes</strong>
                <a href="#" rel="noreferrer">
                  @auradev
                </a>
              </div>
            </li>
          </ul>
        </Reveal>

        <Reveal as="form" className="contacto__form" onSubmit={onSubmit} noValidate delay={120}>
          <div className="campo-honeypot" aria-hidden="true">
            <label htmlFor="website">No completar este campo</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex="-1"
              autoComplete="off"
              value={form.website}
              onChange={onChange}
            />
          </div>

          <div className="campo">
            <label htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              placeholder="Tu nombre"
              value={form.nombre}
              onChange={onChange}
            />
          </div>

          <div className="campo">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="tu@email.com"
              value={form.email}
              onChange={onChange}
            />
          </div>

          <div className="campo">
            <label htmlFor="mensaje">Mensaje</label>
            <textarea
              id="mensaje"
              name="mensaje"
              rows="5"
              placeholder="Contanos sobre tu proyecto..."
              value={form.mensaje}
              onChange={onChange}
            />
          </div>

          {estado === 'error' && <p className="form-msg form-msg--error">{error}</p>}
          {estado === 'ok' && (
            <p className="form-msg form-msg--ok">
              ¡Mensaje enviado! Te contactaremos pronto.
            </p>
          )}

          <button
            type="submit"
            className="btn btn-rojo contacto__submit"
            disabled={estado === 'enviando'}
          >
            {estado === 'enviando' ? 'Enviando…' : 'Enviar mensaje'}
          </button>
        </Reveal>
      </div>
    </section>
  )
}
