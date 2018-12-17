var nodemailer = require('nodemailer');
var config = require('../config.js');

// console.log("@config.clientId : " + config.clientId);
// console.log("@config.clientSecret : " + config.clientSecret);
// console.log("@config.refreshToken : " + config.refreshToken);
// console.log("@config.accessToken : " + config.accessToken);

var smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        type: 'OAuth2',
        user: 'wdjty326@gmail.com',
        clientId: config.clientId,
        clientSecret: config.clientSecret,
        refreshToken: config.refreshToken,
        accessToken: config.accessToken,
        expires: 3600
    }
});

var mailOptions = {
    to : 'wdjty326@gmail.com'
};

module.exports = function(request, response) {
  var json = {};
  var subject = request.body.subject;
  var html = "<pre>" + request.body.content + "</pre>";
  var from = {
      name : request.body.name,
      address : request.body.address
  };

  mailOptions.subject = subject;
  mailOptions.html = html;
  mailOptions.from = from;
  try {
    smtpTransport.sendMail(mailOptions, function(error, response){

        if (error){
            console.log(error);
            //json = { success : false, error : error  };
        } else {
            console.log("Message sent : " + response.message);
            //json = { success : true  };
        }
        smtpTransport.close();
    });

    json = {
      success : true
    };
  } catch ( e ) {
    json = {
      success : false,
      error : e
    };
  }

  return json;
};
