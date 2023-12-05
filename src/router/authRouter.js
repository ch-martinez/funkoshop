const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.get('/login', authController.loginView)
router.post('/login', authController.loginRequest)
router.get('/register', authController.registerView)
router.post('/register', authController.registerRequest)
router.get('/recoverPass', authController.recoverPass)
router.get('/logout', authController.logoutRequest)

module.exports = router