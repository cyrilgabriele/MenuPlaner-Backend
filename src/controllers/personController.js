import personService from "../services/personService.js"

export async function createPerson(req, res) {
    try {
        const person_name = req.body.person_name
        const createdPerson = await personService.createPerson(person_name)
        res.status(201).json(createdPerson)
    } catch (error) {
        console.error('Error in createPerson:', error)
        res.status(500).send({ error: 'Error creating person' })
    }
}