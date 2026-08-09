import { Link } from 'react-router-dom'
import logo from '../img/AuraDev.jpg'
import { urlWhatsApp, WHATSAPP_DISPLAY } from '../config/contacto.js'
import './WhatsAppBridge.css'

export default function WhatsAppBridge() {
  return (
    <main className="wa-bridge">
      <div className="wa-bridge__card">
        <img
          src={logo}
          alt="AuraDev"
          className="wa-bridge__logo"
          decoding="async"
        />
        <p className="wa-bridge__eyebrow">AuraDev</p>
        <h1 className="wa-bridge__title">Escribinos por WhatsApp</h1>
        <p className="wa-bridge__text">
          Continuá la conversación con nuestro equipo. Te respondemos a la
          brevedad para hablar de tu proyecto.
        </p>
        <p className="wa-bridge__numero">{WHATSAPP_DISPLAY}</p>
        <a
          href={urlWhatsApp()}
          className="btn btn-rojo wa-bridge__cta"
          target="_blank"
          rel="noreferrer"
        >
          Abrir WhatsApp
        </a>
        <Link to="/#contacto" className="wa-bridge__back">
          Volver al sitio
        </Link>
      </div>
    </main>
  )
}
