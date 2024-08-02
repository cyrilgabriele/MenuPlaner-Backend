// run with: npm run devStart
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');

app.set('view engine', 'ejs')
app.use(cors()); // Cross Origin Resource Sharing => needed bc two different portsw
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.post('/menu', (req, res) => {
    //console.log('This is in the POST: ', req)
    const { title, body, userId } = req.body
    console.log(`Title: ${title}, Body: ${body}, UserId: ${userId}`);
    res.send('Hello from Backend :)')
})