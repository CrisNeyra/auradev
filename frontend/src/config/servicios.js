import imgSoftware from '../img/servicios/software.jpg'
import imgApps from '../img/servicios/apps.jpg'
import imgAutomatizacion from '../img/servicios/automatizacion.jpg'
import imgCrm from '../img/servicios/crm.jpg'
import imgIntegraciones from '../img/servicios/integraciones.jpg'
import imgSoporte from '../img/servicios/soporte.jpg'

export const servicios = [
  {
    id: 'software',
    titulo: 'Software a Medida',
    imagen: imgSoftware,
    imagenAlt: 'Desarrollador trabajando en software personalizado',
    opciones: [
      { texto: 'Desarrollo a la medida' },
      { texto: 'QA y Testing' },
      { texto: 'Arquitectura de software' },
      { texto: 'Evolución de producto' },
      { texto: 'Seguridad y auditoría' },
    ],
  },
  {
    id: 'apps',
    titulo: 'Aplicaciones Web y Móviles',
    imagen: imgApps,
    imagenAlt: 'Persona usando una aplicación móvil',
    opciones: [
      { texto: 'Apps iOS y Android' },
      { texto: 'Plataformas web' },
      { texto: 'Apps híbridas y PWA' },
      { texto: 'eCommerce y mCommerce' },
      { texto: 'Apps empresariales' },
    ],
  },
  {
    id: 'automatizacion',
    titulo: 'Automatizaciones',
    imagen: imgAutomatizacion,
    imagenAlt: 'Procesos automatizados con tecnología',
    opciones: [
      { texto: 'Automatización de procesos' },
      { texto: 'Flujos de trabajo (workflows)' },
      { texto: 'Integración con herramientas' },
      { texto: 'Reportes automáticos' },
      { texto: 'Bots y scripts a medida' },
    ],
  },
  {
    id: 'crm',
    titulo: 'Sistemas CRM',
    imagen: imgCrm,
    imagenAlt: 'Panel de análisis y gestión de clientes',
    opciones: [
      { texto: 'CRM personalizado' },
      { texto: 'Gestión de ventas y pipeline' },
      { texto: 'Seguimiento de clientes' },
      { texto: 'Dashboards y reportes' },
      { texto: 'Integración con email y WhatsApp' },
    ],
  },
  {
    id: 'integraciones',
    titulo: 'Integraciones y APIs',
    imagen: imgIntegraciones,
    imagenAlt: 'Infraestructura digital y conexiones entre sistemas',
    opciones: [
      { texto: 'APIs REST y GraphQL' },
      { texto: 'Webhooks y eventos' },
      { texto: 'Integración de terceros' },
      { texto: 'Middleware y conectores' },
      { texto: 'Sincronización de datos' },
    ],
  },
  {
    id: 'soporte',
    titulo: 'Soporte y Mantenimiento',
    imagen: imgSoporte,
    imagenAlt: 'Equipo de soporte técnico colaborando',
    opciones: [
      { texto: 'Soporte continuo' },
      { texto: 'Mantenimiento evolutivo' },
      { texto: 'Monitoreo y alertas' },
      { texto: 'Corrección de incidencias' },
      { texto: 'Actualizaciones de seguridad' },
    ],
  },
]

export const proyectosEspeciales = {
  titulo: 'Integración de proyectos especiales',
  descripcion:
    'Nos sumergimos en tecnologías emergentes para llevar tu negocio más allá del software tradicional. Integramos soluciones especiales que se conectan con tus sistemas actuales.',
  items: [
    'Inteligencia Artificial y Machine Learning',
    'IoT — Internet de las Cosas',
    'Business Intelligence y Analytics',
    'Chatbots y Asistentes Virtuales',
    'Automatización avanzada (RPA)',
    'Realidad Aumentada (RA)',
  ],
}
