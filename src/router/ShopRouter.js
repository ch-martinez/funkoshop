// shopRoutes.js
const express = require('express');
const router = express.Router();
const mainController = require('../controllers/shopController.js');

mainController.initializeShop();
router.get('/shop', mainController.getShop);

router.get('/shop/item/:id', mainController.getItem);

router.post('/shop/item/:id/add', mainController.addItemToShop);

router.get('/shop/cart', mainController.getShoppingCart);

router.post('/shop/cart', mainController.updateShoppingCart);

module.exports = router;
