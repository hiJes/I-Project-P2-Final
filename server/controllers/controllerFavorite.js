const { Product, Favorite } = require("../models")
const { Op } = require("sequelize");

class ControllerFavorite{
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
      const findFavorite = await Favorite.findOne({ 
        where: {
          UserId: req.user.id,
          ProductId,
          status: 'Favorite'
        }
      })

      if(findFavorite){
        throw({ name: "found", message: "You cannot add same product to your favorite list" })
      }
      const addProduct = await Favorite.create({
        UserId: req.user.id,
        ProductId
      })
      delete addProduct.dataValues.createdAt
      delete addProduct.dataValues.updatedAt

      res.status (201).json(addProduct)
    } catch (err) {
      console.log(err, "<<< ERROR");
      next(err)
    }
  }

  static async showAllFavorite (req, res, next) {
    try{
      const favorites = await Favorite.findAll({
        attributes: { exclude : ['createdAt', 'updatedAt']},
        include:[
          {
            model: Product,
            attributes: { exclude : ['id', 'description', 'CategoryId', 'createdAt', 'updatedAt']}
          }
        ],
        where: {
          UserId: req.user.id,
          status: 'Favorite'
        },
        order:[['updatedAt', 'desc']]
      })
      res.status (200).json(favorites)
    } catch (err) {
      console.log(err, "<<<< INI ERROR");
      next(err)
    }
  }

  static async softDeleteFavorite (req, res, next) {
    try {
      const { id } = req.params
      const favorite = await Favorite.update({ status: "Unfavorite" }, {
        where: {
          id
        }
      })  
      res.status(200).json({
        "message": "Product has been removed from favorite list"
      })
    } catch (err) {
      console.log(err, "<<<< INI ERROR");
      next(err)
    }
  }
}

module.exports = ControllerFavorite