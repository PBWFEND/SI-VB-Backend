const fs = require("fs");
const path = require("path");

const COURSE_CODE = process.env.COURSE_CODE || "CPMK115";

function bacaJSON(namaFile) {
  try {
    const lokasiFile = path.join(__dirname, namaFile);
    const isiFile = fs.readFileSync(lokasiFile, "utf8");

    return JSON.parse(isiFile);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error(`File ${namaFile} tidak ditemukan.`);
      return null;
    }

    if (error instanceof SyntaxError) {
      console.error(`Format JSON ${namaFile} tidak valid.`);
      return null;
    }

    throw error;
  }
}

module.exports = { COURSE_CODE, bacaJSON };