import user_accountModel from "../models/user_accountModel.js"

const user_accountService = {
    async createUser(person_id, auth0_user_id, nickname) {
        const personObject = await user_accountModel.createUser(person_id, auth0_user_id, nickname)
        console.log("user_accountService: personObject: ", personObject)
        let isSuccessfull = false
        if(personObject) {
            isSuccessfull = true
        }
        console.log("user_accountService: isSuccessfull: ", isSuccessfull)
        console.log("user_accountService: personObject: ", personObject)
        return personObject
    },

    async getUser(auth0_user_id) {
        const userObject = await user_accountModel.getUserByAuth0Id(auth0_user_id)
        console.log("user_accountService: userObject: ", userObject)
        return userObject
    }
}

export default user_accountService
