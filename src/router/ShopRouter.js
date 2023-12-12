const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController.js');

/* --- EXPRESS SESSION --- */
const clientRequired = require("../middlewares/clientRequired");

router.get('/', shopController.getShop);

router.get('/item/:id', shopController.getItem);

router.post('/item/:id/add', clientRequired, shopController.addProductToCart);

router.get('/cart', clientRequired, shopController.getShoppingCart);

router.post('/cart', clientRequired, shopController.purchase);

module.exports = router;
