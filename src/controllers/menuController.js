import { getLLMResponse, parseLLMResponse } from '../services/menuService.js'

export async function getMenu(req, res) {
    const { title, body, userId } = req.body
    console.log(`Title: ${title}, Body: ${body}, UserId: ${userId}`)
    try {
        const llmResponse = await getLLMResponse(body)
        console.log("llmResponse: \n", llmResponse)
        const parsedLLMResponse = parseLLMResponse(llmResponse)
        res.send(parsedLLMResponse);
    } catch (error) {
        console.log(error);
        console.log("ERROR IN LLM FETCH");
        res.status(500).send({ error: 'Error generating menu' })
    }
}

export function saveMenu(req, res) {
    //TODO send here the body (= accepted menu) to the db to store it persitently 
    res.send(req.body)
}
