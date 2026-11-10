import "dotenv/config";
import app from "./app.js";

const PORT = 0;

const server = app.listen(PORT, () => {
  const address = server.address();

  if (address && typeof address !== "string") {
    console.log(`Server berjalan di http://localhost:${address.port}`);
    console.log(`Health check: http://localhost:${address.port}/health`);
  }
});