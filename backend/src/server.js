import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { isOriginAllowed } from './cors.js'
import contactoRouter from './routes/contacto.js'

const app = express()
const PORT = process.env.PORT || 4000

if (!process.env.DATABASE_URL) {
  console.warn(
    '[AuraDev] Advertencia: DATABASE_URL no está definida en .env. El guardado de mensajes fallará hasta configurarla.'
  )
}

app.use(helmet())
app.use(
  cors({
    origin(origin, callback) {
      if (isOriginAllowed(origin)) {
        callback(null, true)
        return
      }
      callback(new Error('Origen no permitido por CORS'))
    },
  })
)
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', servicio: 'AuraDev API' })
})

app.use('/api/contacto', contactoRouter)

app.use((_req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada.' })
})

app.listen(PORT, () => {
  console.log(`[AuraDev] API escuchando en http://localhost:${PORT}`)
})
