import personModel from "../models/personModel.js"

const personService = {
    async createPerson(person_name) {
        const person_id = await personModel.createPerson(person_name)
        console.log("personService: createPerson: person_id: ", person_id)
        return person_id
    }
}

export default personService