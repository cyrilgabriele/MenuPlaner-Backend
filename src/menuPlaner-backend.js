import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import menuplanRoutes from './routes/menuplan.js'
import user_accountRoutes from './routes/user_account.js'

const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(cors())
app.use(express.json())

app.use('/menuplan', menuplanRoutes)
app.use('/user_account', user_accountRoutes)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
