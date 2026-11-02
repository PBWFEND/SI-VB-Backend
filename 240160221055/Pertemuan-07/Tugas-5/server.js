import "dotenv/config";

import app from "./app.js";
import { prisma } from "./client.js";

const PORT = Number(process.env.PORT ?? 3008);

const server = app.listen(PORT, () => {
  console.log(
    `RESTful API Tugas 5 berjalan di http://localhost:${PORT}`
  );
});

// Shutdown dengan aman
async function shutdown() {
  console.log("\nMenutup server...");

  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);