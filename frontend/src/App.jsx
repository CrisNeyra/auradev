import { Routes, Route } from 'react-router-dom'
import ScrollToHash from './components/ScrollToHash.jsx'
import Home from './pages/Home.jsx'
import ProyectoDetalle from './pages/ProyectoDetalle.jsx'
import WhatsAppBridge from './pages/WhatsAppBridge.jsx'

/** Rutas principales: home, puente WhatsApp y detalle de proyecto. */
export default function App() {
  return (
    <>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/whatsapp" element={<WhatsAppBridge />} />
        <Route path="/proyectos/:slug" element={<ProyectoDetalle />} />
      </Routes>
    </>
  )
}
