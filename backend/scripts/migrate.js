import 'dotenv/config'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { pool, close } from '../src/db.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const schemaPath = join(__dirname, '..', 'schema.sql')

function missingDatabaseUrl(value) {
  if (!value || !String(value).trim()) return true
  const v = String(value).trim()
  if (/^(pending|change_me|todo)$/i.test(v)) return true
  if (v.includes('USER:PASSWORD@HOST')) return true
  return false
}

async function migrar() {
  if (missingDatabaseUrl(process.env.DATABASE_URL)) {
    console.error(
      '[AuraDev] No se puede migrar: configurá DATABASE_URL en backend/.env con la connection string de Neon.'
    )
    process.exit(1)
  }

  try {
    const sql = (await readFile(schemaPath, 'utf8')).trim()
    console.log('[AuraDev] Conectando a PostgreSQL (Neon)...')
    console.log('[AuraDev] Ejecutando migración desde schema.sql...')
    await pool.query(sql)
    console.log('[AuraDev] Migración completada. Tabla "mensajes" lista.')
  } catch (err) {
    console.error(
      '[AuraDev] Error al ejecutar la migración:',
      err?.message || err
    )
    process.exitCode = 1
  } finally {
    await close()
  }
}

migrar()
