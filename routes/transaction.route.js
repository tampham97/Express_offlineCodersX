var express = require('express');

var transController = require('../controllers/transaction.controller');
var router = express.Router();

router.get('/', transController.index);
router.get('/create', transController.create);
router.post('/create',transController.postCreate )
router.get('/:id/complete',transController.isComplete)

module.exports = router;