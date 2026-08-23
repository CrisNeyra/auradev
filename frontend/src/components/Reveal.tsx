import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type FormEventHandler,
  type ReactNode,
} from 'react'

/**
 * Envuelve contenido y lo revela al entrar en viewport (IntersectionObserver).
 * Respeta `prefers-reduced-motion`.
 *
 * @param as - Tag HTML del wrapper
 * @param delay - Retraso de animación en ms
 */
export default function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  className = '',
  ...rest
}: {
  children?: ReactNode
  as?: ElementType
  delay?: number
  className?: string
  onSubmit?: FormEventHandler<HTMLFormElement>
  noValidate?: boolean
} & Record<string, unknown>) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduce || typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
    )

    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
