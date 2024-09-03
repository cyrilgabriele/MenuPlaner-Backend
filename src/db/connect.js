import pg from 'pg'
const { Pool } = pg
import config from '../config/config.js';

const pool = new Pool({
    user: config.dbUser,
    password: config.dbPassword,
    host: config.dbHost,
    port: config.dbPort,
    database: config.dbName,
});

export default pool;
