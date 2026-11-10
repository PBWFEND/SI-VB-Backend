// app.js
const express = require('express');
const morgan = require('morgan');
const laboratoriumRoutes = require('./routes/laboratoriumRoutes');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

const app = express();


app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Lab API — Tugas 2 (RESTful Express.js)',
    data: {
      endpoints: [
        'GET    /api/laboratorium',
        'GET    /api/laboratorium/:id',
        'POST   /api/laboratorium',
        'PUT    /api/laboratorium/:id',
        'PATCH  /api/laboratorium/:id',
        'DELETE /api/laboratorium/:id'
      ]
    }
  });
});

app.use('/api/laboratorium', laboratoriumRoutes);

// 404 untuk route yang tidak dikenal
app.use(notFound);

// Global error handler (termasuk response 400 validasi)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));

module.exports = app;