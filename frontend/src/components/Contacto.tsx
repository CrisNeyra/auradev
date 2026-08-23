import { useState } from 'react'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import fondoContacto from '../img/contacto.jpg'
import {
  EMAIL,
  WHATSAPP_DISPLAY,
  redesSociales,
  hasRedesSociales,
} from '../config/contacto'
import Reveal from './Reveal.jsx'
import './Contacto.css'

const API_URL = (
  import.meta.env.VITE_API_URL ??
  (import.meta.env.DEV ? 'http://localhost:4000' : '')
).replace(/\/$/, '')

const contactoSchema = z.object({
  nombre: z.string().min(1, 'Por favor, ingresá tu nombre.'),
  email: z.string().email('Ingresá un email válido.'),
  mensaje: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres.'),
  website: z.string().optional(),
})

const estadoInicial = { nombre: '', email: '', mensaje: '', website: '' }

/**
 * Sección de contacto: validación Zod, honeypot y POST a `/api/contacto`.
 */
export default function Contacto() {
  const [form, setForm] = useState(estadoInicial)
  const [estado, setEstado] = useState('idle') // idle | enviando | ok | error
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name
    setForm((f) => ({ ...f, [name]: e.target.value }))
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const result = contactoSchema.safeParse(form)
    if (!result.success) {
      const errors: Record<string, string> = {}
      for (const issue of result.error.errors) {
        const field = issue.path[0]
        if (field && !errors[field]) errors[field] = issue.message
      }
      setFieldErrors(errors)
      setEstado('error')
      setError(result.error.errors[0].message)
      return
    }

    setFieldErrors({})
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
      const message =
        err instanceof Error
          ? err.message
          : 'No se pudo enviar el mensaje. Intentá nuevamente más tarde.'
      setError(message)
    }
  }

  return (
    <section id="contacto" className="seccion contacto">
      <div
        className="contacto__bg"
        aria-hidden="true"
        style={{ backgroundImage: `url(${fondoContacto})` }}
      />
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
                <a className="contacto__dato-valor" href={`mailto:${EMAIL}`}>
                  {EMAIL}
                </a>
              </div>
            </li>
            <li>
              <span className="contacto__icono">☏</span>
              <div>
                <strong>WhatsApp</strong>
                <Link className="contacto__dato-valor" to="/whatsapp">
                  {WHATSAPP_DISPLAY}
                </Link>
              </div>
            </li>
            {hasRedesSociales() && (
              <li>
                <span className="contacto__icono">◍</span>
                <div>
                  <strong>Redes</strong>
                  <div className="contacto__redes">
                    {redesSociales.map((red) => (
                      <a
                        key={red.id}
                        className="contacto__dato-valor"
                        href={red.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {red.label}
                      </a>
                    ))}
                  </div>
                </div>
              </li>
            )}
          </ul>
        </Reveal>

        <Reveal
          as="form"
          className="contacto__form"
          onSubmit={onSubmit}
          noValidate
          delay={120}
        >
          <div className="campo-honeypot" aria-hidden="true">
            <label htmlFor="website">No completar este campo</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
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
              aria-invalid={fieldErrors.nombre ? true : undefined}
              aria-describedby={fieldErrors.nombre ? 'nombre-error' : undefined}
            />
            {fieldErrors.nombre && (
              <span id="nombre-error" className="campo-error" role="alert">
                {fieldErrors.nombre}
              </span>
            )}
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
              aria-invalid={fieldErrors.email ? true : undefined}
              aria-describedby={fieldErrors.email ? 'email-error' : undefined}
            />
            {fieldErrors.email && (
              <span id="email-error" className="campo-error" role="alert">
                {fieldErrors.email}
              </span>
            )}
          </div>

          <div className="campo">
            <label htmlFor="mensaje">Mensaje</label>
            <textarea
              id="mensaje"
              name="mensaje"
              rows={5}
              placeholder="Contanos sobre tu proyecto..."
              value={form.mensaje}
              onChange={onChange}
              aria-invalid={fieldErrors.mensaje ? true : undefined}
              aria-describedby={
                fieldErrors.mensaje ? 'mensaje-error' : undefined
              }
            />
            {fieldErrors.mensaje && (
              <span id="mensaje-error" className="campo-error" role="alert">
                {fieldErrors.mensaje}
              </span>
            )}
          </div>

          <div aria-live="polite" className="contacto__feedback">
            {estado === 'error' && (
              <p className="form-msg form-msg--error">{error}</p>
            )}
            {estado === 'ok' && (
              <p className="form-msg form-msg--ok">
                ¡Mensaje enviado! Te contactaremos pronto.
              </p>
            )}
          </div>

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
