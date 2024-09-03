import express from 'express'

const router = express.Router()

router.get('/getUser', getMenuplan)
router.post('/createUser', generateMenuplan)

export default router