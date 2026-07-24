import { Routes, Route } from 'react-router-dom'
import ScrollToHash from './components/ScrollToHash.jsx'
import Home from './pages/Home.jsx'
import ProyectoDetalle from './pages/ProyectoDetalle.jsx'

export default function App() {
  return (
    <>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/proyectos/:slug" element={<ProyectoDetalle />} />
      </Routes>
    </>
  )
}
