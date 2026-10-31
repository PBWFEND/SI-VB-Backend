
# Latihan Individu Pertemuan 5 — RESTful API Mahasiswa

**Nama:** Disti Setiawati  
**NIM:** 240160221009  
**Kelas:** SI-VB

## 1. Deskripsi

Latihan ini mengembangkan RESTful API untuk pengelolaan data mahasiswa menggunakan Node.js dan Express.js 5.

API menyediakan fitur melihat daftar mahasiswa, melihat detail berdasarkan NIM, filter berdasarkan program studi, menambahkan data, memperbarui sebagian data, dan menghapus data mahasiswa.

Data disimpan sementara di memory dan belum menggunakan database.

## 2. Teknologi

- Node.js v24.15.0
- Express.js 5.3.0
- JavaScript ES Module
- PowerShell untuk pengujian API

## 3. Struktur Project

```text
Latihan-Individu/
├── latihan.js
├── package.json
├── package-lock.json
├── README.md
└── bukti-testing/
```

## 4. Cara Menjalankan

```bash
npm install
npm start
```

Server berjalan pada:

`http://localhost:3006`

## 5. Daftar Endpoint

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/mahasiswa` | Menampilkan seluruh mahasiswa |
| GET | `/mahasiswa/:nim` | Menampilkan detail mahasiswa |
| POST | `/mahasiswa` | Menambahkan mahasiswa baru |
| PATCH | `/mahasiswa/:nim` | Memperbarui sebagian data mahasiswa |
| DELETE | `/mahasiswa/:nim` | Menghapus mahasiswa (tambahan) |

### Query Parameter

Filter mahasiswa berdasarkan program studi:

`GET /mahasiswa?prodi=Sistem%20Informasi`

## 6. Middleware

1. Logger untuk mencatat waktu, HTTP method, dan URL request.
2. `express.json()` untuk membaca request body JSON.
3. Handler 404 untuk menangani endpoint yang tidak tersedia.
4. Error handler untuk menangani kesalahan request dan aplikasi.

## 7. Validasi Input

Data mahasiswa yang ditambahkan harus memiliki:
- NIM
- Nama
- Program studi
- Angkatan

Validasi juga dilakukan ketika memperbarui data menggunakan PATCH.

## 8. Hasil Pengujian

| No. | Pengujian | Status | Hasil |
|---|---|---|---|
| 1 | GET daftar mahasiswa | 200 | Berhasil |
| 2 | GET detail mahasiswa | 200 | Berhasil |
| 3 | Filter berdasarkan prodi | 200 | Berhasil |
| 4 | GET NIM tidak ditemukan | 404 | Ditolak |
| 5 | POST mahasiswa valid | 201 | Berhasil ditambahkan |
| 6 | POST data tidak lengkap | 400 | Validasi menolak data |
| 7 | PATCH mahasiswa | 200 | Berhasil diperbarui |
| 8 | PATCH angkatan tidak valid | 400 | Validasi menolak data |
| 9 | PATCH NIM tidak ditemukan | 404 | Tidak ditemukan |
| 10 | DELETE mahasiswa | 204 | Berhasil dihapus |
| 11 | GET setelah DELETE | 404 | Data tidak ditemukan |

## 9. Kesimpulan

Melalui latihan ini, saya mempelajari penerapan RESTful API menggunakan Express.js, mulai dari penggunaan resource, endpoint, method HTTP, route parameter, query parameter, validasi input, dan response JSON.

Saya juga memahami perbedaan penggunaan GET, POST, PATCH, dan DELETE serta penerapan status code sesuai hasil request. Seluruh pengujian dilakukan melalui PowerShell.
