# My Thoughts for the next Steps
## First Phase
In this phase i want to impelemnt the essential fucntionalities to create a MVP
###
- DONE: change require() ti import ...
- DONE: I need to handle the response to fill into the table => each meal into the corresponding field (= Breakfast-Monday, ...)
- User could make then adjustments => maybe no because of ingredients list!! 
- in a next step the (may) altered table gets sent (piecewise) to the LLM and receipies for each meal is done 
- after receipies are saved => needed ingredients are counted up (=> in next phase create a 'Lagerbestand' to see what's available) 
    => for the Lagerbestand I need the association between recipe/meal and the Ingredient. Meal/Recipe <=> Ingredient relationship is n to n relationship
- receipies are saved as 'objects' => user can then via drop-down or select or whatever choose meals if pruposed ones does not fit 
- DONE: User must authenticate himself (auth0 ?)
- Therefore with the authenitcaiton the user can set some preferences for example: 
    I want to eat always the same breakfast (me for example) or vegetarian, ... => select input done => send to DB in next step
- set CORS settings in server => need to be specifiec correctly aka do not open every URL
- "secure" API acccess with tokens used from Auth0 (https://auth0.com/docs/secure/tokens)

how to structure the project: https://dev.to/vyan/how-to-structure-your-backend-code-in-nodejs-expressjs-2bdd