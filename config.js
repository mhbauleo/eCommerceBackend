const config = {
    fileSystem: {
        baseUrl: './persistencia/'
    },
    mongo: {
        baseUrl: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.s1kle.mongodb.net/ecommerce?retryWrites=true&w=majority`
    },
    gmail: {
        password: process.env.GMAIL_PASS
    },
    twilio: {
        SID: process.env.ACCOUNT_SID_TWILIO,
        TOKEN: process.env.AUTH_TOKEN_TWILIO
    }

}
module.exports = config