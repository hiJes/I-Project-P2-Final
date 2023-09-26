function errorHandler (err, req, res, next) {
  let status = 500
  let message = "Internal Server Error"
  
  console.log(err, "<< ERR HANDLER");
  
  if(err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError"){
    status = 400
    message = err.errors[0].message
  } else if (err.name === "dataEmpty"){
    status = 400
    message = err.message
  } else if (err.name === "found"){
    status = 400
    message = err.message
  } else if (err.name === "unauthorize") {
    status = 401
    message = "Invalid email/password"
  } else if (err.name === "unauthenticated" || err.name === "JsonWebTokenError") {
    status = 401
    message = "Invalid token"
  } else if (err.name === "forbidden") {
    status = 403
    message = "Forbidden access"
  } else if (err.name === "notFound") {
    status = 404
    message = "Product not found"
  } else if (err.name === "categoryNotFound") {
    status = 404
    message = `Category not found`
  } else if (err.name === "cartNotFound") {
    status = 404
    message = "You must add product to cart!"
  }  

  res.status(status).json({message})
}
module.exports = errorHandler