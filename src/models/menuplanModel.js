import pool from '../db/connect.js'
import { getLLMResponse, parseLLMResponse } from '../services/menuplanService.js'


const menuplanModel = {
    generateMenuplan: async (custom_prompt) => {
        try {
            const llmResponse = await getLLMResponse(custom_prompt)
            // console.log("llmResponse: \n", llmResponse)
            const parsedLLMResponse = parseLLMResponse(llmResponse)
            return parsedLLMResponse
        } catch (error) {
            // console.log(error);
            // console.log("ERROR IN LLM FETCH");
            res.status(500).send({ error: 'Error generating menu' })
        }
    },

    saveMenuplan: async (person_id, custom_prompt) => {
        try {
            const saveMenuplanQuery = {
                name: "saveMenuplan",
                text: "INSERT INTO menuplan (person_id, custom_prompt, created_at) \
                        VALUES ($1, $2, NOW()) \
                        RETURNING menuplan_id", 
                values: [person_id, custom_prompt]
            }

            const result = await pool.query(saveMenuplanQuery)
            return result.rows[0].menuplan_id 
        } catch (error) {
            console.error('Error creating menuplan:', error)
            throw error
        }
    },

    saveMeal: async (meal_name, meal_description, person_id, menuplan_id, meal_title) => {
        try {
            const saveMealMealQuery = {
                name: "saveMeal", 
                text: "INSERT INTO meal (meal_name, meal_description, person_id, menuplan_id, created_at, meal_title) \
                VALUES ($1, $2, $3, $4, NOW(), $5) \
                RETURNING meal_id",
                values: [meal_name, meal_description, person_id, menuplan_id, meal_title]
            }
            const result = await pool.query(saveMealMealQuery)
            return result.rows.meal_id 
        } catch (error) {
            console.error('Error saving meal:', error)
            throw error
        }
    },

    getMenuplanByPersonId: async (person_id) => {
        const getMenuplanQuery = {
            name: "getMenuplan", 
            text: "SELECT * FROM menuplan WHERE person_id = $1",
            values: [person_id],
        }

        try {
            const result = await pool.query(getMenuplanQuery)
            return result.rows 
        } catch (error) {
            console.error('Error fetching menuplan:', error)
            throw error
        }
    },
}

export default menuplanModel
