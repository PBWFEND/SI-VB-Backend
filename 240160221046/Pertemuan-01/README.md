# Pertemuan 1 — Pengenalan Backend & Node.js HTTP Server

Laporan dan dokumentasi latihan individu mengenai konsep dasar HTTP server menggunakan module bawaan `node:http` tanpa framework.

- **Nama**: Sutiawan
- **NIM**: 240160221046
- **Mata Kuliah**: Praktikum Pemrograman Backend

---

## 1. Pengamatan Endpoint Demo (`server.js`)

Server demo dijalankan pada port `3000` (`node server.js`):

| No | URL Target | Method | Status Code | Response Body (Ringkasan) | Penjelasan |
|----|------------|--------|-------------|---------------------------|------------|
| 1 | `http://localhost:3000/` | `GET` | `200 OK` | `{"success": true, "message": "Selamat datang...", "endpoints": [...]}` | Menampilkan informasi server dan daftar endpoint yang tersedia. |
| 2 | `http://localhost:3000/mahasiswa` | `GET` | `200 OK` | `{"success": true, "total": 2, "data": [...]}` | Mengambil seluruh data mahasiswa dari array in-memory. |
| 3 | `http://localhost:3000/tidakada` | `GET` | `404 Not Found` | `{"success": false, "message": "Endpoint GET /tidakada tidak ditemukan"}` | URL tidak terdaftar dalam routing server. |

---

## 2. Implementasi Endpoint Baru (`latihan.js`)

Server latihan dijalankan pada port `3001` (`node latihan.js`).

### Endpoint `GET /about`
Mengembalikan informasi API beserta identitas pembuat.

- **Request**:
  ```powershell
  curl.exe -i http://localhost:3001/about
  ```
- **Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "message": "API Pertemuan 1",
    "author": "Sutiawan"
  }
  ```

---

### Endpoint `POST /mahasiswa`
Membaca body JSON yang dikirimkan client, memvalidasi field `nim` dan `nama`, lalu menyimpannya ke dalam array.

- **Request**:
  ```powershell
  curl.exe -i -X POST http://localhost:3001/mahasiswa `
    -H "Content-Type: application/json" `
    -d '{"nim":"F1D022099","nama":"Sutiawan"}'
  ```
- **Response (`201 Created`)**:
  ```json
  {
    "success": true,
    "message": "Mahasiswa berhasil ditambahkan",
    "data": {
      "nim": "F1D022099",
      "nama": "Sutiawan"
    }
  }
  ```

---

## 3. Uji Pemahaman HTTP Method

Berikut perbandingan antara prediksi awal dan hasil pengujian aktual:

| Request | Prediksi Status & Alasan | Hasil Pengujian Aktual | Analisis & Kesimpulan |
|---|---|---|---|
| **`PUT /mahasiswa`** (body 1 field) | **404 Not Found**, karena server belum membuat handler untuk method `PUT` pada path `/mahasiswa`. | **404 Not Found** (`Endpoint PUT /mahasiswa tidak ditemukan`) | Sesuai. Walaupun method HTTP valid secara standar, jika server tidak mendefinisikan routing untuk method tersebut, request akan jatuh ke handler default 404. |
| **`DELETE /mahasiswa/1`** | **404 Not Found**, karena server belum mendukung method `DELETE` serta routing dengan parameter URL `/1`. | **404 Not Found** (`Endpoint DELETE /mahasiswa/1 tidak ditemukan`) | Sesuai. Server mencocokkan string URL secara eksak (`url === "/mahasiswa"`), sehingga URL `/mahasiswa/1` tidak dikenali. |
| **`GET /mahasiswa/99`** | **404 Not Found**, karena router hanya memeriksa path `/mahasiswa`, bukan `/mahasiswa/:id`. | **404 Not Found** (`Endpoint GET /mahasiswa/99 tidak ditemukan`) | Sesuai. Pada implementasi native `node:http`, parsing parameter URL harus dibuat secara eksplisit menggunakan regex atau pemisahan string. |

---

## 4. Refleksi Singkat

1. **Perbedaan Mendasar HTTP Request dan Response**: HTTP Request adalah pesan permintaan yang dikirimkan oleh client kepada server (berisi method, URL, header, dan payload opsional), sedangkan HTTP Response adalah jawaban yang dikirimkan oleh server kembali ke client (berisi status code, header, dan data response).
2. **Pentingnya Status Code bagi Client**: Status code merupakan indikator standar internasional yang memberitahukan secara instan kepada client apakah permintaan berhasil diproses (`2xx`), terdapat kesalahan pada input client (`4xx`), atau terjadi kendala pada internal server (`5xx`).
3. **Dampaknya dalam Pengembangan Aplikasi**: Tanpa status code yang akurat, client atau aplikasi frontend tidak dapat menentukan alur logika penanganan error maupun pembaruan antarmuka secara tepat.
