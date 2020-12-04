var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var loginRouter = require("./routes/login");
const dotenv = require("dotenv");

var app = express();
dotenv.config();

// var User = require("./models/userModel");
var sequelize = require("./db/dbConfig");

/* User
  .sync
  //{ force: true }
  ()
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
  .then(function (err) {
    console.log("Connection has been established successfully.");
  })
  .catch(function (err) {
    console.log("Unable to connect to the database:", err);
  });

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/login", loginRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("error");
});

module.exports = app;
