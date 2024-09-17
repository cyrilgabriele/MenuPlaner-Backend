import menuplanService from '../services/menuplanService.js'

export async function generateMenuplan(req, res) {
    try {
        const custom_prompt = req.body.custom_prompt
        console.log("generateMenuplan: custom_prompt: ", custom_prompt)
        const parsedLLMResponse = await menuplanService.generateMenuplan(custom_prompt)
        res.status(201).send(parsedLLMResponse)
    } catch (error) {
        console.log("Error in generateMenuplan: ", error)
        res.status(500).send({ error: 'Error generating menu' })
    }
}

export async function saveMenuplan(req, res) {
    try {
        const auth0_user_id = req.body.auth0_user_id
        const custom_prompt = req.body.custom_prompt
        const meals = req.body.meals
        console.log("saveMenuplan: custom_prompt: ", custom_prompt)
        const response = await menuplanService.saveMenuplan(auth0_user_id, custom_prompt, meals)
        const menuplan_id = response.menuplan_id
        const meal_ids = response.meal_ids
        res.status(201).json({ menuplan_id })
    } catch (error) {
        console.error('Error in saveMenuplan:', error)
        res.status(500).send({ error: 'Error saving menu' })
    }
}

export async function getMenuplan(req, res) {
    // TODO this is not used however: 
    // defined as a GET request => GET obviously no body? what am I doing here???
    try {
        const auth0_user_id = req.body.auth0_user_id
        const query_res = await menuplanService.getMenuplan(auth0_user_id)
        res.status(201).json(query_res)
    } catch (error) {
        res.status(500).send({ error: 'Error fetching menuplan' })
    }
}

export async function getMenuplanWithMeals(req, res) {
    try {
        const auth0_user_id = req.body.auth0_user_id
        const query_res = await menuplanService.getMenuplanWithMeals(auth0_user_id)
        res.status(201).json(query_res)
    } catch (error) {
        res.status(500).send({ error: 'Error fetching menuplan' })
    }
}
