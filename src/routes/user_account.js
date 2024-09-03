import express from 'express'
import { getUser, createUser } from '../controllers/user_accountController.js' 

const router = express.Router()

router.post('/getUser', getUser)
router.post('/createUser', createUser)

export default router