const nodemailer = require('nodemailer');
const { config } = require('./config.js');
const emailTemplates = require('./email-templates');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.mail.user,
      pass: config.mail.password
    }
});

const send = (to, cc, bcc, replyTo, subject, templateName, context) => {
    const { text, html } = emailTemplates.build(templateName, context);
    const mailOptions = {
        from: `"${config.mail.senderName}" ${config.mail.fromAddress}`,
        to, cc, bcc, replyTo, subject, text, html
    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            throw error;
        }
    });
};

module.exports = { send };