const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const itemsRouter = require('./routes/items');
const ordersRouter = require('./routes/orders');
const categoriesRouter = require('./routes/categories');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');

const app = express();
app.use(cors());

// var User = require("./models/userModel");
const sequelize = require('./db/dbConfig');

/* User
  .sync
  //
  ({ force: true })
  .then(function () {
    // Table created
    return User.create({
      firstName: "John",
      lastName: "Hancock3",
      email: "mario2",
      address: "rijeka",
      phoneNumber: "999",
      password: "mario",
    });
  })
  .catch((err) => {
    console.log(err.errors[0].message);
  }); */
/*
User.sync({ force: true }).then(function () {
  // Table created
  return User.create({
    firstName: "John",
    lastName: "Hancock2",
    email: "mario",
  });
}); */

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.log('Unable to connect to the database:', err);
  });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/items', itemsRouter);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/orders', ordersRouter);
app.use('/categories', categoriesRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res /* , next */) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
