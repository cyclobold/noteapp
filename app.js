var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

//const client = new MongoClient();


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var contactusRouter = require("./routes/contactus");
var loginRouter = require("./routes/login");
var registerRouter = require("./routes/register");

var app = express();

app.use(express.json());

app.post("/register-user", async function(request, response){

  MongoClient.connect("mongodb://admin:password@localhost:27017", function(err, client){
      if(err) throw err

      console.log(request.body)

      const fullname = request.body.fullname;
      const email = request.body.email;

      client.db("notes").collection("users").insertOne({
        fullname: fullname,
        email: email
      })

      response.send({
        message: "New User created successfully",
        data: {fullname: fullname, email: email},
        code: "success"
      })

      //


  });


  // const feedback = await client.db("notes_app").collection("users").insertOne({
  //   name: "James",
  //   email: "james@email.com"
  // });

  // if(feedback){
  //   response.send("User registered");
  //}


});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/contactus", contactusRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);

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
