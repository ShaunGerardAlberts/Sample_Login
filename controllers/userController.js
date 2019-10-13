var bodyParser = require('body-parser');
var request = require('request');
var bcrypt = require('bcryptjs');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var Logins = require('../model/loginmodel');
var sendEmail = require('../utils/sendEmail');
var recaptchaKey = require('../config/index').getRecaptchaKey;
var encryptionSettings = require('../config/index').getEncryptionSettings;
var jsonParser = bodyParser.json();

module.exports = (app) => {
  
  var isProduction = (process.env.PORT) ? true : false;
  app.get('/', (req, res) => {
    res.render("index", {prod: isProduction});
  });

  app.post('/createuser', urlencodedParser, (req, res) => {

    var recaptcha = '';

    try {
      recaptcha = req.body["g-recaptcha-response"];
    } catch(ex) {
      recaptcha = '';
    }
    
    if (req.body["g-recaptcha-response"] === undefined || req.body["g-recaptcha-response"] === '' || req.body["g-recaptcha-response"] === null ) {
      return res.json({"success": false, "msg": "Please select captcha"});
    }

    // Recaptcha key
    const secretKey = process.env.SECRET_RECAPTCHA_KEY || recaptchaKey();

    // Verify URL
    const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptcha}&remoteip=${req.connection.remoteAddres}`;

    //Make request to verifyURL
    request(verifyUrl, (err, response, body) => {

      body = JSON.parse(body);

      // if not sucessfull
      if (body.success == undefined && !body.success) {
        return res.json({"success": false, "msg": "Failed captcha verification"});
      }

    });

    var getEncryptionSettings = encryptionSettings();
    var hashedPassword = '';
    bcrypt.genSalt(getEncryptionSettings.saltRounds, function(err, salt) {
      bcrypt.hash(req.body.password, salt, function(err, hash) {
        
          hashedPassword = hash;

          var newUser = new Logins({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            hash: hashedPassword,
            verified: req.body.username + '2342233activate_me'
          });

          
        newUser.save((err) => {
          if (err) throw err;
          sendEmail(newUser, function() {
            return res.send(`User created - Email confirmation sent.`);
          });
          
        });
      });
    });

  
  });

  //request to verify account
  app.get('/verify/:verification_code/:account_id', (req, res) => {
    var verificationCode = req.params.verification_code;
    var accounId = req.params.account_id;
    //res.send(verificationCode + " " + accounId);

    Logins.findById(accounId, (err, user) => {
      
      if (err) res.send('Cannot find you!');

      if (user.verified === verificationCode) {
        user.verified = 'true';
        //update user
        user.save();
        res.send('You have been verified');
      } else if (user.verified === 'true') {
        res.send('You have already been verified');
      } else {
        res.send('something went wrong, link does not match expectation');
      }
    });
    
  });


  app.post('/login', urlencodedParser, (req, res) => {

    var hash = '$2a$10$/FYuJQ1tpmP7GJ.TV.3SXuEhmxcXV6HfA74A7FWVjISV.SOwjNucO';
    // res.send("hello")
    // var sdf = bcrypt.compareSync(req.body.password, hash);
    // console.log(sdf);
    var loginState = '';

    bcrypt.compare(req.body.password, hash).then(function(res2) {
      // res == true
      if (res2 === true) {
        console.log('Not implemented - but login successful');
        loginState = true;
        return;
      } else {
        console.log('Not implemented - but login unsuccessful');
        loginState = false;
        return;
      }
    }).then(function(res3) {
      console.log(loginState);
      if (loginState) {
        res.send('Not implemented - but login successful');
      } else if (!loginState) {
        res.send('Not implemented - but login unsuccessful');
      } else {
        res.send('Oh no, something went wrong, please try again')
      }
    });

  });


}