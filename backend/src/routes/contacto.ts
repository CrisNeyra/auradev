import { Router } from 'express'
import { handleContacto } from '../handlers/contacto.js'

/**
 * Router Express: `POST /` → `handleContacto`.
 */
const router = Router()

router.post('/', (req, res) => handleContacto(req, res))

/** Router Express montado en `/api/contacto`. */
export default router
