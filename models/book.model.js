var mongoose = require('mongoose')

var bookSchema = new mongoose.Schema({
    title:String,
    desc: String,
    coverUrl: String
})

var Book = new mongoose.model('Book', bookSchema, 'books');

module.exports = Book