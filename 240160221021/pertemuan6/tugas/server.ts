import "dotenv/config";
import app from "./app.ts";
import { prisma } from "./client.ts";

const port = Number(process.env.PORT ?? 3008);
const server = app.listen(port, () => {
  console.log(`Server jalan di http://localhost:${port}`);
});

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  server.close(() => process.exit(0));
});