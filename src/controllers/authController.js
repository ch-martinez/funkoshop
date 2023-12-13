const { registerUser,
    getPassByEmailFromDB
} = require('../models/userModel')

const formatUser = (user) => {
    const userSchema = {
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
        role: 0
    }
    return [Object.values(userSchema)]
}

const loginView = (req, res) => {
    const view = {
        title: 'Login - FS',
        userName: req.session.userName,
        logged: req.session.isLog,
        admin: req.session.isAdmin
    }
    const alert = false
    res.render('auth/login', { view, alert })
}

const loginRequest = async (req,res) => {
    const {email, password} = req.body
    const userData = await getPassByEmailFromDB(email)
    if(userData && userData.password == password){
        req.session.userName = userData.name
        req.session.isLog = true
        req.session.isAdmin = userData.role == 1
        req.session.cart = []
        req.session.isAdmin ? res.redirect('/admin') : res.redirect('/shop')
    }else{
        const view = {
            title: 'Login - FS',
            logged: req.session.isLog,
            admin: req.session.isAdmin
        }
        const alert = {
            success: false,
            message: "¡Usuario o contraseña incorrectos!"
        }
        res.render('auth/login',{view, alert})
    }
}

const registerView = (req, res) => {
    const view = {
        title: 'Registrarse - FS',
        userName: req.session.userName,
        logged: req.session.isLog,
        admin: req.session.isAdmin
    }
    res.render('auth/register', { view })
}

const registerRequest = async (req, res) => {
    const userData = req.body
    await registerUser(formatUser(userData))
    const view = {
        title: 'Login - FS',
        logged: req.session.isLog,
        userName: req.session.userName,
    }
    const alert = {
        success: true,
        message: `${req.body.email} fue registrado con éxito`
    }
    res.render('auth/login', {view, alert})
}

const recoverPass = (req, res) => {
    const view = {
        title: 'Recuperar contraseña - FS',
        logged: req.session.isLog
    }
    const alert = false
    res.render('auth/recoverPass', { view , alert})
}

const recoverRequest = (req, res) => {
    const view = {
        title: 'Recuperar contraseña - FS',
        logged: req.session.isLog
    }
    const alert = {
        success: true,
        message: `Se envio el correo de recuperación a  ${req.body.email}`
    }
    res.render('auth/recoverPass', { view, alert })
}

const logoutRequest = (req, res) => {
    req.session.isLog = false
    const view = {
        title: 'Login - FS',
        logged: req.session.isLog,
    }
    const alert = {
        success: false,
        message: `Se cerró la sesión de ${req.session.userName}`
    }
    req.session.destroy
    req.session.regenerate
    res.render('auth/login', {view, alert})
}

module.exports = {
    loginView,
    loginRequest,
    registerView,
    registerRequest,
    recoverPass,
    recoverRequest,
    logoutRequest
}