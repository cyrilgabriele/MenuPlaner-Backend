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

    saveMenuplan: async (auth0_user_id, custom_prompt) => {
        try {
            const saveMenuplanQuery = {
                name: "saveMenuplan",
                text: "INSERT INTO menuplan (auth0_user_id, custom_prompt, created_at) \
                        VALUES ($1, $2, NOW()) \
                        RETURNING menuplan_id", 
                values: [auth0_user_id, custom_prompt]
            }

            const result = await pool.query(saveMenuplanQuery)
            // console.log("result.rows[0].menuplan_id: ", result.rows[0].menuplan_id)
            return result.rows[0].menuplan_id 
        } catch (error) {
            console.error('Error creating menuplan:', error)
            throw error
        }
    },

    getMenuplanById: async (id) => {
        const getMenuplanQuery = {
            name: "getMenuplan", 
            text: "SELECT * FROM menuplan WHERE auth0_user_id = $1",
            values: [id],
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
