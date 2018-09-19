'use strict';
const nodemailer = require('nodemailer');
const emailConfig = require('./emailConfig');

const transportConfig = emailConfig.transportConfig;

function emailStudy() {
    console.log("In emailStudy function!");

    // set transporter
    let transporter = nodemailer.createTransport(transportConfig);

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
}

module.exports = emailStudy;