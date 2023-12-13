/* --- DEPENDENCIES --- */ 
const express = require('express');
const app = express();
const path = require("node:path");
require("dotenv").config();
const PORT = process.env.DB_PORT || 3306;

/* Configuracion express-session */
const session = require('express-session')
app.use(session({
    secret: 'funko',
    resave: false,
    saveUninitialized: true,
    isLog: false
}))

/* --- ROUTES --- */
const mainRoutes = require("./src/router/mainRouter.js")
const shopRoutes = require("./src/router/shopRouter.js")
const adminRoutes = require("./src/router/adminRoutes.js")
const authRoutes = require("./src/router/authRoutes.js")

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
    secret: "prueba",
    name: "session",
    resave: false,
    saveUninitialized: false,
}))

// MAIN
app.use("/", mainRoutes);

// SHOP
app.use('/shop', shopRoutes);

// ADMIN
app.use("/admin", adminRoutes);

// AUTH
app.use('/auth', authRoutes)

/* 404 - Not found */
app.use('', (req,res,next)=>{
    res.render('404',view = {title: 'No encontrada',logged: req.session.isLog, glide: false});
})

/* --- SERVER --- */
app.listen(PORT, () => {
    console.log(`Servidor corriendo y escuchando en el puerto ${PORT}`);
});
