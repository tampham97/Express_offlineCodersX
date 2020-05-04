var mongoose = require('mongoose')

var sessionSchema = new mongoose.Schema({
    cart:[String]
})

var Session = new mongoose.model('Session', sessionSchema, 'sessions');

module.exports = Session