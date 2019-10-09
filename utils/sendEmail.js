var nodemailer = require('nodemailer');
var emailAcc = require('../config/index').getEmailAccount();


module.exports = (user, returnSendStatus) => {

  var transporter = nodemailer.createTransport({
    service: emailAcc.sender,
    auth: {
      user: emailAcc.username,
      pass: emailAcc.pass
    }
  });
  
  var mailOptions = {
    from: emailAcc.username,
    to: user.email,
    subject: 'Shaun\'s App - Please confirm your email address',
    text: 'That was easy!',
    html: `<body><h1>Shaun App</h1><p>Thank you for signing up at Shaun\'s app</p><p>Follow this link to activate your subcription. <a href="http://127.0.0.1:1000/verify/${user.username}2342233activate_me/${user.id}">Activate Now</a></body>` 
  };

  console.log(user)
  
  transporter.sendMail(mailOptions, function (error, info, res) {
    if (error) {
      return error; 
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      returnSendStatus(res);
    }
  });

} 

