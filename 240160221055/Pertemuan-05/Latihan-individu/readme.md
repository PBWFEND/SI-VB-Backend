# Pertemuan 5 — Latihan Desain RESTful API

## 1. Deskripsi

Latihan ini mengembangkan RESTful API menggunakan Node.js dan Express.js untuk mengelola data mahasiswa. API menerapkan middleware logger, filter query, validasi data, serta penggunaan HTTP status code sesuai kebutuhan.

## 2. Teknologi yang Digunakan

- Node.js
- Express.js
- Postman untuk pengujian API

## 3. Cara Menjalankan Aplikasi

1. Buka terminal pada folder `Pertemuan-05/Latihan-individu`.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Jalankan aplikasi:

   ```bash
   node latihan.js
   ```

4. API berjalan pada:

   `http://localhost:3007`

## 4. Data Mahasiswa

Data awal yang tersedia:

| NIM | Nama | Program Studi | Angkatan |
|---|---|---|---|
| F1D022001 | Jhon Doe | Sistem Informasi | 2024 |
| F1D022002 | Ani Lestari | Sistem Informasi | 2023 |

Data disimpan dalam array JavaScript dan tidak menggunakan database.

## 5. Daftar Endpoint API

| Method | URL | Fungsi | Status Code |
|---|---|---|---|
| GET | `/mahasiswa` | Mengambil semua data mahasiswa | 200 OK |
| GET | `/mahasiswa?prodi=Sistem%20Informasi` | Filter berdasarkan program studi | 200 OK |
| GET | `/mahasiswa/:nim` | Mengambil detail mahasiswa berdasarkan NIM | 200 OK / 404 Not Found |
| POST | `/mahasiswa` | Menambahkan mahasiswa baru | 201 Created / 400 Bad Request |
| PATCH | `/mahasiswa/:nim` | Mengubah sebagian data mahasiswa | 204 No Content / 400 Bad Request / 404 Not Found |

## 6. Hasil Pengujian API

Pengujian dilakukan menggunakan Postman dengan server berjalan pada port 3007.

### A. GET — Mengambil Semua Mahasiswa

**Method:** GET

**URL:** `http://localhost:3007/mahasiswa`

**Status Code:** `200 OK`

**Response JSON:**

```json
{
  "success": true,
  "message": "Data mahasiswa berhasil diambil",
  "data": [
    {
      "nim": "F1D022001",
      "nama": "Jhon Doe",
      "prodi": "Sistem Informasi",
      "angkatan": 2024
    },
    {
      "nim": "F1D022002",
      "nama": "Ani Lestari",
      "prodi": "Sistem Informasi",
      "angkatan": 2023
    }
  ]
}
```

**Keterangan:** Endpoint mengembalikan seluruh data mahasiswa dengan status `200 OK`.

### B. GET — Filter Berdasarkan Program Studi

**Method:** GET

**URL:** `http://localhost:3007/mahasiswa?prodi=Sistem%20Informasi`

**Status Code:** `200 OK`

**Response JSON:**

```json
{
  "success": true,
  "message": "Data mahasiswa berhasil diambil",
  "data": [
    {
      "nim": "F1D022001",
      "nama": "Jhon Doe",
      "prodi": "Sistem Informasi",
      "angkatan": 2024
    },
    {
      "nim": "F1D022002",
      "nama": "Ani Lestari",
      "prodi": "Sistem Informasi",
      "angkatan": 2023
    }
  ]
}
```

**Keterangan:** Endpoint menampilkan mahasiswa yang memiliki program studi sesuai dengan parameter query `prodi`.

### C. GET — Detail Mahasiswa Berdasarkan NIM

**Method:** GET

**URL:** `http://localhost:3007/mahasiswa/F1D022001`

**Status Code:** `200 OK`

**Response JSON:**

```json
{
  "success": true,
  "message": "Detail mahasiswa berhasil diambil",
  "data": {
    "nim": "F1D022001",
    "nama": "Jhon Doe",
    "prodi": "Sistem Informasi",
    "angkatan": 2024
  }
}
```

**Keterangan:** Endpoint mengambil satu data mahasiswa berdasarkan NIM yang diberikan.

### D. GET — NIM Tidak Ditemukan

**Method:** GET

**URL:** `http://localhost:3007/mahasiswa/F1D022999`

**Status Code:** `404 Not Found`

**Response JSON:**

```json
{
  "success": false,
  "message": "Mahasiswa tidak ditemukan"
}
```

**Keterangan:** Status `404 Not Found` diberikan apabila NIM yang dicari tidak terdapat dalam data mahasiswa.

### E. POST — Menambahkan Mahasiswa

**Method:** POST

**URL:** `http://localhost:3007/mahasiswa`

**Request Body:**

```json
{
  "nim": "240160221055",
  "nama": "Rasya Putri Ramadhani",
  "prodi": "Sistem Informasi",
  "angkatan": 2024
}
```

**Status Code:** `201 Created`

**Response JSON:**

```json
{
  "success": true,
  "message": "Mahasiswa berhasil ditambahkan",
  "data": {
    "nim": "240160221055",
    "nama": "Rasya Putri Ramadhani",
    "prodi": "Sistem Informasi",
    "angkatan": 2024
  }
}
```

**Keterangan:** Data mahasiswa baru ditambahkan apabila seluruh field wajib valid dan NIM belum terdaftar.

### F. POST — Validasi Data Tidak Lengkap

**Method:** POST

**URL:** `http://localhost:3007/mahasiswa`

**Request Body:**

```json
{
  "nim": "F1D022004",
  "prodi": "Sistem Informasi",
  "angkatan": 2024
}
```

**Status Code:** `400 Bad Request`

**Response JSON:**

```json
{
  "success": false,
  "message": "nim, nama, prodi, dan angkatan wajib diisi"
}
```

**Keterangan:** Permintaan ditolak karena field `nama` tidak disertakan.

### G. PATCH — Mengubah Sebagian Data Mahasiswa

**Method:** PATCH

**URL:** `http://localhost:3007/mahasiswa/F1D022001`

**Request Body:**

```json
{
  "nama": "Jhon Doe Updated"
}
```

**Status Code:** `204 No Content`

**Response Body:** Tidak ada.

**Keterangan:** Data mahasiswa berhasil diperbarui. Status `204 No Content` menunjukkan bahwa permintaan berhasil diproses tanpa mengirimkan response body.

Untuk memeriksa hasil perubahan, lakukan request berikut:

**Method:** GET

**URL:** `http://localhost:3007/mahasiswa/F1D022001`

**Status Code:** `200 OK`

**Contoh Response JSON setelah perubahan:**

```json
{
  "success": true,
  "message": "Detail mahasiswa berhasil diambil",
  "data": {
    "nim": "F1D022001",
    "nama": "Jhon Doe Updated",
    "prodi": "Sistem Informasi",
    "angkatan": 2024
  }
}
```

### H. PATCH — Mahasiswa Tidak Ditemukan

**Method:** PATCH

**URL:** `http://localhost:3007/mahasiswa/F1D022999`

**Status Code:** `404 Not Found`

**Response JSON:**

```json
{
  "success": false,
  "message": "Mahasiswa tidak ditemukan"
}
```

**Keterangan:** Status `404 Not Found` diberikan apabila NIM yang ingin diperbarui tidak ditemukan.

### I. PATCH — Body Kosong atau Field Tidak Valid

**Method:** PATCH

**URL:** `http://localhost:3007/mahasiswa/F1D022001`

**Request Body:**

```json
{}
```

**Status Code:** `400 Bad Request`

**Response JSON:**

```json
{
  "success": false,
  "message": "Body tidak boleh kosong"
}
```

**Keterangan:** Permintaan ditolak karena body tidak berisi perubahan apa pun. Field yang tidak diizinkan, seperti `nim`, juga ditolak dengan status `400 Bad Request`.

## 7. Middleware Logger

Middleware logger digunakan untuk mencatat HTTP method dan URL setiap request yang masuk ke API.

Contoh kode:

```javascript
app.use((request, response, next) => {
  console.log(`${request.method} ${request.originalUrl}`);
  next();
});
```

Contoh output terminal:

```text
GET /mahasiswa
GET /mahasiswa?prodi=Sistem%20Informasi
GET /mahasiswa/F1D022001
POST /mahasiswa
PATCH /mahasiswa/F1D022001
```

Middleware ini membantu memantau request yang diterima server selama pengujian.

## 8. Kesimpulan

Latihan ini menerapkan konsep RESTful API menggunakan Express.js, meliputi pengambilan data, filter query, pencarian berdasarkan NIM, penambahan data, perubahan sebagian data, validasi input, middleware logger, dan penggunaan HTTP status code.

Status `200`, `201`, `400`, `404`, dan `204` digunakan sesuai kondisi permintaan. Pengujian dilakukan menggunakan Postman untuk memeriksa kesesuaian endpoint dan response API.

Data hanya disimpan dalam array JavaScript sehingga perubahan tidak bertahan setelah server dihentikan atau dimulai ulang.