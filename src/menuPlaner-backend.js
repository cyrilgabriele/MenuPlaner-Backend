// run with: npm run devStart
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
require('dotenv').config();
// Huggingface LLM Inference Endpoint
const ENDPOINT = 'https://api-inference.huggingface.co/models/google/flan-t5-large'

app.set('view engine', 'ejs')
app.use(cors()); // Cross Origin Resource Sharing => needed bc two different portsw
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.post('/menu', async (req, res) => {
    //console.log('This is in the POST: ', req)
    const { title, body, userId } = req.body
    console.log(`Title: ${title}, Body: ${body}, UserId: ${userId}`);
    try {
        const llm_response = await query(body)
        console.log('LLM: \n', llm_response)
        res.send(llm_response)
        //res.send('Hello from Backend :)')
    } catch (error) {
        console.log("ERROR IN LLM FETCH")
    }
})

async function query(data) {
    console.log('data: ', data)
    const response = await fetch(
        ENDPOINT,
        {
            headers: { Authorization: `Bearer ${process.env.HUGGINGFACE_TOKEN}` },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.json();
    return result;
}
