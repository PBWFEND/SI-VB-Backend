# TUGAS 1 - ANALISIS & DESAIN API

# SISTEM INFORMASI LABORATORIUM 
Nama    : Cinta Rahmia Yulianti
NPM     : 240160221005
Kelas   : SI-VB

# 1. Deskripsi Sistem
Sistem Informasi Laboratorium Kampus adalah aplikasi backend yang digunakan oleh mahasiswa, asisten laboratorium, dan dosen/kepala lab untuk mengelola data ruang laboratorium serta proses peminjaman ruangan untuk praktikum, penelitian, atau kegiatan organisasi. Fitur utamanya meliputi: pengelolaan data laboratorium (nama, kapasitas, lokasi, status ketersediaan), pengajuan peminjaman ruangan oleh mahasiswa dengan tanggal, jam, dan keperluan, verifikasi/persetujuan peminjaman oleh asisten lab atau dosen, serta penelusuran riwayat peminjaman. Sistem ini dirancang sebagai REST API agar dapat diakses oleh berbagai client (web, mobile, atau dashboard admin) dengan pertukaran data berformat JSON.

# 2. Pengguna & Hak Akses 
1. Mahasiswa : mengajukan peminjaman lab untuk praktikum, penelitian, atau kegiatan organisasi.
2. Asisten Laboratorium : mengelola ketersediaan lab serta memverifikasi dan menyetujui/menolak peminjaman.
3. Dosen/Kepala Lab : melihat laporan dan menyetujui peminjaman tingkat lanjut.
4. Admin : mengelola seluruh data lab, pengguna, dan jadwal dengan akses penuh.
5. Tamu : melihat daftar lab tanpa login.

# 3. Resource Sistem
Resource sistem adalah objek/data utama yang dikelola oleh sistem. Masing-masing punya struktur data sendiri.

laboratorium/
   ├── id
   ├── nama
   ├── kapasitas
   ├── lokasi
   └── status         

peminjaman/
   ├── id
   ├── id_lab
   ├── peminjam
   ├── nim
   ├── tanggal
   ├── jam_mulai
   ├── jam_selesai
   ├── keperluan
   └── status         

pengguna/
   ├── id
   ├── nama
   ├── email
   ├── nim
   ├── role           
   ├── password_hash
   └── created_at

jadwal/             
    ├── id
    ├── id_lab
    ├── id_peminjaman
    ├── tanggal
    ├── jam_mulai
    └── jam_selesai

# 4. Resource Dan Endpoint
1. Endpoint untuk resource laboratorium
    GET /laboratorium - lihat semua lab.
    GET /laboratorium/:id - lihat detail lab berdasarkan id.
    POST /laboratorium - tambah lab baru.
    PUT /laboratorium/:id - ubah data lab.
    DELETE /laboratorium/:id - hapus lab.

2. Endpoint untuk resource peminjaman
    GET /peminjaman - lihat semua peminjaman.
    GET /peminjaman/:id - lihat detail peminjaman berdasarkan id.
    POST /peminjaman - ajukan peminjaman baru.
    PUT /peminjaman/:id - ubah status peminjaman.
    DELETE /peminjaman/:id - batalkan peminjaman.

3. Endpoint untuk resource pengguna 
    GET /pengguna - lihat semua pengguna (admin).
    GET /pengguna/:id - lihat detail pengguna.
    POST /pengguna - tambah pengguna baru (admin).
    PUT /pengguna/:id - ubah data pengguna.
    DELETE /pengguna/:id - hapus pengguna (admin).

4. Endpoint untuk resource jadwal 
    GET /jadwal - lihat semua jadwal.
    GET /jadwal/:id - lihat detail jadwal.
    POST /jadwal - tambah jadwal baru.
    DELETE /jadwal/:id - hapus jadwal.


# 5. Contoh JSON

**A. Resource Sistem Laboratorium**
Request Body - POST /laboratorium
{
  "nama": "Lab Rekayasa Perangkat Lunak",
  "kapasitas": 40,
  "lokasi": "Gedung A Lantai 2",
  "status": "tersedia"
}

Response Body - 201 Created
{
  "success": true,
  "message": "Laboratorium berhasil ditambahkan",
  "data": {
    "id": 1,
    "nama": "Lab Rekayasa Perangkat Lunak",
    "kapasitas": 40,
    "lokasi": "Gedung A Lantai 2",
    "status": "tersedia"
  }
}

**B. Resource Sistem Peminjaman**
Request Body - POST /peminjaman
{
  "id_lab": 1,
  "peminjam": "Cinta Rahmia Yulianti",
  "nim": "240160221005",
  "tanggal": "2026-10-05",
  "jam_mulai": "08:00",
  "jam_selesai": "10:00",
  "keperluan": "Praktikum Basis Data",
  "status": "menunggu"
}

Response Body - 201 Created
{
  "success": true,
  "message": "Peminjaman berhasil diajukan",
  "data": {
    "id": 1,
    "id_lab": 1,
    "peminjam": "Cinta Rahmia Yulianti",
    "nim": "240160221005",
    "tanggal": "2026-10-05",
    "jam_mulai": "08:00",
    "jam_selesai": "10:00",
    "keperluan": "Praktikum Basis Data",
    "status": "menunggu"
  }
}

**C. Resource Sistem Pengguna**
Request Body - POST /pengguna
{
  "nama": "Cinta Rahmia Yulianti",
  "email": "cintayulianti6@gmail.com",
  "nim": "240160221005",
  "role": "mahasiswa",
  "password": "rahasia123"
}

Response Body - 201 Created
{
  "success": true,
  "message": "Pengguna berhasil ditambahkan",
  "data": {
    "id": 1,
    "nama": "Cinta Rahmia Yulianti",
    "email": "cintayulianti6@gmail.com",
    "nim": "240160221005",
    "role": "mahasiswa",
    "password_hash": "$2b$10$Xk9...",
    "created_at": "2026-09-28T04:39:02Z"
  }
}

**D. Resource Sistem Jadwal**
Request Body - POST /jadwal
{
  "id_lab": 1,
  "id_peminjaman": 1,
  "tanggal": "2026-10-05",
  "jam_mulai": "08:00",
  "jam_selesai": "10:00"
}

Response Body - 201 Created
{
  "success": true,
  "message": "Jadwal berhasil ditambahkan",
  "data": {
    "id": 1,
    "id_lab": 1,
    "id_peminjaman": 1,
    "tanggal": "2026-10-05",
    "jam_mulai": "08:00",
    "jam_selesai": "10:00"
  }
}

**E. Contoh Response Gagal (Semua Resource)**

400 Bad Request - field wajib kosong
{
  "success": false,
  "message": "Field 'nama' dan 'kapasitas' wajib diisi"
}

401 Unauthorized - belum login
{
  "success": false,
  "message": "Autentikasi diperlukan. Silakan login terlebih dahulu"
}

403 Forbidden - role tidak sesuai
{
  "success": false,
  "message": "Akses ditolak. Hanya admin yang dapat menambah laboratorium"
}

404 Not Found - data tidak ditemukan
{
  "success": false,
  "message": "Laboratorium dengan id 99 tidak ditemukan"
}

500 Internal Server Error
{
  "success": false,
  "message": "Terjadi kesalahan pada server"
}

# 6. Skenario Uji
Skenario 1 - SUKSES: Menambah laboratorium baru
Request:
POST /laboratorium HTTP/1.1
Host: localhost:3001
Content-Type: application/json

{
  "nama": "Lab Jaringan Komputer",
  "kapasitas": 30,
  "lokasi": "Gedung B Lantai 1"
}

Response (201 Created):
{
  "success": true,
  "message": "Laboratorium berhasil ditambahkan",
  "data": {
    "id": 4,
    "nama": "Lab Jaringan Komputer",
    "kapasitas": 30,
    "lokasi": "Gedung B Lantai 1",
    "status": "tersedia"
  }
}
Status: 201 Created - sukses
Penjelasan: Semua field wajib terisi dengan format valid, server menyimpan data dan mengembalikan status 201 Created beserta data yang baru dibuat.

Skenario 2 - SUKSES: Mengajukan Peminjaman Lab
Request:
POST /peminjaman HTTP/1.1
Host: localhost:3001
Content-Type: application/json

{
  "id_lab": 1,
  "peminjam": "Cinta Rahmia Yulianti",
  "nim": "240160221005",
  "tanggal": "2026-10-10",
  "jam_mulai": "13:00",
  "jam_selesai": "15:00",
  "keperluan": "Praktikum Jaringan"
}

Response (201 Created):
{
  "success": true,
  "message": "Peminjaman berhasil diajukan",
  "data": {
    "id": 1,
    "id_lab": 1,
    "peminjam": "Cinta Rahmia Yulianti",
    "nim": "240160221005",
    "tanggal": "2026-10-10",
    "jam_mulai": "13:00",
    "jam_selesai": "15:00",
    "keperluan": "Praktikum Jaringan",
    "status": "menunggu"
  }
}
Status: 201 Created - sukses
Penjelasan: Semua field wajib terisi, id_lab merujuk ke laboratorium yang ada, server menyimpan peminjaman dengan status awal menunggu dan mengembalikan 201 Created.

Skenario 3 - GAGAL: Mencari Laboratorium yang Tidak Ada
Request:
GET /laboratorium/99 HTTP/1.1
Host: localhost:3001

Response (404 Not Found):
{
  "success": false,
  "message": "Laboratorium dengan id 99 tidak ditemukan"
}

Status: 404 Not Found - gagal
Penjelasan: ID 99 tidak ada di database, server merespons 404 Not Found sebagai tanda resource tidak ditemukan, bukan error 500.

Skenario 4 - GAGAL: Field Wajib Kosong
Request:
POST /laboratorium HTTP/1.1
Host: localhost:3001
Content-Type: application/json

{
  "nama": "Lab Multimedia"
}

Response (400 Bad Request):
{
  "success": false,
  "message": "Field 'nama', 'kapasitas', dan 'lokasi' wajib diisi"
}
Status: 400 Bad Request - gagal
Penjelasan: Field kapasitas dan lokasi kosong server menolak request dengan 400 Bad Request karena input tidak lengkap.

Skenario 5 - GAGAL: Akses Ditolak

Request:
POST /laboratorium HTTP/1.1
Host: localhost:3001
Authorization: Bearer 
Content-Type: application/json

{
  "nama": "Lab Baru",
  "kapasitas": 20,
  "lokasi": "Gedung C"
}

Response (403 Forbidden):
{
  "success": false,
  "message": "Akses ditolak. Hanya admin yang dapat menambah laboratorium"
}
Status: 403 Forbidden - gagal
Penjelasan: Mahasiswa mencoba mengakses endpoint yang hanya boleh diakses admin server menolak dengan 403 Forbidden.

Skenario 6 - GAGAL: Belum Login
Request:
POST /peminjaman HTTP/1.1
Host: localhost:3001
Content-Type: application/json

{
  "id_lab": 1,
  "peminjam": "Cinta Rahmia Yulianti",
  "nim": "240160221005",
  "tanggal": "2026-10-10",
  "jam_mulai": "13:00",
  "jam_selesai": "15:00",
  "keperluan": "Praktikum Jaringan"
}

Response (401 Unauthorized):
{
  "success": false,
  "message": "Autentikasi diperlukan. Silakan login terlebih dahulu"
}
Status: 401 Unauthorized - gagal
Penjelasan: Request tidak menyertakan token autentikasi, server menolak dengan 401 Unauthorized.

**KETERANGAN:**
diagram disimpan dalam file diagram.png dan code diagram disimpan di file diagram.mmd