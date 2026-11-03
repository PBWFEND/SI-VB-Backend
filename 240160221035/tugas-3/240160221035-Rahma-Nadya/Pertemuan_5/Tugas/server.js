
const app = require("./app");

const PORT = process.env.PORT || 3008;

app.listen(PORT, () => {
  console.log(`API Absensi Organisasi berjalan di http://localhost:${PORT}`);
});