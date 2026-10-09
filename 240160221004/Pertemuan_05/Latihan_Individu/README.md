# Latihan Individu — Pertemuan 5

Nama    : Aprilliana Fratiwi
NPM     : 240160221004
Kelas   : SI - VB

---

## 📖 Deskripsi

Latihan ini mengimplementasikan:

1. Middleware logger yang mencatat **method** dan **URL**
2. Endpoint `GET /mahasiswa/:nim` dengan status **404** jika NIM tidak ditemukan
3. Filter `GET /mahasiswa?prodi=Sistem%20Informasi`
4. Endpoint `POST /mahasiswa` dengan validasi `nim`, `nama`, `prodi`, dan `angkatan`
5. Endpoint `PATCH /mahasiswa/:nim` untuk mengubah sebagian data
6. Pengujian response **200, 201, 400, dan 404**

| No | Method | Endpoint | Query Params | Body (JSON) | Status Sukses | Status Error |
|:--:|:------:|:---------|:-------------|:------------|:-------------:|:------------:|
| 1 | **GET** | `/mahasiswa` | `?prodi=`, `?angkatan=` | — | `200 OK` | — |
| 2 | **GET** | `/mahasiswa/:nim` | — | — | `200 OK` | `404 Not Found` |
| 3 | **POST** | `/mahasiswa` | — | `{ nim, nama, prodi, angkatan }` | `201 Created` | `400 Bad Request` |
| 4 | **PATCH** | `/mahasiswa/:nim` | — | `{ nama?, prodi?, angkatan? }` | `200 OK` | `404 Not Found` |

| Status | Keterangan | Digunakan Pada |
|:------:|:-----------|:---------------|
| `200 OK` | Request berhasil | GET, PATCH |
| `201 Created` | Resource berhasil dibuat | POST |
| `400 Bad Request` | Validasi gagal / NIM duplikat | POST |
| `404 Not Found` | Resource tidak ditemukan | GET detail, PATCH |
| `500 Internal Server Error` | Kesalahan server | Fallback |

---

## 🚀 Cara Menjalankan

### Prasyarat
- Node.js versi 18 atau lebih baru

### Langkah-langkah

`CMD
cd code/pertemuan-05/latihan-individu

# 2. Install dependencies
npm install

# 3. Jalankan server
node latihan.js

### BUKTI PENGERJAAN

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_05\Latihan_Individu>node latihan.js
Latihan REST API berjalan di http://localhost:3007
[2026-10-07T16:53:29.237Z] GET /mahasiswa
[2026-10-07T16:53:43.887Z] GET /mahasiswa?prodi=Sistem%20Informasi
[2026-10-07T16:53:55.898Z] GET /mahasiswa?angkatan=2024
[2026-10-07T16:54:31.240Z] GET /mahasiswa/240160221004
[2026-10-07T16:54:43.427Z] GET /mahasiswa/F1D022999
[2026-10-07T16:55:01.779Z] POST /mahasiswa
TypeError: Cannot destructure property 'nim' of 'request.body' as it is undefined.
    at file:///C:/Users/user/Desktop/240160221004_Aprilliana/240160221004/Pertemuan_05/Latihan_Individu/latihan.js:79:11
    at Layer.handleRequest (C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_05\Latihan_Individu\node_modules\router\lib\layer.js:152:17)
    at next (C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_05\Latihan_Individu\node_modules\router\lib\route.js:157:13)
    at Route.dispatch (C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_05\Latihan_Individu\node_modules\router\lib\route.js:117:3)
    at handle (C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_05\Latihan_Individu\node_modules\router\index.js:435:11)
    at Layer.handleRequest (C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_05\Latihan_Individu\node_modules\router\lib\layer.js:152:17)
    at C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_05\Latihan_Individu\node_modules\router\index.js:295:15
    at processParams (C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_05\Latihan_Individu\node_modules\router\index.js:582:12)
    at next (C:\Users\user\Des

### CMD TERMINAL BARU

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_05\Latihan_Individu>curl http://localhost:3007/mahasiswa
{"success":true,"message":"Data mahasiswa berhasil diambil","data":[{"nim":"240160221004","nama":"Aprilliana Fratiwi","prodi":"Sistem Informasi","angkatan":2024},{"nim":"230789192007","nama":"William Jakrapatr","prodi":"Sistem Informasi","angkatan":2023}]}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_05\Latihan_Individu>curl "http://localhost:3007/mahasiswa?prodi=Sistem%20Informasi"
{"success":true,"message":"Data mahasiswa berhasil diambil","data":[{"nim":"240160221004","nama":"Aprilliana Fratiwi","prodi":"Sistem Informasi","angkatan":2024},{"nim":"230789192007","nama":"William Jakrapatr","prodi":"Sistem Informasi","angkatan":2023}]}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_05\Latihan_Individu>curl "http://localhost:3007/mahasiswa?angkatan=2024"
{"success":true,"message":"Data mahasiswa berhasil diambil","data":[{"nim":"240160221004","nama":"Aprilliana Fratiwi","prodi":"Sistem Informasi","angkatan":2024}]}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_05\Latihan_Individu>curl http://localhost:3007/mahasiswa/240160221004
{"success":true,"message":"Detail mahasiswa berhasil diambil","data":{"nim":"240160221004","nama":"Aprilliana Fratiwi","prodi":"Sistem Informasi","angkatan":2024}}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_05\Latihan_Individu>curl http://localhost:3007/mahasiswa/F1D022999
{"success":false,"message":"Mahasiswa tidak ditemukan"}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_05\Latihan_Individu>curl -X POST http://localhost:3007/mahasiswa \
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Error</title>
</head>
<body>
<pre>TypeError: Cannot destructure property &#39;nim&#39; of &#39;request.body&#39; as it is undefined.<br> &nbsp; &nbsp;at file:///C:/Users/user/Desktop/240160221004_Aprilliana/240160221004/Pertemuan_05/Latihan_Individu/latihan.js:79:11<br> &nbsp; &nbsp;at Layer.handleRequest (C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_05\Latihan_Individu\node_modules\router\lib\layer.js:152:17)<br> &nbsp; &nbsp;at next (C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_05\Latihan_Individu\node_modules\router\lib\route.js:157:13)<br> &nbsp; &nbsp;at Route.dispatch (C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_05\Latihan_Individu\node_modules\router\lib\route.js:117:3)<br> &nbsp; &nbsp;at handle (C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_05\Latihan_Individu\node_modules\router\index.js:435:11)<br> &nbsp; &nbsp;at Layer.handleRequest (C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_05\Latihan_Individu\node_modules\router\lib\layer.js:152:17)<br> &nbsp; &nbsp;at C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_05\Latihan_Individu\node_modules\router\index.js:295:15<br> &nbsp; &nbsp;at processParams (C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_05\Latihan_Individu\node_modules\router\index.js:582:12)<br> &nbsp; &nbsp;at next (C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_05\Latihan_Individu\node_modules\router\index.js:291:5)<br> &nbsp; &nbsp;at file:///C:/Users/user/Desktop/240160221004_Aprilliana/240160221004/Pertemuan_05/Latihan_Individu/latihan.js:43:3</pre>
</body>
</html>
curl: (6) Could not resolve host: \

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_05\Latihan_Individu>  -H "Content-Type: application/json" \
'-H' is not recognized as an internal or external command,
operable program or batch file.

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_05\Latihan_Individu>  -d '{"nim":"F1D022003","nama":"Budi Santoso","prodi":"Teknik Informatika","angkatan":2024}'
'-d' is not recognized as an internal or external command,
operable program or batch file.

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_05\Latihan_Individu>curl -X POST http://localhost:3007/mahasiswa -H "Content-Type: application/json" -d "{\"nim\":\"F1D022003\",\"nama\":\"Budi Santoso\",\"prodi\":\"Teknik Informatika\",\"angkatan\":2024}"
{"success":true,"message":"Mahasiswa berhasil ditambahkan","data":{"nim":"F1D022003","nama":"Budi Santoso","prodi":"Teknik Informatika","angkatan":2024}}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_05\Latihan_Individu>curl -X PATCH http://localhost:3007/mahasiswa/F1D022001 -H "Content-Type: application/json" -d "{\"nama\":\"Jhon Doe Baru\"}"
{"success":false,"message":"Mahasiswa tidak ditemukan"}