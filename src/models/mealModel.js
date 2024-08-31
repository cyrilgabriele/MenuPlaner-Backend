import pool from '../db/connect.js'

const mealModel = {
    saveMeal: async (meal_name, meal_description, menuplan_id, meal_title) => {
        try {
            const saveMealMealQuery = {
                name: "saveMeal", 
                text: "INSERT INTO meal (meal_name, meal_description, menuplan_id, created_at, meal_title) \
                VALUES ($1, $2, $3, NOW(), $4) \
                RETURNING meal_id",
                values: [meal_name, meal_description, menuplan_id, meal_title]
            }
            const result = await pool.query(saveMealMealQuery)
            console.log("saveMeal(): result.rows[0].meal_id: ", result.rows[0].meal_id )
            return result.rows[0].meal_id 
        } catch (error) {
            console.error('Error saving meal:', error)
            throw error
        }
    },
}

export default mealModel
