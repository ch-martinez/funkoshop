/* --- DEPENDENCIES --- */ 
const express = require('express');
const app = express();
const path = require("node:path");
require("dotenv").config();
const PORT = process.env.SV_PORT || 8080;

/* --- ROUTES --- */
const shopRoutes = require("./src/router/shopRouter.js");
const adminRoutes = require("./src/router/adminRoutes.js");
const mainRoutes = require("./src/router/mainRouter.js");

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

// MAIN
app.use("/", mainRoutes);

// SHOP
app.use('/shop', shopRoutes);

// ADMIN
app.use("/admin", adminRoutes);

// AUTH
/* CÓDIGO TEMPORAL PARA PROBAR ALGUNAS RUTAS DESDE ADMIN */
app.get("/auth/login", (req, res) => {
    res.render("admin/login");
})

/* CÓDIGO TEMPORAL PARA PROBAR ALGUNAS RUTAS DESDE ADMIN */
app.get("/auth/register", (req, res) => {
    res.render("admin/register");
})

app.use('', (req,res,next)=>{
    res.render("shop/error404");
})

/* --- SERVER --- */
app.listen(PORT, () => {
    console.log(`Servidor corriendo y escuchando en el puerto ${PORT}`);
});