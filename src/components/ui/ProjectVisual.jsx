import { img } from '../../content/images'
import AppMockup from '../art/AppMockup'

/**
 * Project thumbnail. Uses an approved screenshot (shown in a browser frame)
 * when `project.image` is set; otherwise an illustrated app mockup
 * generated from the project's own modules.
 */
export default function ProjectVisual({ project, className = '', eager = false, animate = true }) {
  const image = img(project.image)
  if (image) {
    return (
      <div className={`flex flex-col overflow-hidden bg-[#E2E8E5] ${className}`}>
        <div className="flex h-[7%] min-h-[14px] shrink-0 items-center gap-1 px-2.5" aria-hidden="true">
          {['#F87171', '#FBBF24', '#34D399'].map((c) => <span key={c} className="h-2 w-2 rounded-full" style={{ background: c }} />)}
        </div>
        <div className="relative flex-1 overflow-hidden">
          <img src={image.src} width={image.w} height={image.h} alt={`Screenshot of the ${project.name}`}
            loading={eager ? 'eager' : 'lazy'} decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]" />
        </div>
      </div>
    )
  }
  return (
    <div className={`overflow-hidden bg-[#EEF2F0] ${className}`}>
      <div className="h-full w-full transition-transform duration-700 group-hover:scale-[1.04]">
        <AppMockup project={project} animate={animate} />
      </div>
    </div>
  )
}
