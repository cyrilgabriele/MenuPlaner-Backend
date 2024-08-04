// run with: npm run devStart
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');
require('dotenv').config();
// Huggingface LLM Inference Endpoint
const ENDPOINT = 'https://api-inference.huggingface.co/models/mistralai/Mistral-Nemo-Instruct-2407'

app.set('view engine', 'ejs')
app.use(cors()); // Cross Origin Resource Sharing => needed bc two different portsw
app.use(express.json())
// LLM to get things done...
const HfInference = require('@huggingface/inference').HfInference;

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
        const llm_response = await get_llm_response(body)
        console.log('LLM: \n', llm_response)
        res.send(llm_response)
        //res.send('Hello from Backend :)')
    } catch (error) {
        console.log(error)
        console.log("ERROR IN LLM FETCH")
    }
})


async function get_llm_response(data) {
    console.log("data:\n", data)
    const HF_TOKEN = process.env.HUGGINGFACE_TOKEN
    const inference = new HfInference(HF_TOKEN);
    const out = await inference.chatCompletion({
        model: "mistralai/Mistral-7B-Instruct-v0.2",
        messages: [{ role: "user", content: data}],
        max_tokens: 1000
      });
    console.log("Out:\n", out.choices[0].message)
    return out.choices[0].message
}
