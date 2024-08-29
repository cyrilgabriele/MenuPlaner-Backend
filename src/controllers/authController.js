import userModel from '../models/userModel.js'
import menuplanModel from '../models/menuplanModel.js'

export async function authCallback(req, res) {
    try {
        const { sub: auth0_user_id, nickname, email } = req.body.user // Extract Auth0 user info

        // Check if user exists
        let user = await userModel.getUserByAuth0Id(auth0_user_id)

        if (!user) {
            // Create new person and user_account if not existing
            const person_id = await userModel.createPerson(nickname)
            const defaultMenuplanId = await menuplanModel.createDefaultMenuplan(person_id)

            await userModel.createUser(person_id, auth0_user_id, nickname, defaultMenuplanId)
            user = await userModel.getUserByAuth0Id(auth0_user_id) // Get the newly created user
        }

        res.status(200).json({ message: 'User authenticated and created successfully', user })
    } catch (error) {
        console.error('Error in auth callback:', error)
        res.status(500).send({ error: 'Authentication and user creation failed' })
    }
}
