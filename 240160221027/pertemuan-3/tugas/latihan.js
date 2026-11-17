
import { APP_NAME, PORT, ENVIRONMENT, COURSE_CODE } from "./config.js";
import { readFile } from "node:fs/promises";

async function jalankanLatihan() {
  try {
    const isiFile = await readFile(
      new URL("./data-mahasiswa.json", import.meta.url),
      "utf8"
    );

    const mahasiswa = JSON.parse(isiFile);

    console.log("=== LATIHAN PERTEMUAN 3 ===");
    console.log(`Nama aplikasi : ${APP_NAME}`);
    console.log(`Environment   : ${ENVIRONMENT}`);
    console.log(`Port          : ${PORT}`);
    console.log(`Kode mata kuliah: ${COURSE_CODE}`);

    console.log("\n=== DAFTAR MAHASISWA ===");

    mahasiswa.forEach((mhs, index) => {
      console.log(
        `${index + 1}. ${mhs.nama} - ${mhs.nim} - ${mhs.programStudi}`
      );
    });

    console.log(`\nTotal mahasiswa: ${mahasiswa.length}`);
  } catch (error) {
    console.error("Gagal menjalankan latihan:", error.message);
  }
}

jalankanLatihan();
