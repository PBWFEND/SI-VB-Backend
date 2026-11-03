// middlewares/errorHandler.js
const { error } = require('../utils/response');

const notFound = (req, res) => {
  return error(res, {
    statusCode: 404,
    message: `Route ${req.method} ${req.originalUrl} tidak ditemukan`
  });
};

const errorHandler = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  const statusCode = err.statusCode || 500;
  return error(res, {
    statusCode,
    message: err.message || 'Internal Server Error',
    errors: err.errors
  });
};

module.exports = { notFound, errorHandler };