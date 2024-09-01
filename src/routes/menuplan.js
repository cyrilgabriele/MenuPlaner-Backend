import express from 'express'
import { generateMenuplan, saveMenuplan, getMenuplan, getMenuplanWithMeals } from '../controllers/menuplanController.js'

const router = express.Router()

router.get('/getMenuplan', getMenuplan)
router.post('/generateMenuplan', generateMenuplan)
router.post('/saveMenuplan', saveMenuplan)
router.post('/getMenuplanWithMeals', getMenuplanWithMeals)

export default router;
