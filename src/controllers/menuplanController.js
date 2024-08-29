import menuplanModel from '../models/menuplanModel.js'


export async function generateMenuplan(req, res) {
    try {
        const custom_prompt = req.body.custom_prompt
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
        const person_id = req.body.person_id
        const custom_prompt = req.body.custom_prompt
        const meals = req.body.meals
        // save the new menuplan
        const menuplan_id = await menuplanModel.saveMenuplan(person_id, custom_prompt);
        // save each meal corresponding to thge menuplan
        const meal_ids = []
        for(const day in meals) {
            console.log(day)
            for(const meal_name in meals[day]) {
                // console.log(meal_name)
                const meal = meals[day][meal_name]
                // console.log("meals[day][meal_name].title: ", meal.title)
                // console.log("meals[day][meal_name].description: ", meal.description)
                const meal_description = meal.description
                const person_id = 1 // TODO fix this to acctual id
                const meal_title = meal.title
                const meal_id = await menuplanModel.saveMeal(meal_name, meal_description, person_id, menuplan_id, meal_title)
                meal_ids.push(meal_id)
            }
        }
        res.status(201).json({ menuplan_id });
    } catch (error) {
        console.error('Error saving menu:', error);
        res.status(500).send({ error: 'Error saving menu' });
    }
}

export async function getMenuplan(req, res) {
    // TODO: if person_id is not valid aka no entry w/ this id in table => still HTPP201...
    try {
        const person_id = req.body.person_id
        const query_res = await menuplanModel.getMenuplanByPersonId(person_id)
        res.status(201).json(query_res)
    } catch (error) {
        res.status(500).send( {error: 'Error while fetching menuplan'} )
    }
}
