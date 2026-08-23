import imgPortfolioCristian from '../img/portafolio/portfolio-cristian.jpg'
import imgAuraPro from '../img/portafolio/aura-pro.jpg'
import imgMobileSuite from '../img/portafolio/mobile-suite.jpg'
import imgModoZen from '../img/portafolio/modo-zen.jpg'
import imgCrowforza from '../img/portafolio/crowforza.jpg'
import imgLaxmar from '../img/portafolio/laxmar.jpg'

/** Caso de portafolio (slug, copy, imagen y URL demo o repo). */
export interface Proyecto {
  slug: string
  nombre: string
  categoria: string
  descripcion: string
  descripcionLarga: string
  problema: string
  porQueStack: string
  desafio: string
  tags: string[]
  imagen: string
  url: string
}

/** Casos publicados en el sitio. */
export const proyectos: Proyecto[] = [
  {
    slug: 'portfolio-cristian',
    nombre: 'Portfolio Cristian',
    categoria: 'Portfolio Web',
    descripcion:
      'Sitio personal de desarrollador fullstack con experiencia, formación, conocimientos y contacto directo.',
    descripcionLarga:
      'Portfolio profesional con hero inmersivo, secciones de experiencia laboral, formación académica, stack tecnológico y canal de contacto. Diseñado para presentar el perfil de forma clara y generar conversaciones con clientes o reclutadores.',
    problema:
      'Un desarrollador necesita un sitio propio que reemplace el PDF estático y permita mostrar proyectos reales con enlaces vivos.',
    porQueStack:
      'React + Vite para iteración rápida y deploy en Vercel; CSS modular para mantener el diseño sin depender de un framework UI pesado.',
    desafio:
      'Equilibrar animaciones de marca con tiempos de carga aceptables y una jerarquía visual que funcione en móvil y desktop.',
    tags: ['React', 'Node.js', 'Fullstack'],
    imagen: imgPortfolioCristian,
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
    problema:
      'Una tienda de hardware gamer necesitaba presencia online con catálogo navegable y sensación de tienda profesional, no solo un listado estático.',
    porQueStack:
      'React para componentes reutilizables (cards, carrusel, filtros) y Vercel para demo rápida sin administrar servidor propio.',
    desafio:
      'Diseño oscuro con contraste suficiente para accesibilidad y carrusel promocional sin penalizar el first paint.',
    tags: ['React', 'E-commerce', 'UI/UX'],
    imagen: imgAuraPro,
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
    problema:
      'Operaciones dispersas en hojas de cálculo y mensajes; el negocio necesitaba un panel central con acceso controlado.',
    porQueStack:
      'React en frontend y autenticación en la API para separar UI y lógica de negocio; deploy en Vercel para acceso remoto del equipo.',
    desafio:
      'Flujo de login seguro y UX de panel que escale cuando se agregan módulos sin rehacer la navegación.',
    tags: ['React', 'Auth', 'Vercel'],
    imagen: imgMobileSuite,
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
    problema:
      'Una marca de bienestar necesitaba una landing que transmita calma antes que información técnica o venta agresiva.',
    porQueStack:
      'React + CSS puro para control fino de tipografía, espaciado y gradientes sin librerías que impongan estética genérica.',
    desafio:
      'Lograr inmersión visual con assets livianos y animaciones sutiles que no contradigan el mensaje de tranquilidad.',
    tags: ['React', 'CSS', 'Branding'],
    imagen: imgModoZen,
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
    problema:
      'Distribuidor industrial con catálogo amplio necesitaba búsqueda y filtros en web, no solo PDFs por email.',
    porQueStack:
      'React en frontend, Express + PostgreSQL en backend para catálogo consultable y futura integración con stock o pedidos.',
    desafio:
      'Modelar categorías y marcas sin duplicar datos y mantener tiempos de respuesta con consultas filtradas.',
    tags: ['React', 'Express', 'PostgreSQL'],
    imagen: imgCrowforza,
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
    problema:
      'Empresa de transporte con consultas repetidas por WhatsApp necesitaba sitio que explique servicios y canalice leads.',
    porQueStack:
      'React + Tailwind para iterar layout responsive rápido; enlace directo a WhatsApp para el canal que ya usan los clientes.',
    desafio:
      'Presentar flota y cobertura geográfica de forma clara en mobile, donde llegan la mayoría de las consultas.',
    tags: ['React', 'Tailwind', 'WhatsApp'],
    imagen: imgLaxmar,
    url: 'https://laxmar-web.vercel.app/',
  },
]

/** Busca un proyecto por `slug` de la URL. */
export function getProyectoBySlug(slug: string | undefined): Proyecto | undefined {
  return proyectos.find((p) => p.slug === slug)
}

/** Ruta interna de detalle: `/proyectos/:slug`. */
export function getProyectoHref(proyecto: Proyecto): string {
  return `/proyectos/${proyecto.slug}`
}

/** `true` si `url` es un enlace http(s) vivo (no repo placeholder vacío). */
export function hasUrlVivo(proyecto: Proyecto): boolean {
  return Boolean(proyecto.url && /^https?:\/\//i.test(proyecto.url))
}
