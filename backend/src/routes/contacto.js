import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { handleContacto } from '../handlers/contacto.js'

const router = Router()

// Limita los envios para evitar spam: max 5 por IP cada 10 minutos.
const limitador = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Demasiados envíos. Intentá nuevamente en unos minutos.' },
})

router.post('/', limitador, handleContacto)

export default router
