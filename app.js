const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const engine = require('ejs-mate');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');
var secret = require('./config/secret');
const mongoStore = require('connect-mongo')(session);
const passport = require('passport');




var app = express();


//middlewre
app.use(express.static(__dirname + '/views/public'));

console.log(__dirname + '/public');

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: secret.secretKey,
  store: new mongoStore({url: secret.database, autoReconnect: true})
}));
app.use(flash());

app.engine("ejs", engine);
app.set('view engine', 'ejs');
mongoose.connect(secret.database, function(err){
  if(err){
    console.log(err);
  }
  else{
    console.log("database is connected");
  }
});

var mainRoutes = require("./routes/main");
var userRoutes = require("./routes/users");

app.use(mainRoutes);
app.use(userRoutes);






app.listen(secret.port, function(err){
  if (err) throw err;
  console.log("server is dancing on 3000 port");
})
