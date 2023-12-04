const express = require('express')
const app = express()
const path = require('path')
const PORT = 3000
const routes = require('./router/shopRouter.js');

/* Define carpeta de archivos estáticos */
app.use(express.static(path.resolve(__dirname,'public')))
app.use (express.json())


/* Configuración del Template Engine: EJS */
app.set('view engine', 'ejs')
app.set('views', path.resolve(__dirname, "./src/views"));

app.use ('/', routes)
app.listen(PORT, () => {console.log(`Servidor corriendo en: http://localhost:${PORT}`)})
