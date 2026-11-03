
const success = (res, { statusCode = 200, message = 'OK', data = null, meta = undefined } = {}) => {
  const body = { success: true, message, data };
  if (meta !== undefined) body.meta = meta;
  return res.status(statusCode).json(body);
};

const error = (res, { statusCode = 500, message = 'Internal Server Error', errors = undefined } = {}) => {
  const body = { success: false, message };
  if (errors !== undefined) body.errors = errors;
  return res.status(statusCode).json(body);
};

module.exports = { success, error };