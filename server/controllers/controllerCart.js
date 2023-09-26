const { Product, Cart } = require("../models")
const { Op } = require("sequelize");

class ControllerCart{
  static async addProduct(req, res, next){
    try{
      let {ProductId} = req.params
      // console.log(ProductId);
      let findProduct = await Product.findOne({ 
        where: {
          id: ProductId,
          stock: {
            [Op.gt]: 0
          }
        }
      })
      if (!findProduct){
        throw ({name: "notFound"})
      }
      const findCart = await Cart.findOne({ 
        where: {
          UserId: req.user.id,
          ProductId,
          status: 'Active'
        }
      })

      if(findCart){
        throw({name: "found", message: "You cannot add same product to your cart" })
      }
      const addProduct = await Cart.create({
        UserId: req.user.id,
        ProductId
      })
      delete addProduct.dataValues.createdAt
      delete addProduct.dataValues.updatedAt

      const product = await Product.update({ stock: +findProduct.stock - +addProduct.quantity }, {
        where: {
          id: ProductId
        }
      }) 
      res.status (201).json(addProduct)
    } catch (err) {
      console.log(err, "<<< ERROR");
      next(err)
    }
  }

  static async showAllCart (req, res, next) {
    try{
      const carts = await Cart.findAll({
        attributes: { exclude : ['createdAt', 'updatedAt']},
        include:[
          {
            model: Product,
            attributes: { exclude : ['id', 'description', 'CategoryId', 'createdAt', 'updatedAt']}
          }
        ],
        where: {
          UserId: req.user.id,
          status: 'Active'
        },
        order:[['updatedAt', 'desc']]
      })
      res.status (200).json(carts)
    } catch (err) {
      console.log(err, "<<<< INI ERROR");
      next(err)
    }
  }

  static async updateStatusCart (req, res, next) {
    try {
      const { id } = req.params
      const { status } = req.body
      const cart = await Cart.update({ status }, {
        where: {
          id
        }
      })  
      res.status(200).json({
        "message": "Product has been removed"
      })
    } catch (err) {
      console.log(err, "<<<< INI ERROR");
      next(err)
    }
  }

  static async keepProductStock (req, res, next) {
    try {
      const { id } = req.params
      const { quantity } = req.body
      const cart = await Cart.update({ quantity: +req.cart.quantity + +quantity }, {
        where: {
          id
        }
      })
      const product = await Product.update({ stock: +req.product.stock - +quantity }, {
        where: {
          id: req.cart.ProductId
        }
      }) 
      res.status(200).json({ message: "Stock product has been updated" })
    } catch (err) {
      console.log(err, "<<<< INI ERROR");
      next(err)
    }
  }
}

module.exports = ControllerCart