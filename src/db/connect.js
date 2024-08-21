import 'dotenv/config'
import pg from 'pg'
const { Pool } = pg

const client = new Pool({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
});

await client.connect();

// Add the rest of your code logic here
