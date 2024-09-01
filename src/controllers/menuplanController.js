import menuplanModel from '../models/menuplanModel.js'
// import { saveEachMeal } from '../services/mealService.js'
import mealModel from '../models/mealModel.js'


export async function generateMenuplan(req, res) {
    try {
        const custom_prompt = req.body.custom_prompt
        console.log("generateMenuplan: custom_prompt: ", custom_prompt)
        const parsedLLMResponse = await menuplanModel.generateMenuplan(custom_prompt)
        res.status(200).send(parsedLLMResponse)
    } catch (error) {
        console.log(error);
        console.log("ERROR IN LLM FETCH");
        res.status(500).send({ error: 'Error generating menu' })
    }
}

export async function saveMenuplan(req, res) {
    try {
        const auth0_user_id = req.body.auth0_user_id
        const custom_prompt = req.body.custom_prompt
        const meals = req.body.meals
        // save the new menuplan
        const menuplan_id = await menuplanModel.saveMenuplan(auth0_user_id, custom_prompt);
        // save each meal corresponding to thge menuplan
        const meal_ids = await mealModel.saveEachMeal(meals, menuplan_id)
        console.log("meal_ids: ", meal_ids)
        res.status(201).json({ menuplan_id });
    } catch (error) {
        console.error('Error saving menu:', error);
        res.status(500).send({ error: 'Error saving menu' });
    }
}

export async function getMenuplan(req, res) {
    // TODO: if auth0_user_id is not valid aka no entry w/ this id in table => still HTPP201...
    try {
        const auth0_user_id = req.body.auth0_user_id
        const query_res = await menuplanModel.getMenuplanById(auth0_user_id)
        res.status(201).json(query_res)
    } catch (error) {
        res.status(500).send( {error: 'Error while fetching menuplan'} )
    }
}

export async function getMenuplanWithMeals(req, res) {
    try {
        const auth0_user_id = req.body.auth0_user_id
        const query_res = await menuplanModel.getMenuplanWithMeals(auth0_user_id)
        res.status(201).json(query_res)
    } catch(error) {
        res.status(500).send( {error: 'Error while fetching menuplan'} )
    }
}
