const { createTransport } = require("nodemailer");
const { errorLogger } = require("./logger");
const config = require('../config')

const ADMIN_MAIL = config.gmail.adminMail;
const SERVER_MAIL = config.gmail.serverMail;
const PASSWORD = config.gmail.password

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