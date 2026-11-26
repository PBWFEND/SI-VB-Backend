import "dotenv/config";
import { app } from "./app.ts";
import { prisma } from "./client.ts";

const port = Number(process.env.PORT ?? 3011);

const shutdown = async () => {
  await prisma.$disconnect();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

app.listen(port, () => {
  console.log(`Secure API berjalan di http://localhost:${port}`);
});