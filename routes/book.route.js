var express = require('express');
var multer  = require('multer')

var upload = multer({ dest: './public/uploads/' })
var bookController = require('../controllers/book.controller');

var router = express.Router();

router.get("/", bookController.index);
router.get('/create',bookController.create)
router.post('/create',upload.single('coverUrl'),bookController.postCreate)
router.get('/:id/edit',bookController.edit)
router.post('/:id/edit',upload.single("coverUrl"), bookController.postEdit)
router.get('/:id/delete', bookController.delete)

module.exports = router