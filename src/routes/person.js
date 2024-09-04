import express from 'express'
import { createPerson } from '../controllers/personController.js'

const router = express.Router()

router.post('/createPerson', createPerson) 

export default router