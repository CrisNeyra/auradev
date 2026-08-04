import { Router } from 'express'
import { handleContacto } from '../handlers/contacto.js'

const router = Router()

router.post('/', handleContacto)

export default router
