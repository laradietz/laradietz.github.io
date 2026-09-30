# Lara Dietz — Portfolio

Portfolio personal de Lara Dietz, Frontend & Full Stack Developer. La idea es que el sitio muestre lo que sé hacer en frontend mientras lo recorrés, en lugar de listarlo: tipografía variable que reacciona al cursor, una narrativa de scroll, case studies con URL propia y un modo **Inspector** que deja ver los componentes de React que arman cada sección.

## Stack

| Qué                                  | Por qué                                                                                                   |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| React 19 + TypeScript + Vite         | Es el mismo stack que Portal Café. TypeScript en modo estricto, con `noUncheckedIndexedAccess`.            |
| Tailwind CSS 4                       | Los tokens de diseño (colores, tipografías, easing) están en `src/styles/index.css`.                      |
| Motion                               | Animaciones y valores ligados al scroll. Respeta `prefers-reduced-motion`.                                |
| lucide-react                         | Íconos de interfaz. Los logos de GitHub y LinkedIn son SVG propios.                                        |
| Fontsource                           | Bricolage Grotesque (variable), JetBrains Mono e Instrument Serif, servidas desde el propio sitio.         |

No uso router ni librería de estado: son dos rutas y un poco de estado local. `lib/router.tsx` resuelve la navegación con la History API y `useSyncExternalStore`.

## Desarrollo

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + build + prerender de cada ruta en dist/
npm run preview    # sirve dist/ en http://localhost:4190
```

## Estructura

```
src/
  config/site.ts          Nombre, email, redes y secciones
  content/                Datos, separados de la UI
    projects.ts           Proyectos y case studies (fuente: READMEs y CV)
    stack.ts              Tecnologías. El "usado en" se deriva de projects.ts
    profile.ts            Textos de "Sobre mí"
    images.generated.ts   Registro de capturas optimizadas (generado)
  lib/
    pending.ts            pending(): marca un dato faltante en lugar de inventarlo
    router.tsx            Rutas / y /proyectos/:slug
    transitionOrigin.ts   El case study "crece" desde el elemento clickeado
  hooks/                  useActiveSection, useMediaQuery, useInert, useLocalTime…
  components/
    motion/               Reveal, RevealText, ScrollWords, Magnetic, CountUp
    cursor/               Cursor personalizado (solo con puntero fino y sin reduced motion)
    layout/               Navbar, MobileMenu, Footer, barra de progreso, grilla del Inspector
    ui/                   Picture, Frames, SmartLink, BrandIcons, LocalTime
  sections/               hero, about, stack, work, case-study, contact
  seo.ts                  Title, meta, Open Graph y JSON-LD por ruta
scripts/
  optimize-images.mjs     _source/ → public/work/*.webp + registro tipado (usa ffmpeg)
  prerender.mjs           HTML estático por ruta, robots.txt y sitemap.xml
```

## Decisiones técnicas

- **Prerender por ruta.** `/` y cada `/proyectos/:slug` salen como HTML estático con sus propias meta tags, así que se indexan y se comparten con título e imagen propios. El cliente hidrata ese HTML.
- **Code splitting.** El case study y el simulador de atribución son chunks aparte. El case study se precarga cuando el navegador queda libre (`requestIdleCallback`).
- **Animación sin re-renders.** El nombre del hero cambia su peso tipográfico según la distancia al cursor, escribiendo directo en el DOM dentro de un `requestAnimationFrame`. El cursor, los botones magnéticos y el parallax usan MotionValues.
- **Accesibilidad.** Hay skip link, foco visible y landmarks. Los overlays (menú y case study) usan `inert` en lugar de un focus trap hecho a mano, se cierran con Escape y devuelven el foco. Con `prefers-reduced-motion` se desactivan el parallax, el cursor, el marquee y el efecto del nombre.
- **Datos derivados.** La tabla del stack, los contadores de "Sobre mí" y los chips de cada proyecto salen de `content/`. Si agregás una tecnología a un proyecto, aparece sola en todas partes.
- **Nada inventado.** Todo el contenido sale de los READMEs de cada proyecto y del CV. Lo que falta se marca con `pending()`: en desarrollo se ve con la etiqueta "pendiente", en producción el link se oculta, y el build lo lista.

## Editar contenido

- **Proyectos:** `src/content/projects.ts`. El primero de la lista es el proyecto principal.
- **Capturas:** copiá el original a `_source/<proyecto>/`, agregalo al `MANIFEST` de `scripts/optimize-images.mjs` y corré `npm run images`. Para que un proyecto muestre capturas en lugar del diagrama, cambiá su `media` a `{ kind: 'screens', … }`.
- **Redes y email:** `src/config/site.ts`.

## Mejoras pendientes

- **Capturas en alta resolución:** las de Portal Café salieron de un navegador a 800 px de ancho. Recapturarlas a 1440 px con 2× de densidad mejoraría la nitidez en pantallas retina.
- **Capturas de LifeHub, Marketing Attribution, Turnos Médicos y Ferretería:** por ahora esos proyectos muestran un diagrama hecho en código, no una captura.

## Publicación

El sitio se publica en **https://laradietz.github.io** con GitHub Pages, desde la rama `gh-pages`. Para publicar cambios:

```bash
npm run deploy   # build con PUBLIC_SITE_URL=https://laradietz.github.io y push de dist/ a gh-pages
```

`vercel.json` queda listo por si en algún momento preferís Vercel: importás el repositorio y cargás `PUBLIC_SITE_URL`.
