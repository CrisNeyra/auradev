import 'dotenv/config'
import express, { Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { isOriginAllowed } from './cors.js'
import { loadEnv } from './env.js'
import { logger } from './utils/log.js'
import { getMetricsSnapshot } from './utils/metrics.js'
import contactoRouter from './routes/contacto.js'

const env = loadEnv()
if (!env.DATABASE_URL) {
  logger.warn(
    { missing: 'DATABASE_URL' },
    'DATABASE_URL no definida; el insert de mensajes fallará hasta configurarla'
  )
}

const app = express()
const PORT = env.PORT || process.env.PORT || 4000

app.use(helmet())
app.use(
  cors({
    origin(origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
      if (isOriginAllowed(origin)) {
        callback(null, true)
        return
      }
      callback(new Error('Origen no permitido por CORS'))
    },
  })
)
app.use(express.json())

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    servicio: 'AuraDev API',
    metrics: getMetricsSnapshot(),
    rateLimit: process.env.UPSTASH_REDIS_REST_URL ? 'upstash' : 'memory',
  })
})

app.use('/api/contacto', contactoRouter)

app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Ruta no encontrada.' })
})

app.listen(PORT, () => {
  logger.info(
    { port: Number(PORT), env: process.env.NODE_ENV ?? 'development' },
    'API started'
  )
})
