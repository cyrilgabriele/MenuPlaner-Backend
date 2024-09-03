import express from 'express'

const router = express.Router()

router.get('/getUser', getMenuplan)
router.post('/createUser', generateMenuplan)
// router.post('/saveMenuplan', saveMenuplan)
// router.post('/getMenuplanWithMeals', getMenuplanWithMeals)

export default router;