'use strict';
const nodemailer = require('nodemailer');

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing
// nodemailer.createTestAccount((err, account) => {
//     // create reusable transporter object using the default SMTP transport
// function sendEmail() {
//   let transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 465,
//     secure: true,
//     auth: {
//         type: 'OAuth2'
//     }
// });

// transporter.set('oauth2_provision_cb', (user, renew, callback) => {
//     let accessToken = userTokens[user];
//     if(!accessToken){
//         return callback(new Error('Unknown user'));
//     }else{
//         return callback(null, accessToken);
//     }
// });

// transporter.sendMail({
//     from: 'team.1@sanasyn.com',
//     to: 'whitstah@gmail.com',
//     subject: 'Message',
//     text: 'I hope this message gets through!',
//     auth: {
//         user: 'team.1@sanasyn.com'
//     }
// });
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            // type: 'OAuth2',
            user: 'team.1@sanasyn.com', // gmail account user
            password: 's@na5yn1'
            // serviceClient: '102400925459296360735',
            // privateKey: '1cb5f41fff920a76212d1bbfb61078ce1697ffa5'
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: 'team.1@sanasyn.com', // sender address
        to: 'whitstah@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
  // }

// sendEmail();
// });