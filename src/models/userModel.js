import pool from '../db/connect.js'

const user_accountModel = {
    createUser: async (person_id, auth0_user_id, nickname, menuplan_id) => {
        const query = `
            INSERT INTO user_account (person_id, auth0_user_id, nickname, menuplan_id)
            VALUES ($1, $2, $3, $4)
            RETURNING person_id
        `
        const values = [person_id, auth0_user_id, nickname, menuplan_id]
        try {
            const result = await pool.query(query, values)
            return result.rows[0].person_id 
        } catch (error) {
            console.error('Error creating user account:', error)
            throw error
        }
    },

    getUserByAuth0Id: async (auth0_user_id) => {
        const query = `
            SELECT * FROM user_account WHERE auth0_user_id = $1
        `
        try {
            const result = await pool.query(query, [auth0_user_id])
            return result.rows[0] 
        } catch (error) {
            console.error('Error fetching user account:', error)
            throw error
        }
    },
}

export default user_accountModel
