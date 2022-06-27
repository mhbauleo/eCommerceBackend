const twilio = require('twilio')
const config = require('../config')

const accountSid = config.twilio.SID
const authToken = config.twilio.TOKEN

const client = twilio(accountSid, authToken)
const { errorLogger } = require("./logger");

const sendMessage = async (body,from, to) => {
    try {
        const message = await client.messages.create({body, from, to})
    } catch (error) {
        errorLogger.error(error);
    }
}

const ADMIN_WSPP = "whatsapp:+5491168117294";
const NUMBER_TWILIO_SMS = '+19522603516'
const NUMBER_TWILIO_WSPP = 'whatsapp:+14155238886'

const sendSms = async (body, to) => {
    return await sendMessage(body, NUMBER_TWILIO_SMS, to)
}

const sendWspp = async (body, to) => {
    return await sendMessage(body, NUMBER_TWILIO_WSPP , to)
}

const sendWsppToAdmin = async (body) => {
    return await sendWspp(body, ADMIN_WSPP)
}

module.exports = {sendSms, sendWspp, sendWsppToAdmin}