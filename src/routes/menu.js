import express from 'express'
import { generateMenu, saveMenu } from '../controllers/menuController.js'

const router = express.Router()

router.post('/generateMenu', generateMenu)
router.post('/saveMenu', saveMenu)

export default router;
