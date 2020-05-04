var Transaction = require('../models/transaction.model')
var Session = require('../models/session.model')
var Book = require('../models/book.model')

module.exports.cart = async (req,res)=>{
  var sessionId = req.signedCookies.sessionId;
  var session = await Session.findById(sessionId);
  var books = await Book.find()
  res.render('cart/cart',{
    cart : session.cart,
    books: books
  })
}

module.exports.addToCart = async (req,res)=>{
  var bookId = req.params.bookId;
  var sessionId = req.signedCookies.sessionId;
  if(!sessionId){
    res.redirect('/books')
    return;
  }
  var session = await Session.findById(sessionId)
  if(session.cart.indexOf(bookId) === -1){
    session.cart.push(bookId)
    await Session.findByIdAndUpdate(sessionId,{cart: session.cart} )
  }
  res.redirect('/books')
}
module.exports.deleteFromCart =async (req,res)=>{
  var bookId = req.params.bookId;
  var sessionId = req.signedCookies.sessionId;
  var session = await Session.findById(sessionId);
  var index = session.cart.findIndex(item => item ===bookId) 
  session.cart.splice(index,1)
  await Session.findByIdAndUpdate(sessionId, {cart :session.cart })
  res.redirect('/cart')
}


module.exports.addToTransaction = async (req,res)=>{
  var sessionId = req.signedCookies.sessionId;
  var userId = res.locals.user.id;
  var session = await Session.findById(sessionId)
  if(session.cart){
    for( var item of session.cart){
      await Transaction.create({userId :userId , bookId: item})
    }
  }
  await Session.findByIdAndUpdate(sessionId, {cart: []})
  res.redirect('/transactions')
}