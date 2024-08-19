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

const OVERVIEW_FORMAT = "{ Monday: { Breakfast: { title: 'Avocado Toast', description: 'Whole grain toast topped with mashed avocado, salt, pepper, and a poached egg' }, \
                        Lunch: { title: 'Chicken Salad', description: 'Grilled chicken served on a bed of mixed greens with cherry tomatoes, cucumber, bell peppers, topped with \
                        balsamic vinaigrette' }, Dinner: { title: 'Vegetable Stir Fry', description: 'Assorted vegetables sautéed with soy sauce, garlic, ginger, and served over rice' } }, \
                        Tuesday: { Breakfast: { title: 'Fruit Bowl', description: 'Assorted fresh fruits with a dollop of Greek yogurt and a drizzle of honey' }, Lunch: { title: 'Turkey Sandwich', \
                        description: 'Grilled turkey on whole grain bread with lettuce, tomato, cucumber, and avocado spread' }, Dinner: { title: 'Spaghetti Marinara', \
                        description: 'Spaghetti pasta tossed with classic marinara sauce and basil' } } }"

const OVERVIEW_PROMPT = `Provide information for a menu plan for an entire week including three meals per day.
                        I must receive JSON format with these keys, example: \`${OVERVIEW_FORMAT}\`
                        Use different meal examples. The title must have a maximum of three words.`

const MAX_TOKENS = 30000

app.set('view engine', 'ejs')
app.use(cors()); // Cross Origin Resource Sharing => needed bc frontend & backend on different ports
app.use(express.json())

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.post('/menu', async (req, res) => {
  const { title, body, userId } = req.body
  console.log(`Title: ${title}, Body: ${body}, UserId: ${userId}`);
  try {
      const llmResponse = await getLLMResponse(body)
      console.log("llmResponse: \n", llmResponse)
      const parsedLLMResponse = parseLLMResponse(llmResponse)
      res.send(parsedLLMResponse)
  } catch (error) {
      console.log(error)
      console.log("ERROR IN LLM FETCH")
  }
})

app.post('/saveMenu', (req, res) => {
  //console.log(req)
  res.send(req.body)
})

async function getLLMResponse(data) {
  const HF_TOKEN = process.env.HUGGINGFACE_TOKEN
  const inference = new HfInference(HF_TOKEN);
  const out = await inference.chatCompletion({
      model: MODEL,
      messages: [{ role: "user", content: OVERVIEW_PROMPT+data}],
      max_tokens: MAX_TOKENS
    });
  console.log("Out:\n", out.choices[0].message.content)
  const responseObject = out.choices[0].message.content
  //console.log("responseObject: \n", responseObject)
  //console.log(typeof(responseObject))
  return responseObject
  
  //return sampleResponse
}

function parseLLMResponse(llmResponse) {
  var menu = {
    Monday: { Breakfast: '', Lunch: '', Dinner: '' },
    Tuesday: { Breakfast: '', Lunch: '', Dinner: '' },
    Wednesday: { Breakfast: '', Lunch: '', Dinner: '' },
    Thursday: { Breakfast: '', Lunch: '', Dinner: '' },
    Friday: { Breakfast: '', Lunch: '', Dinner: '' },
    Saturday: { Breakfast: '', Lunch: '', Dinner: '' },
    Sunday: { Breakfast: '', Lunch: '', Dinner: '' },
  }

  try {
    var llmResponse = extractJSONFromResponse(llmResponse)

    Object.keys(menu).forEach(day => {
      menu[day].Breakfast = llmResponse[day].Breakfast
      menu[day].Lunch = llmResponse[day].Lunch
      menu[day].Dinner = llmResponse[day].Dinner
    });
  } catch (error) {
    console.error("An error occurred while parsing the LLM response:", error);
  }
  console.log("parseLLMResponse: menu: \n", menu)
  return menu;
}

function extractJSONFromResponse(llmResponse) {
  const firstBraceIndex = llmResponse.indexOf('{');
  const lastBraceIndex = llmResponse.lastIndexOf('}');
  var parsedJSON = null
  
  if (firstBraceIndex !== -1 && lastBraceIndex !== -1) {
      const jsonString = llmResponse.slice(firstBraceIndex, lastBraceIndex + 1);
      
      try {
        parsedJSON = JSON.parse(jsonString);
      } catch (error) {
          console.error('Error parsing JSON:', error);
      }
  }
  return parsedJSON
}
