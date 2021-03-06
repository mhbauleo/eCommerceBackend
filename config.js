const config = {
    fileSystem: {
        baseUrl: './persistencia/'
    },
    mongo: {
        baseUrl: 'mongodb+srv://mhbauleo:12345@cluster0.s1kle.mongodb.net/ecommerce?retryWrites=true&w=majority'
    },
    firebase: {
        serviceAccount : require("./DB/Firebase/ecommerce-f8d35-firebase-adminsdk-j9gwx-1089a065e0.json")
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