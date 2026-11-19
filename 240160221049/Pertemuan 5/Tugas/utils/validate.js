/**
 * Validasi payload buku.
 * @param {object} payload   - request.body
 * @param {boolean} partial  - true untuk PATCH (field opsional)
 * @returns {string[]}       - array error (kosong = valid)
 */
export const validateBuku = (payload, partial = false) => {
  const errors = [];
  const required = ["judul", "penulis", "tahun", "stok"];

  // Field wajib (hanya untuk POST/PUT)
  if (!partial) {
    for (const field of required) {
      if (payload[field] === undefined) errors.push(`Field ${field} wajib diisi`);
    }
  }

  // Validasi tipe per field
  if (payload.judul !== undefined) {
    if (typeof payload.judul !== "string" || payload.judul.trim() === "") {
      errors.push("judul harus string non-kosong");
    }
  }

  if (payload.penulis !== undefined) {
    if (typeof payload.penulis !== "string" || payload.penulis.trim() === "") {
      errors.push("penulis harus string non-kosong");
    }
  }

  if (payload.tahun !== undefined) {
    if (!Number.isInteger(payload.tahun) || payload.tahun < 1900 || payload.tahun > 2100) {
      errors.push("tahun harus bilangan bulat antara 1900 dan 2100");
    }
  }

  if (payload.stok !== undefined) {
    if (!Number.isInteger(payload.stok) || payload.stok < 0) {
      errors.push("stok harus bilangan bulat minimal 0");
    }
  }

  if (payload.kategori !== undefined) {
    if (typeof payload.kategori !== "string") {
      errors.push("kategori harus string");
    }
  }

  return errors;
};