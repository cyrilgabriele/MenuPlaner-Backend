import menuplanModel from '../models/menuplanModel.js'
import mealModel from '../models/mealModel.js'
import llmIntegration from '../integrations/llmIntegration.js'
import menuplanUtils from '../utils/menuplanUtils.js'

const menuplanService = {
    async generateMenuplan(custom_prompt) {
        const llmResponse = await llmIntegration.getLLMResponse(custom_prompt)
        return llmIntegration.parseLLMResponse(llmResponse)
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
