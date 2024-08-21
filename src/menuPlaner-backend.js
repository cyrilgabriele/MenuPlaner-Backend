import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import menuRoutes from './routes/menu.js'

const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(cors())
app.use(express.json())

app.use('/menu', menuRoutes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
