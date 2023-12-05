import { config } from "dotenv";
config();

import { createPool } from 'mysql2/promise';

const pool = createPool({
    host: "localhost" || process.env.DB_HOST, 
    user: "root" || process.env.DB_USER,
    password: "" || process.env.DB_PASSWORD,
    database: "workshop2023" || process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
    port: process.env.DB_PORT || 3306
});

// Prueba de conexión
pool.getConnection()
    .then(connection => {
        console.log('Connected to MySQL database');
        connection.release();
    })
    .catch(err => {
        console.error('Error connecting to MySQL:', err);
    });

export default pool;