/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string
  readonly VITE_EMAIL?: string
  readonly VITE_WHATSAPP_NUMERO?: string
  readonly VITE_WHATSAPP_DISPLAY?: string
  readonly VITE_WHATSAPP_MENSAJE?: string
  readonly VITE_LINKEDIN_URL?: string
  readonly VITE_INSTAGRAM_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.png' {
  const src: string
  export default src
}

declare module '*.webp' {
  const src: string
  export default src
}

declare module '*.mp4' {
  const src: string
  export default src
}

declare module '*.webm' {
  const src: string
  export default src
}
