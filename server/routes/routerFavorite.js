const ControllerFavorite = require('../controllers/controllerFavorite')
const { authorizationFavorite } = require('../middlewares/authorization')

const routerFavorite = require('express').Router()

routerFavorite.get('/', ControllerFavorite.showAllFavorite)
routerFavorite.post('/:ProductId', ControllerFavorite.addProduct)
routerFavorite.patch('/:id', authorizationFavorite, ControllerFavorite.softDeleteFavorite)


module.exports = routerFavorite