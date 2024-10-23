const ErrorStatus = require("../util/ErrorStatus");
function ErrorHandler(err, req, res, next) {
  const errorStatus = new ErrorStatus(400, err.message);
  res.status(errorStatus.status).json(errorStatus);
}

module.exports = ErrorHandler;
