import './Skeleton.css'

/**
 * Placeholder de carga (text, card, etc.).
 *
 * @param type - Variante CSS `skeleton--${type}`
 */
export default function Skeleton({
  type = 'text',
  className = '',
}: {
  type?: string
  className?: string
}) {
  const baseClass = 'skeleton'
  const typeClass = `skeleton--${type}`
  
  return <span className={`${baseClass} ${typeClass} ${className}`} />
}
