import { projects } from '../../content/projects'
import type { Project } from '../../content/types'
import { techs, type TechId } from '../../content/stack'

/** "Which projects use this technology?", derived once from the project data. */
export const projectsByTech = new Map<TechId, Project[]>(
  techs.map((tech) => [tech.id, projects.filter((project) => project.stack.includes(tech.id))]),
)
