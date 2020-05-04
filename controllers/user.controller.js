const bcrypt = require('bcrypt');
var cloudinary = require('cloudinary').v2;

var User = require('../models/user.model')
const saltRounds = 10;

module.exports.index = async (req,res)=>{
  var users = await User.find();

  var currentPage = req.query.page ? parseInt(req.query.page) : 1;
  var perPage = 10;
  var pageSize = Math.ceil(users.length / perPage );
  var begin = (currentPage - 1) * perPage;
  var end = currentPage * perPage;

  res.render('users/index',{
    users: users.slice(begin, end),
    pageSize ,
    currentPage,
    titleLink: 'users'
  })
}

module.exports.create = (req,res)=>{
  res.render('users/create')
}

module.exports.postCreate =async (req,res)=>{
  var hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

  req.body.password = hashedPassword;
  req.body.isAdmin = false;
  var avatar = await cloudinary.uploader.upload(req.file.path);
  req.body.avatarUrl = avatar.url;
  await User.create(req.body);
  res.redirect('/users');
}

module.exports.edit = async (req,res)=>{
  const id = req.params.id;
  var user = await User.findById(id)
  res.render('users/edit',{
    user 
  })
}

module.exports.postEdit = async function(req,res){
  const id = req.params.id;
  await User.findByIdAndUpdate(id, req.body);

  res.redirect('/users')
}

module.exports.delete = async function(req,res){
  const id = req.params.id;
  await User.findByIdAndRemove(id)
  
  res.redirect('/users');
}