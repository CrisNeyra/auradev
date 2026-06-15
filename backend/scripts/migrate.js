import 'dotenv/config'
import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import Firebird from 'node-firebird'
import { options } from '../src/db.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const schemaPath = join(__dirname, '..', 'schema.sql')

function attachOrCreate() {
  return new Promise((resolve, reject) => {
    Firebird.attachOrCreate(options, (err, db) => {
      if (err) return reject(err)
      resolve(db)
    })
  })
}

function ejecutar(db, sql) {
  return new Promise((resolve, reject) => {
    db.query(sql, [], (err, result) => {
      if (err) return reject(err)
      resolve(result)
    })
  })
}

async function migrar() {
  if (!process.env.FB_DATABASE) {
    console.error(
      '[AuraDev] No se puede migrar: falta FB_DATABASE en backend/.env.'
    )
    process.exit(1)
  }

  let db
  try {
    const sql = (await readFile(schemaPath, 'utf8')).trim().replace(/;\s*$/, '')
    console.log('[AuraDev] Conectando/creando la base Firebird...')
    db = await attachOrCreate()
    console.log('[AuraDev] Ejecutando migración desde schema.sql...')
    await ejecutar(db, sql)
    console.log('[AuraDev] Migración completada. Tabla "mensajes" lista.')
  } catch (err) {
    const msg = String(err && err.message)
    if (/already exists|unsuccessful metadata update/i.test(msg)) {
      console.log('[AuraDev] La tabla "mensajes" ya existe. Nada que migrar.')
    } else {
      console.error('[AuraDev] Error al ejecutar la migración:', msg)
      process.exitCode = 1
    }
  } finally {
    if (db) db.detach()
  }
}

migrar()
