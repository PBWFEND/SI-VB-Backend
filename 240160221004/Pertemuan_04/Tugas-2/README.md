# Tugas 2 - REST API Buku (Express.js)

Ini adalah project Tugas 2 mata kuliah [Nama Mata Kuliah]. Project ini merupakan lanjutan dari Tugas 1, di mana kali ini resource yang sudah dibuat diimplementasikan menjadi REST API menggunakan Express.js.

Aplikasi ini menyediakan endpoint untuk mengelola data buku, mulai dari melihat daftar buku, melihat detail, sampai menambah buku baru.

Nama  : Aprilliana Fratiwi
NPM   : 240160221004
Kelas : SI - VB

## Fitur

- CRUD sederhana untuk resource Buku (Create, Read, Update, Delete)
- Middleware JSON parser dan logger
- Route parameter (`/books/:id`) dan query parameter (`/books?author=...`)
- Response JSON dengan status code yang sesuai
- Handler untuk 404 dan error middleware

## Struktur Folder
Tugas-2/
├── package.json
├── app.js
├── server.js
├── routes/
│ └── books.js
└── README.md

## ## Cara Menjalankan
npm install
node server.js

## Daftar Endpoint
Method	  Endpoint	  Keterangan
GET	      /books	    Ambil semua daftar buku
GET	      /books/:id	 Ambil detail buku berdasarkan ID
POST	    /books	     Tambah buku baru
PUT	      /books/:id	 Update data buku (bonus)
DELETE	  /books/:id	 Hapus buku (bonus)

## contoh request
1. GET http://localhost:3000/books
hasil: C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_04\Tugas-2>curl http://localhost:3000/books
{"status":"success","data":[{"id":1,"title":"Bumi Manusia","author":"Pramoedya Ananta Toer"},{"id":2,"title":"Laskar Pelangi","author":"Andrea Hirata"},{"id":3,"title":"Filosofi Teras","author":"Henry Manampiring"}]}

2. GET http://localhost:3000/books?author=Andrea
hasil: C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_04\Tugas-2>curl "http://localhost:3000/books?author=Andrea"
{"status":"success","data":[{"id":2,"title":"Laskar Pelangi","author":"Andrea Hirata"}]}

3. GET http://localhost:3000/books/1
hasil: C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_04\Tugas-2>curl http://localhost:3000/books/1
{"status":"success","data":{"id":1,"title":"Bumi Manusia","author":"Pramoedya Ananta Toer"}}

4. GET http://localhost:3000/books/99
hasil: C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_04\Tugas-2>curl http://localhost:3000/books/99
{"status":"error","message":"Buku tidak ditemukan"}

5. GET  http://localhost:3000/books -H "Content-Type: application/json" -d "{\"title\":\"Clean Code\",\"author\":\"Robert C. Martin\",\"year\":2008}"C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_04\Tugas-2>curl -X POST http://localhost:3000/books -H "Content-Type: application/json" -d "{\"title\":\"Clean Code\",\"author\":\"Robert C. Martin\",\"year\":2008}"
{"status":"success","message":"Buku berhasil ditambahkan","data":{"id":4,"title":"Clean Code","author":"Robert C. Martin"}}

## Hasil Pengujian
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_04\Tugas-2>node server.js
Server berjalan di http://localhost:3000
[2026-10-09T10:32:51.759Z] GET /books
[2026-10-09T10:33:21.882Z] GET /books/1
[2026-10-09T10:33:37.138Z] GET /books?author=Andrea
[2026-10-09T10:33:52.860Z] POST /books
[2026-10-09T10:34:13.262Z] GET /books/99

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_04\Tugas-2>curl http://localhost:3000/books
{"status":"success","data":[{"id":1,"title":"Bumi Manusia","author":"Pramoedya Ananta Toer"},{"id":2,"title":"Laskar Pelangi","author":"Andrea Hirata"},{"id":3,"title":"Filosofi Teras","author":"Henry Manampiring"}]}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_04\Tugas-2>curl http://localhost:3000/books/1
{"status":"success","data":{"id":1,"title":"Bumi Manusia","author":"Pramoedya Ananta Toer"}}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_04\Tugas-2>curl "http://localhost:3000/books?author=Andrea"
{"status":"success","data":[{"id":2,"title":"Laskar Pelangi","author":"Andrea Hirata"}]}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_04\Tugas-2>curl -X POST http://localhost:3000/books -H "Content-Type: application/json" -d "{\"title\":\"Clean Code\",\"author\":\"Robert C. Martin\",\"year\":2008}"
{"status":"success","message":"Buku berhasil ditambahkan","data":{"id":4,"title":"Clean Code","author":"Robert C. Martin"}}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_04\Tugas-2>curl http://localhost:3000/books/99
{"status":"error","message":"Buku tidak ditemukan"}