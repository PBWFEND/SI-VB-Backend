import dotenv from "dotenv";
dotenv.config();

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    console.error(`❌ FATAL ERROR: Environment variable "${key}" is missing.`);
    process.exit(1);
  }
  return value;
}

export const ENV = {
  PORT: parseInt(process.env.PORT || "3008", 10),
  DATABASE_URL: requireEnv("DATABASE_URL"),
  JWT_SECRET: requireEnv("JWT_SECRET"),
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "15m",
  NODE_ENV: process.env.NODE_ENV || "development",
};