const nodemailer = require('nodemailer');
const { config } = require('./config.js');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.mail.user,
      pass: config.mail.password
    }
});

const send = (to, cc, bcc, replyTo, subject, text) => {
    const mailOptions = {
        from: `"${config.mail.senderName}" ${config.mail.fromAddress}`,
        to, cc, bcc, replyTo, subject, text
    };
    
    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            throw error;
        }
    });
};

module.exports = { send };
