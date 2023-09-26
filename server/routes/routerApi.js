const ControllerApi = require('../controllers/controllerApi')

const routerApi = require('express').Router()

routerApi.post('/cost-raja-ongkir', ControllerApi.listCost)
routerApi.get('/city-raja-ongkir', ControllerApi.listCity)
routerApi.get('/province-raja-ongkir', ControllerApi.listProvince)
routerApi.post('/token-midtrans', ControllerApi.generateToken)
module.exports = routerApi
