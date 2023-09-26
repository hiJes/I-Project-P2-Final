const ControllerUser = require('../controllers/controllerUser')
const authentication = require('../middlewares/authentication')
const routerFavorite = require('./routerFavorite')
const routerProduct = require('./routerProduct')
const routerCart = require('./routerCart')
const routerApi = require('./routerApi')
const routerTransaction = require('./routerTransaction')

const router = require('express').Router()

// router.get('/', (req, res) => {
//   res.send('Annyeong!')
// })
router.post('/register', ControllerUser.register)
router.post('/login', ControllerUser.login)
router.post('/login-google', ControllerUser.googleLogin)
router.use('/products', routerProduct)

router.use(authentication)

router.use('/carts', routerCart)
router.use('/favorites', routerFavorite)
router.use('/transactions', routerTransaction)
router.use('/apis', routerApi)


module.exports = router
