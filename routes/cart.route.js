var express = require('express');

var cartController = require('../controllers/cart.controller');
var authMiddleware = require('../middlewares/auth.middleware');
var router = express.Router();

router.get('/', cartController.cart);
router.get('/add/:bookId', cartController.addToCart);
router.get('/delete/:bookId', cartController.deleteFromCart);
router.get('/transactions',authMiddleware.requireAuth, cartController.addToTransaction)

module.exports = router;