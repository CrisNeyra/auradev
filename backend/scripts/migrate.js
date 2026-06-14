import 'dotenv/config'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { execute } from '../src/db.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const schemaPath = join(__dirname, '..', 'schema.sql')

async function migrar() {
  if (!process.env.FB_DATABASE) {
    console.error(
      '[AuraDev] No se puede migrar: falta FB_DATABASE en backend/.env.'
    )
    process.exit(1)
  }

  try {
    const sql = await readFile(schemaPath, 'utf8')
    console.log('[AuraDev] Ejecutando migración desde schema.sql...')
    // Firebird node driver might have issues executing multiple statements at once if they are separated by semicolons.
    // For a single CREATE TABLE it should be fine.
    await execute(sql)
    console.log('[AuraDev] Migración completada. Tabla "mensajes" lista.')
  } catch (err) {
    console.error('[AuraDev] Error al ejecutar la migración:', err.message)
    process.exitCode = 1
  }
}

migrar()
