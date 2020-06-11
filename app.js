var createError = require('http-errors');
var express = require('express');
const favicon = require('express-favicon');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql = require('mysql');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var profileRouter = require('./routes/profile');
var registerRouter = require('./routes/register');
var authRouter = require('./routes/auth');
const dotenv = require('dotenv');

var app = express();

app.use(favicon(__dirname + '/public/images/favicon.png'));
dotenv.config({ path: './.env' });

// Database setup

const db = mysql.createConnection({
  host : process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
});

db.connect((err) => {
  if(err){
    console.log(err);
  }else{
    console.log("MySQL Conneted");
  }
});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/register', registerRouter);
app.use('/profile', profileRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
