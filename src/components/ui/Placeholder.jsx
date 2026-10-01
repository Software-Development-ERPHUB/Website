/** Visible marker for content management still needs to supply. */
export default function Placeholder({ children, className = '' }) {
  return <span className={`italic text-muted ${className}`}>{children}</span>
}
