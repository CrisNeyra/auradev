import { Router } from 'express'
import { handleContacto } from '../handlers/contacto.js'

const router = Router()

router.post('/', (req, res) => handleContacto(req, res))

export default router
