import personModel from "../models/personModel.js"

const personService = {
    async createPerson(person_name) {
        const createdPerson = await personModel.createPerson(person_name)
        console.log("personService: createPerson: person_id: ", createdPerson)
        return createdPerson
    }
}

export default personService