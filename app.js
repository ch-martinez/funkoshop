const express = require('express')
const app = express()
const path = require('path')
const PORT = 3000

/* Define carpeta de archivos estáticos */
app.use(express.static(path.resolve(__dirname,'public')))
app.use (express.json())

/* Configuración del Template Engine: EJS */
app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, "src/views"));

/* Importacion de rutas */
const shopRouter = require('./src/router/shopRouter.js');
const authRouter = require('./src/router/authRouter')

/* Rutas */
app.use ('/shop', shopRouter)
app.use('/auth',authRouter)



app.listen(PORT, () => {console.log(`Servidor corriendo en: http://localhost:${PORT}`)})
