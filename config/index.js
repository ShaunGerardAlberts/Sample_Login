var fs = require("fs");
var encryptTool = require('../utils/encryptionTool');

var config = JSON.parse(fs.readFileSync(__dirname + '/config.txt', 'utf-8')).config;

module.exports = {
  getDBConnectionString: () => {
    return encryptTool.decrypt(config.mongoString);
  },
  getRecaptchaKey: () => {
    return encryptTool.decrypt(config.recaptchKey);
  },
  getEmailAccount: () => {
    var email = {
      sender: encryptTool.decrypt(config.emailSender),
      username: encryptTool.decrypt(config.emailUsername),
      pass: encryptTool.decrypt(config.emailPassword),
    };
    return email;
  },
  getEncryptionSettings: () => {
    var enryptionSettings = {
      saltRounds: 10,
      planTextPassword: "FD234sadf#@D#",
    };
    return enryptionSettings;
  },
  getEnvironment: () => {
    return config.environment;
  },
  getPort: () => {
    return config.port;
  }

}