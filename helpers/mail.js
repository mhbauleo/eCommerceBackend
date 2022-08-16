const { createTransport } = require("nodemailer");
const { errorLogger } = require("./logger");
const config = require('../config')

const ADMIN_MAIL = config.GMAIL.ADMIN_MAIL;
const SERVER_MAIL = config.GMAIL.SERVER_MAIL;
const PASSWORD = config.GMAIL.PASSWORD

const sendEmail = async (subject, html) => {
  const transporter = createTransport({
    service: "gmail",
    port: 587,
    auth: {
      user: SERVER_MAIL,
      pass: PASSWORD,
    },
  });

  const mailOptions = {
    from: "Servidor Node.js",
    to: ADMIN_MAIL,
    subject: subject,
    html: html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
  } catch (error) {
    errorLogger.error(error);
  }
};

module.exports = { sendEmail }