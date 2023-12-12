// require("dotenv").config();

const { createPool } = require("mysql2/promise");

const pool = createPool({
    // host: process.env.DB_HOST || "localhost",
    // user: process.env.DB_USER || "root",
    // password: process.env.DB_PASSWORD || "",
    // database: process.env.DB_DATABASE || "funkoshop_db",
    // waitForConnections: true,
    // connectionLimit: 5,
    // queueLimit: 0,
    // port: process.env.DB_PORT || 3306

    host: "localhost",
    user:  "root",
    password: "",
    database: "funkoshop_db",
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
    port: process.env.DB_PORT || 3306
});

// Prueba de conexión
pool.getConnection()
    .then(connection => {
        console.log('Conectado con la base de datos: ', connection.config.database);
        connection.release();
    })
    .catch(err => {
        console.error('Error al conectar con la base de datos:', err);
    });

module.exports = pool;
