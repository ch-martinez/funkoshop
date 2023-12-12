/* --- DATABASE CONFIGURATION --- */
const pool = require("../config/database");

// Crear un nuevo usuario en la base de datos. Por defecto, un cliente.
async function createUserInDB(newUser) {
    const query = `
    INSERT INTO user (user_id, name, lastname, email, password)
    VALUES (NULL, ?, ?, ?, ?)`;
    const values = [
        newUser.name,
        newUser.lastname,
        newUser.email,
        newUser.password
    ];

    try {
        const [result] = await pool.query(query, values);
        if (result.affectedRows > 0) {
            console.log("--> Se agregó un nuevo usuario en la base de datos");
            return true;
        }
        else {
            console.log("--> No se ha agregado el usuario producto en la base de datos");
            return false;
        }
    }
    catch (err) {
        console.error(`Error en la consulta a la base de datos: ${err}`);
        throw err;
    }
}


// Obtener un usuario de la base de datos a partir de un email.
async function getUserFromDBByEmail(email) {
    const query = `SELECT * FROM user WHERE email = ?`;

    try {
        const [userData] = await pool.query(query, [email]);
        return userData;
    }
    catch (err) {
        console.error(`Error en la consulta a la base de datos: ${err}`);
        throw err;
    }
}


module.exports = {
    createUserInDB,
    getUserFromDBByEmail
}
