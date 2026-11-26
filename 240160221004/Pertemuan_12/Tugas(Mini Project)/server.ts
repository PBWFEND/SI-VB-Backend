import app from "./app";
import { prisma } from "./client";
import { ENV } from "./src/config/env";
import { logger } from "./src/utils/logger";

const server = app.listen(ENV.PORT, () =>
  logger.info(`🚀 API berjalan di http://localhost:${ENV.PORT}`, { env: ENV.NODE_ENV }));

async function gracefulShutdown(signal: string) {
  logger.info(`Menerima ${signal}. Memulai graceful shutdown...`);
  server.close(async () => {
    logger.info("HTTP server ditutup.");
    await prisma.$disconnect();
    logger.info("Koneksi database diputus.");
    process.exit(0);
  });
  setTimeout(() => { logger.error("Shutdown terpaksa (timeout)."); process.exit(1); }, 10000);
}
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));