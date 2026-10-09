# Tugas 3 — Perancangan dan Implementasi RESTful API

Nama    : Aprilliana Fratiwi
NPM     : 240160221004
Kelas   : SI - VB

---

## 📖 Deskripsi

Project ini merupakan implementasi RESTful API menggunakan **Express.js** untuk mengelola data **Mahasiswa**. Dibangun sebagai pengembangan dari Latihan Individu dengan fitur:

1. Tabel kontrak endpoint (collection, detail, create, update, partial update, delete)
2. Minimal **6 endpoint** dengan HTTP method yang tepat
3. **Route parameter** dan minimal **2 query parameter** untuk filter
4. **Validasi input** dan response error `400`
5. Response `404` untuk resource yang tidak ditemukan
6. Response `204` untuk delete yang berhasil tanpa body
7. **Struktur response JSON** yang konsisten
8. README berisi cara menjalankan, contoh request, status code, dan hasil pengujian

---

## 🚀 Cara Menjalankan

### Prasyarat
- Node.js versi 18 atau lebih baru
- npm

### Langkah-langkah

```bash
# 1. Masuk ke folder Tugas_3
cd Tugas-3

# 2. Install dependencies
npm install

# 3. Jalankan server
node tugas.js

### Server akan berjalan di:
http://localhost:3008

| No | Method | Endpoint | Jenis | Query Params | Body (JSON) | Sukses | Error |
|:--:|:------:|:---------|:------|:-------------|:------------|:------:|:-----:|
| 1 | **GET** | `/mahasiswa` | Collection | `?prodi=`, `?angkatan=`, `?nama=` | — | `200 OK` | — |
| 2 | **GET** | `/mahasiswa/:nim` | Detail | — | — | `200 OK` | `404 Not Found` |
| 3 | **POST** | `/mahasiswa` | Create | — | `{ nim, nama, prodi, angkatan }` | `201 Created` | `400 Bad Request` |
| 4 | **PUT** | `/mahasiswa/:nim` | Update | — | `{ nama, prodi, angkatan }` | `200 OK` | `400`, `404` |
| 5 | **PATCH** | `/mahasiswa/:nim` | Partial Update | — | `{ nama?, prodi?, angkatan? }` | `200 OK` | `400`, `404` |
| 6 | **DELETE** | `/mahasiswa/:nim` | Delete | — | — | `204 No Content` | `404 Not Found` |

| Status Code | Keterangan | Digunakan Pada |
|:-----------:|:-----------|:---------------|
| `200 OK` | Request berhasil | GET, PUT, PATCH |
| `201 Created` | Resource berhasil dibuat | POST |
| `204 No Content` | Berhasil tanpa body | DELETE |
| `400 Bad Request` | Validasi gagal / duplikat | POST, PUT |
| `404 Not Found` | Resource tidak ditemukan | GET detail, PUT, PATCH, DELETE |
| `500 Internal Server Error` | Kesalahan server | Fallback |

### Struktur Response JSON
✅ Sukses
json
{
  "success": true,
  "message": "Pesan sukses",
  "data": { }
}

❌ Error
json
{
  "success": false,
  "message": "Pesan error",
  "details": [ ]
}

Contoh Request, Status Code & Hasil Pengujian
1. GET Collection — Semua Mahasiswa
Request:

bash
curl http://localhost:3008/mahasiswa
Status: 200 OK
BUKTI:
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_05\Tugas-3>curl http://localhost:3008/mahasiswa
{"success":true,"message":"Daftar mahasiswa berhasil diambil","data":{"total":2,"data":[{"nim":"240160221004","nama":"Aprilliana Fratiwi","prodi":"Sistem Informasi","angkatan":2024},{"nim":"239023109087","nama":"El Putra Sarira","prodi":"Sistem Informasi","angkatan":2023}]}}

2. GET Collection — Filter Query
Request:

bash
curl "http://localhost:3008/mahasiswa?prodi=Sistem%20Informasi&angkatan=2024"
Status: 200 OK
BUKTI:
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_05\Tugas-3>curl "http://localhost:3008/mahasiswa?prodi=Sistem%20Informasi&angkatan=2024"
{"success":true,"message":"Daftar mahasiswa berhasil diambil","data":{"total":1,"data":[{"nim":"240160221004","nama":"Aprilliana Fratiwi","prodi":"Sistem Informasi","angkatan":2024}]}}

3. GET Detail — Berdasarkan NIM
Request:

bash
curl http://localhost:3008/mahasiswa/F1D022001
Status: 200 OK
BUKTI:
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_05\Tugas-3>curl http://localhost:3008/mahasiswa/240160221004
{"success":true,"message":"Detail mahasiswa berhasil diambil","data":{"nim":"240160221004","nama":"Aprilliana Fratiwi","prodi":"Sistem Informasi","angkatan":2024}}

4. GET Detail — NIM Tidak Ditemukan
Request:

bash
curl http://localhost:3008/mahasiswa/F1D022999
BUKTI:
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_05\Tugas-3>curl http://localhost:3008/mahasiswa/F1D022999
{"success":false,"message":"Mahasiswa tidak ditemukan"}

POST — Tambah Mahasiswa:

cmd
curl -X POST http://localhost:3008/mahasiswa -H "Content-Type: application/json" -d "{\"nim\":\"F1D022003\",\"nama\":\"Budi Santoso\",\"prodi\":\"Teknik Informatika\",\"angkatan\":2024}"
→ Response: 201 Created
BUKTI:
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_05\Tugas-3>curl -X POST http://localhost:3008/mahasiswa -H "Content-Type: application/json" -d "{\"nim\":\"F1D022003\",\"nama\":\"Est Supha\",\"prodi\":\"Teknik Informatika\",\"angkatan\":2024}"
{"success":true,"message":"Mahasiswa berhasil ditambahkan","data":{"nim":"F1D022003","nama":"Est Supha","prodi":"Teknik Informatika","angkatan":2024}}

PUT — Ganti Seluruh Data:

cmd
curl -X PUT http://localhost:3008/mahasiswa/F1D022001 -H "Content-Type: application/json" -d "{\"nama\":\"Jhon Updated\",\"prodi\":\"Sistem Informasi\",\"angkatan\":2025}"
→ Response: 200 OK
BUKTI:
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_05\Tugas-3>curl -X PUT http://localhost:3008/mahasiswa/240160221004 -H "Content-Type: application/json" -d "{\"nama\":\"Aprilliana Fratiwi Updated\",\"prodi\":\"Sistem Informasi\",\"angkatan\":2025}"
{"success":true,"message":"Data mahasiswa berhasil diganti","data":{"nim":"240160221004","nama":"Aprilliana Fratiwi Updated","prodi":"Sistem Informasi","angkatan":2025}}

PATCH — Update Sebagian:

cmd
curl -X PATCH http://localhost:3008/mahasiswa/F1D022002 -H "Content-Type: application/json" -d "{\"nama\":\"Ani Baru\"}"
→ Response: 200 OK
BUKTI:
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_05\Tugas-3>curl -X PATCH http://localhost:3008/mahasiswa/239023109087 -H "Content-Type: application/json" -d "{\"nama\":\"El Putra Baru\"}"
{"success":true,"message":"Data mahasiswa berhasil diperbarui","data":{"nim":"239023109087","nama":"El Putra Baru","prodi":"Sistem Informasi","angkatan":2023}}

DELETE — Hapus:

cmd
curl -X DELETE http://localhost:3008/mahasiswa/F1D022003 -i
→ Response: 204 No Content
BUKTI:
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_05\Tugas-3>curl -X DELETE http://localhost:3008/mahasiswa/F1D022003 -i
HTTP/1.1 204 No Content
Date: Wed, 07 Oct 2026 17:31:14 GMT
Connection: keep-alive
Keep-Alive: timeout=5

POST — Validasi Gagal (400):

cmd
curl -X POST http://localhost:3008/mahasiswa -H "Content-Type: application/json" -d "{\"nim\":\"F1D022004\"}"
→ Response: 400 Bad Request
BUKTI:
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_05\Tugas-3>curl -X POST http://localhost:3008/mahasiswa -H "Content-Type: application/json" -d "{\"nim\":\"F1D022004\"}"
{"success":false,"message":"Validasi gagal","details":["Nama wajib diisi","Prodi wajib diisi","Angkatan wajib diisi"]}

### BUKTI PENGERJAAN

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_05\Tugas-3>npm install

added 68 packages, and audited 69 packages in 41s

28 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_05\Tugas-3>
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_05\Tugas-3>node tugas.js
Tugas 3 REST API berjalan di http://localhost:3008
[2026-10-07T17:23:47.910Z] GET /mahasiswa
[2026-10-07T17:24:06.087Z] GET /mahasiswa?prodi=Sistem%20Informasi&angkatan=2024
[2026-10-07T17:24:48.689Z] GET /mahasiswa/240160221004
[2026-10-07T17:25:05.328Z] GET /mahasiswa/F1D022999
[2026-10-07T17:26:24.845Z] POST /mahasiswa
[2026-10-07T17:28:42.989Z] PUT /mahasiswa/240160221004
[2026-10-07T17:30:02.553Z] PATCH /mahasiswa/239023109087
[2026-10-07T17:31:14.535Z] DELETE /mahasiswa/F1D022003
[2026-10-07T17:31:40.088Z] POST /mahasiswa

### CMD TERMINAL 2

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_05\Tugas-3>curl http://localhost:3008/mahasiswa
{"success":true,"message":"Daftar mahasiswa berhasil diambil","data":{"total":2,"data":[{"nim":"240160221004","nama":"Aprilliana Fratiwi","prodi":"Sistem Informasi","angkatan":2024},{"nim":"239023109087","nama":"El Putra Sarira","prodi":"Sistem Informasi","angkatan":2023}]}}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_05\Tugas-3>curl "http://localhost:3008/mahasiswa?prodi=Sistem%20Informasi&angkatan=2024"
{"success":true,"message":"Daftar mahasiswa berhasil diambil","data":{"total":1,"data":[{"nim":"240160221004","nama":"Aprilliana Fratiwi","prodi":"Sistem Informasi","angkatan":2024}]}}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_05\Tugas-3>curl http://localhost:3008/mahasiswa/240160221004
{"success":true,"message":"Detail mahasiswa berhasil diambil","data":{"nim":"240160221004","nama":"Aprilliana Fratiwi","prodi":"Sistem Informasi","angkatan":2024}}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_05\Tugas-3>curl http://localhost:3008/mahasiswa/F1D022999
{"success":false,"message":"Mahasiswa tidak ditemukan"}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_05\Tugas-3>curl -X POST http://localhost:3008/mahasiswa -H "Content-Type: application/json" -d "{\"nim\":\"F1D022003\",\"nama\":\"Est Supha\",\"prodi\":\"Teknik Informatika\",\"angkatan\":2024}"
{"success":true,"message":"Mahasiswa berhasil ditambahkan","data":{"nim":"F1D022003","nama":"Est Supha","prodi":"Teknik Informatika","angkatan":2024}}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_05\Tugas-3>curl -X PUT http://localhost:3008/mahasiswa/240160221004 -H "Content-Type: application/json" -d "{\"nama\":\"Aprilliana Fratiwi Updated\",\"prodi\":\"Sistem Informasi\",\"angkatan\":2025}"
{"success":true,"message":"Data mahasiswa berhasil diganti","data":{"nim":"240160221004","nama":"Aprilliana Fratiwi Updated","prodi":"Sistem Informasi","angkatan":2025}}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_05\Tugas-3>curl -X PATCH http://localhost:3008/mahasiswa/239023109087 -H "Content-Type: application/json" -d "{\"nama\":\"El Putra Baru\"}"
{"success":true,"message":"Data mahasiswa berhasil diperbarui","data":{"nim":"239023109087","nama":"El Putra Baru","prodi":"Sistem Informasi","angkatan":2023}}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_05\Tugas-3>curl -X DELETE http://localhost:3008/mahasiswa/F1D022003 -i
HTTP/1.1 204 No Content
Date: Wed, 07 Oct 2026 17:31:14 GMT
Connection: keep-alive
Keep-Alive: timeout=5


C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_05\Tugas-3>curl -X POST http://localhost:3008/mahasiswa -H "Content-Type: application/json" -d "{\"nim\":\"F1D022004\"}"
{"success":false,"message":"Validasi gagal","details":["Nama wajib diisi","Prodi wajib diisi","Angkatan wajib diisi"]}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_05\Tugas-3>