// run with: npm run devStart
import express from 'express';
import 'dotenv/config'
import { HfInference } from "@huggingface/inference";
import cors from 'cors'

const app = express()
const port = 3000
const MODEL = 'mistralai/Mistral-7B-Instruct-v0.2'
const PROMPT = 'Return the Answer in a JSON format where the key is the weekday followed by the meal name seperated with an underscore, so for example: \
"Monday_Dinner:" "Ground beef egg with...". Provide for each day three meals: Breakfast, Lunch and Dinner. Afterwards, create a list for all the needed ingredients. \
Additional user input: '
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
  console.log("Hello there")
  //console.log('This is in the POST: ', req)
  const { title, body, userId } = req.body
  console.log(`Title: ${title}, Body: ${body}, UserId: ${userId}`);
  try {
      const llm_response = await get_llm_response(body)
      //console.log('LLM: \n', llm_response.content)
      const parsedLLMResponse = parseLLMResponse(llm_response)
      //console.log("parsedLLMResponse: ", parsedLLMResponse)
      res.send(parsedLLMResponse)
      //res.send('Hello from Backend :)')
  } catch (error) {
      console.log(error)
      console.log("ERROR IN LLM FETCH")
  }
})

app.post('/saveMenu', (req, res) => {
  //console.log(req)
  res.send('done')
})

async function get_llm_response(data) {
    //console.log("data:\n", data)
    //console.log("PROMPT+data: \n", PROMPT+data)
    const HF_TOKEN = process.env.HUGGINGFACE_TOKEN
    const inference = new HfInference(HF_TOKEN);
    const out = await inference.chatCompletion({
        model: MODEL,
        messages: [{ role: "user", content: PROMPT+data}],
        max_tokens: 1000
      });
    console.log("Out:\n", out.choices[0].message)
    return out.choices[0].message
}

function parseLLMResponse(LLMResponse) {
  //console.log('LLMResponse in parseLLMResponse: ', LLMResponse)
  const parsedContent = JSON.parse(LLMResponse.content);

  var menu = {
    Monday: { Breakfast: '', Lunch: '', Dinner: '' },
    Tuesday: { Breakfast: '', Lunch: '', Dinner: '' },
    Wednesday: { Breakfast: '', Lunch: '', Dinner: '' },
    Thursday: { Breakfast: '', Lunch: '', Dinner: '' },
    Friday: { Breakfast: '', Lunch: '', Dinner: '' },
    Saturday: { Breakfast: '', Lunch: '', Dinner: '' },
    Sunday: { Breakfast: '', Lunch: '', Dinner: '' },
  };

  for (const key in parsedContent) {
    if (key.includes('Ingredients')) continue; // Skip the Ingredients key
    const [day, meal] = key.split('_');
    menu[day][meal] = parsedContent[key];
  }

  console.log(menu)
  return menu
}
