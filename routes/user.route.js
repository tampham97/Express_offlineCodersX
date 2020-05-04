var express = require('express')
var multer  = require('multer')

var upload = multer({ dest: './public/uploads/' })
var userController = require('../controllers/user.controller');
var validate = require('../validate/user.validate');

var router = express.Router();

router.get('/', userController.index)
router.get('/create', userController.create)
router.post('/create',upload.single('avatarUrl'), validate.postCreate , userController.postCreate)
router.get('/:id/edit',userController.edit)
router.post('/:id/edit', userController.postEdit)
router.get('/:id/delete', userController.delete)

module.exports = router;