// src/config.mjs
export const APP_NAME    = process.env.APP_NAME    || "Simple HTTP Server";
export const PORT        = Number(process.env.PORT) || 3003;
export const NODE_ENV    = process.env.NODE_ENV    || "development";
export const COURSE_CODE = process.env.COURSE_CODE || "DEFAULT-000";