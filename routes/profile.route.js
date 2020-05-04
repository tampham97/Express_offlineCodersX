var express = require('express');
var multer  = require('multer')

var upload = multer({ dest: './public/uploads/' })

var profileController = require('../controllers/profile.controller')
var router = express.Router();

router.get('/',profileController.profile )
router.post('/', profileController.postProfile)
router.get('/avatar',profileController.avatar)
router.post('/avatar',upload.single('avatarUrl'),profileController.changeAvatar)

module.exports = router