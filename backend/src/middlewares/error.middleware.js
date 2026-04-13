const HTTP_STATUS = require("../constants/httpStatus");

const errorHandler = (err, req, res, next) => {
  return res.status(err.statusCode || HTTP_STATUS.INTERNAL_SERVER).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;
