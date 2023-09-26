const ControllerProduct = require('../controllers/controllerProduct')
const routerProduct = require('express').Router()

routerProduct.get('/', ControllerProduct.showAllProduct)
routerProduct.get('/:id', ControllerProduct.showProductById)



module.exports = routerProduct