const { StatusCodes } = require('http-status-codes');

const errorHandler = (err, req, res, next) => {
  let customError = {
    message: err.message || 'Something went wrong in the server!',
    status: err.status || StatusCodes.INTERNAL_SERVER_ERROR,
  };

  if (err.name === 'BadRequestError') {
    const errorsArray = err.message.split(',');
    customError.message = errorsArray.map((msg) => msg.trim());
  }

  res
    .status(customError.status)
    .json({ status: 'error', message: customError.message });
};

module.exports = errorHandler;
