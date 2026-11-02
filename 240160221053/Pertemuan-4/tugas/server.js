const app = require('./app');
const PORT = process.env.PORT || 30001;

app.listen(PORT, () => {
  console.log(`Server Perpustakaan berjalan di http://localhost:${PORT}`);
});