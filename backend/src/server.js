import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import contactoRouter from './routes/contacto.js'

const app = express()
const PORT = process.env.PORT || 4000

if (!process.env.FB_DATABASE) {
  console.warn(
    '[AuraDev] Advertencia: FB_DATABASE no está definida en .env. El guardado de mensajes fallará hasta configurarla.'
  )
}

app.use(helmet())
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
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
