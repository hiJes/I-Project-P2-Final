const formatRupiah = require("../helpers/formatRupah")
const { Category, Product } = require("../models")
const { Op } = require("sequelize");

class ControllerProduct{
  static async showAllProduct (req, res, next) {
    try{
      let {page, CategoryId, search} = req.query
      let option = {
        attributes:{exclude:['createdAt', 'updatedAt']},
        include:[{
          model: Category,
          attributes: ['name']
        }],
        order:[['id', 'asc']],
        limit : 8,
        where: {
          stock: {
            [Op.gt]: 0
          }
        }
      }
      if (page){
        option.offset = (page - 1) * 8
      }
      if (CategoryId){
        const findCategory = await Category.findByPk(CategoryId)
        if (!findCategory) {
          throw ( {name: "categoryNotFound"})
        } else {
          option.where.CategoryId = CategoryId
        }
      }
      if (search){
        option.where.name = {
          [Op.iLike]: `%${search}%`
        }
      }
      const products = await Product.findAll(option)
      products.map(el => {
        formatRupiah(el.dataValues.price)
        return el
      })
      const categories = await Category.findAll({
        attributes:{exclude:['createdAt', 'updatedAt']}
      })
      
      res.status (200).json({products, categories})
    } catch (err) {
      console.log(err, "<<<");
      next(err)
    }
  }

  static async showProductById (req, res, next) {
    try{
      let {id} = req.params
      const product = await Product.findOne({
        attributes:{exclude:['createdAt', 'updatedAt']},
        where: {
          id,
          stock: {
            [Op.gt]: 0
          }
        },
        include:[{
          model: Category,
          attributes: ['name']
        }]
      })
      if (!product) {
        throw ( {name: "notFound"})
      }
      product.dataValues.price = formatRupiah(product.dataValues.price)
      res.status (200).json(product)
    } catch (err) {
      console.log(err, "<<<< INI ERROR") 
      next(err)
    }
  }
}

module.exports = ControllerProduct