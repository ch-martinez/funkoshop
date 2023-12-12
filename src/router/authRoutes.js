const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const { body } = require('express-validator')

const loginValidation = [
    body('email')
    .isEmail()
    .withMessage('Ingrese una dirección de correo electrónico válido'),
    body('password')
     .isLength({ min: 6})
     .isAlphanumeric()
     .withMessage('La contraseña debe tener al menos 6 caracteres y contener letras y números.')
]

const registerValidation = [
    body('email')
        .isEmail()
        .withMessage('Ingrese una dirección de correo electrónico válido'),
    body('password')
        .isLength({ min: 6})
        .isAlphanumeric()
        .withMessage('La contraseña debe tener al menos 6 caracteres y contener letras y números.')
        .bail(),
    body('passwordConfirm').custom((value, { req }) => {
            if (value !== req.body.password) {
              throw new Error('Las contraseñas no coinciden');
            }
            return true;
        })
]

router.get('/login', authController.loginView)
router.post('/login', authController.loginRequest)
router.get('/register', authController.registerView)
router.post('/register', registerValidation, authController.registerRequest)
router.get('/recoverPass', authController.recoverPass)
router.get('/logout', authController.logoutRequest)

module.exports = router