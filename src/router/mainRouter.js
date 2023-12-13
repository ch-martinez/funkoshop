const express = require('express')
const router = express.Router()
const mainController = require('../controllers/mainController.js');


router.get("/", mainController.home);
router.get("/contact", mainController.contact);
router.get("/about", mainController.about);
router.get("/faqs", mainController.faqs);


module.exports = router