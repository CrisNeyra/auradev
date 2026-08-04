import './Skeleton.css'

export default function Skeleton({ type = 'text', className = '' }) {
  const baseClass = 'skeleton'
  const typeClass = `skeleton--${type}`
  
  return <span className={`${baseClass} ${typeClass} ${className}`} />
}
