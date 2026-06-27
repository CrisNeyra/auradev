import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import animationData from '../assets/lottie/technology.json'

export default function TechnologyAnimation() {
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
