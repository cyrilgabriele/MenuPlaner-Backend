// run with: npm run devStart
import express from 'express';
import 'dotenv/config'
import { HfInference } from "@huggingface/inference";
import cors from 'cors'

const sampleResponse = JSON.stringify({
  "Monday": {
  "Breakfast": {
  "title": "Oatmeal Almond",
  "description": "Steel-cut oats cooked with almond milk, topped with sliced almonds, dried cranberries, and a drizzle of honey"
  },
  "Lunch": {
  "title": "Tuna Salad Wrap",
  "description": "Tuna salad made with canned tuna, Mayonnaise, celery, and onion, wrapped in a whole grain tortilla with lettuce and tomato"
  },
  "Dinner": {
  "title": "Chickpea Curry",
  "description": "Chickpeas cooked in a spicy tomato-based curry with onions, garlic, ginger, and bell peppers, served over basmati rice"
  }
  },
  "Tuesday": {
  "Breakfast": {
  "title": "Egg Muffins",
  "description": "Mini muffins filled with scrambled eggs, diced ham, bell peppers, and shredded cheese"
  },
  "Lunch": {
  "title": "Quinoa Salad",
  "description": "Quinoa salad with roasted sweet potato, black beans, corn, avocado, cherry tomatoes, and a lime vinaigrette"
  },
  "Dinner": {
  "title": "Meatball Sub",
  "description": "Turkey meatballs served on a submarine roll with marinara sauce, melted mozzarella cheese, and sautéed onions"
  }
  },
  "Wednesday": {
  "Breakfast": {
  "title": "Avocado Quesadilla",
  "description": "Whole grain tortilla filled with mashed avocado, shredded cheese, and salsa, grilled until crispy"
  },
  "Lunch": {
  "title": "Grilled Cheese and Tomato Soup",
  "description": "Grilled cheese sandwich made with cheddar cheese and tomato soup"
  },
  "Dinner": {
  "title": "Lemon Herb Chicken",
  "description": "Chicken breast cooked with lemon, garlic, thyme, and rosemary, served with a side of quinoa and steamed asparagus"
  }
  },
  "Thursday": {
  "Breakfast": {
  "title": "French Toast",
  "description": "Thick slices of bread dipped in egg mixture, cooked until golden brown, topped with maple syrup and powdered sugar"
  },
  "Lunch": {
  "title": "Veggie Pita Pocket",
  "description": "Grilled pita pocket stuffed with hummus, lettuce, tomato, cucumber, and sliced bell peppers"
  },
  "Dinner": {
  "title": "Sweet Potato Chili",
  "description": "Black beans, sweet potatoes, kidney beans, and corn simmered in a chili sauce with cumin, garlic, and chili powder"
  }
  },
  "Friday": {
  "Breakfast": {
  "title": "Greek Yogurt Parfait",
  "description": "Greek yogurt layered with granola, honey, and assorted fresh fruit"
  },
  "Lunch": {
  "title": "Turkey Caesar Wrap",
  "description": "Turkey, lettuce, croutons, parmesan cheese, and Caesar dressing wrapped in a whole grain tortilla"
  },
  "Dinner": {
  "title": "Shrimp Stir Fry",
  "description": "Shrimp cooked with bell peppers, onion, and broccoli in a ginger soy sauce, served over steamed rice"
  }
  },
  "Saturday": {
  "Breakfast": {
  "title": "Breakfast Burrito",
  "description": "Whole grain tortilla filled with scrambled eggs, black beans, shredded cheese, and salsa"
  },
  "Lunch": {
  "title": "Cobb Salad",
  "description": "Romaine lettuce, grilled chicken, hard-boiled eggs, avocado, tomato, bacon, and a ranch dressing"
  },
  "Dinner": {
  "title": "Taco Night",
  "description": "Soft tacos with ground beef, lettuce, tomato, sour cream, and shredded cheese"
  }
  },
  "Sunday": {
  "Breakfast": {
  "title": "Breakfast Tacos",
  "description": "Corn tortillas filled with scrambled eggs, black beans, avocado, and salsa"
  },
  "Lunch": {
  "title": "Grilled Cheese and Tomato Soup",
  "description": "Grilled cheese sandwich made with swiss cheese and tomato soup"
  },
  "Dinner": {
  "title": "Beef Stroganoff",
  "description": "Sliced beef cooked in a mushroom and sour cream sauce, served over egg noodles"
  }
  }
})
  

const app = express()
const port = 3000
const MODEL = 'mistralai/Mistral-7B-Instruct-v0.2'

const OVERVIEW_FORMAT = "{ Monday: { Breakfast: { title: 'Avocado Toast', description: 'Whole grain toast topped with mashed avocado, salt, pepper, and a poached egg' }, \
                        Lunch: { title: 'Chicken Salad', description: 'Grilled chicken served on a bed of mixed greens with cherry tomatoes, cucumber, bell peppers, topped with \
                        balsamic vinaigrette' }, Dinner: { title: 'Vegetable Stir Fry', description: 'Assorted vegetables sautéed with soy sauce, garlic, ginger, and served over rice' } }, \
                        Tuesday: { Breakfast: { title: 'Fruit Bowl', description: 'Assorted fresh fruits with a dollop of Greek yogurt and a drizzle of honey' }, Lunch: { title: 'Turkey Sandwich', \
                        description: 'Grilled turkey on whole grain bread with lettuce, tomato, cucumber, and avocado spread' }, Dinner: { title: 'Spaghetti Marinara', \
                        description: 'Spaghetti pasta tossed with classic marinara sauce and basil' } } }"

const OVERVIEW_PROMPT = `Provide information for a menu plan for an entire week.
                        I must receive JSON format with these keys, example: \`${OVERVIEW_FORMAT}\`
                        Use different meal examples. The title must have a maximum of three words. \
                        You must provide three meals for each day, Monday to Sunday!`

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
    var JSONllmResponse = extractJSONFromResponse(llmResponse)

    Object.keys(menu).forEach(day => {
      menu[day].Breakfast = JSONllmResponse[day].Breakfast
      menu[day].Lunch = JSONllmResponse[day].Lunch
      menu[day].Dinner = JSONllmResponse[day].Dinner
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
