import express from 'express'
import { getMenu, saveMenu } from '../controllers/menuController.js'

const router = express.Router()

router.post('/', getMenu)
router.post('/saveMenu', saveMenu)

export default router;
