const pool = require("../config/database");

const getPassByEmailFromDB = async (email) => {
    const [rows] = await pool.query('SELECT name, password, role FROM user WHERE email = ?',[email])
    return rows[0]
}

const registerUser = async (userData) => {
    await pool.query('INSERT INTO user (name, lastname, email, password, role) VALUES ?', [userData])
}

const existEmailInDB = async (email) => {
    const [rows] = await pool.query('SELECT email FROM user WHERE email = ?',[email])
    if (email == rows[0]?.email) {
        return true
    }else{
        return false
    }
}

module.exports = {
    existEmailInDB,
    getPassByEmailFromDB,
    registerUser
}
