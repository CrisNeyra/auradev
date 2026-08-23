import { useEffect, useState } from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import animationData from '../assets/lottie/technology.json'

/** Animación Lottie de tecnología; fallback si el asset no carga. */
export default function TechnologyAnimation() {
  const [mode, setMode] = useState<'loading' | 'static' | 'lottie'>('loading')

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mobile = window.matchMedia('(max-width: 768px)').matches
    setMode(reduce || mobile ? 'static' : 'lottie')
  }, [])

  if (mode !== 'lottie') {
    return (
      <div
        className="technology-animation technology-animation--static"
        aria-hidden="true"
      />
    )
  }

  return (
    <div className="technology-animation" aria-hidden="true">
      <DotLottieReact
        data={JSON.stringify(animationData)}
        loop
        autoplay
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}
