import menuplanModel from '../models/menuplanModel.js'
import mealModel from '../models/mealModel.js'
import llmIntegration from '../integrations/llmIntegration.js'
import menuplanUtils from '../utils/menuplanUtils.js'

const MENUPLAN_FORMAT = "{ Monday: { Breakfast: { title: 'Avocado Toast', description: 'Whole grain toast topped with mashed avocado, salt, pepper, and a poached egg' }, \
                        Lunch: { title: 'Chicken Salad', description: 'Grilled chicken served on a bed of mixed greens with cherry tomatoes, cucumber, bell peppers, topped with \
                        balsamic vinaigrette' }, Dinner: { title: 'Vegetable Stir Fry', description: 'Assorted vegetables sautéed with soy sauce, garlic, ginger, and served over rice' } }, \
                        Tuesday: { Breakfast: { title: 'Fruit Bowl', description: 'Assorted fresh fruits with a dollop of Greek yogurt and a drizzle of honey' }, Lunch: { title: 'Turkey Sandwich', \
                        description: 'Grilled turkey on whole grain bread with lettuce, tomato, cucumber, and avocado spread' }, Dinner: { title: 'Spaghetti Marinara', \
                        description: 'Spaghetti pasta tossed with classic marinara sauce and basil' } } }"
const MENUPLAN_PROMPT = `Provide information for a menu plan for an entire week.
                        I must receive JSON format with these keys, example: \`${MENUPLAN_FORMAT}\`
                        Use different meal examples. The title must have a maximum of three words. \
                        You must provide three meals for each day, Monday to Sunday!`

const menuplanService = {
    async generateMenuplan(custom_prompt) {
        const llmResponse = await llmIntegration.getLLMResponse(custom_prompt, MENUPLAN_PROMPT)
        return llmIntegration.parseLLMMenuplanResponse(llmResponse)
    },

    async saveMenuplan(auth0_user_id, custom_prompt, meals) {
        const menuplan_id = await menuplanModel.saveMenuplan(auth0_user_id, custom_prompt)
        await mealModel.saveEachMeal(meals, menuplan_id)
        return menuplan_id
    },

    async getMenuplan(auth0_user_id) {
        return await menuplanModel.getMenuplanById(auth0_user_id)
    },

    async getMenuplanWithMeals(auth0_user_id) {
        const query_result = await menuplanModel.getMenuplanWithMeals(auth0_user_id)
        const parsedMenu = menuplanUtils.parseMenuplanWithMeals(query_result)
        // console.log("getMenuplanWithMeals: parsedMenu: ", parsedMenu)
        return parsedMenu
    }
}

export default menuplanService
