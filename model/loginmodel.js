var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var loginScheme = new Schema({
  username: String,
  email: String,
  password: String,
  hash: String,
  verified: String
});

var Logins = mongoose.model('Logins', loginScheme);

module.exports = Logins;