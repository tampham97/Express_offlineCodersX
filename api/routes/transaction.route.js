var express = require('express');

var transController = require('../controllers/transaction.controller');
var router = express.Router();

router.get('/', transController.index);

module.exports = router;