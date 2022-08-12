const fs = require("fs"); 
const jwt = require('jsonwebtoken')
const config = require('../config')

const signOptions = { expiresIn: config.EXPIRE_TIME , algorithm: 'RS256'};
const privateKey = fs.readFileSync("./keys/private.pem")
const publicKey = fs.readFileSync('./keys/public.pem')

const createToken = (payload) => jwt.sign(payload, privateKey, signOptions);

const verifyWebToken = (token) => jwt.verify(token, publicKey)

module.exports = { createToken, verifyWebToken }