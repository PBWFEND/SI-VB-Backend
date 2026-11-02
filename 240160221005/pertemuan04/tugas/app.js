const express = require("express");
const logger = require("./middlewares/logger");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const laboratoriumRouter = require("./routes/laboratorium");

const app = express();

// ================= MIDDLEWARE GLOBAL =================
app.use(express.json());      // parse body JSON
app.use(logger);              // logger setiap request

// ================= ROUTES =================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API Laboratorium — Tugas 2 Backend",
    author: "Cinta Rahmia Yulianti",
    nim: "240160221005"
  });
});

app.use("/laboratorium", laboratoriumRouter);

// ================= 404 & ERROR HANDLER =================
// notFound WAJIB di bawah semua route, errorHandler di paling bawah
app.use(notFound);
app.use(errorHandler);

module.exports = app;