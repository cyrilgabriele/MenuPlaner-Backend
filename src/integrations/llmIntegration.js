import { HfInference } from "@huggingface/inference"

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

const MODEL = 'mistralai/Mistral-7B-Instruct-v0.2'
const MAX_TOKENS = 30000

const llmIntegration = {
    async getLLMResponse(data, guide_prompt) {
        const HF_TOKEN = process.env.HUGGINGFACE_TOKEN
        const inference = new HfInference(HF_TOKEN)
        const out = await inference.chatCompletion({
            model: MODEL,
            messages: [{ role: 'user', content: guide_prompt + data }],
            max_tokens: MAX_TOKENS
        })
        return out.choices[0].message.content

        // return sampleResponse // if working @Regatron bc of VPN
    },

    parseLLMMenuplanResponse(llmResponse) {
        const JSONllmResponse = extractJSONFromResponse(llmResponse)
        const menu = {
            Monday: { Breakfast: '', Lunch: '', Dinner: '' },
            Tuesday: { Breakfast: '', Lunch: '', Dinner: '' },
            Wednesday: { Breakfast: '', Lunch: '', Dinner: '' },
            Thursday: { Breakfast: '', Lunch: '', Dinner: '' },
            Friday: { Breakfast: '', Lunch: '', Dinner: '' },
            Saturday: { Breakfast: '', Lunch: '', Dinner: '' },
            Sunday: { Breakfast: '', Lunch: '', Dinner: '' },
        }

        try {
            Object.keys(menu).forEach(day => {
                menu[day].Breakfast = JSONllmResponse[day].Breakfast
                menu[day].Lunch = JSONllmResponse[day].Lunch
                menu[day].Dinner = JSONllmResponse[day].Dinner
            })
        } catch (error) {
            console.error("An error occurred while parsing the LLM response:", error)
        }

        return menu
    }
}

function extractJSONFromResponse(llmResponse) {
    const firstBraceIndex = llmResponse.indexOf('{')
    const lastBraceIndex = llmResponse.lastIndexOf('}')
    if (firstBraceIndex !== -1 && lastBraceIndex !== -1) {
        const jsonString = llmResponse.slice(firstBraceIndex, lastBraceIndex + 1)
        try {
            return JSON.parse(jsonString)
        } catch (error) {
            console.error('Error parsing JSON:', error)
        }
    }
    return null
}

export default llmIntegration 
