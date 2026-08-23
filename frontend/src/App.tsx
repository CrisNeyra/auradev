import { Routes, Route } from 'react-router-dom'
import ScrollToHash from './components/ScrollToHash'
import Home from './pages/Home'
import ProyectoDetalle from './pages/ProyectoDetalle'
import WhatsAppBridge from './pages/WhatsAppBridge'

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
