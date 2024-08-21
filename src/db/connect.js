import 'dotenv/config'
import pg from 'pg'
const { Client } = pg

const client = new Client({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
});

await client.connect();

// Add the rest of your code logic here
