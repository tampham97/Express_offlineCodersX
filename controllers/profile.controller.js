var cloudinary = require('cloudinary').v2;

var User = require('../models/user.model')

module.exports.profile = async (req,res)=>{
  var avatarDefault = await cloudinary.url('avatar_default');

  res.render('profile/profile',{
    user: res.locals.user,
    avatarUrl : res.locals.user.avatarUrl || avatarDefault
  })
}

module.exports.postProfile = async (req,res)=>{
  const id = res.locals.user.id;

  await User.findByIdAndUpdate(id, req.body)
  res.redirect('/users')
}

module.exports.avatar =  async (req,res)=>{
  var avatarDefault = await cloudinary.url('avatar_default');

  res.render('profile/change-avatar',{
    avatarUrl: res.locals.user.avatarUrl || avatarDefault
  })
} 

module.exports.changeAvatar = async (req,res)=>{
  var file = req.file.path;
  var user = res.locals.user;
  var result = await cloudinary.uploader.upload(file);
  await User.findByIdAndUpdate(user.id,{avatarUrl: result.url})

  res.render('profile/change-avatar',{
    avatarUrl: result.url
  })
} 