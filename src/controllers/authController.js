const { registerUser,
    getUserByEmailFromDB
} = require('../models/usersModels')

const formatUser = (user) => {
    const userSchema = {
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        password: user.password
    }
    return [Object.values(userSchema)]
}

const loginView = (req, res) => {
    const view = {
        title: 'Login - FS',
        logged: req.session.isLog,
    }
    res.render('pages/auth/login', { view })
}

const loginRequest = async (req, res) => {
    const { email, password } = req.body
    const userData = await getUserByEmailFromDB(email)
    if (userData && userData.password == password) {
        req.session.isLog = true
        res.redirect('/admin')
    } else {
        res.send('USUARIO O CONTRASEÑA INCORRECTA')
    }
}

const registerView = (req, res) => {
    const view = {
        title: 'Registrarse - FS',
        logged: req.session.isLog,
    }
    res.render('pages/auth/register', { view })
}

const registerRequest = async (req, res) => {
    const userData = req.body
    await registerUser(formatUser(userData))
    res.redirect('/auth/login')
}

const recoverPass = (req, res) => {
    const view = {
        title: 'Recuperar contraseña - FS',
        logged: req.session.isLog
    }
    res.render('pages/auth/recoverPass', { view })
}

const logoutRequest = (req, res) => {
    req.session.isLog = false
    res.redirect('/auth/login')
}

module.exports = {
    loginView,
    loginRequest,
    registerView,
    registerRequest,
    recoverPass,
    logoutRequest
}