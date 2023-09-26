const { comparePass } = require("../helpers/bcryptjs");
const { createToken } = require("../helpers/jwt");
const { User, UserProfile } = require("../models")
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client();

class ControllerUser{
  static async register(req, res, next){
    try {
      let {email, password} = req.body
      const user = await User.create({email, password})
      res.status (201).json({id: user.id, email: user.email})
    } catch (err) {
      console.log(err);
      next(err)
    }
  }

  static async login (req, res, next) {
    try {
      // console.log(req.body);
      let {email, password} = req.body
      if (!email) {
        throw ({name: "dataEmpty", message: "Email is required!"})
      } 
      if (!password) {
        throw ({name: "dataEmpty", message: "Password is required!"})
      }

      const findUser = await User.findOne({
        where: {
          email
        }
      })
      if (!findUser) {
        throw ({name: "unauthorize"})
      }

      const validPassword = comparePass(password, findUser.password)
      if (!validPassword) {
        throw ({name: "unauthorize"})
      }
      const payload = {
        id: findUser.id
      }

      const access_token = createToken(payload)
      // console.log(access_token);

      res.status (200).json({access_token, email: findUser.email})
    } catch (err) {
      console.log(err, "<< ERROR");
      next(err)
    }
  }

  static async googleLogin (req, res, next) {
    try {
      let {google_token} = req.headers
      
      const ticket = await client.verifyIdToken({
          idToken: google_token,
          audience: process.env.GOOGLE_CLIENT_ID
      });
      const payload = ticket.getPayload();
      // console.log(payload);
      
      let [user, isCreated] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          email: payload.email,
          password: String(Math.random()*100),
        },
        hooks: false
      })
  
      const access_token = createToken({
        id: user.id
      })
      
      let status = 200
      if (isCreated) {
        status = 201
      }
      res.status(status).json({ access_token, email: user.email })
    } catch (err) {
      console.log(err);
      next(err)
    }
  }
}

module.exports = ControllerUser