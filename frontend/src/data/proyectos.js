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
    url: 'https://portfolio-cristian-neyra.vercel.app/',
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
    url: 'https://pagina-web-ventapc.vercel.app/',
  },
  {
    slug: 'crowgest',
    nombre: 'Crowgest',
    categoria: 'Sistema de Gestión',
    descripcion:
      'Plataforma web de gestión (Gest Crow) con acceso seguro por credenciales para administrar operaciones del negocio.',
    descripcionLarga:
      'Sistema de management online con pantalla de inicio de sesión, autenticación por correo y contraseña, y panel orientado a la administración de procesos. Pensado para centralizar la gestión del negocio en una interfaz web moderna y accesible desde cualquier dispositivo.',
    tags: ['React', 'Auth', 'Vercel'],
    imagen: imgMobileSuite,
    tipoLink: 'externo',
    url: 'https://crowgest.vercel.app/',
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
    tipoLink: 'externo',
    url: 'https://github.com/CrisNeyra/ModoZen',
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
    url: 'https://crowforza-pagina-web.vercel.app/',
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
    url: 'https://laxmar-web.vercel.app/',
  },
]

export function getProyectoBySlug(slug) {
  return proyectos.find((p) => p.slug === slug)
}

export function getProyectoHref(proyecto) {
  if (proyecto.url && /^https?:\/\//i.test(proyecto.url)) {
    return proyecto.url
  }
  return `/proyectos/${proyecto.slug}`
}

export function isLinkExterno(proyecto) {
  return Boolean(proyecto.url && /^https?:\/\//i.test(proyecto.url))
}

export function hasUrlVivo(proyecto) {
  return Boolean(proyecto.url && /^https?:\/\//i.test(proyecto.url))
}
