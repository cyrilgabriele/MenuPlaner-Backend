import { getLLMResponse, parseLLMResponse } from '../services/menuService.js'
import pool from '../db/connect.js'
import { text } from 'express'

export async function generateMenuplan(req, res) {
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

export async function saveMenuplan(req, res) {
    //TODO send here the body (= accepted menu) to the db to store it persitently 
    try {
        
        
        res.send(req.body)
        
    } catch (error) {
        
    }
    
}

export function getMenuplan(req, res) {
    // TODO: here a SELECT on the menuplan table with the correpsonding person_id aka auth0_id 
    // realizsed here that the DB schema is not the best as it is now? => how to get the menuplan with the auth0 id???
}
