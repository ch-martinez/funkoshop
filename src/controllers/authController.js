const { registerUser,
    getPassByEmailFromDB,
    existEmailInDB
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

const loginRequest = async (req, res) => {
    const { email, password } = req.body
    const userData = await getPassByEmailFromDB(email)
    if (userData) {
        if (userData.password == password) {
            req.session.userName = userData.name
            req.session.isLog = true
            req.session.isAdmin = userData.role == 1
            req.session.cart = []
            req.session.isAdmin ? res.redirect('/admin') : res.redirect('/shop')
        } else {
            const view = {
                title: 'Login - FS',
                logged: req.session.isLog,
                admin: req.session.isAdmin
            }
            const alert = {
                success: false,
                message: "¡Contraseña incorrecta!"
            }
            res.render('auth/login', { view, alert })
        }
    }else {
        const view = {
            title: 'Login - FS',
            logged: req.session.isLog,
            admin: req.session.isAdmin
        }
        const alert = {
            success: false,
            message: "¡Usuario incorrecto!"
        }
        res.render('auth/login', { view, alert })
    }
}

const registerView = (req, res) => {
    const view = {
        title: 'Registrarse - FS',
        userName: req.session.userName,
        logged: req.session.isLog,
        admin: req.session.isAdmin
    }
    const alert = false
    res.render('auth/register', { view, alert })
}

const registerRequest = async (req, res) => {
    const userData = req.body
    const view = {
        title: 'Login - FS',
        logged: req.session.isLog,
        userName: req.session.userName,
    }
    if (await existEmailInDB(userData.email)) {
        const alert = {
            success: false,
            message: `${userData.email} ya fue registrado`
        }
        res.render('auth/register', {view, alert})
    } else {
        if (!(userData.password == userData.passwordConfirm)) {
            const alert = {
                success: false,
                message: `Las contraseñas no coinciden`
            }
            res.render('auth/register', {view, alert})
        } else {
            await registerUser(formatUser(userData))
            const alert = {
                success: true,
                message: `${userData.email} fue registrado con éxito`
            }
            res.render('auth/login', {view, alert})
        }
    }
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
    const logged = false;
    const userName = req.session.userName;
    req.session.destroy((err) => {
    if (err) {
        console.error('Error al destruir la sesión:', err);
    } 
    else {
        const view = {
            title: 'Login - FS',
            logged,
        };

        const alert = {
            success: false,
            message: `Se cerró la sesión de ${userName}`
        };
        res.render('auth/login', {view, alert})
    }
  });
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
