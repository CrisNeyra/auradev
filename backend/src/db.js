import Firebird from 'node-firebird'

const options = {}

if (process.env.FB_HOST) options.host = process.env.FB_HOST
if (process.env.FB_PORT) options.port = parseInt(process.env.FB_PORT, 10)
if (process.env.FB_DATABASE) options.database = process.env.FB_DATABASE
if (process.env.FB_USER) options.user = process.env.FB_USER
if (process.env.FB_PASSWORD) options.password = process.env.FB_PASSWORD
options.lowercase_keys = false
options.role = null
options.pageSize = 4096

if (!options.database) {
  console.warn(
    '[AuraDev] Advertencia: FB_DATABASE no está definida en .env. Las consultas a la BD fallarán.'
  )
}

export function query(sql, params = []) {
  return new Promise((resolve, reject) => {
    Firebird.attach(options, (err, db) => {
      if (err) {
        return reject(err)
      }
      db.query(sql, params, (err, result) => {
        db.detach()
        if (err) {
          return reject(err)
        }
        resolve(result)
      })
    })
  })
}

// Función para ejecutar sentencias sin devolver resultados (como CREATE TABLE)
export function execute(sql) {
  return new Promise((resolve, reject) => {
    Firebird.attach(options, (err, db) => {
      if (err) {
        return reject(err)
      }
      db.execute(sql, (err, result) => {
        db.detach()
        if (err) {
          return reject(err)
        }
        resolve(result)
      })
    })
  })
}
