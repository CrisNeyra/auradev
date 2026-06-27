import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import ProyectoDetalle from './pages/ProyectoDetalle.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/proyectos/:slug" element={<ProyectoDetalle />} />
    </Routes>
  )
}
