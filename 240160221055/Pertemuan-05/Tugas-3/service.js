let anggota = [
  {
    id: 1,
    nama: "Rasya Putri Ramadhani",
    npm: "240160221055",
    divisi: "Backend"
  },
  {
    id: 2,
    nama: "Salwa",
    npm: "240160221056",
    divisi: "Frontend"
  }
];

export function getAllAnggota(filters = {}) {
  let hasil = [...anggota];

  if (filters.divisi) {
    hasil = hasil.filter(
      (item) =>
        item.divisi.toLowerCase() === filters.divisi.toLowerCase()
    );
  }

  if (filters.nama) {
    hasil = hasil.filter(
      (item) =>
        item.nama.toLowerCase().includes(filters.nama.toLowerCase())
    );
  }

  return hasil;
}

export function getAnggotaById(id) {
  return anggota.find((item) => item.id === Number(id));
}

export function createAnggota(data) {
  const idBaru =
    anggota.length > 0
      ? Math.max(...anggota.map((item) => item.id)) + 1
      : 1;

  const anggotaBaru = {
    id: idBaru,
    nama: data.nama.trim(),
    npm: data.npm.trim(),
    divisi: data.divisi.trim()
  };

  anggota.push(anggotaBaru);

  return anggotaBaru;
}

export function updateAnggota(id, data) {
  const index = anggota.findIndex((item) => item.id === Number(id));

  if (index === -1) {
    return null;
  }

  anggota[index] = {
    id: Number(id),
    nama: data.nama.trim(),
    npm: data.npm.trim(),
    divisi: data.divisi.trim()
  };

  return anggota[index];
}

export function patchAnggota(id, data) {
  const index = anggota.findIndex((item) => item.id === Number(id));

  if (index === -1) {
    return null;
  }

  anggota[index] = {
    ...anggota[index],
    ...data,
    id: Number(id)
  };

  return anggota[index];
}

export function deleteAnggota(id) {
  const index = anggota.findIndex((item) => item.id === Number(id));

  if (index === -1) {
    return false;
  }

  anggota.splice(index, 1);

  return true;
}