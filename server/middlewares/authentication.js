
const { verifyToken } = require("../helpers/jwt")
const { User } = require("../models")

async function authentication (req, res, next) {
  try {
    const {access_token} = req.headers
    if (!access_token){
      throw ({name: "unauthenticated"})
    }
    // console.log(access_token);

    const payload = verifyToken(access_token)
    // console.log(payload);

    const findUser = await User.findByPk(payload.id)
    if (!findUser){
      throw ({name: "unauthenticated"})
    }

    req.user = {
      id: findUser.id,
      email: findUser.email
    }
    next()
  } catch(err){
    next(err)
  }
}

module.exports = authentication