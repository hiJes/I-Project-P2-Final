const { Product, Cart, Transaction } = require("../models")

class ControllerTransaction{
  static async addTransaction(req, res, next){
    try{
      const {cost} = req.body
      console.log(req.body, "ini req body cuy");
      let carts = await Cart.findAll({ 
        include: Product,
        where: {
          UserId: req.user.id,
          status: 'Active'
        }
      })
      // console.log(carts);
      if (carts.length === 0){
        throw ({name: "cartNotFound"})
      }
      const code = "TR"+ req.user.id + new Date().toISOString()+Math.floor(1000 + Math.random() * 100)
      carts = carts.map( el => {
        // el.createdAt = el.updatedAt = new Date()
        return {
          code : code,
          amount : el.dataValues.quantity * el.dataValues.Product.price,
          UserId : el.dataValues.UserId,
          CartId : el.dataValues.id,
          date : new Date(),
          status : 'process',
          isPayment : false
        }
      })
      let totalPayment = 0
      carts.forEach(el => {
        totalPayment = totalPayment + el.amount
      });
      totalPayment = totalPayment + cost
      let transaction = await Transaction.bulkCreate(carts)
      console.log(carts, totalPayment, "ini disisi");
       
      res.status (201).json({code, totalPayment, transaction})
    } catch (err) {
      console.log(err, "<<< ERROR CONTROLLER");
      next(err)
    }
  }

}

module.exports = ControllerTransaction