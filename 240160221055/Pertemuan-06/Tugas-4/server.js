import "dotenv/config";
import app from "./app.js";
import { prisma } from "./client.js";

const PORT = Number(process.env.PORT ?? 3008);
const server = app.listen(PORT, () => {
  console.log(`RESTful API Tugas 4 berjalan di http://localhost:${PORT}`);
});

async function shutdown() {
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
