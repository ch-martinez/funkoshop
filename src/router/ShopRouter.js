// shopRoutes.js
const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController.js');

// shopController.initializeShop();
router.get('/', shopController.getShop);

router.get('/item/:id', shopController.getItem);

router.post('/item/:id/add', shopController.addItemToShop);

router.get('/cart', shopController.getShoppingCart);

router.post('/cart', shopController.updateShoppingCart);

module.exports = router;
