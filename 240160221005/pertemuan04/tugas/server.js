const app = require("./app");

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("============================================");
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
  console.log(`📚 Endpoint utama: http://localhost:${PORT}/laboratorium`);
  console.log("============================================");
});