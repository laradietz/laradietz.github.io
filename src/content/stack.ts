export const techCategories = [
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'data', label: 'Datos' },
  { id: 'tooling', label: 'Tooling & testing' },
  { id: 'desktop', label: 'Escritorio' },
] as const

export type TechCategory = (typeof techCategories)[number]['id']

interface TechDefinition {
  id: string
  name: string
  symbol: string
  category: TechCategory
}

/**
 * Every technology here appears in at least one real project (see projects.ts).
 * The "used in" relation is derived from the projects, never written by hand.
 */
export const techs = [
  { id: 'react', name: 'React', symbol: 'Re', category: 'frontend' },
  { id: 'typescript', name: 'TypeScript', symbol: 'Ts', category: 'frontend' },
  { id: 'javascript', name: 'JavaScript', symbol: 'Js', category: 'frontend' },
  { id: 'html', name: 'HTML', symbol: 'Ht', category: 'frontend' },
  { id: 'css', name: 'CSS', symbol: 'Cs', category: 'frontend' },
  { id: 'tailwind', name: 'Tailwind CSS', symbol: 'Tw', category: 'frontend' },
  { id: 'motion', name: 'Motion', symbol: 'Mo', category: 'frontend' },
  { id: 'vite', name: 'Vite', symbol: 'Vi', category: 'frontend' },
  { id: 'zustand', name: 'Zustand', symbol: 'Zu', category: 'frontend' },
  { id: 'react-router', name: 'React Router', symbol: 'Rr', category: 'frontend' },
  { id: 'axios', name: 'Axios', symbol: 'Ax', category: 'frontend' },
  { id: 'recharts', name: 'Recharts', symbol: 'Rc', category: 'frontend' },

  { id: 'java', name: 'Java', symbol: 'Ja', category: 'backend' },
  { id: 'spring-boot', name: 'Spring Boot', symbol: 'Sb', category: 'backend' },
  { id: 'spring-security', name: 'Spring Security', symbol: 'Ss', category: 'backend' },
  { id: 'jpa', name: 'JPA / Hibernate', symbol: 'Hb', category: 'backend' },
  { id: 'jwt', name: 'JWT', symbol: 'Jw', category: 'backend' },
  { id: 'python', name: 'Python', symbol: 'Py', category: 'backend' },
  { id: 'fastapi', name: 'FastAPI', symbol: 'Fa', category: 'backend' },
  { id: 'sqlalchemy', name: 'SQLAlchemy', symbol: 'Sa', category: 'backend' },
  { id: 'node', name: 'Node.js', symbol: 'No', category: 'backend' },

  { id: 'postgresql', name: 'PostgreSQL', symbol: 'Pg', category: 'data' },
  { id: 'sqlite', name: 'SQLite', symbol: 'Sl', category: 'data' },
  { id: 'sql', name: 'SQL', symbol: 'Sq', category: 'data' },
  { id: 'supabase', name: 'Supabase', symbol: 'Su', category: 'data' },
  { id: 'flyway', name: 'Flyway', symbol: 'Fw', category: 'data' },
  { id: 'alembic', name: 'Alembic', symbol: 'Al', category: 'data' },

  { id: 'git', name: 'Git', symbol: 'Gi', category: 'tooling' },
  { id: 'github', name: 'GitHub', symbol: 'Gh', category: 'tooling' },
  { id: 'docker', name: 'Docker', symbol: 'Dk', category: 'tooling' },
  { id: 'maven', name: 'Maven', symbol: 'Mv', category: 'tooling' },
  { id: 'vercel', name: 'Vercel', symbol: 'Vc', category: 'tooling' },
  { id: 'nginx', name: 'nginx', symbol: 'Nx', category: 'tooling' },
  { id: 'vitest', name: 'Vitest', symbol: 'Vt', category: 'tooling' },
  { id: 'pytest', name: 'pytest', symbol: 'Pt', category: 'tooling' },
  { id: 'junit', name: 'JUnit', symbol: 'Ju', category: 'tooling' },

  { id: 'tkinter', name: 'Tkinter', symbol: 'Tk', category: 'desktop' },
  { id: 'matplotlib', name: 'Matplotlib', symbol: 'Mp', category: 'desktop' },
  { id: 'reportlab', name: 'ReportLab', symbol: 'Rl', category: 'desktop' },
  { id: 'openpyxl', name: 'openpyxl', symbol: 'Ox', category: 'desktop' },
] as const satisfies readonly TechDefinition[]

export type Tech = (typeof techs)[number]
export type TechId = Tech['id']

const techById = new Map<TechId, Tech>(techs.map((tech) => [tech.id, tech]))

export function getTech(id: TechId): Tech {
  return techById.get(id)!
}
