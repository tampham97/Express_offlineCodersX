var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    name:String,
    phone: String,
    email: String,
    password:String,
    isAdmin: Boolean,
    wrongLoginCount: Number,
    avatarUrl : String
})

var User = new mongoose.model('User', userSchema, 'users');

module.exports = User