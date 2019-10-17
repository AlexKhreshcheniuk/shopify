const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const promisify = require('es6-promisify');

const transport = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    }
});

/* transport.sendMail({
    from: 'Alex Bro <hellooaleks@gmail.com>',
    to: 'hellooaleks@gmail.com',
    subject: 'Just trying things out',
    html: 'Hey I <strong> love</strong> you',
    text: 'Hey I **love you**'
}); */

const generateHTML = (options) => {
    const html = pug.renderFile(`${__dirname}/../views/email/${options.filename}.pug`, options);
    const inline = juise(html);
    return inline;
}

exports.send = async (options) => {
    const html = generateHTML(options);
    const text = htmlToText.fromString(html);
    const mailOptions = {
        from: 'Alex K <hellooaleks@gmail.com>',
        to: options.user.email,
        subject: options.subject,
        html,
        text,
    }

    const sendMail = promisify(transport.sendMail, transport);
    return sendMail(mailOptions);

}