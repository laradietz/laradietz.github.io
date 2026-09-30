import { getTech, techCategories, type TechId } from '../../content/stack'

export function StackByCategory({ stack }: { stack: TechId[] }) {
  const groups = techCategories
    .map((category) => ({ ...category, techs: stack.map(getTech).filter((tech) => tech.category === category.id) }))
    .filter((group) => group.techs.length > 0)

  return (
    <dl className="grid gap-8 sm:grid-cols-2">
      {groups.map((group) => (
        <div key={group.id} className="border-t border-white/10 pt-4">
          <dt className="eyebrow text-mute">{group.label}</dt>
          <dd className="mt-4 flex flex-wrap gap-2">
            {group.techs.map((tech) => (
              <span key={tech.id} className="flex items-center gap-2 rounded-lg border border-white/10 bg-ink-2 py-1.5 pr-3 pl-1.5 text-sm">
                <span className="grid size-7 place-items-center rounded-md bg-white/6 font-mono text-[11px] font-semibold text-accent" aria-hidden="true">
                  {tech.symbol}
                </span>
                {tech.name}
              </span>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  )
}
