'use strict';
const nodemailer = require('nodemailer');
const emailConfig = require('./emailConfig');
const pug = require('pug');
const compiledFunction = pug.compileFile(__dirname + '/template.pug');

const transportConfig = emailConfig.transportConfig;

function emailStudy(req, res) {

    console.log("In emailStudy function!");
    // console.log(req.body)

    let html = compiledFunction({
        studyTitle: req.body.study.brief_title,
        studyDescription: req.body.study.description,
        studyUrl: `https://clinicaltrials.gov/ct2/show/${req.body.study.nct_id}`,
        studyNctId: req.body.study.nct_id,
        facilityName: req.body.contact.facility_name !== null ? req.body.contact.facility_name : 'Not Available',
        facilityContactName: req.body.contact.facility_contact_name !== null ? req.body.contact.facility_contact_name : 'Not Available',
        facilityContactPhone: req.body.contact.facility_contact_phone !== null ? req.body.contact.facility_contact_phone : 'Not Available',
        facilityContactEmail: req.body.contact.facility_contact_email !== null ? req.body.contact.facility_contact_email : 'Not Available',
        centralContactName: req.body.contact.central_contact_name !== null ? req.body.contact.central_contact_name : 'Not Available',
        centralContactPhone: req.body.contact.central_contact_phone !== null ? req.body.contact.central_contact_phone : 'Not Available',
        centralContactEmail: req.body.contact.central_contact_email !== null ? req.body.contact.central_contact_email : 'Not Available',
    });

    // set transporter
    let transporter = nodemailer.createTransport(transportConfig);

    // setup email data with unicode symbols
    let mailOptions = {
        from: 'team.1@sanasyn.com', // sender address
        to: req.body.userEmail, // list of receivers
        subject: `Study ${req.body.study.nct_id}`, // Subject line
        html:  html // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        res.send("OK")
    });
}

module.exports = emailStudy;
