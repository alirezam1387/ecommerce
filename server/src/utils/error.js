const ErrorHandler = require("../middlewere/ErrorHandler");

const ErrorMidlleWere = (error, req, res, next) => {
  let err = {
    statusCode: error.statusCode || 500,
    message: error.message || "Internal Server Error",
  };

  // cant find object with id
  if (error.name === "CastError") {
    const message = `cant find an object with ${err.value}`;
    err = new ErrorHandler(message, 404);
  }

  // field err
  console.log(error.code);
  if (error.code == 11000) {
    const message = "object with these data is already exist in DB";
    err = new ErrorHandler(message, 400);
  }
  if (error.name === "ValidationError") {
    err.statusCode = 400;
  }
  // console.log(error)

  res.status(err.statusCode || 500).json({
    success: false,
    data: err.message,
  });
};

module.exports = ErrorMidlleWere;
