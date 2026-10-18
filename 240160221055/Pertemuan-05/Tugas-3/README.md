# Tugas 3 — Perancangan dan Implementasi RESTful API Express.js

## 1. Deskripsi Proyek

Proyek ini merupakan implementasi RESTful API menggunakan Node.js dan Express.js untuk mengelola data anggota organisasi pada Sistem Informasi Absensi Organisasi.

API menyediakan operasi CRUD (*Create, Read, Update, Delete*) untuk data anggota, validasi input, pencarian berdasarkan query parameter, serta penanganan kesalahan menggunakan HTTP status code yang sesuai.

## 2. Teknologi yang Digunakan

- Node.js
- Express.js
- JavaScript ES Modules
- Postman untuk pengujian API
- JSON sebagai format pertukaran data

## 3. Struktur Proyek

```text
Tugas-3/
├── app.js
├── server.js
├── service.js
├── package.json
├── package-lock.json
├── README.md
└── REFLEKSI.md
```

Keterangan:

- `app.js`: Mengatur middleware, routing, validasi input, dan penanganan kesalahan.
- `server.js`: Menjalankan server Express pada port 3007.
- `service.js`: Mengelola data anggota dan menyediakan fungsi CRUD.
- `package.json`: Menyimpan informasi proyek, script, dan dependensi.
- `package-lock.json`: Mencatat versi dependensi yang terpasang.
- `README.md`: Dokumentasi proyek dan panduan penggunaan API.
- `REFLEKSI.md`: Dokumentasi refleksi proses pengerjaan.

## 4. Cara Menjalankan Proyek

### Prasyarat

Pastikan Node.js dan npm sudah terpasang pada komputer.

### Langkah menjalankan

1. Buka terminal pada folder `Tugas-3`.
2. Instal dependensi:

   ```bash
   npm install
   ```

3. Jalankan server:

   ```bash
   npm start
   ```

4. Jika server berhasil berjalan, terminal akan menampilkan:

   ```text
   RESTful API Tugas 3 berjalan di http://localhost:3007
   ```

5. Buka Postman untuk melakukan pengujian endpoint.

Base URL:

```text
http://localhost:3007
```

Biarkan terminal tetap berjalan selama pengujian API.

## 5. Struktur Data Anggota

Setiap anggota memiliki atribut berikut:

| Atribut | Tipe Data | Keterangan |
|---|---|---|
| `id` | Number | Identitas unik anggota |
| `nama` | String | Nama anggota |
| `npm` | String | Nomor Pokok Mahasiswa |
| `divisi` | String | Divisi anggota |

Data awal yang tersedia:

```json
[
  {
    "id": 1,
    "nama": "Rasya Putri Ramadhani",
    "npm": "240160221055",
    "divisi": "Backend"
  },
  {
    "id": 2,
    "nama": "Salwa",
    "npm": "240160221056",
    "divisi": "Frontend"
  }
]
```

**Catatan:** Data disimpan sementara dalam array di memori, sehingga perubahan data tidak bersifat permanen dan dapat kembali ke kondisi awal ketika server dijalankan ulang.

## 6. Kontrak Endpoint API

Semua endpoint menggunakan base URL `http://localhost:3007`.

| No. | Method | Endpoint | Fungsi | Status Sukses |
|---:|---|---|---|---|
| 1 | GET | `/anggota` | Mengambil seluruh anggota | 200 OK |
| 2 | GET | `/anggota/:id` | Mengambil detail anggota berdasarkan ID | 200 OK |
| 3 | POST | `/anggota` | Menambahkan anggota baru | 201 Created |
| 4 | PUT | `/anggota/:id` | Mengganti seluruh data anggota | 200 OK |
| 5 | PATCH | `/anggota/:id` | Memperbarui sebagian data anggota | 200 OK |
| 6 | DELETE | `/anggota/:id` | Menghapus anggota berdasarkan ID | 204 No Content |

### Query Parameter

Endpoint `GET /anggota` mendukung dua query parameter:

| Parameter | Fungsi | Contoh |
|---|---|---|
| `divisi` | Memfilter anggota berdasarkan divisi | `/anggota?divisi=Backend` |
| `nama` | Mencari anggota berdasarkan nama | `/anggota?nama=Rasya` |

Kedua filter dapat digunakan secara bersamaan:

```text
GET /anggota?divisi=Frontend&nama=Salwa
```

Pencarian nama menggunakan pencocokan sebagian teks dan tidak membedakan huruf besar maupun kecil. Jika tidak ada data yang sesuai, API mengembalikan array kosong dengan status `200 OK`.

## 7. Contoh Request dan Response

### A. GET — Mengambil seluruh anggota

Request:

```http
GET /anggota
```

Response `200 OK`:

```json
{
  "success": true,
  "total": 2,
  "data": [
    {
      "id": 1,
      "nama": "Rasya Putri Ramadhani",
      "npm": "240160221055",
      "divisi": "Backend"
    },
    {
      "id": 2,
      "nama": "Salwa",
      "npm": "240160221056",
      "divisi": "Frontend"
    }
  ]
}
```

### B. GET — Mengambil detail anggota

Request:

```http
GET /anggota/1
```

Response `200 OK`:

```json
{
  "success": true,
  "data": {
    "id": 1,
    "nama": "Rasya Putri Ramadhani",
    "npm": "240160221055",
    "divisi": "Backend"
  }
}
```

### C. POST — Menambahkan anggota

Request:

```http
POST /anggota
Content-Type: application/json
```

Body:

```json
{
  "nama": "Dina Putri",
  "npm": "240160221057",
  "divisi": "UI/UX"
}
```

Response `201 Created`:

```json
{
  "success": true,
  "message": "Anggota berhasil ditambahkan",
  "data": {
    "id": 3,
    "nama": "Dina Putri",
    "npm": "240160221057",
    "divisi": "UI/UX"
  }
}
```

ID pada contoh tersebut berlaku jika dua data awal masih tersedia dan belum ada penambahan data sebelumnya.

### D. PUT — Mengganti seluruh data anggota

Request:

```http
PUT /anggota/1
Content-Type: application/json
```

Body:

```json
{
  "nama": "Rasya Putri",
  "npm": "240160221059",
  "divisi": "Fullstack"
}
```

Response `200 OK`:

```json
{
  "success": true,
  "message": "Data anggota berhasil diganti",
  "data": {
    "id": 1,
    "nama": "Rasya Putri",
    "npm": "240160221059",
    "divisi": "Fullstack"
  }
}
```

PUT mengganti seluruh field data anggota yang dapat diubah. Field `id` ditentukan melalui parameter URL.

### E. PATCH — Memperbarui sebagian data anggota

Request:

```http
PATCH /anggota/1
Content-Type: application/json
```

Body:

```json
{
  "divisi": "UI/UX"
}
```

Response `200 OK`:

```json
{
  "success": true,
  "message": "Data anggota berhasil diperbarui",
  "data": {
    "id": 1,
    "nama": "Rasya Putri Ramadhani",
    "npm": "240160221055",
    "divisi": "UI/UX"
  }
}
```

Response tersebut merupakan ilustrasi ketika data anggota ID 1 masih memiliki nama dan NPM awal. PATCH hanya memperbarui field yang dikirim.

### F. DELETE — Menghapus anggota

Request:

```http
DELETE /anggota/2
```

Response:

```http
204 No Content
```

Tidak ada response body pada penghapusan yang berhasil.

## 8. Validasi Input dan Penanganan Kesalahan

API menerapkan validasi berikut:

- Field `nama`, `npm`, dan `divisi` wajib diisi pada operasi POST dan PUT.
- Field teks tidak boleh kosong atau hanya berisi spasi.
- Nama minimal terdiri dari dua karakter.
- NPM harus terdiri dari 12 digit angka.
- NPM tidak boleh digunakan oleh anggota lain.
- PATCH harus menerima setidaknya satu field yang valid.
- Field yang diperbolehkan hanya `nama`, `npm`, dan `divisi`.
- ID harus berupa bilangan bulat positif.
- ID anggota yang tidak ditemukan menghasilkan respons 404.
- Endpoint yang tidak terdaftar menghasilkan respons 404.

## 9. HTTP Status Code

| Status | Keterangan |
|---|---|
| `200 OK` | Request berhasil diproses |
| `201 Created` | Data anggota baru berhasil dibuat |
| `204 No Content` | Data berhasil dihapus tanpa response body |
| `400 Bad Request` | Input tidak valid atau melanggar ketentuan |
| `404 Not Found` | Anggota atau endpoint tidak ditemukan |
| `500 Internal Server Error` | Terjadi kesalahan internal server |

Respons JSON pada umumnya menggunakan struktur konsisten yang memuat `success`, `message` jika diperlukan, serta `data` atau `total` sesuai kebutuhan endpoint. Respons `204 No Content` tidak memiliki body.

## 10. Hasil Pengujian

Pengujian dilakukan menggunakan Postman pada server lokal dengan base URL `http://localhost:3007`.

| No. | Skenario Pengujian | Hasil yang Diharapkan |
|---:|---|---|
| 1 | GET seluruh anggota | 200 OK |
| 2 | Filter berdasarkan divisi | 200 OK |
| 3 | Filter berdasarkan nama | 200 OK |
| 4 | Filter divisi dan nama sekaligus | 200 OK |
| 5 | GET anggota berdasarkan ID yang tersedia | 200 OK |
| 6 | GET ID yang tidak ditemukan | 404 Not Found |
| 7 | GET menggunakan ID tidak valid | 400 Bad Request |
| 8 | POST data anggota valid | 201 Created |
| 9 | POST dengan field wajib kosong | 400 Bad Request |
| 10 | POST dengan NPM tidak valid | 400 Bad Request |
| 11 | POST dengan NPM duplikat | 400 Bad Request |
| 12 | PUT data anggota yang tersedia | 200 OK |
| 13 | PUT ID yang tidak ditemukan | 404 Not Found |
| 14 | PATCH satu field | 200 OK |
| 15 | PATCH dengan body kosong | 400 Bad Request |
| 16 | PATCH dengan field tidak diizinkan | 400 Bad Request |
| 17 | DELETE anggota yang tersedia | 204 No Content |
| 18 | DELETE ID yang tidak ditemukan | 404 Not Found |
| 19 | GET endpoint yang tidak terdaftar | 404 Not Found |

Skenario di atas merupakan daftar pengujian yang dilakukan dan status yang diharapkan. Bukti hasil aktual dapat dilihat pada screenshot Postman yang dilampirkan dalam pengumpulan tugas.

## 11. Dokumentasi Bukti Pengujian

Lampirkan screenshot hasil pengujian Postman pada bagian dokumentasi pengumpulan tugas. Bukti sebaiknya menunjukkan:

- Method dan URL endpoint.
- HTTP status code.
- Response body untuk request yang mengembalikan body.
- Body request untuk operasi POST, PUT, dan PATCH.
- Respons kosong untuk DELETE yang berhasil dengan status `204 No Content`.
- Contoh validasi input dan penanganan error.

## 12. Kesimpulan

RESTful API ini mengimplementasikan enam endpoint utama untuk mengelola data anggota, menyediakan pencarian menggunakan query parameter, menerapkan validasi input, dan menggunakan HTTP status code untuk menunjukkan hasil request.

Dengan dokumentasi endpoint, contoh request dan response, serta bukti pengujian, proyek ini dapat digunakan sebagai implementasi dasar API pengelolaan anggota organisasi menggunakan Express.js.