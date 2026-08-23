export type ContactoDatos = {
  nombre: string
  email: string
  mensaje: string
}

export async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  ms = 8000
) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), ms)
  try {
    return await fetch(url, { ...options, signal: controller.signal })
  } finally {
    clearTimeout(timer)
  }
}
