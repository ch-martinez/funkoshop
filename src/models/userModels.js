const { pool } = require('../config/conn')

const getUserByEmailFromDB = async (email) => {
    const [rows] = await pool.query('SELECT email FROM user WHERE email = ?;',[email])
    return rows[0]
}

const registerUser = async (userData) => {
    await pool.query('INSERT INTO user (name, lastname, email, password) VALUES ?;', [userData])
}

module.exports = {
    getUserByEmailFromDB,
    registerUser
}