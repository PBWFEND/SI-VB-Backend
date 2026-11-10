TUGAS 1 — ANALISIS & DESAIN API
Nama : Rendi Fergian Sukmawan
NPM  : 240160221037
Studi Kasus: Sistem Informasi Absensi Organisasi Mahasiswa

1. Deskripsi Sistem

Sistem Informasi Absensi Organisasi Mahasiswa adalah sistem yang digunakan untuk mencatat dan mengelola kehadiran anggota dalam kegiatan organisasi, seperti rapat rutin, rapat kerja, seminar, dan kegiatan lainnya. Pengguna sistem terdiri dari admin atau pengurus organisasi yang bertugas mengelola data anggota dan kegiatan, serta anggota yang dapat melihat informasi kegiatan dan riwayat kehadirannya. Fitur utama sistem ini meliputi pengelolaan data anggota, pembuatan kegiatan, pencatatan absensi, melihat daftar kehadiran, dan pembuatan laporan absensi. Sistem menggunakan API sebagai penghubung antara aplikasi yang digunakan pengguna dengan server dan database, sehingga data dapat disimpan, diakses, dan diperbarui secara terstruktur.

2. Diagram Arsitektur Sistem
Diagram berikut menggambarkan alur komunikasi antara pengguna, server backend, dan database.
Client / Aplikasi Pengguna

Admin, pengurus, dan anggota

HTTP Request (JSON)

Backend API

Node.js / Express — validasi dan proses data

Query dan hasil pengolahan data

Database

Data anggota, kegiatan, dan absensi


Backend mengirimkan HTTP Response berupa JSON dan status code kembali kepada client.

Penjelasan alur:
1. Client mengirimkan HTTP Request ke backend API, misalnya untuk mencatat kehadiran anggota.
2. Backend memeriksa request, melakukan validasi, dan memproses permintaan.
3. Backend membaca atau mengubah data di database sesuai kebutuhan.
4. Database mengembalikan hasil pemrosesan kepada backend.
5. Backend mengirimkan HTTP Response berupa JSON beserta status code kepada client.


3. Tabel Resource dan Endpoint
API menggunakan alamat dasar http://localhost:3000/api. Terdapat dua resource utama, yaitu anggota dan absensi.
A. Resource Anggota
Resource anggota digunakan untuk mengelola data anggota organisasi.
Operasi	Method	Endpoint
Menampilkan semua anggota	GET	/api/anggota
Menambahkan anggota	POST	/api/anggota
Melihat detail anggota	GET	/api/anggota/:id
Memperbarui data anggota	PUT	/api/anggota/:id
Menghapus anggota	DELETE	/api/anggota/:id
B. Resource Absensi
Resource absensi digunakan untuk mencatat, melihat, memperbarui, dan menghapus data kehadiran anggota dalam kegiatan organisasi.
Operasi	Method	Endpoint
Menampilkan semua data absensi	GET	/api/absensi
Menambahkan catatan absensi	POST	/api/absensi
Melihat detail absensi	GET	/api/absensi/:id
Memperbarui catatan absensi	PUT	/api/absensi/:id
Menghapus catatan absensi	DELETE	/api/absensi/:id
Berikut detail request body, response body, dan status code untuk masing-masing endpoint. Contoh menggunakan JSON dan status code HTTP standar.
A. Detail endpoint anggota
Method & endpoint	Request body	Response body sukses	Status sukses / gagal
GET /api/anggota	Tidak ada	{"data":[{"id":1,"nama":"Andi"}]}	200 / 500
POST /api/anggota	{"nama":"Andi","nim":"23001","jabatan":"Anggota"}	{"message":"Anggota berhasil ditambahkan","data":{"id":1,"nama":"Andi","nim":"23001","jabatan":"Anggota"}}	201 / 400, 409
GET /api/anggota/:id	Tidak ada	{"id":1,"nama":"Andi","nim":"23001","jabatan":"Anggota"}	200 / 404
PUT /api/anggota/:id	{"nama":"Andi Pratama","nim":"23001","jabatan":"Sekretaris"}	{"message":"Data anggota berhasil diperbarui","data":{"id":1,"nama":"Andi Pratama","nim":"23001","jabatan":"Sekretaris"}}	200 / 400, 404
DELETE /api/anggota/:id	Tidak ada	{"message":"Anggota berhasil dihapus"}	200 / 404
B. Detail endpoint absensi
Method & endpoint	Request body	Response body sukses	Status sukses / gagal
GET /api/absensi	Tidak ada	{"data":[{"id":1,"anggota_id":1,"kegiatan":"Rapat Rutin","status":"Hadir"}]}	200 / 500
POST /api/absensi	{"anggota_id":1,"kegiatan":"Rapat Rutin","tanggal":"2026-10-19","status":"Hadir"}	{"message":"Absensi berhasil dicatat","data":{"id":1,"anggota_id":1,"kegiatan":"Rapat Rutin","tanggal":"2026-10-19","status":"Hadir"}}	201 / 400, 404, 409
GET /api/absensi/:id	Tidak ada	{"id":1,"anggota_id":1,"kegiatan":"Rapat Rutin","tanggal":"2026-10-19","status":"Hadir"}	200 / 404
PUT /api/absensi/:id	{"anggota_id":1,"kegiatan":"Rapat Rutin","tanggal":"2026-10-19","status":"Izin"}	{"message":"Absensi berhasil diperbarui","data":{"id":1,"anggota_id":1,"kegiatan":"Rapat Rutin","tanggal":"2026-10-19","status":"Izin"}}	200 / 400, 404
DELETE /api/absensi/:id	Tidak ada	{"message":"Data absensi berhasil dihapus"}	200 / 404
Keterangan status code:
- 200 OK: permintaan berhasil.
- 201 Created: data berhasil dibuat.
- 400 Bad Request: data atau format request tidak valid.
- 404 Not Found: data yang dicari tidak ditemukan.
- 409 Conflict: data bertentangan dengan data yang sudah ada, misalnya NIM duplikat atau absensi ganda.
- 500 Internal Server Error: terjadi kesalahan pada server.
Status code kegagalan tersebut merupakan rancangan respons yang perlu diterapkan oleh backend, bukan respons otomatis yang pasti muncul tanpa implementasi.
4. Contoh JSON Request Body dan Response Body
Pada bagian ini, diberikan contoh JSON untuk setiap resource, yaitu anggota dan absensi.
A. Resource Anggota
1. Contoh request body — menambahkan anggota

Method: POST

Endpoint: /api/anggota
{
  "nama": "Andi Pratama",
  "nim": "23001",
  "jabatan": "Anggota"
}


Penjelasan: Data tersebut dikirim oleh admin untuk menambahkan anggota baru ke dalam sistem absensi organisasi.

2. Contoh response body — anggota berhasil ditambahkan

Status code: 201 Created
{
  "message": "Anggota berhasil ditambahkan",
  "data": {
    "id": 1,
    "nama": "Andi Pratama",
    "nim": "23001",
    "jabatan": "Anggota"
  }
}


Penjelasan: Server memberikan respons bahwa data anggota berhasil disimpan ke database, termasuk ID anggota yang dibuat.
B. Resource Absensi
1. Contoh request body — mencatat kehadiran anggota

Method: POST

Endpoint: /api/absensi
{
  "anggota_id": 1,
  "kegiatan": "Rapat Rutin",
  "tanggal": "2026-10-19",
  "status": "Hadir"
}


Penjelasan: Pengurus mengirimkan data kehadiran anggota nomor 1 pada kegiatan rapat rutin tanggal 19 Oktober 2026.

2. Contoh response body — absensi berhasil dicatat

Status code: 201 Created
{
  "message": "Absensi berhasil dicatat",
  "data": {
    "id": 1,
    "anggota_id": 1,
    "kegiatan": "Rapat Rutin",
    "tanggal": "2026-10-19",
    "status": "Hadir"
  }
}


Penjelasan: Server mengembalikan data absensi yang telah tersimpan. Status kehadiran dapat berupa Hadir, Izin, atau Sakit.
5. Skenario Uji Request–Response
Berikut tiga skenario pengujian untuk memastikan API berjalan sesuai kebutuhan. Pengujian mencakup dua skenario berhasil dan satu skenario gagal.
Skenario 1 — Berhasil menambahkan anggota
Berhasil
HTTP 201 Created

Request
POST /api/anggota
Content-Type: application/json


{
  "nama": "Budi Santoso",
  "nim": "23002",
  "jabatan": "Anggota"
}


Response
{
  "message": "Anggota berhasil ditambahkan",
  "data": {
    "id": 2,
    "nama": "Budi Santoso",
    "nim": "23002",
    "jabatan": "Anggota"
  }
}


Hasil yang diharapkan: Data Budi Santoso tersimpan di database dan server mengembalikan status 201 Created.

Skenario 2 — Berhasil mencatat absensi
Berhasil
HTTP 201 Created

Request
POST /api/absensi
Content-Type: application/json


{
  "anggota_id": 2,
  "kegiatan": "Rapat Rutin",
  "tanggal": "2026-10-19",
  "status": "Hadir"
}


Response
{
  "message": "Absensi berhasil dicatat",
  "data": {
    "id": 2,
    "anggota_id": 2,
    "kegiatan": "Rapat Rutin",
    "tanggal": "2026-10-19",
    "status": "Hadir"
  }
}


Hasil yang diharapkan: Data absensi berhasil disimpan dan terhubung dengan anggota bernomor ID 2. Backend harus memastikan anggota tersebut memang terdaftar.

Skenario 3 — Gagal mencari anggota yang tidak ditemukan
Gagal
HTTP 404 Not Found

Request
GET /api/anggota/999


Response
{
  "message": "Anggota tidak ditemukan"
}


Hasil yang diharapkan: Karena anggota dengan ID 999 tidak tersedia di database, server tidak mengembalikan data anggota dan memberikan status 404 Not Found.

Ketiga skenario tersebut dapat diuji menggunakan Postman atau curl. Hasil pengujian dianggap sesuai jika status code dan response body yang diterima sama dengan hasil yang diharapkan.

-- Kesimpulan
Sistem Informasi Absensi Organisasi Mahasiswa dirancang untuk membantu pengurus mengelola data anggota dan mencatat kehadiran secara terstruktur. API memiliki dua resource utama, yaitu anggota dan absensi, dengan total 10 endpoint yang mendukung operasi tambah, baca, ubah, dan hapus data. Melalui pengujian request–response, sistem diharapkan mampu memberikan respons yang sesuai, baik ketika permintaan berhasil maupun ketika data tidak ditemukan.