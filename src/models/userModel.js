const pool = require("../config/database");

const getPassByEmailFromDB = async (email) => {
    try {
        const [rows] = await pool.query('SELECT name, password, role FROM user WHERE email = ?',[email])
        return rows[0]
    } catch (error) {
        console.error(`Error en la consulta a la base de datos: ${err}`);
        throw err;
    }finally{
        pool.releaseConnection()
    }
}

const registerUser = async (userData) => {
    try {
        await pool.query('INSERT INTO user (name, lastname, email, password, role) VALUES ?', [userData])
    } catch (error) {
        console.error(`Error en la consulta a la base de datos: ${err}`);
        throw err;
    }finally{
        pool.releaseConnection()
    }
}

const existEmailInDB = async (email) => {
    try {
        const [rows] = await pool.query('SELECT email FROM user WHERE email = ?',[email])
        if (email == rows[0]?.email) {
            return true
        }else{
            return false
        }
    } catch (error) {
        console.error(`Error en la consulta a la base de datos: ${err}`);
        throw err;
    }finally{
        pool.releaseConnection()
    }
}

module.exports = {
    existEmailInDB,
    getPassByEmailFromDB,
    registerUser
}
