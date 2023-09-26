const ControllerCart = require('../controllers/controllerCart')
const { authorizationCart } = require('../middlewares/authorization')

const routerCart = require('express').Router()

routerCart.get('/', ControllerCart.showAllCart)
routerCart.post('/:ProductId', ControllerCart.addProduct)
routerCart.patch('/:id/status', authorizationCart, ControllerCart.updateStatusCart)
routerCart.patch('/:id/quantity', authorizationCart, ControllerCart.keepProductStock)

module.exports = routerCart
