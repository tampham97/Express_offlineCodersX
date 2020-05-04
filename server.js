require('dotenv').config()

// server.js
const express = require("express");
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var cloudinary = require('cloudinary').v2
cloudinary.config({
  CLOUDINARY_URL : process.env.CLOUDINARY_URL
})
const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGO_URL)
mongoose.connect(process.env.URI,{ useUnifiedTopology: true ,useNewUrlParser: true} )

var userRoute = require('./routes/user.route');
var bookRoute = require('./routes/book.route');
var transactionRoute = require('./routes/transaction.route')
var authRoute = require('./routes/auth.route');
var profileRoute = require('./routes/profile.route');
var cartRoute = require('./routes/cart.route');


var apiLoginRoute = require('./api/routes/auth.route');
var apiTransactionRoute= require('./api/routes/transaction.route')
var apiBookRoute= require('./api/routes/book.route')
var apiUserRoute= require('./api/routes/user.route')

var authMiddleware = require('./middlewares/auth.middleware');
var sessionMiddleware = require('./middlewares/session.middleware')
const app = express();

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(cookieParser('asdasdasa'))
app.use(sessionMiddleware)
 
app.set('view engine', 'pug');
app.set('views', './views');


app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render('index')
});

app.use('/books', bookRoute);
app.use('/users',authMiddleware.requireAuth, userRoute);
app.use('/transactions',authMiddleware.requireAuth, transactionRoute)
app.use('/auth', authRoute)
app.use('/profile',authMiddleware.requireAuth, profileRoute)
app.use('/cart',cartRoute)

//API
app.use('/api',apiLoginRoute)
app.use('/api/transactions',apiTransactionRoute)
app.use('/api/books', apiBookRoute)
app.use('/api/users', apiUserRoute)

app.use(logErrors)
app.use(clientErrorHandler)
app.use(errorHandler)

app.use((req,res,next)=>{
  res.status(404).render('errors/errPage', {error: "404 Error"})
})

// Error in /book.controller
function logErrors (err, req, res, next) {
  console.error(err.stack)
  next(err)
}
function clientErrorHandler (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' })
  } else {
    next(err)
  }
}
function errorHandler (err, req, res, next) {
  res.status(500).render('errors/errPage', {error: "500 Error"})
}


// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
