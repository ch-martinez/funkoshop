/* --- DEPENDENCIES --- */ 
const express = require('express');
const app = express();
const path = require("node:path");
const PORT = 3000;


/* --- ROUTES --- */
const shopRoutes = require('./src/router/shopRouter.js');
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
// app.use('/', shopRoutes);

// ADMIN
app.use("/admin", adminRoutes);

// AUTH


/* --- SERVER --- */
app.listen(PORT, () => {
    console.log(`Servidor corriendo y escuchando en el puerto ${PORT}`);
});
