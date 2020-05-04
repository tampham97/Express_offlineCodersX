//var User = require('../models/user.model')
var Transaction = require('../../models/transaction.model')
//var Book = require('../models/book.model')

module.exports.index = async (req,res)=>{
  var transactions = await Transaction.find();
  
  res.json(transactions)
}

