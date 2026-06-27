import imgPortfolioCristian from '../img/portafolio/portfolio-cristian.jpg'
import imgAuraPro from '../img/portafolio/aura-pro.jpg'
import imgMobileSuite from '../img/portafolio/mobile-suite.jpg'
import imgModoZen from '../img/portafolio/modo-zen.jpg'
import imgCrowforza from '../img/portafolio/crowforza.jpg'
import imgLaxmar from '../img/portafolio/laxmar.jpg'

export const proyectos = [
  {
    slug: 'portfolio-cristian',
    nombre: 'Portfolio Cristian',
    categoria: 'Portfolio Web',
    descripcion:
      'Sitio personal de desarrollador fullstack con experiencia, formación, conocimientos y contacto directo.',
    descripcionLarga:
      'Portfolio profesional con hero inmersivo, secciones de experiencia laboral, formación académica, stack tecnológico y canal de contacto. Diseñado para presentar el perfil de forma clara y generar conversaciones con clientes o reclutadores.',
    tags: ['React', 'Node.js', 'Fullstack'],
    imagen: imgPortfolioCristian,
    tipoLink: 'externo',
    url: '#',
  },
  {
    slug: 'aura-pro',
    nombre: 'Aura PRO',
    categoria: 'E-commerce',
    descripcion:
      'Tienda online de periféricos y hardware gamer con catálogo, carrito y promociones en hero carousel.',
    descripcionLarga:
      'E-commerce orientado al gaming con buscador de productos, navegación por categorías, carrusel promocional, cuotas sin interés y destacados de envío y garantía. Interfaz oscura con acentos neón alineados a la estética gamer.',
    tags: ['React', 'E-commerce', 'UI/UX'],
    imagen: imgAuraPro,
    tipoLink: 'externo',
    url: '#',
  },
  {
    slug: 'mobile-suite',
    nombre: 'Mobile Suite',
    categoria: 'App Móvil',
    descripcion:
      'Desarrollo de interfaces móviles nativas e híbridas para iOS y Android.',
    descripcionLarga:
      'Showcase de desarrollo mobile con foco en apps nativas e híbridas, iconografía consistente, experiencias táctiles fluidas y despliegue en stores. Ideal para marcas que necesitan presencia móvil profesional.',
    tags: ['React Native', 'iOS', 'Android'],
    imagen: imgMobileSuite,
    tipoLink: 'interno',
    url: '#',
  },
  {
    slug: 'modo-zen',
    nombre: 'Modo Zen',
    categoria: 'Landing Page',
    descripcion:
      'Landing de bienestar y mindfulness con diseño visual inmersivo y estética calmada.',
    descripcionLarga:
      'Landing page de bienestar con composición visual serena, tipografía elegante y paleta pastel. Pensada para transmitir calma, equilibrio y conexión con prácticas de mindfulness o retiros de wellness.',
    tags: ['React', 'CSS', 'Branding'],
    imagen: imgModoZen,
    tipoLink: 'interno',
    url: '#',
  },
  {
    slug: 'crowforza',
    nombre: 'Crowforza',
    categoria: 'Catálogo Industrial',
    descripcion:
      'Catálogo web de herramientas industriales con búsqueda, categorías y marcas destacadas.',
    descripcionLarga:
      'Plataforma de catálogo industrial con hero de alto impacto, buscador avanzado, categorías de herramientas, carrito de compras e integración con marcas líderes del sector (Bosch, Makita, DeWalt, entre otras).',
    tags: ['React', 'Express', 'PostgreSQL'],
    imagen: imgCrowforza,
    tipoLink: 'externo',
    url: '#',
  },
  {
    slug: 'laxmar',
    nombre: 'Laxmar',
    categoria: 'Transporte',
    descripcion:
      'Plataforma de traslados provinciales y nacionales con cotización, flota y contacto WhatsApp.',
    descripcionLarga:
      'Sitio corporativo para empresa de transporte con propuesta de valor clara, información de flota (12 a 45 pasajeros), cotización de viajes, cobertura nacional y contacto directo por WhatsApp para turismo, empresas y eventos.',
    tags: ['React', 'Tailwind', 'WhatsApp'],
    imagen: imgLaxmar,
    tipoLink: 'externo',
    url: '#',
  },
]

export function getProyectoBySlug(slug) {
  return proyectos.find((p) => p.slug === slug)
}

export function getProyectoHref(proyecto) {
  if (proyecto.tipoLink === 'externo' && proyecto.url && proyecto.url !== '#') {
    return proyecto.url
  }
  return `/proyectos/${proyecto.slug}`
}

export function isLinkExterno(proyecto) {
  return proyecto.tipoLink === 'externo' && proyecto.url && proyecto.url !== '#'
}

export function hasUrlVivo(proyecto) {
  return Boolean(proyecto.url && proyecto.url !== '#')
}
