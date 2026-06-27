import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import Servicios from '../components/Servicios.jsx'
import Portafolio from '../components/Portafolio.jsx'
import QuienesSomos from '../components/QuienesSomos.jsx'
import Contacto from '../components/Contacto.jsx'
import Footer from '../components/Footer.jsx'
import WhatsAppFloat from '../components/WhatsAppFloat.jsx'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Servicios />
        <Portafolio />
        <QuienesSomos />
        <Contacto />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
