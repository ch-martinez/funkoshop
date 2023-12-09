const express = require('express')
const app = express()
const path = require('path')
const PORT = 3000
const { config } = require('dotenv')
config()

/* Configuracion express-session */
const session = require('express-session')
app.use(session({
    secret: 'funko',
    resave: false,
    saveUninitialized: true,
    isLog: false
}))

/* Override para habilitar los métodos PUT y DELET */
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

/* Middlewares */
app.use(express.urlencoded({extended:false})) //Permite obtener la informacion de un formulario
app.use(express.json()) //Permite leer json - dev

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
app.use('', (req,res,next)=>{
    res.render('404',view = {title: 'No encontrada',logged: req.session.isLog,glide: false});
})


app.listen(PORT, () => {console.log(`Servidor corriendo en: http://localhost:${PORT}`)})
