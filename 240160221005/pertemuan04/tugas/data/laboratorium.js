// ================= DATABASE IN-MEMORY =================
let laboratorium = [
  { id: 1, nama: "Lab RPL",         kapasitas: 40, lokasi: "Gedung A Lantai 2", status: "tersedia"    },
  { id: 2, nama: "Lab Jaringan",    kapasitas: 30, lokasi: "Gedung B Lantai 1", status: "digunakan"   },
  { id: 3, nama: "Lab Multimedia",  kapasitas: 25, lokasi: "Gedung C Lantai 3", status: "maintenance" }
];

let nextId = 4;

const getSemua       = () => laboratorium;
const getById        = (id) => laboratorium.find((lab) => lab.id === id);
const tambah         = ({ nama, kapasitas, lokasi, status = "tersedia" }) => {
  const baru = { id: nextId++, nama, kapasitas, lokasi, status };
  laboratorium.push(baru);
  return baru;
};
const ubah           = (id, data) => {
  const index = laboratorium.findIndex((lab) => lab.id === id);
  if (index === -1) return null;
  laboratorium[index] = { ...laboratorium[index], ...data };
  return laboratorium[index];
};
const hapus          = (id) => {
  const index = laboratorium.findIndex((lab) => lab.id === id);
  if (index === -1) return null;
  const [dihapus] = laboratorium.splice(index, 1);
  return dihapus;
};

module.exports = { getSemua, getById, tambah, ubah, hapus };