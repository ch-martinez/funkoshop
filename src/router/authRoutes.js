const express = require('express');
const router = express.Router();

/* --- CONTROLLER */
const authController = require("../controllers/authController");


/* LOGIN: CÓDIGO TEMPORAL PARA PROBAR COSAS */
router.get("/login", authController.getLoginForm);

router.post("/login", authController.signUp);

/* REGISTER: CÓDIGO TEMPORAL PARA PROBAR COSAS */
router.get("/register", authController.getRegisterForm);

router.post("/register", authController.signIn);


module.exports = router;
