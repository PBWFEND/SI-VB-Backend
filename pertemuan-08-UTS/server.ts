
import "dotenv/config";
import { app, prisma } from "./app.ts";

const port = Number(process.env.PORT ?? 3008);

// Menjalankan server
const server = app.listen(port, () => {
    console.log(`API Perpustakaan berjalan di http://localhost:${port}`);
});

// Mencegah shutdown berjalan lebih dari sekali
let shuttingDown = false;

// Menutup server dan koneksi database
const shutdown = async () => {
    if (shuttingDown) return;

    shuttingDown = true;

    console.log("\nServer sedang dihentikan...");

    server.close(async () => {
        try {
            await prisma.$disconnect();
            console.log("Koneksi database berhasil ditutup.");
            process.exit(0);
        } catch (error) {
            console.error("Gagal menutup koneksi database:", error);
            process.exit(1);
        }
    });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
