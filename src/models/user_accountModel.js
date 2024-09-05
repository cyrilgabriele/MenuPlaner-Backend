import pool from '../db/connect.js'

const user_accountModel = {
    createUser: async (person_id, auth0_user_id, nickname) => {
        try {
            const createUserQuery = {
                text:   `INSERT INTO user_account (person_id, auth0_user_id, nickname)
                        VALUES ($1, $2, $3)
                        RETURNING *`,
                values: [person_id, auth0_user_id, nickname]
            }
            const result = await pool.query(createUserQuery)
            return result.rows[0] 
        } catch (error) {
            console.error('Error creating user account:', error)
            throw error
        }
    },

    getUserByAuth0Id: async (auth0_user_id) => {
        try {
            const getUserQuery = {
                text:   `SELECT * FROM user_account WHERE auth0_user_id = $1`,
                values: [auth0_user_id]
            }
            const result = await pool.query(getUserQuery)
            return result.rows[0] 
        } catch (error) {
            console.error('Error fetching user account:', error)
            throw error
        }
    },
}

export default user_accountModel
