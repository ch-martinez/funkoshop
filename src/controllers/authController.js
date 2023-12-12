const { registerUser,
    getPassByEmailFromDB
} = require('../models/userModel')

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
        logged: req.session.isLog
    }
    const alert = false
    res.render('auth/login', { view, alert })
}

const loginRequest = async (req,res) => {
    const {email, password} = req.body
    const userData = await getPassByEmailFromDB(email)
    if(userData && userData.password == password){
        req.session.isLog = true
        req.session.userName = userData.name
        res.redirect('/admin')
    }else{
        const view = {
            title: 'Login - FS',
            logged: req.session.isLog,
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
        logged: req.session.isLog,
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
    res.render('auth/recoverPass', { view })
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
    res.render('auth/login', {view, alert})
}

module.exports = {
    loginView,
    loginRequest,
    registerView,
    registerRequest,
    recoverPass,
    logoutRequest
}