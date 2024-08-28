import express from 'express'
import { generateMenuplan, saveMenuplan, getMenuplan } from '../controllers/menuplanController.js'

const router = express.Router()

router.get('/getMenuplan', getMenuplan)
router.post('/generateMenuplan', generateMenuplan)
router.post('/saveMenuplan', saveMenuplan)

export default router;
