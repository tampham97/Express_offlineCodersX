var cloudinary = require('cloudinary').v2;

var Book = require('../../models/book.model')
module.exports.index = async (req, res) => {;
  var books = await Book.find();
  res.json(books)
}


module.exports.postCreate = async (req,res)=>{
  var newBook = await Book.create(req.body);
  
  res.json(newBook);
}
module.exports.edit =async (req,res)=>{
  const id = req.params.id;

  var book = await Book.findOne({_id:id})
  res.json(book)
}

module.exports.updateBook = async function(req,res){
  const id = req.params.id;
  var updateBook = await Book.findByIdAndUpdate(id, req.body)
  res.json(updateBook)
}

 module.exports.delete = async function(req,res){
  const id = req.params.id;
  var book = await Book.findByIdAndRemove(id)
  res.json(book);
}