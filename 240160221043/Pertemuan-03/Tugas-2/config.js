
export const APP_NAME = "Tugas 2 Node.js";
export const PORT = Number(process.env.PORT) || 3003;
export const NODE_ENV = process.env.NODE_ENV || "development";
export const COURSE_CODE = process.env.COURSE_CODE || "CPMK115";

export function getConfig() {
  return {
    appName: APP_NAME,
    port: PORT,
    environment: NODE_ENV,
    courseCode: COURSE_CODE,
  };
}
