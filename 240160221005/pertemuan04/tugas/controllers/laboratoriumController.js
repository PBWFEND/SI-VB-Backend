const db = require("../data/laboratorium");

// ================= GET /laboratorium =================
// Mendukung query parameter: ?status=tersedia&nama=lab&minKapasitas=30
const getAll = (req, res) => {
  const { status, nama, minKapasitas } = req.query;

  let hasil = db.getSemua();

  if (status) {
    hasil = hasil.filter((lab) => lab.status === status);
  }

  if (nama) {
    hasil = hasil.filter((lab) =>
      lab.nama.toLowerCase().includes(nama.toLowerCase())
    );
  }

  if (minKapasitas) {
    const min = Number(minKapasitas);
    if (Number.isNaN(min)) {
      return res.status(400).json({
        success: false,
        message: "Query 'minKapasitas' harus berupa angka"
      });
    }
    hasil = hasil.filter((lab) => lab.kapasitas >= min);
  }

  res.status(200).json({
    success: true,
    total: hasil.length,
    data: hasil
  });
};

// ================= GET /laboratorium/:id =================
const getById = (req, res, next) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "Parameter id harus berupa angka"
    });
  }

  const lab = db.getById(id);

  if (!lab) {
    return res.status(404).json({
      success: false,
      message: `Laboratorium dengan id ${id} tidak ditemukan`
    });
  }

  res.status(200).json({
    success: true,
    data: lab
  });
};

// ================= POST /laboratorium =================
const create = (req, res, next) => {
  const { nama, kapasitas, lokasi, status } = req.body;

  if (!nama || !kapasitas || !lokasi) {
    return res.status(400).json({
      success: false,
      message: "Field 'nama', 'kapasitas', dan 'lokasi' wajib diisi"
    });
  }

  if (typeof kapasitas !== "number" || kapasitas <= 0) {
    return res.status(400).json({
      success: false,
      message: "Field 'kapasitas' harus berupa angka positif"
    });
  }

  const baru = db.tambah({ nama, kapasitas, lokasi, status });

  res.status(201).json({
    success: true,
    message: "Laboratorium berhasil ditambahkan",
    data: baru
  });
};

// ================= PUT /laboratorium/:id =================
const update = (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "Parameter id harus berupa angka"
    });
  }

  const diubah = db.ubah(id, req.body);

  if (!diubah) {
    return res.status(404).json({
      success: false,
      message: `Laboratorium dengan id ${id} tidak ditemukan`
    });
  }

  res.status(200).json({
    success: true,
    message: "Laboratorium berhasil diperbarui",
    data: diubah
  });
};

// ================= DELETE /laboratorium/:id =================
const remove = (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "Parameter id harus berupa angka"
    });
  }

  const dihapus = db.hapus(id);

  if (!dihapus) {
    return res.status(404).json({
      success: false,
      message: `Laboratorium dengan id ${id} tidak ditemukan`
    });
  }

  res.status(200).json({
    success: true,
    message: "Laboratorium berhasil dihapus",
    data: dihapus
  });
};

module.exports = { getAll, getById, create, update, remove };