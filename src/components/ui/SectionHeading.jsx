/** Left-aligned heading block. `as` lets pages keep a correct H1/H2/H3 order. */
export default function SectionHeading({ title, lead, as: H = 'h2', action, dark = false, className = '' }) {
  return (
    <div className={`mb-10 flex flex-col gap-5 md:mb-12 md:flex-row md:items-end md:justify-between ${className}`}>
      <div className="max-w-2xl">
        <H className={`h-section ${dark ? '!text-white' : ''}`}>{title}</H>
        {lead && <p className={`mt-4 lead ${dark ? '!text-white/75' : ''}`}>{lead}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
