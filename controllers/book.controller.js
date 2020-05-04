var cloudinary = require('cloudinary').v2;

var Book = require('../models/book.model')
var Session = require('../models/session.model');

module.exports.index = async (req, res, next) => {
  var sessionId = req.signedCookies.sessionId;
  var books = await Book.find();
  var session = await Session.findById(sessionId)

  var currentPage = req.query.page ? parseInt(req.query.page) : 1;
  var perPage = 10;
  var pageSize = Math.ceil(books.length / perPage );
  var begin = (currentPage - 1) * perPage;
  var end = currentPage * perPage;

  try{
  // test Error handling
  // var a; a.b();
  
  res.render('books/index',{
        books: books.slice(begin, end),
        cart:session.cart,
        pageSize,
        currentPage,
        titleLink: "books"
      })
  }catch(error){
    next(error)
  }

}

module.exports.create = (req,res)=>{
  res.render('books/create')
}

module.exports.postCreate = async (req,res)=>{
  var file = req.file.path;
  var result =await cloudinary.uploader.upload(file);
  req.body.coverUrl = result.url;

  await Book.create(req.body)
  res.redirect('/books')
}
module.exports.edit =async (req,res)=>{
  const id = req.params.id;

  var book = await Book.findOne({_id:id})
  res.render('books/edit',{
    book: book
  })
}

module.exports.postEdit = async function(req,res){
  const id = req.params.id;
  var avatar = await cloudinary.uploader.upload(req.file.path);
  req.body.coverUrl = avatar.url;
  await Book.findByIdAndUpdate(id, req.body)
  res.redirect('/books')
}

module.exports.delete = async function(req,res){
  const id = req.params.id;
  await Book.findByIdAndRemove(id)
  res.redirect('/books');
}