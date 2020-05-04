const bcrypt = require('bcrypt');

var User = require('../../models/user.model')
const saltRounds = 10;

module.exports.index = async (req,res)=>{
  var users = await User.find();

  res.json(users)
}


module.exports.postCreate =async (req,res)=>{
  var hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  req.body.password = hashedPassword;
  
  var newUser = await User.create(req.body);
  res.json(newUser);
}

module.exports.getUser = async (req,res)=>{
  const id = req.params.id;
  var user = await User.findById(id)
  res.json(user)
}

 module.exports.postEdit = async function(req,res){
  const id = req.params.id;
  var hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  req.body.password = hashedPassword;
  var updateUser = await User.findByIdAndUpdate(id, req.body);

  res.json(updateUser)
}

 module.exports.delete = async function(req,res){
  const id = req.params.id;
  var deleteUser = await User.findByIdAndRemove(id)
  
  res.json(deleteUser)
}