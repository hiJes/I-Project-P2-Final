const { Cart, Favorite, Product } = require("../models")

async function authorizationFavorite (req, res, next) {
  try {
    const {id} = req.params
    const findFavorite = await Favorite.findOne({ 
      where: {
        id,
        status: 'Favorite'
      }
    })
    if(!findFavorite){
      throw({name: "notFound"})
    }
    if (req.user.id !== findFavorite.UserId){
      throw({name: "forbidden"})
    } 

    const findProduct = await Product.findByPk(findFavorite.ProductId)
    if(!findProduct){
      throw({name: "notFound"})
    }

    next()
  } catch(err) {
    console.log(err, "<<< ini error authorization");
    next (err)
  }
}

async function authorizationCart (req, res, next) {
  try {
    const {id} = req.params
    const findCart = await Cart.findOne({ 
      where: {
        id,
        status: 'Active'
      }
    })
    if(!findCart){
      throw({name: "notFound"})
    }
    if (req.user.id !== findCart.UserId){
      throw({name: "forbidden"})
    } 

    const findProduct = await Product.findByPk(findCart.ProductId)
    if(!findProduct){
      throw({name: "notFound"})
    }

    req.cart = {
      quantity: findCart.quantity,
      ProductId: findCart.ProductId
    }

    req.product = {
      stock: findProduct.stock
    }
    next()
  } catch(err) {
    console.log(err, "<<< ini error authorization");
    next (err)
  }
}

module.exports = { authorizationCart, authorizationFavorite }

