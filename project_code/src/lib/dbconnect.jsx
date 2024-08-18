const { Client } = require('pg');

const dotenv = require('dotenv');

dotenv.config({ path: '../../.env.local' });

// Use your database connection details here
const client = new Client({
    connectionString: process.env.DATABASE_URL, // or individual parameters
});

async function testConnection() {
    console.log('Testing connection');
    console.log('connection string:', process.env.DATABASE_PRIVATE_URL)
    try {
        await client.connect(); // tries to connect to your database
        console.log('Connected successfully');
        const res = await client.query('SELECT * FROM equipments');
        console.log(res.rows);
        // await client.end(); // closes the connection
    } catch (err) {
        console.error('Connection failed', err.stack);
    }
}

testConnection();

