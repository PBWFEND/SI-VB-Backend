import * as anggotaService from "../service/anggota.service.js";

// Validasi ID
function validasiId(idRaw) {
  if (typeof idRaw !== "string") {
    return null;
  }

  if (!/^\d+$/.test(idRaw)) {
    return null;
  }

  const id = Number(idRaw);

  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }

  return id;
}

// Validasi data anggota
function validasiDataAnggota(body, wajibSemua = true) {
  const errors = [];

  // Gerbang typeof untuk body
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return {
      errors: ["Body request harus berupa object JSON"],
      data: null
    };
  }

  const diizinkan = ["nama", "npm", "divisi"];
  const keys = Object.keys(body);

  // Field yang tidak diizinkan
  for (const key of keys) {
    if (!diizinkan.includes(key)) {
      errors.push(
        `Field ${key} tidak diizinkan`
      );
    }
  }

  // POST harus memiliki semua field
  if (wajibSemua) {
    for (const field of diizinkan) {
      if (body[field] === undefined) {
        errors.push(`Field ${field} wajib diisi`);
      }
    }
  }

  // PATCH minimal satu field
  if (!wajibSemua && keys.length === 0) {
    errors.push("Minimal satu field harus dikirim");
  }

  // Validasi nama
  if (body.nama !== undefined) {
    if (typeof body.nama !== "string") {
      errors.push("Nama harus berupa teks");
    } else if (body.nama.trim().length < 2) {
      errors.push(
        "Nama minimal terdiri dari 2 karakter"
      );
    }
  }

  // Validasi NPM
  if (body.npm !== undefined) {
    if (typeof body.npm !== "string") {
      errors.push("NPM harus berupa teks");
    } else if (!/^\d{12}$/.test(body.npm.trim())) {
      errors.push(
        "NPM harus terdiri dari tepat 12 digit angka"
      );
    }
  }

  // Validasi divisi
  if (body.divisi !== undefined) {
    if (typeof body.divisi !== "string") {
      errors.push("Divisi harus berupa teks");
    } else if (body.divisi.trim().length < 2) {
      errors.push(
        "Divisi minimal terdiri dari 2 karakter"
      );
    }
  }

  if (errors.length > 0) {
    return {
      errors,
      data: null
    };
  }

  // Data yang sudah tervalidasi
  const data = {};

  if (typeof body.nama === "string") {
    data.nama = body.nama.trim();
  }

  if (typeof body.npm === "string") {
    data.npm = body.npm.trim();
  }

  if (typeof body.divisi === "string") {
    data.divisi = body.divisi.trim();
  }

  return {
    errors: [],
    data
  };
}

// ======================================
// GET /anggota
// ======================================
export async function daftarAnggota(
  request,
  response,
  next
) {
  try {
    const filter = {};

    // Gerbang typeof untuk query
    if (
      request.query.nama !== undefined &&
      typeof request.query.nama !== "string"
    ) {
      return response.status(400).json({
        success: false,
        message: "Query nama harus berupa teks"
      });
    }

    if (
      request.query.divisi !== undefined &&
      typeof request.query.divisi !== "string"
    ) {
      return response.status(400).json({
        success: false,
        message: "Query divisi harus berupa teks"
      });
    }

    if (typeof request.query.nama === "string") {
      filter.nama = request.query.nama;
    }

    if (typeof request.query.divisi === "string") {
      filter.divisi = request.query.divisi;
    }

    const data =
      await anggotaService.ambilSemuaAnggota(filter);

    return response.status(200).json({
      success: true,
      total: data.length,
      data
    });
  } catch (error) {
    next(error);
  }
}

// ======================================
// GET /anggota/:id
// ======================================
export async function detailAnggota(
  request,
  response,
  next
) {
  try {
    const id = validasiId(request.params.id);

    if (id === null) {
      return response.status(400).json({
        success: false,
        message: "Parameter ID harus berupa bilangan bulat positif"
      });
    }

    const data =
      await anggotaService.ambilAnggotaById(id);

    if (!data) {
      return response.status(404).json({
        success: false,
        message: "Anggota tidak ditemukan"
      });
    }

    return response.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    next(error);
  }
}

// ======================================
// POST /anggota
// ======================================
export async function tambahAnggota(
  request,
  response,
  next
) {
  try {
    const hasil =
      validasiDataAnggota(request.body, true);

    if (hasil.errors.length > 0) {
      return response.status(400).json({
        success: false,
        message: "Data anggota tidak valid",
        details: hasil.errors
      });
    }

    // Mengecek NPM unik
    const npmAda =
      await anggotaService.cariAnggotaByNpm(
        hasil.data.npm
      );

    if (npmAda) {
      return response.status(400).json({
        success: false,
        message: "NPM sudah terdaftar"
      });
    }

    const data =
      await anggotaService.buatAnggota(
        hasil.data
      );

    return response.status(201).json({
      success: true,
      message: "Anggota berhasil ditambahkan",
      data
    });
  } catch (error) {
    next(error);
  }
}

// ======================================
// PATCH /anggota/:id
// ======================================
export async function ubahAnggota(
  request,
  response,
  next
) {
  try {
    const id = validasiId(request.params.id);

    if (id === null) {
      return response.status(400).json({
        success: false,
        message: "Parameter ID harus berupa bilangan bulat positif"
      });
    }

    const hasil =
      validasiDataAnggota(request.body, false);

    if (hasil.errors.length > 0) {
      return response.status(400).json({
        success: false,
        message: "Data anggota tidak valid",
        details: hasil.errors
      });
    }

    // Cek anggota
    const anggota =
      await anggotaService.ambilAnggotaById(id);

    if (!anggota) {
      return response.status(404).json({
        success: false,
        message: "Anggota tidak ditemukan"
      });
    }

    // Jika NPM diubah, cek apakah sudah dipakai
    if (hasil.data.npm) {
      const npmDipakai =
        await anggotaService.cariAnggotaByNpm(
          hasil.data.npm
        );

      if (
        npmDipakai &&
        npmDipakai.id !== id
      ) {
        return response.status(400).json({
          success: false,
          message:
            "NPM sudah digunakan anggota lain"
        });
      }
    }

    const data =
      await anggotaService.updateAnggota(
        id,
        hasil.data
      );

    return response.status(200).json({
      success: true,
      message:
        "Data anggota berhasil diperbarui",
      data
    });
  } catch (error) {
    next(error);
  }
}

// ======================================
// DELETE /anggota/:id
// ======================================
export async function hapusAnggota(
  request,
  response,
  next
) {
  try {
    const id = validasiId(request.params.id);

    if (id === null) {
      return response.status(400).json({
        success: false,
        message: "Parameter ID harus berupa bilangan bulat positif"
      });
    }

    const anggota =
      await anggotaService.ambilAnggotaById(id);

    if (!anggota) {
      return response.status(404).json({
        success: false,
        message: "Anggota tidak ditemukan"
      });
    }

    await anggotaService.hapusAnggota(id);

    return response.status(204).end();
  } catch (error) {
    next(error);
  }
}