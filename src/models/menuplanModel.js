import pool from '../db/connect.js'

const menuplanModel = {
    async saveMenuplan(auth0_user_id, custom_prompt) {
        try {
            console.log("saveMenuplan: custom_prompt: ", custom_prompt)
            const saveMenuplanQuery = {
                text: `INSERT INTO menuplan (auth0_user_id, custom_prompt, created_at)
                       VALUES ($1, $2, NOW())
                       RETURNING menuplan_id`,
                values: [auth0_user_id, custom_prompt],
            }
            const result = await pool.query(saveMenuplanQuery)
            return result.rows[0].menuplan_id
        } catch (error) {
            console.error('Error creating menuplan:', error)
            throw error
        }
    },

    async getMenuplanById(id) {
        const query = {
            text: "SELECT * FROM menuplan WHERE auth0_user_id = $1",
            values: [id],
        }
        try {
            const result = await pool.query(query)
            return result.rows
        } catch (error) {
            console.error('Error fetching menuplan:', error)
            throw error
        }
    },

    async getMenuplanWithMeals(auth0_user_id) {
        const query = {
            text: `SELECT mp.menuplan_id, mp.custom_prompt,
                   m.meal_name, m.meal_title, m.meal_description, m.meal_id
                   FROM menuplan mp
                   LEFT JOIN meal m ON mp.menuplan_id = m.menuplan_id
                   WHERE mp.auth0_user_id = $1`,
            values: [auth0_user_id],
        }
        try {
            const result = await pool.query(query)
            return result.rows
        } catch (error) {
            console.error('Error fetching menu plan with meals:', error)
            throw error
        }
    }
}

export default menuplanModel
