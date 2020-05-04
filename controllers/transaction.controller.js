var User = require('../models/user.model')
var Transaction = require('../models/transaction.model')
var Book = require('../models/book.model')

module.exports.index = async (req,res)=>{
  var userId = res.locals.user.id;
  var transactions = await Transaction.find();
  var user = await User.findById(userId);
  var currentPage = req.query.page? parseInt(req.query.page) : 1
  var perPage = 10;
  var pageSize = Math.ceil(transactions.length / perPage);
  var begin = (currentPage - 1) * perPage;
  var end = currentPage * perPage;

  if(user.isAdmin){
    res.render('transaction/index',{
      transactions : transactions.slice(begin, end),
      pageSize,
      currentPage,
      titleLink: 'transactions'
    })
  }else{
    var dataTransUser = await Transaction.find({userId:userId});
    var pageSize = Math.ceil(dataTransUser.length/perPage);
    res.render('transaction/index',{
      transactions : dataTransUser.slice(begin, end),
      pageSize,
      currentPage,
      titleLink: 'transactions'
    })
  }
}


module.exports.create = async (req,res)=>{
  res.render('transaction/create',{
    users: await User.find(),
    books: await Book.find()
  })
}


module.exports.postCreate = async (req,res)=>{
  req.body.isComplete = false;
  await Transaction.create(req.body)
  res.redirect('/transactions')
}


module.exports.isComplete = async (req,res)=>{
  var id = req.params.id;
  var result = await Transaction.findById(id);
  
  if(!result ){
    res.redirect('/');
    return
  }else{
    await Transaction.findByIdAndUpdate(id, {isComplete: true})
    res.redirect('/transactions')
  }
}