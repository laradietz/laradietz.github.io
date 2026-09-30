import type { ArchivedProject, Project } from './types'

/**
 * Sources: each project's README and code, plus Lara's CV. Nothing here is estimated or
 * invented; values that don't exist yet are marked with `pending()`.
 */
export const projects: Project[] = [
  {
    slug: 'portal-cafe',
    name: 'Portal Café',
    year: 2026,
    kind: 'Sitio web + panel de administración',
    tagline: 'La web de una cafetería de especialidad, editable desde el celular.',
    summary:
      'Sitio oficial de Portal Café (San Miguel, Buenos Aires): una página animada y prerenderizada para SEO, y un panel donde el local edita la carta, los precios, los horarios y el contacto sin tocar código.',
    status: 'En producción · trabajo para un cliente, código privado',
    stack: ['react', 'typescript', 'vite', 'tailwind', 'motion', 'supabase', 'postgresql', 'node', 'vercel', 'html', 'css'],
    problem:
      'Una cafetería necesitaba una web que transmitiera la experiencia del local y que su propio equipo pudiera mantener al día (carta, precios, promos, horarios) desde el celular, sin depender de un desarrollador para cada cambio.',
    solution: [
      'Separé el proyecto en dos entradas de Vite: el sitio público, prerenderizado a HTML estático y animado con Motion, y un panel en /admin con login, que es el único bundle que carga el SDK de Supabase.',
      'El sitio muestra primero el contenido del último build y después lo actualiza desde la API REST de Supabase con fetch. Los cambios del panel se ven al instante, sin volver a publicar, y el sitio funciona igual si la base no responde.',
    ],
    features: [
      {
        title: 'Carta editable en vivo',
        body: 'Categorías, productos, precios chico/grande, fotos, etiquetas (Nuevo, Edición limitada, Próximamente) y Agotado. Las fotos se achican en el navegador a WebP de 1600 px antes de subirse.',
      },
      {
        title: 'Estado del local en tiempo real',
        body: '"Abierto · cierra 21 h" se calcula con el horario cargado en el panel y la zona horaria de Buenos Aires.',
      },
      {
        title: 'Una mascota que recorre la página',
        body: 'El vasito entra en el hero, baja por un riel que funciona como indicador de progreso y le pasa la posta a la mascota del CTA final. En mobile camina sobre la barra de accesos rápidos.',
      },
      {
        title: 'Generador de QR oficial',
        body: 'Descarga en SVG y PNG, cartel A6/A4 para imprimir y corrección de errores nivel H. Si el dominio no es https o es local, bloquea la impresión para que nunca se imprima un QR incorrecto.',
      },
      {
        title: 'Administradores desde el panel',
        body: 'Dar y quitar accesos sin entrar a Supabase. Lo resuelve una función serverless que verifica al usuario y usa la clave secreta solo en el servidor.',
      },
    ],
    architecture: {
      summary: 'Dos bundles, una fuente de verdad. El HTML estático garantiza SEO y velocidad; Supabase aporta edición en vivo.',
      layers: [
        {
          name: 'Sitio público',
          detail: 'React 19 · Motion · prerender',
          items: ['HTML estático + JSON-LD CafeOrCoffeeShop', 'Lee la API REST con fetch, sin SDK', 'Animaciones con MotionValues, sin re-renders'],
        },
        {
          name: 'Panel /admin',
          detail: 'Bundle separado',
          items: ['Login y recuperación de contraseña', 'Editores de carta, local y contacto', 'Código QR y administradores'],
        },
        {
          name: 'Servidor',
          detail: 'Vercel Function',
          items: ['api/admins.ts verifica que quien llama sea admin', 'service_role nunca llega al navegador'],
        },
        {
          name: 'Datos',
          detail: 'Supabase · PostgreSQL',
          items: ['Políticas RLS: solo admins escriben', 'Bucket de fotos', 'Contenido por defecto como fallback'],
        },
      ],
    },
    decisions: [
      {
        title: 'El SDK solo donde hace falta',
        body: 'Quien visita la cafetería no descarga el cliente de Supabase: el sitio público lee la API REST con fetch. El panel, que sí lo necesita, vive en su propio bundle.',
      },
      {
        title: 'Movimiento sin re-renders',
        body: 'Todo el recorrido de la mascota sale de valores de Motion ligados al scroll. Las secciones se detectan con IntersectionObserver y las medidas se recalculan solo cuando cambia el tamaño de la página.',
      },
      {
        title: 'Seguridad en la base, no en la UI',
        body: 'La anon key es pública por diseño: las escrituras están protegidas por RLS y solo las pueden hacer los usuarios de la tabla de administradores.',
      },
      {
        title: 'Imágenes con pipeline propio',
        body: 'Un script genera WebP en varios anchos y un registro tipado con dimensiones y color de carga, para servir srcset correctos sin saltos de layout.',
      },
    ],
    outcome: [
      'Sitio y panel completos, con build de producción que genera el HTML, robots.txt y sitemap.xml.',
      'El local puede actualizar la carta y los precios desde el celular, y los cambios se ven al instante.',
      'Todo el movimiento respeta prefers-reduced-motion: sin recorrido animado, la mascota queda quieta en el hero y en el final.',
    ],
    facts: [
      { value: '2', label: 'bundles independientes: sitio y panel' },
      { value: '≈5.600', label: 'líneas de TypeScript' },
      { value: '0', label: 'renders de React por frame de scroll' },
      { value: 'H', label: 'corrección del QR: tolera hasta 30 %' },
    ],
    // The repository is private (client work): only the live site is linked.
    links: { demo: 'https://portal-cafe.vercel.app/', repo: null },
    media: {
      kind: 'screens',
      cover: 'portal-cafe/hero',
      desktop: [
        { image: 'portal-cafe/hero', caption: 'Hero con Aileron, la tipografía de la carta impresa del local.' },
        { image: 'portal-cafe/carta', caption: 'Carta con pestañas, precios chico/grande y promo Happy Portal.' },
        { image: 'portal-cafe/experiencia', caption: 'Texto que se revela palabra por palabra con el scroll.' },
        { image: 'portal-cafe/momentos', caption: '"Tu día en Portal": momentos con precios derivados de la carta.' },
        { image: 'portal-cafe/galeria', caption: 'Galería con fotos del local y links a Instagram.' },
        { image: 'portal-cafe/visitanos', caption: 'Dirección, horario en vivo, Happy Portal y contacto.' },
        { image: 'portal-cafe/panel-qr', caption: 'Panel: generador del QR oficial con bloqueo de impresión.' },
      ],
      mobile: [
        { image: 'portal-cafe/mobile-hero', caption: 'Hero mobile' },
        { image: 'portal-cafe/mobile-carta', caption: 'Carta mobile' },
        { image: 'portal-cafe/mobile-momentos', caption: 'Tu día, mobile' },
      ],
    },
  },
  {
    slug: 'lifehub',
    name: 'LifeHub',
    alias: 'Life Under Control',
    year: 2026,
    kind: 'Aplicación web full stack',
    tagline: 'Tareas, finanzas, compras, vencimientos y más, en un solo panel.',
    summary:
      'Plataforma de organización personal y del hogar que centraliza tareas, gastos, suscripciones, compras, documentos, vehículos y calendario, con hogares multiusuario y notificaciones.',
    status: 'Fase 11 completada',
    stack: ['react', 'typescript', 'vite', 'tailwind', 'zustand', 'react-router', 'axios', 'python', 'fastapi', 'sqlalchemy', 'postgresql', 'alembic', 'jwt', 'docker', 'nginx', 'vitest', 'pytest'],
    problem:
      'Organizar la vida cotidiana implica saltar entre notas, home banking, listas de compras, recordatorios sueltos y un calendario desactualizado. Nada conversa entre sí, y las cosas se olvidan: una suscripción que se cobra, un seguro que vence.',
    solution: [
      'Un único panel que responde "¿qué tengo que hacer hoy?", "¿en qué gasté este mes?" y "¿qué está por vencer?". El dashboard es configurable: cada persona elige qué widgets ver.',
      'La API sigue una arquitectura por capas (endpoint → service → repository → modelo) y el frontend concentra el estado global en Zustand, con un cliente Axios que renueva la sesión de forma transparente.',
    ],
    features: [
      { title: 'Hogares multiusuario', body: 'Invitaciones por email, roles dueño/miembro y tareas, listas y eventos compartidos. Solo quien crea algo puede borrarlo.' },
      { title: 'Finanzas y suscripciones', body: 'Resumen mensual, comparación con el mes anterior, gráficos por categoría y cálculo del gasto mensual y anual de cada suscripción.' },
      { title: 'Compras inteligentes', body: 'Sugerencias de recompra calculadas con el historial propio, presentadas siempre como sugerencia y nunca como certeza.' },
      { title: 'Documentos y vehículos', body: 'Adjuntos en almacenamiento S3-compatible servidos siempre por proxy, y mantenimientos que actualizan el odómetro.' },
      { title: 'Notificaciones', body: 'Chequeo periódico cada 15 minutos de vencimientos, documentos, mantenimientos y eventos, por canal in-app y email.' },
      { title: 'Dark mode real', body: 'Claro, oscuro o sistema, sincronizado en vivo con el sistema operativo y persistido entre sesiones.' },
    ],
    architecture: {
      summary: 'Cada capa se puede testear y reemplazar por separado. Todo corre en contenedores, en desarrollo y en producción.',
      layers: [
        { name: 'Frontend', detail: 'React 19 · TypeScript · Vite', items: ['Zustand para el estado global', 'Axios con interceptores de refresh', 'Rutas protegidas y públicas'] },
        { name: 'API', detail: 'FastAPI · Pydantic v2', items: ['Routers → services → repositories', 'Manejo centralizado de errores', 'APScheduler para notificaciones'] },
        { name: 'Datos', detail: 'PostgreSQL 16 · SQLAlchemy 2.0', items: ['20 tablas migradas con Alembic', 'MinIO (S3) para archivos'] },
        { name: 'Infra', detail: 'Docker Compose · nginx', items: ['Compose de desarrollo y de producción', 'Build multi-stage del frontend'] },
      ],
    },
    decisions: [
      { title: 'Sesiones que se cierran de verdad', body: 'Refresh tokens persistidos y revocables: el logout invalida la sesión en el servidor, no solo en el cliente.' },
      { title: 'Tests contra IDOR', body: 'Cada módulo verifica que un usuario no pueda ver ni modificar datos de otro.' },
      { title: 'Modales accesibles', body: 'Foco atrapado dentro del modal, Escape cierra y devuelve el foco a quien lo abrió, con auditoría automática usando jest-axe.' },
    ],
    outcome: [
      'Todos los módulos funcionan de punta a punta, con empaquetado de producción.',
      'La fase de asistente de IA se descartó a propósito para priorizar lo que el producto realmente necesitaba.',
    ],
    facts: [
      { value: '115', label: 'tests de backend con pytest' },
      { value: '72', label: 'tests de frontend con Vitest' },
      { value: '20', label: 'tablas en PostgreSQL' },
      { value: '11', label: 'fases completadas' },
    ],
    links: { demo: null, repo: 'https://github.com/laradietz/lifehub' },
    media: { kind: 'motif', motif: 'modules' },
  },
  {
    slug: 'marketing-attribution',
    name: 'Marketing Attribution Platform',
    year: 2026,
    kind: 'SaaS full stack',
    tagline: '¿Qué canal generó realmente esta venta? Cinco respuestas auditables.',
    summary:
      'Registra el recorrido de cada cliente entre canales de marketing y calcula cuánto crédito le corresponde a cada touchpoint en una conversión, bajo cinco modelos de atribución documentados.',
    status: 'Completo',
    stack: ['react', 'typescript', 'vite', 'tailwind', 'recharts', 'react-router', 'axios', 'java', 'spring-boot', 'spring-security', 'jpa', 'jwt', 'postgresql', 'flyway', 'docker', 'junit'],
    problem:
      'Un cliente rara vez convierte por un solo anuncio. La mayoría de las herramientas asigna el 100 % al último clic y esconde el cálculo, subestimando los canales que iniciaron el recorrido.',
    solution: [
      'Implementé cinco modelos (First Touch, Last Touch, Linear, Time Decay y Position Based) sobre los mismos datos, para comparar cómo cambia el crédito según el modelo en el que confíes, con la fórmula visible detrás de cada número.',
      'El motor es Java puro, desacoplado de Spring, con el patrón Strategy. Cada estrategia solo produce un "peso crudo" y un utilitario compartido convierte esos pesos en números exactos.',
    ],
    features: [
      { title: 'Workspaces multi-tenant', body: 'Los datos de cada workspace están aislados en el servidor, con roles Admin, Marketing Manager y Analyst.' },
      { title: 'Ingesta de touchpoints', body: 'Carga manual o automática vía parámetros UTM, con un intérprete que clasifica canal y tipo de forma determinística.' },
      { title: 'Customer journey', body: 'Timeline del recorrido de cada cliente y tablas comparativas de atribución por modelo.' },
      { title: 'Reportes', body: 'Dashboard y exportación a CSV.' },
    ],
    architecture: {
      summary: 'Controladores finos, servicios con las reglas de negocio y un motor de atribución sin dependencias de framework.',
      layers: [
        { name: 'Frontend', detail: 'React 19 · Recharts', items: ['Cliente Axios tipado', 'Sin lógica de negocio en la UI'] },
        { name: 'API REST', detail: '@RestController', items: ['DTOs con @Valid', 'Delegan todo al servicio'] },
        { name: 'Servicios', detail: 'Reglas + transacciones', items: ['WorkspaceAccessService en cada operación'] },
        { name: 'Motor', detail: 'Java puro · Strategy', items: ['5 AttributionStrategy', 'ProportionalRounder', 'BigDecimal, nunca double'] },
        { name: 'Datos', detail: 'PostgreSQL · Flyway', items: ['Spring Data JPA', 'Migraciones versionadas'] },
      ],
    },
    decisions: [
      {
        title: 'El 100 % tiene que dar 100 %',
        body: 'Repartir $100.000 en tres da $33.333,33 periódico. El redondeador asigna el resto al último touchpoint para que porcentajes y montos sumen exactamente el total.',
      },
      {
        title: 'Plata desde los pesos crudos',
        body: 'Calcular el dinero desde el peso ya redondeado perdía centavos. Un test de regresión lo detectó y el monto se recalcula desde los pesos originales.',
      },
    ],
    outcome: [
      'Motor y API cubiertos con tests unitarios e integración end-to-end, incluidos casos límite de redondeo y aislamiento entre workspaces.',
    ],
    facts: [
      { value: '5', label: 'modelos de atribución' },
      { value: '3', label: 'roles por workspace' },
      { value: '100,00 %', label: 'exacto en cada conversión' },
    ],
    links: { demo: null, repo: 'https://github.com/laradietz/marketing-attribution-platform' },
    media: { kind: 'motif', motif: 'attribution' },
    playground: 'attribution',
  },
  {
    slug: 'turnos-medicos',
    name: 'Turnos Médicos',
    year: 2026,
    kind: 'API REST · backend',
    tagline: 'Turnos, pacientes y médicos de una clínica, con acceso por rol.',
    summary:
      'Sistema de gestión de turnos médicos con una API REST en Spring Boot, autenticación JWT y un modelo relacional completo de la clínica: agenda, consultas, recetas, pagos y notificaciones.',
    status: 'Completo',
    stack: ['java', 'spring-boot', 'spring-security', 'jpa', 'jwt', 'postgresql', 'sql', 'maven', 'javascript', 'html', 'css'],
    problem:
      'Una clínica necesita coordinar la agenda de cada médico, los datos de pacientes y obras sociales, y el historial clínico, con permisos distintos para quien atiende, quien recibe y quien administra.',
    solution: [
      'Una API REST con más de 20 endpoints organizada en controller → service → repository → entity, con DTOs mapeados con MapStruct y validación con Bean Validation.',
      'Autenticación stateless con JWT, contraseñas con BCrypt y acceso diferenciado para Admin, Médico y Recepcionista. El frontend en JavaScript incluye un calendario de disponibilidad por médico.',
    ],
    features: [
      { title: 'Agenda', body: 'Horarios, disponibilidad y turnos con historial de cambios de estado.' },
      { title: 'Historia clínica', body: 'Consultas, recetas con ítems y estudios médicos.' },
      { title: 'Pacientes y coberturas', body: 'Pacientes con sus obras sociales, médicos con especialidades y consultorios.' },
      { title: 'Pagos y notificaciones', body: 'Pagos, facturas, notificaciones y configuración del sistema.' },
    ],
    architecture: {
      summary: 'Capas clásicas de Spring con entidades base para auditoría y borrado lógico.',
      layers: [
        { name: 'Controller', detail: 'REST', items: ['Auth, pacientes, médicos, turnos, clínica, pagos'] },
        { name: 'Service', detail: 'Reglas de negocio', items: ['Disponibilidad y agenda', 'Excepciones de negocio centralizadas'] },
        { name: 'Repository', detail: 'Spring Data JPA', items: ['JpaRepository por entidad'] },
        { name: 'Entity', detail: 'JPA / Hibernate', items: ['BaseEntity: UUID + auditoría', 'SoftDeleteEntity: deleted_at'] },
        { name: 'DTO', detail: 'MapStruct', items: ['Entrada y salida separadas del modelo'] },
      ],
    },
    decisions: [
      { title: 'Nunca borrar datos clínicos', body: 'Una entidad base agrega deleted_at: los registros se marcan como eliminados en lugar de desaparecer.' },
      { title: 'Errores con forma única', body: 'Un GlobalExceptionHandler traduce excepciones de negocio y "no encontrado" a respuestas consistentes.' },
    ],
    outcome: ['Resolví problemas reales de integración entre Hibernate/JPA y PostgreSQL durante la puesta en marcha del sistema.'],
    facts: [
      { value: '23', label: 'entidades de dominio' },
      { value: '20+', label: 'endpoints REST' },
      { value: '3', label: 'roles con permisos distintos' },
    ],
    links: { demo: null, repo: 'https://github.com/laradietz/Turnos_medicos' },
    media: { kind: 'motif', motif: 'layers' },
  },
  {
    slug: 'ferreteria',
    name: 'Ferretería Gian',
    year: 2026,
    kind: 'Aplicación de escritorio',
    tagline: 'Stock, ventas, caja y clientes de una ferretería, en una app instalable.',
    summary:
      'Sistema de gestión para una ferretería: punto de venta, inventario con alertas de stock, caja diaria, cuenta corriente, devoluciones, proveedores, reportes y backups automáticos.',
    status: 'Instalable en Windows',
    stack: ['python', 'tkinter', 'sqlite', 'sql', 'matplotlib', 'reportlab', 'openpyxl'],
    problem:
      'El control manual del stock y las ventas genera errores, productos faltantes sin aviso y horas de trabajo para cerrar la caja o actualizar precios.',
    solution: [
      'Una aplicación de escritorio con login y roles (dueño y empleado) que centraliza la operación diaria. El stock se descuenta al confirmar cada venta y se devuelve al anularla.',
      'La lógica de negocio vive separada de las ventanas, y la exportación (boletas, cierres de caja, Excel y PDF) es un módulo propio.',
    ],
    features: [
      { title: 'Punto de venta', body: 'Carrito con búsqueda, boletas en PDF listas para imprimir y anulación con devolución de stock.' },
      { title: 'Inventario', body: 'Stock mínimo con alertas visuales, movimientos con motivo y aumento de precios por proveedor en un paso.' },
      { title: 'Compras', body: 'Pedidos automáticos con los productos en stock bajo y recepción que suma el stock sola.' },
      { title: 'Caja y estadísticas', body: 'Cierre diario exportable y gráficos de recaudación y productos más vendidos.' },
      { title: 'Backups', body: 'Automáticos al iniciar, manuales y con limpieza de los de más de 30 días.' },
    ],
    architecture: {
      summary: 'Ventanas, lógica, modelos y persistencia separados, empaquetados como .exe con instalador.',
      layers: [
        { name: 'Interfaz', detail: 'Tkinter', items: ['Una ventana por módulo', 'Login con roles'] },
        { name: 'Lógica', detail: 'inventario.py', items: ['CRUD, ventas, caja y precios'] },
        { name: 'Modelos', detail: 'modelos.py', items: ['Producto, Proveedor, Categoría, Cliente, Venta'] },
        { name: 'Datos', detail: 'SQLite', items: ['Esquema autogenerado', 'Backups rotativos'] },
        { name: 'Exportación', detail: 'ReportLab · openpyxl · Matplotlib', items: ['Boletas y cierres en PDF', 'Inventario a Excel', 'Gráficos'] },
      ],
    },
    decisions: [
      { title: 'Operación que se corrige sola', body: 'Las anulaciones y recepciones de pedidos actualizan el stock automáticamente, sin pasos manuales que olvidar.' },
      { title: 'Pensado para instalar', body: 'Scripts para generar el ejecutable y un instalador para usarlo sin saber de Python.' },
    ],
    outcome: ['La ferretería centraliza stock, ventas y caja en una sola herramienta, con documentación técnica y diagrama UML.'],
    facts: [
      { value: '22', label: 'ventanas / módulos' },
      { value: '2', label: 'roles: dueño y empleado' },
      { value: '30', label: 'días de backups rotativos' },
    ],
    links: { demo: null, repo: 'https://github.com/laradietz/Control-de-Stock' },
    media: { kind: 'motif', motif: 'ledger' },
  },
]

export const archivedProjects: ArchivedProject[] = [
  {
    name: 'Marketing Analytics Platform',
    kind: 'SaaS full stack',
    summary: 'Campañas, métricas (CTR, CPC, ROAS…), integraciones con Meta, Google y TikTok Ads vía OAuth y lead scoring.',
    stack: ['java', 'spring-boot', 'postgresql', 'react', 'typescript'],
    repo: 'https://github.com/laradietz/marketing-analytics-platform',
  },
  {
    name: 'Hierro Vivo',
    kind: 'E-commerce',
    summary: 'Tienda y API para una herrería artesanal, con encargos que calculan la fecha estimada de retiro.',
    stack: ['java', 'spring-boot', 'postgresql', 'javascript', 'docker'],
    repo: 'https://github.com/laradietz/hierro-vivo-ecommerce',
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}
