/**
 * Helper response JSON konsisten untuk seluruh endpoint.
 * Sukses: { success: true, message, data? }
 * Error : { success: false, message, details? }
 */

export const sendSuccess = (response, statusCode, message, data = undefined) => {
  const payload = { success: true, message };
  if (data !== undefined) payload.data = data;
  return response.status(statusCode).json(payload);
};

export const sendError = (response, statusCode, message, details = undefined) => {
  const payload = { success: false, message };
  if (details) payload.details = details;
  return response.status(statusCode).json(payload);
};