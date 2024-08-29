import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import menuplanRoutes from './routes/menuplan.js'
import authRoutes from './routes/auth.js'

const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(cors())
app.use(express.json())

app.use('/menuplan', menuplanRoutes)
// TODO: fix this to create a user if loged in or after sign up
// app.use('/auth', authRoutes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
