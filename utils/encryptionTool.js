var crypto = require('crypto');

const algorithm = 'aes-256-cbc';
var cryptoSecret = 'asdf234asdf'

module.exports = {
  encrypt: (text) => {
    var cipher = crypto.createCipher(algorithm, cryptoSecret)
    var crypted = cipher.update(text,'utf8','hex')
    crypted += cipher.final('hex');
    return crypted;
  },
 
  decrypt: (text) => {
    var decipher = crypto.createDecipher(algorithm, cryptoSecret)
    var dec = decipher.update(text,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;  
  }
}