const dotenv = require('dotenv')
const path = require('path')
dotenv.config({
    path: path.resolve(process.cwd(), (process.env.NODE_ENV || 'development') + '.env')
})

const config = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 8080,
    MODO: process.env.MODO || 'FORK',
    PERSISTENCIA: process.env.PERSISTENCIA,
    EXPIRE_TIME: process.env.EXPIRE_TIME,
    fileSystem: {
        baseUrl: './persistencia/'
    },
    MONGO: {
        BASE_URL: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.s1kle.mongodb.net/ecommerce?retryWrites=true&w=majority`
    },
    GMAIL: {
        SERVER_MAIL: process.env.SERVER_MAIL,
        ADMIN_MAIL: process.env.ADMIN_MAIL,
        PASSWORD: process.env.GMAIL_PASS
    }
}
module.exports = config