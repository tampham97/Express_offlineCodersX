var User = require('../models/user.model')

module.exports.postCreate = async function(req,res,next){
  var errors = [];
  var email = await User.findOne({email: req.body.email})
  console.log(email)
  if(email){
    errors.push('Email Already Exist!')
  }
  if(req.body.name.length > 30){
      errors.push('User Name is too long!')
    }
  if(isNaN(req.body.phone)){
    errors.push('Wrong Number')
  }
  if(req.body.password.length <6){
    errors.push('Password is too short')
  }
  if(errors.length){
    res.render('users/create', {
      errors : errors,
      values: req.body
    })
    return
  }
  next();
}