const bcrypt = require('bcrypt');

var User = require('../../models/user.model');
const saltRounds = 10;


module.exports.postLogin =async (req,res)=>{
  
  var email = req.body.email;
  var password = req.body.password;
  var user = await User.findOne({email})
  if(!user){
    res.json(['User does not exist']);
    return;
  }

  var result = await bcrypt.compare(password, user.password);
  if (result == true) {
    res.json({login : true})
  } else {
    var wrongLoginCount = parseInt(user.wrongLoginCount);
    wrongLoginCount = ++wrongLoginCount;
    await User.findByIdAndUpdate(user.id, {wrongLoginCount : wrongLoginCount})
    
    if(wrongLoginCount > 4){
      res.json({
        "errors": ["Your account has been locked."],
        "values": req.body
      })
      return;
    }
    
    res.json({
      errors : ['Wrong password!'],
      values : req.body
    });
    return;
  }
}