/* --- DEPENDENCIES --- */ 
const express = require('express');
const app = express();
const path = require("node:path");
require("dotenv").config();
const port = process.env.SV_PORT || 8080;
const session = require('express-session')


/* --- ROUTES --- */
const mainRoutes = require("./src/router/mainRouter.js");
const shopRoutes = require("./src/router/shopRouter.js");
const adminRoutes = require("./src/router/adminRoutes.js");
const authRoutes = require("./src/router/authRoutes.js");

/* --- MIDDLEWARES --- */
// Definir la carpeta '/public' para los archivos estáticos..
app.use(express.static(path.resolve(__dirname,'public')));
app.use(express.json());

// Decodificar
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configuración del Template Engine: EJS
app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, "./src/views"));

// Middleware: express-session
app.use(session({
    secret: process.env.SESSION_SECRET,
    name: "session",
    resave: false,
    saveUninitialized: false,
    maxAge: 10000 * 10
}))

// MAIN
app.use("/", mainRoutes);

// SHOP
app.use('/shop', shopRoutes);

// ADMIN
app.use("/admin", adminRoutes);

// AUTH
app.use('/auth', authRoutes);

/* 404 - Not found */
app.use('', (req,res,next) => {
    res.render('404',view = {title: 'No encontrada',logged: req.session.isLog, glide: false});
});

/* --- SERVER --- */
app.listen(port, () => {
    console.log(`Servidor corriendo y escuchando en el puerto ${port}`);
});
