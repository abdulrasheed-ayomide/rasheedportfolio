import { Router } from 'express'
import { createContactMessage } from '../controllers/contactController.js'
import { contactLimiter } from '../middleware/rateLimiters.js'

const router = Router()

// POST /api/contact
router.post('/', contactLimiter, createContactMessage)

export default router
