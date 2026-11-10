# Sistem Informasi Perpustakaan - REST API

Nama    : Athiyya Salsabila Hermawan
NPM     : 240160221053
Kelas   : SI-VB

API sederhana untuk mengelola data buku perpustakaan menggunakan Express.js.

## Cara Menjalankan
1. Clone/Download repository ini.
2. Buka terminal di folder project.
3. Jalankan `npm install` untuk menginstal dependency.
4. Jalankan `npm start` atau `node server.js`.
5. Server akan berjalan di `http://localhost:3000`.

## Daftar Endpoint

| Method | Endpoint | Deskripsi | Query/Param |
|---|---|---|---|
| GET | `/api/books` | Mendapatkan semua buku | `?author=nama` (opsional) |
| GET | `/api/books/:id` | Mendapatkan detail satu buku | `id` (wajib) |
| POST | `/api/books` | Menambahkan buku baru | - |
| DELETE | `/api/books/:id` | Menghapus buku | `id` (wajib) |

## Hasil Pengujian

PS D:\240160221053\Pertemuan-4\tugas> node server.js
Server Perpustakaan berjalan di http://localhost:30001
[2026-10-30T09:36:16.838Z] GET /api/books
[2026-10-30T09:37:05.550Z] GET /api/books/1
[2026-10-30T09:46:33.155Z] POST /api/books
[2026-10-30T09:48:27.477Z] DELETE /api/books/1

PS D:\240160221053> cd Pertemuan-4/tugas
PS D:\240160221053\Pertemuan-4\tugas> curl.exe http://localhost:30001/api/books
{"status":"success","data":[{"id":1,"title":"Bumi Manusia","author":"Pramoedya Ananta Toer","stock":5},{"id":2,"title":"Laskar Pelangi","author":"Andrea Hirata","stock":3}]}
PS D:\240160221053\Pertemuan-4\tugas> curl.exe http://localhost:30001/api/books/1
{"status":"success","data":{"id":1,"title":"Bumi Manusia","author":"Pramoedya Ananta Toer","stock":5}}
PS D:\240160221053\Pertemuan-4\tugas> $body = @{
>>   title  = "Filosofi Teras"
>>   author = "Henry Manampiring"
>>   stock  = 10
>> } | ConvertTo-Json
>> 
>> Invoke-RestMethod -Uri "http://localhost:30001/api/books" -Method POST -ContentType "application/json" -Body $body

status  data                                                             
------  ----                                                             
success @{id=3; title=Filosofi Teras; author=Henry Manampiring; stock=10}


PS D:\240160221053\Pertemuan-4\tugas> curl.exe -X DELETE http://localhost:30001/api/books/1