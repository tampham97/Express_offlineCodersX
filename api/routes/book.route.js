var express = require('express');

var bookController = require('../controllers/book.controller');

var router = express.Router();

router.get("/", bookController.index);
router.post('/',bookController.postCreate)
router.get('/:id',bookController.edit)
router.put('/:id/update', bookController.updateBook)
router.delete('/:id/delete', bookController.delete)

module.exports = router