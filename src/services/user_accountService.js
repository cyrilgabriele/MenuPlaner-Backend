import user_accountModel from "../models/user_accountModel.js"

const user_accountService = {
    async createUser(person_id, auth0_user_id, nickname) {
        const res_person_id = await user_accountModel.createUser(person_id, auth0_user_id, nickname)
        const isSuccessfull = false
        if(res_person_id) {
            isSuccessfull = true
        }
        console.log("user_accountService: isSuccessfull: ", isSuccessfull)
        return isSuccessfull
    },

    async getUser(auth0_user_id) {
        const userObject = await user_accountModel.getUserByAuth0Id(auth0_user_id)
        console.log("user_accountService: userObject: ", userObject)
        return userObject
    }
}

export default user_accountService
