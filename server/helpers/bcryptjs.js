const bcryptjs = require ("bcryptjs")

function createHash (password) {
  return bcryptjs.hashSync(password, 8)
}

function comparePass(password, hashPass) {
  return bcryptjs.compareSync(password, hashPass)  
}

module.exports = {createHash, comparePass}