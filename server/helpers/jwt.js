const jwt = require("jsonwebtoken")
const SECRET_KEY = process.env.MY_KEY

function createToken (payload) {
  return jwt.sign(payload, SECRET_KEY)
}

function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY) 
}

module.exports = {createToken, verifyToken}