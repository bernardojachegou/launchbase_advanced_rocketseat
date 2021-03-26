const nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '31d0d605c26181',
    pass: '2ba27c2fcee95c',
  },
});
