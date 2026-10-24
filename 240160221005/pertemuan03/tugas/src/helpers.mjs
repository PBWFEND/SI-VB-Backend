// src/helpers.mjs

export function sendJSON(res, statusCode, payload) {
  const body = JSON.stringify(payload, null, 2);
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
    "X-Powered-By": "Node.js-Native",
  });
  res.end(body);
}

export function sendError(res, statusCode, message) {
  sendJSON(res, statusCode, {
    success: false,
    error: {
      code: statusCode,
      message,
    },
  });
}