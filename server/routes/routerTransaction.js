const ControllerTransaction = require('../controllers/controllerTransaction')
const routerTransaction = require('express').Router()

routerTransaction.post('/', ControllerTransaction.addTransaction)

module.exports = routerTransaction
