var express = require('express')
var userController = require('../controllers/user.controller');
var router = express.Router();

router.get('/', userController.index)
router.post('/create', userController.postCreate)
router.get('/:id',userController.getUser)
router.put('/:id', userController.postEdit)
router.delete('/:id', userController.delete)

module.exports = router;