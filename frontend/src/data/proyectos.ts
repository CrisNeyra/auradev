import imgPortfolioCristian from '../img/portafolio/portfolio-cristian.jpg'
import imgAuraPro from '../img/portafolio/aura-pro.jpg'
import imgMobileSuite from '../img/portafolio/mobile-suite.jpg'
import imgEstudioSardo from '../img/portafolio/estudio-sardo.jpg'
import imgCrowforza from '../img/portafolio/crowforza.jpg'
import imgLaxmar from '../img/portafolio/laxmar.jpg'
import imgSublimados from '../img/portafolio/sublimados.jpg'
import imgLexmind from '../img/portafolio/lexmind-os.jpg'

/** Caso de portafolio (slug, copy, imagen y URL demo o repo). */
export interface Proyecto {
  slug: string
  nombre: string
  /** `web`: páginas y tiendas. `app`: aplicaciones móviles. */
  grupo: 'web' | 'app'
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
    grupo: 'web',
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
    grupo: 'web',
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
    url: 'https://proaurapro.vercel.app/',
  },
  {
    slug: 'crowgest',
    nombre: 'Crowgest',
    grupo: 'app',
    categoria: 'App móvil',
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
    slug: 'estudio-sardo',
    nombre: 'Estudio Sardo',
    grupo: 'web',
    categoria: 'Sitio institucional',
    descripcion:
      'Sitio del estudio jurídico Dra. Paula F. Sardo, con áreas de práctica, turnos y contacto por WhatsApp.',
    descripcionLarga:
      'Sitio institucional para un estudio jurídico de CABA y Provincia de Buenos Aires. Presenta áreas de práctica (laboral, familia, penal, civil y sucesiones), el proceso de trabajo, valores del estudio, un asistente para consultas iniciales, pedido de turno y WhatsApp. El diseño formal y la jerarquía tipográfica refuerzan confianza profesional.',
    problema:
      'El estudio necesitaba una presencia digital seria para explicar servicios, captar consultas y derivar turnos sin depender solo del teléfono o del boca a boca.',
    porQueStack:
      'Next.js en Vercel para un sitio rápido y con buen SEO; WhatsApp y turnos como canales de conversión que el cliente ya usa en la operatoria diaria.',
    desafio:
      'Transmitir seriedad legal en desktop y móvil, y sumar un asistente de consultas que oriente al visitante sin reemplazar el criterio del estudio.',
    tags: ['Next.js', 'Vercel', 'WhatsApp'],
    imagen: imgEstudioSardo,
    url: 'https://estudiosardoflorencia.vercel.app/',
  },
  {
    slug: 'crowforza',
    nombre: 'Crowforza',
    grupo: 'web',
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
    grupo: 'web',
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
  {
    slug: 'sublimados',
    nombre: 'Sublimados',
    grupo: 'web',
    categoria: 'Tienda web',
    descripcion:
      'Tienda de remeras sublimadas con personalizador en vivo, catálogo y pedido por WhatsApp.',
    descripcionLarga:
      'Sitio de ¡¡The Shirt!! para armar remeras en un simulador: color, diseño, posición, rotación, tamaño y talle. Incluye catálogo, trabajos realizados y un formulario que abre WhatsApp con la consulta lista.',
    problema:
      'El taller recibía pedidos sueltos por chat y necesitaba que el cliente viera el estampado sobre la remera antes de cotizar.',
    porQueStack:
      'Sitio estático en Vercel, rápido de cargar, con el personalizador en el cliente y WhatsApp como cierre de venta, que es el canal real del taller.',
    desafio:
      'Que el mockup se entienda en el celular, donde se arman la mayoría de los pedidos, sin prometer una prueba de color de imprenta.',
    tags: ['React', 'E-commerce', 'WhatsApp'],
    imagen: imgSublimados,
    url: 'https://sublimados-web.vercel.app/',
  },
  {
    slug: 'lexmind-os',
    nombre: 'LexMind OS',
    grupo: 'app',
    categoria: 'App móvil',
    descripcion:
      'Sistema de gestión legal para estudios: expedientes, agenda, documentos y honorarios.',
    descripcionLarga:
      'LexMind OS centraliza la operatoria de un estudio jurídico: panel general, expedientes, agenda y plazos, bóveda documental, asesor, honorarios y conectores. Pensado para usarse desde el teléfono, con los datos del estudio protegidos.',
    problema:
      'Causas, vencimientos y documentos vivían en carpetas y chats. El estudio necesitaba un solo lugar para seguir cada expediente.',
    porQueStack:
      'App web desplegada en Vercel, accesible desde el celular sin instalar nada, con módulos separados para no mezclar plazos, archivos y honorarios.',
    desafio:
      'Mostrar mucha información legal en una pantalla chica y dejar claro qué dato es sensible antes de compartirlo.',
    tags: ['React', 'Gestión', 'Vercel'],
    imagen: imgLexmind,
    url: 'https://lexmind-os-rho.vercel.app/',
  },
]

/** Casos de páginas web y tiendas. */
export function proyectosWeb(): Proyecto[] {
  return proyectos.filter((p) => p.grupo === 'web')
}

/** Casos de aplicaciones móviles. */
export function proyectosApp(): Proyecto[] {
  return proyectos.filter((p) => p.grupo === 'app')
}

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
