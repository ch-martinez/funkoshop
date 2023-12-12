/* USERMODEL: TEMPORAL HASTA QUE HAYA CONTROLLER */
const {
    createUserInDB,
    getUserFromDBByEmail
} = require("../models/userModel");

const getLoginForm = (req, res) => {
    res.render("admin/login", {
        error: false
    });
}

const signUp = async (req, res) => {
    try {
        const { email, password } = req.body;
        const [userData] = await getUserFromDBByEmail(email);
        if (userData && userData.password === password) {
            if (userData.role == 1) {
                req.session.isAdmin = true;
                req.session.cart = []; // Se agrega esto por las dudas
                res.redirect("/admin");
            }
            else {
                req.session.isClient = true;
                req.session.cart = [];
                res.redirect("/shop");
            }
        }
        else if (userData) {
            res.render("admin/login", {
                error: true,
                message: "Contraseña incorrecta"
            });
        }
        else {
            res.render("admin/login", {
                error: true,
                message: "Email incorrecto"
            });
        }
    }
    catch (err) {
        console.error(`* Error al intentar loguear: ${err}`);
        res.status(500).send("Internal Server Error");
    }
}

/* --- REGISTER --- */
const getRegisterForm = (req, res) => {
    res.render("admin/register");
}

// Crear el usuario en la base de datos.
const signIn = async (req, res) => {
    try {
        const newUser = {
            name: req.body.username,
            lastname: req.body.userLastname,
            email: req.body.userEmail,
            password: req.body.userPassword
        }

        const success = await createUserInDB(newUser);
        if (success) {
            res.redirect("/auth/login");
        }
        else {
            // Vista de registro con una alerta de error.
            res.redirect("/auth/register");
        }
    }
    catch (err) {
        console.error(`* Error al crear un usuario: ${err}`);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    getLoginForm,
    signUp,
    getRegisterForm,
    signIn
}
