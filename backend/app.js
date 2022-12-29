const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors =require('cors')
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const mongoose = require('mongoose');
const session = require('express-session')
const upload = require('./multer');
const { verifyJWT } = require('./middleware/verifyJWT');
require("dotenv").config()
const app = express();
app.use(cors({
  origin:'http://localhost:3000',
  credentials: true
}))
// view engine setup
app.use(session({
  secret: 'whatsapp',
  saveUninitialized: true,
  resave:true,
  cookie:{}
}
))      
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.DATABASE, {
  dbName:'reactApp',
  useNewUrlParser:true,
}).then(() => {
  console.log('Db connected');
  
}).catch((err) => {
  console.log(err);
  
})

app.use('/', indexRouter);
app.use('/adminlogin',require('./routes/adminlogin'))
app.use('/deleteuser', require('./routes/deleteuser'));
app.use('/updateuser',require('./routes/updateuser'))
app.use('/adminuser', require('./routes/admin'));
app.use('/userdetail', require('./routes/userdetail'));
app.use('/logout', require('./routes/logout'));
app.use('/users', usersRouter);
app.use('/refresh', require('./routes/refresh'));
app.use(verifyJWT)
app.use('/home', require('./routes/home'))









 




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
 res.sendStatus(500)
});

module.exports = app;
