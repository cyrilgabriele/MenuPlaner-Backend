// run with: npm run devStart
import express from 'express';
import 'dotenv/config'
import { HfInference } from "@huggingface/inference";
import cors from 'cors'

const sampleResponse = {
  role: 'assistant',
  content: ' {\n' +
    '\n' +
    '"Monday_Breakfast": "Oatmeal with Bananas, Walnuts and Honey",\n' +
    '"Monday_Lunch": "Grilled Chicken Sandwich with Avocado, Lettuce, Tomatoes and Whole Grain Bread",\n' +
    '"Monday_Dinner": "Ground beef Stir-Fry with Broccoli, Bell Peppers and Brown Rice",\n' +
    '\n' +
    '"Tuesday_Breakfast": "Scrambled Eggs with Spinach and Whole Grain Toast",\n' +
    '"Tuesday_Lunch": "Quinoa Salad with Chickpeas, Cucumber, Tomatoes, Feta Cheese and Lemon Vinaigrette",\n' +     
    '"Tuesday_Dinner": "Baked Salmon with Asparagus and Sweet Potato",\n' +
    '\n' +
    '"Wednesday_Breakfast": "Greek Yogurt with Berries, Granola and Honey",\n' +
    '"Wednesday_Lunch": "Turkey Wrap with Hummus, Sprouts, Cucumber and Whole Wheat Tortilla",\n' +
    '"Wednesday_Dinner": "Spaghetti Bolognese with Ground Turkey, Carrots, Celery, Onions and Tomato Sauce",\n' +    
    '\n' +
    '"Thursday_Breakfast": "Avocado Toast with Scrambled Eggs and Cherry Tomatoes",\n' +
    '"Thursday_Lunch": "Grilled Veggie Panini with Mozzarella, Pesto and Ciabatta",\n' +
    '"Thursday_Dinner": "Grilled Chicken with Green Beans, Roasted Potatoes and Balsamic Glaze",\n' +
    '\n' +
    '"Friday_Breakfast": "Fruit Smoothie with Banana, Spinach, Almond Milk and Chia Seeds",\n' +
    '"Friday_Lunch": "Grilled Cheese Sandwich with Tomato Soup",\n' +
    '"Friday_Dinner": "Beef Tacos with Black Beans, Corn, Salsa and Brown Rice",\n' +
    '\n' +
    '"Saturday_Breakfast": "Scrambled Eggs with Mushrooms and Whole Grain English Muffins",\n' +
    '"Saturday_Lunch": "BBQ Chicken Salad with Mixed Greens, Corn, Black Beans, Avocado and BBQ Sauce",\n' +
    '"Saturday_Dinner": "Baked Penne with Meatballs, Tomato Sauce and Mozzarella",\n' +
    '\n' +
    '"Sunday_Breakfast": "Pancakes with Blueberries and Maple Syrup",\n' +
    '"Sunday_Lunch": "Grilled Vegetable Sandwich with Hummus and Whole Grain Bread",\n' +
    '"Sunday_Dinner": "Roasted Chicken with Carrots, Parsnips, and Green Beans",\n' +
    '\n' +
    '"Ingredients": [\n' +
    '"Ground Beef",\n' +
    '"Broccoli",\n' +
    '"Bell Peppers",\n' +
    '"Brown Rice",\n' +
    '"Oats",\n' +
    '"Bananas",\n' +
    '"Walnuts",\n' +
    '"Honey",\n' +
    '"Chicken Breasts",\n' +
    '"Avocado",\n' +
    '"Lettuce",\n' +
    '"Tomatoes",\n' +
    '"Whole Grain Bread",\n' +
    '"Ground Turkey",\n' +
    '"Carrots",\n' +
    '"Celery",\n' +
    '"Onions",\n' +
    '"Tomato Sauce",\n' +
    '"Eggs",\n' +
    '"Spinach",\n' +
    '"Mushrooms",\n' +
    '"Quinoa",\n' +
    '"Cucumber",\n' +
    '"Feta Cheese",\n' +
    '"Lemon",\n' +
    '"Lemon Juice",\n' +
    '"Olive Oil",\n' +
    '"Salt",\n' +
    '"Pepper",\n' +
    '"Salmon",\n' +
    '"Asparagus",\n' +
    '"Sweet Potatoes",\n' +
    '"Greek Yogurt",\n' +
    '"Berries",\n' +
    '"Granola",\n' +
    '"Sprouts",\n' +
    '"Ciabatta",\n' +
    '"Mozzarella",\n' +
    '"Balsamic Vinegar",\n' +
    '"Water",\n' +
    '"BBQ Sauce",\n' +
    '"Turkey",\n' +
    '"Hummus",\n' +
    '"Pesto",\n' +
    '"Ciabatta Bread",\n' +
    '"Beef",\n' +
    '"Black Beans",\n' +
    '"Corn",\n' +
    '"Salsa",\n' +
    '"Penne Pasta",\n' +
    '"Meatballs",\n' +
    '"Blueberries",\n' +
    '"Maple Syrup"\n' +
    ']\n' +
    '}'
}

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
  res.send(req.body)
})

async function get_llm_response(data) {
  /*
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
  */
 return sampleResponse
}

function parseLLMResponse(LLMResponse) {
    console.log('LLMResponse in parseLLMResponse: ', LLMResponse)
  
    // Extract JSON content between the first `{` and the last `}`
    const jsonMatch = LLMResponse.content.match(/{[\s\S]*}/);
  
    if (!jsonMatch) {
      throw new Error("No valid JSON found in LLM response");
    }
  
    try {
      const parsedContent = JSON.parse(jsonMatch[0]);
      console.log("parsedContent:\n", parsedContent)
  
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
  
      console.log('Menu: \n', menu)
      return menu
    } catch (error) {
      console.error("Error parsing JSON content:", error);
      throw error;
    }
  }
  
/*
function parseLLMResponse(LLMResponse) {
  console.log('LLMResponse in parseLLMResponse: ', LLMResponse)
  const parsedContent = JSON.parse(LLMResponse.content);
  conosle.log("parsedContent:\n", parsedContent)

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

  console.log('Menu: \n', menu)
  return menu
}
  */

