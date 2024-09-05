import user_accountService from "../services/user_accountService.js"

export async function getUser(req, res) {
    try {
        const auth0_user_id = req.body.auth0_user_id
        const userObject = await user_accountService.getUser(auth0_user_id)
        console.log("userObject: ", userObject)
        res.status(200).json(userObject)
    } catch (error) {
        console.log("Error in getUser: ", error)
        res.status(500).send({ error: 'Error getUser' })
    }
}

export async function createUser(req, res) {
    try {
        const person_id = req.body.person_id
        const auth0_user_id = req.body.auth0_user_id
        const nickname = req.body.nickname
        // menuplan_id = req.body.menuplan_id
        const createdUser = await user_accountService.createUser(person_id, auth0_user_id, nickname)
        console.log("user_accountController: createUser: ", createUser)
        res.status(200).json({createdUser})
    } catch (error) {
        console.log("Error in createUser: ", error)
        res.status(500).send({ error: 'Error createUser' })
    }
}