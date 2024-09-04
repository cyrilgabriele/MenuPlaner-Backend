import pool from "../db/connect.js"

const personModel = {
    async createPerson(person_name) {
        try {
            const createPersonQuery = {
                text:   `INSERT INTO person (person_name, created_at)
                        VALUES ($1, NOW())
                        RETURNING *`,
                values: [person_name],
            }
            const result = await pool.query(createPersonQuery)
            return result.rows[0]
        } catch (error) {
            console.error('Error creating person:', error)
            throw error
        }
    },
}

export default personModel