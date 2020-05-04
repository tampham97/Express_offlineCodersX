var md5 = require('md5');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var mailgun = require('mailgun-js')({apiKey: process.env.api_key, domain: process.env.domain});
var db = require('../db');
var User = require('../models/user.model');

module.exports.login = (req,res)=>{
  res.render('auth/login')
}
module.exports.postLogin =async (req,res)=>{
  var email = req.body.email;
  var password = req.body.password;
  var  user = await User.findOne({email})
  var loginErr = {
                from: 'EpressJS_Exercise <codersX@gmail.com>',
                //to: db.get('users').find({email: email}).value().email,
                to: user.email,
                subject: 'Login system at Glitch_CodersX',
                text: 'Someone is trying to login your Account at Glitch_CodersX!'
              };
  if(!user){
    res.render('auth/login',{
      errors : ['User does not exist'],
      values : req.body
    });
    return;
  }

  var result = await bcrypt.compare(password, user.password);
  if (result == true) {
    await User.findByIdAndUpdate(user.id, {wrongLoginCount: 0})
    res.cookie('userId', user.id,{
      signed :true
    })
    res.redirect('/users')
  } else {
    var wrongLoginCount = parseInt(user.wrongLoginCount);
    wrongLoginCount = ++wrongLoginCount;
    await User.findByIdAndUpdate(user.id, {wrongLoginCount : wrongLoginCount})
    
    if(wrongLoginCount > 4){
      await mailgun.messages().send(loginErr);
      res.status(403).end();
      return;
    }
    
    res.render('auth/login',{
      errors : ['Wrong password!'],
      values : req.body
    });
    return;
  }
}