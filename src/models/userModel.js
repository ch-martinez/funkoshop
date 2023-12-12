const pool = require("../config/database");

const getPassByEmailFromDB = async (email) => {
    const [rows] = await pool.query('SELECT name, password FROM user WHERE email = ?',[email])
    return rows[0]
}

const registerUser = async (userData) => {
    await pool.query('INSERT INTO user (name, lastname, email, password) VALUES ?;', [userData])
}

module.exports = {
    getPassByEmailFromDB,
    registerUser
}