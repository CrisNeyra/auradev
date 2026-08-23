import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Servicios from '../components/Servicios'
import Portafolio from '../components/Portafolio'
import QuienesSomos from '../components/QuienesSomos'
import TrabajaConNosotros from '../components/TrabajaConNosotros'
import Contacto from '../components/Contacto'
import Footer from '../components/Footer'
import WhatsAppFloat from '../components/WhatsAppFloat'

/** Landing: navbar, secciones y footer. */
export default function Home() {
  return (
    <>
      <Navbar />
      <main id="contenido" tabIndex={-1}>
        <Hero />
        <Servicios />
        <Portafolio />
        <QuienesSomos />
        <TrabajaConNosotros />
        <Contacto />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
