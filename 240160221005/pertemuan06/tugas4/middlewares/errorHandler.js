// middlewares/errorHandler.js
const ApiError = require('../utils/ApiError');
const { error } = require('../utils/response');

const notFound = (req, res) => {
  return error(res, {
    statusCode: 404,
    message: `Route ${req.method} ${req.originalUrl} tidak ditemukan`,
  });
};

const errorHandler = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  if (err instanceof ApiError) {
    return error(res, {
      statusCode: err.statusCode,
      message: err.message,
      errors: err.errors,
    });
  }

  // Prisma known error — unique constraint
  if (err.code === 'P2002') {
    return error(res, {
      statusCode: 409,
      message: 'Data dengan nilai unik tersebut sudah ada',
    });
  }

  console.error('[UNHANDLED ERROR]', err);
  return error(res, {
    statusCode: 500,
    message: 'Internal Server Error',
  });
};

module.exports = { notFound, errorHandler };