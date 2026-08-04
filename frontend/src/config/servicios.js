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
    resumen: 'Desarrollamos soluciones únicas diseñadas específicamente para resolver los desafíos de tu negocio.',
    imagen: imgSoftware,
    imagenAlt: 'Desarrollador trabajando en software personalizado',
    opciones: [
      { 
        texto: 'Desarrollo a la medida', 
        detalle: 'Creamos aplicaciones desde cero utilizando las tecnologías más modernas, adaptándonos 100% a tus procesos internos.' 
      },
      { 
        texto: 'QA y Testing', 
        detalle: 'Aseguramos la calidad de cada entrega con pruebas rigurosas, manuales y automatizadas, para garantizar un software libre de errores.' 
      },
      { 
        texto: 'Arquitectura de software', 
        detalle: 'Diseñamos estructuras sólidas y escalables que permiten que tu sistema crezca sin problemas técnicos en el futuro.' 
      },
      { 
        texto: 'Evolución de producto', 
        detalle: 'Acompañamos el crecimiento de tu software añadiendo nuevas funcionalidades según las necesidades cambiantes del mercado.' 
      },
      { 
        texto: 'Seguridad y auditoría', 
        detalle: 'Protegemos tus datos y los de tus clientes mediante auditorías constantes y la implementación de protocolos de seguridad avanzados.' 
      },
    ],
  },
  {
    id: 'apps',
    titulo: 'Aplicaciones Web y Móviles',
    resumen: 'Llevamos tu presencia digital a cualquier dispositivo con interfaces intuitivas y de alto rendimiento.',
    imagen: imgApps,
    imagenAlt: 'Persona usando una aplicación móvil',
    opciones: [
      { 
        texto: 'Apps iOS y Android', 
        detalle: 'Desarrollamos aplicaciones nativas o multiplataforma que aprovechan al máximo el hardware de los smartphones actuales.' 
      },
      { 
        texto: 'Plataformas web', 
        detalle: 'Construimos sitios web dinámicos y responsivos que ofrecen una experiencia de usuario fluida en cualquier navegador.' 
      },
      { 
        texto: 'Apps híbridas y PWA', 
        detalle: 'Creamos soluciones que combinan lo mejor de la web y las apps móviles, optimizando costos y tiempos de desarrollo.' 
      },
      { 
        texto: 'eCommerce y mCommerce', 
        detalle: 'Implementamos tiendas online seguras y optimizadas para maximizar tus ventas desde cualquier dispositivo.' 
      },
      { 
        texto: 'Apps empresariales', 
        detalle: 'Desarrollamos herramientas internas para mejorar la productividad de tu equipo, desde gestión de tareas hasta control de stock.' 
      },
    ],
  },
  {
    id: 'automatizacion',
    titulo: 'Automatizaciones',
    resumen: 'Elimina tareas repetitivas y optimiza tus tiempos con flujos inteligentes de trabajo.',
    imagen: imgAutomatizacion,
    imagenAlt: 'Procesos automatizados con tecnología',
    opciones: [
      { 
        texto: 'Automatización de procesos', 
        detalle: 'Identificamos tareas manuales repetitivas y las convertimos en procesos automáticos eficientes.' 
      },
      { 
        texto: 'Flujos de trabajo (workflows)', 
        detalle: 'Diseñamos cadenas de acciones automáticas que conectan diferentes áreas de tu empresa de forma transparente.' 
      },
      { 
        texto: 'Integración con herramientas', 
        detalle: 'Conectamos tu software actual con herramientas externas para centralizar la información y evitar duplicidad de datos.' 
      },
      { 
        texto: 'Reportes automáticos', 
        detalle: 'Generamos informes periódicos con los datos clave de tu negocio sin que tengas que mover un dedo.' 
      },
      { 
        texto: 'Bots y scripts a medida', 
        detalle: 'Desarrollamos pequeños programas especializados para realizar tareas específicas de forma ultrarrápida.' 
      },
    ],
  },
  {
    id: 'crm',
    titulo: 'Sistemas CRM',
    resumen: 'Centraliza la relación con tus clientes y potencia tus ventas con datos en tiempo real.',
    imagen: imgCrm,
    imagenAlt: 'Panel de análisis y gestión de clientes',
    opciones: [
      { 
        texto: 'CRM personalizado', 
        detalle: 'Construimos el sistema de gestión de clientes que realmente necesitas, sin funciones innecesarias que compliquen el uso.' 
      },
      { 
        texto: 'Gestión de ventas y pipeline', 
        detalle: 'Visualiza y controla cada etapa de tu embudo de ventas para cerrar más negocios en menos tiempo.' 
      },
      { 
        texto: 'Seguimiento de clientes', 
        detalle: 'Mantén un registro histórico de todas las interacciones, correos y llamadas para ofrecer un trato personalizado.' 
      },
      { 
        texto: 'Dashboards y reportes', 
        detalle: 'Accede a gráficos interactivos que muestran el rendimiento de tu equipo comercial de forma clara.' 
      },
      { 
        texto: 'Integración con email y WhatsApp', 
        detalle: 'Conecta tu CRM con tus canales de comunicación preferidos para gestionar todo desde un solo lugar.' 
      },
    ],
  },
  {
    id: 'integraciones',
    titulo: 'Integraciones y APIs',
    resumen: 'Conectamos tus sistemas para que la información fluya sin barreras en toda tu infraestructura.',
    imagen: imgIntegraciones,
    imagenAlt: 'Infraestructura digital y conexiones entre sistemas',
    opciones: [
      { 
        texto: 'APIs REST y GraphQL', 
        detalle: 'Diseñamos y desarrollamos interfaces de programación potentes para que tus aplicaciones se comuniquen entre sí.' 
      },
      { 
        texto: 'Webhooks y eventos', 
        detalle: 'Implementamos sistemas de notificaciones en tiempo real que reaccionan instantáneamente a cualquier cambio en tus datos.' 
      },
      { 
        texto: 'Integración de terceros', 
        detalle: 'Conectamos tu sistema con servicios externos como pasarelas de pago, servicios de mapas o redes sociales.' 
      },
      { 
        texto: 'Middleware y conectores', 
        detalle: 'Desarrollamos capas intermedias de software que facilitan la comunicación entre sistemas incompatibles.' 
      },
      { 
        texto: 'Sincronización de datos', 
        detalle: 'Aseguramos que la información esté actualizada y sea consistente en todas tus bases de datos y plataformas.' 
      },
    ],
  },
  {
    id: 'soporte',
    titulo: 'Soporte y Mantenimiento',
    resumen: 'Acompañamos tu crecimiento asegurando que tu tecnología funcione siempre a la perfección.',
    imagen: imgSoporte,
    imagenAlt: 'Equipo de soporte técnico colaborando',
    opciones: [
      { 
        texto: 'Soporte continuo', 
        detalle: 'Estamos disponibles para resolver cualquier duda o inconveniente técnico que surja en el día a día.' 
      },
      { 
        texto: 'Mantenimiento evolutivo', 
        detalle: 'Realizamos pequeñas mejoras y ajustes constantes para que tu software no se quede atrás.' 
      },
      { 
        texto: 'Monitoreo y alertas', 
        detalle: 'Vigilamos tus sistemas 24/7 para detectar y solucionar problemas incluso antes de que te des cuenta.' 
      },
      { 
        texto: 'Corrección de incidencias', 
        detalle: 'Actuamos de forma inmediata ante cualquier fallo para minimizar el impacto en tu negocio.' 
      },
      { 
        texto: 'Actualizaciones de seguridad', 
        detalle: 'Mantenemos tus servidores y aplicaciones con los últimos parches de seguridad para prevenir ataques.' 
      },
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
