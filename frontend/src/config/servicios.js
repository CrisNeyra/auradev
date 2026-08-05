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
    resumen: 'Transformamos procesos complejos en herramientas digitales de alto rendimiento que impulsan la escalabilidad de tu empresa.',
    imagen: imgSoftware,
    imagenAlt: 'Desarrollador trabajando en software personalizado',
    opciones: [
      { 
        texto: 'Desarrollo a la medida', 
        detalle: 'Construimos el núcleo digital de tu negocio con código limpio y propietario, eliminando la dependencia de plataformas limitadas.' 
      },
      { 
        texto: 'QA y Testing', 
        detalle: 'Garantizamos la continuidad operativa mediante ciclos de prueba rigurosos que detectan fallos antes de que lleguen a producción.' 
      },
      { 
        texto: 'Arquitectura de software', 
        detalle: 'Diseñamos bases técnicas preparadas para soportar millones de datos y usuarios sin comprometer la velocidad ni la estabilidad.' 
      },
      { 
        texto: 'Evolución de producto', 
        detalle: 'Mantenemos tu software a la vanguardia del mercado, integrando nuevas funcionalidades que responden a los retos de tu industria.' 
      },
      { 
        texto: 'Seguridad y auditoría', 
        detalle: 'Blindamos la información confidencial de tu empresa y clientes bajo los estándares de cifrado más estrictos del sector tecnológico.' 
      },
    ],
  },
  {
    id: 'apps',
    titulo: 'Aplicaciones Web y Móviles',
    resumen: 'Creamos experiencias digitales inmersivas que conectan a tu marca con tus usuarios finales en cualquier dispositivo.',
    imagen: imgApps,
    imagenAlt: 'Persona usando una aplicación móvil',
    opciones: [
      { 
        texto: 'Apps iOS y Android', 
        detalle: 'Desarrollamos aplicaciones nativas que ofrecen un rendimiento nativo y acceso total a las capacidades del hardware móvil.' 
      },
      { 
        texto: 'Plataformas web', 
        detalle: 'Interfaces modernas de carga ultrarrápida diseñadas para convertir visitantes en clientes desde el primer segundo.' 
      },
      { 
        texto: 'Apps híbridas y PWA', 
        detalle: 'Maximizamos tu alcance y reducimos costos de mantenimiento con aplicaciones web instalables que funcionan sin conexión.' 
      },
      { 
        texto: 'eCommerce y mCommerce', 
        detalle: 'Sistemas de venta online optimizados para transacciones masivas, con flujos de pago seguros y gestión inteligente de inventario.' 
      },
      { 
        texto: 'Apps empresariales', 
        detalle: 'Herramientas tácticas para tu fuerza de ventas o equipo operativo, diseñadas para ser usadas en el campo con máxima eficiencia.' 
      },
    ],
  },
  {
    id: 'automatizacion',
    titulo: 'Automatizaciones',
    resumen: 'Liberamos el potencial humano de tu equipo eliminando las tareas repetitivas mediante flujos de trabajo inteligentes.',
    imagen: imgAutomatizacion,
    imagenAlt: 'Procesos automatizados con tecnología',
    opciones: [
      { 
        texto: 'Automatización de procesos', 
        detalle: 'Mapeamos tu flujo de trabajo y aplicamos lógica de servidor para ejecutar tareas de forma autónoma las 24 horas.' 
      },
      { 
        texto: 'Flujos de trabajo (workflows)', 
        detalle: 'Orquestamos la comunicación entre tus departamentos asegurando que la información llegue siempre a la persona correcta.' 
      },
      { 
        texto: 'Integración con herramientas', 
        detalle: 'Hacemos que tus aplicaciones actuales "hablen" entre sí, eliminando la carga manual de datos entre diferentes plataformas.' 
      },
      { 
        texto: 'Reportes automáticos', 
        detalle: 'Obtén tableros de control con información actualizada al minuto, permitiéndote tomar decisiones basadas en datos reales.' 
      },
      { 
        texto: 'Bots y scripts a medida', 
        detalle: 'Programas especializados para recolectar información, procesar archivos o interactuar con APIs externas de forma masiva.' 
      },
    ],
  },
  {
    id: 'crm',
    titulo: 'Sistemas CRM',
    resumen: 'Dominamos la gestión de datos para que tu equipo comercial multiplique sus cierres de venta mediante el seguimiento inteligente.',
    imagen: imgCrm,
    imagenAlt: 'Panel de análisis y gestión de clientes',
    opciones: [
      { 
        texto: 'CRM personalizado', 
        detalle: 'Un sistema que se adapta a tu embudo de ventas real, no al revés. Tú defines las reglas, nosotros construimos la lógica.' 
      },
      { 
        texto: 'Gestión de ventas y pipeline', 
        detalle: 'Control total sobre cada oportunidad de negocio con alertas de inactividad y recordatorios automáticos de seguimiento.' 
      },
      { 
        texto: 'Seguimiento de clientes', 
        detalle: 'Base de datos unificada con el historial completo de interacciones, permitiendo un trato VIP a cada uno de tus prospectos.' 
      },
      { 
        texto: 'Dashboards y reportes', 
        detalle: 'Analítica avanzada para identificar cuellos de botella en tu proceso comercial y premiar a tus mejores vendedores.' 
      },
      { 
        texto: 'Integración con email y WhatsApp', 
        detalle: 'Centraliza las conversaciones de todos tus canales directamente en el CRM, manteniendo el control de la comunicación.' 
      },
    ],
  },
  {
    id: 'integraciones',
    titulo: 'Integraciones y APIs',
    resumen: 'Derribamos los silos de información creando un ecosistema digital conectado y libre de fricciones técnicas.',
    imagen: imgIntegraciones,
    imagenAlt: 'Infraestructura digital y conexiones entre sistemas',
    opciones: [
      { 
        texto: 'APIs REST y GraphQL', 
        detalle: 'Desarrollamos interfaces de conexión de estándar internacional que permiten que tu empresa se conecte con el mundo.' 
      },
      { 
        texto: 'Webhooks y eventos', 
        detalle: 'Arquitectura orientada a eventos para que tus sistemas reaccionen instantáneamente a pagos, registros o nuevas órdenes.' 
      },
      { 
        texto: 'Integración de terceros', 
        detalle: 'Conectamos tu infraestructura con gigantes como Stripe, Salesforce, Google o cualquier SaaS que tu negocio utilice.' 
      },
      { 
        texto: 'Middleware y conectores', 
        detalle: 'Capas de software inteligentes que traducen y limpian los datos antes de pasarlos de un sistema antiguo a uno nuevo.' 
      },
      { 
        texto: 'Sincronización de datos', 
        detalle: 'Mantenemos la integridad de tu información asegurando que todos tus sistemas tengan la misma versión de la verdad.' 
      },
    ],
  },
  {
    id: 'soporte',
    titulo: 'Soporte y Mantenimiento',
    resumen: 'Protegemos tu inversión digital asegurando que tu infraestructura esté siempre operativa, segura y actualizada.',
    imagen: imgSoporte,
    imagenAlt: 'Equipo de soporte técnico colaborando',
    opciones: [
      { 
        texto: 'Soporte continuo', 
        detalle: 'Asistencia técnica experta para resolver incidencias en tiempo récord, minimizando cualquier posible tiempo de inactividad.' 
      },
      { 
        texto: 'Mantenimiento evolutivo', 
        detalle: 'Actualización periódica de librerías y lenguajes para evitar la deuda técnica y mantener tu software siempre veloz.' 
      },
      { 
        texto: 'Monitoreo y alertas', 
        detalle: 'Sistemas de vigilancia automática que nos avisan de cualquier anomalía antes de que el usuario final la perciba.' 
      },
      { 
        texto: 'Corrección de incidencias', 
        detalle: 'Gestión proactiva de errores y bugs mediante sistemas de tickets que aseguran una trazabilidad total de la solución.' 
      },
      { 
        texto: 'Actualizaciones de seguridad', 
        detalle: 'Aplicación inmediata de parches contra vulnerabilidades críticas, manteniendo tu servidor como un entorno infranqueable.' 
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
