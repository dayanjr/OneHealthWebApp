import 'dotenv/config';
import pkg from 'pg';
const { Pool } = pkg;
const pool = new Pool({
    host: 'db',
    port: 5432,
    user: 'onehealth',
    password: process.env.POSTGRES_PASSWORD
});


export default pool;
