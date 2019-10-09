var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');
var userController = require('./controllers/userController');

var port = process.env.PORT || 1000;

app.set('view engine', 'ejs');
var connectDB = mongoose.connect(config.getDBConnectionString());
console.log(connectDB);

app.use('/assets', express.static(__dirname + "/public"));

userController(app);

app.listen(port, () => {
  console.log("Listening");
});