import pg from 'pg'

const { Pool } = pg

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  console.warn(
    '[AuraDev] Advertencia: DATABASE_URL no está definida en .env. Las consultas a la BD fallarán.'
  )
}

function needsSsl(url) {
  if (!url) return false
  return (
    url.includes('neon.tech') ||
    url.includes('sslmode=require') ||
    url.includes('sslmode=verify-full')
  )
}

function connectionConfig(url) {
  if (!url) return { connectionString: url }
  if (!needsSsl(url)) return { connectionString: url }

  // Neon: SSL explícito; quitamos sslmode de la URI para evitar el warning de pg v8
  const cleaned = url
    .replace(/[?&]sslmode=[^&]*/g, '')
    .replace(/\?&/, '?')
    .replace(/[?&]$/, '')

  return {
    connectionString: cleaned,
    ssl: { rejectUnauthorized: false },
  }
}

export const pool = new Pool(connectionConfig(connectionString))

export async function query(sql, params = []) {
  const result = await pool.query(sql, params)
  return result.rows
}

export async function execute(sql) {
  await pool.query(sql)
}

export async function close() {
  await pool.end()
}
