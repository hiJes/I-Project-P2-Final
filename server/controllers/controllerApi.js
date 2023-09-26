const { Product, Cart } = require("../models")
const request = require("request-promise");
const midtransClient = require('midtrans-client');

class ControllerApi{
  static async listCost(req, res, next){
    try {
      const {weight, courier, destination} = req.body
      var options = {
        method: 'POST',
        url: 'https://api.rajaongkir.com/starter/cost',
        headers: {key: process.env.RO_KEY, 'content-type': 'application/x-www-form-urlencoded'},
        form: {origin: '153', destination , weight , courier}
      };
      let response = await request(options);
      console.log(response);
      res.status(201).json(JSON.parse(response).rajaongkir.results[0])
      
    } catch (error) {
      console.log(error, "<<<<< disini error");
      next(error)
    }
  }
  static async listCity(req, res, next){
    try {
      var options = {
        method: 'GET',
        url: 'https://api.rajaongkir.com/starter/city',
        headers: {key: process.env.RO_KEY},
      };
      let response = await request(options);
      console.log(response);
      res.status(200).json(JSON.parse(response).rajaongkir.results)
      
    } catch (error) {
      console.log(error, "<<<<< disini error");
      next(error)
    }
  }
  static async listProvince(req, res, next){
    try {
      var options = {
        method: 'GET',
        url: 'https://api.rajaongkir.com/starter/province',
        headers: {key: process.env.RO_KEY},
      };
      let response = await request(options);
      console.log(response);
      res.status(200).json(JSON.parse(response).rajaongkir.results)
      
    } catch (error) {
      console.log(error, "<<<<< disini error");
      next(error)
    }
  }
  static async generateToken(req, res, next){
    try {
      const {amount, transaction_code} = req.body
      let snap = new midtransClient.Snap({
              isProduction : false,
              serverKey : process.env.MIDTRANS_KEY
          });

      let parameter = {
          "transaction_details": {
              "order_id": transaction_code,
              "gross_amount": amount
          },
          "credit_card":{
              "secure" : true
          },
          "customer_details": {
              "email": req.user.email,

          }
      };

      const midtrans_token = await snap.createTransaction(parameter)
      res.status(201).json(midtrans_token)

    } catch (error) {
      console.log(error, "<<<<< disini error");
      next(error)
    }
  }
}
module.exports = ControllerApi