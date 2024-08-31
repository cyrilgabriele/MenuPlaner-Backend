import pool from '../db/connect.js'

const mealModel = {
    saveEachMeal: async (meals, menuplan_id) => {
        const meal_ids = []
        for(const day in meals) {
            console.log(day)
            for(const meal_name in meals[day]) {
                const meal_name_concatenated = day+'_'+meal_name
                console.log(meal_name)
                const meal = meals[day][meal_name]
                // console.log("meals[day][meal_name].title: ", meal.title)
                // console.log("meals[day][meal_name].description: ", meal.description)
                const meal_description = meal.description
                const meal_title = meal.title
                // TODO: this call should happen in a controller (menu or menuplan?) but not here!
                // here only do the data transformation
                const meal_id = await saveMealQuery(meal_name_concatenated, meal_description, menuplan_id, meal_title)
                meal_ids.push(meal_id)
            }
        }
        return meal_ids
        },
}

async function saveMealQuery(meal_name, meal_description, menuplan_id, meal_title) {
    try {
        const saveMealQuery = {
            name: "saveMeal", 
            text: "INSERT INTO meal (meal_name, meal_description, menuplan_id, created_at, meal_title) \
            VALUES ($1, $2, $3, NOW(), $4) \
            RETURNING meal_id",
            values: [meal_name, meal_description, menuplan_id, meal_title]
        }
        const result = await pool.query(saveMealQuery)
        console.log("saveMeal(): result.rows[0].meal_id: ", result.rows[0].meal_id )
        return result.rows[0].meal_id 
    } catch (error) {
        console.error('Error saving meal:', error)
        throw error
    }
}

export default mealModel
