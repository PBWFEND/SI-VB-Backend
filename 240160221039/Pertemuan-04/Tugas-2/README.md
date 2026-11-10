Tugas 2 - REST API Buku (Express.js)
Ini adalah project Tugas 2 mata kuliah PBWBACKEND. Project ini merupakan lanjutan dari Tugas 1, di mana kali ini resource yang sudah dibuat diimplementasikan menjadi REST API menggunakan Express.js.

Aplikasi ini menyediakan endpoint untuk mengelola data buku, mulai dari melihat daftar buku, melihat detail, sampai menambah buku baru.

Nama : Resty Dewina Fitri NPM : 240160221039 Kelas : SI - VB

Fitur
CRUD sederhana untuk resource Buku (Create, Read, Update, Delete)
Middleware JSON parser dan logger
Route parameter (/books/:id) dan query parameter (/books?author=...)
Response JSON dengan status code yang sesuai
Handler untuk 404 dan error middleware
Struktur Folder
Tugas-2/ ├── package.json ├── app.js ├── server.js ├── routes/ │ └── books.js └── README.md

1. GET http://localhost:3000/books hasil: 
RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-04\Tugas-2
# curl http://localhost:3000/books
{"status":"success","data":[{"id":1,"title":"Bumi Manusia","author":"Pramoedya Ananta Toer"},{"id":2,"title":"Laskar Pelangi","author":"Andrea Hirata"},{"id":3,"title":"Filosofi Teras","author":"Henry Manampiring"}]}

2.GET http://localhost:3000/books?author=Andrea hasil:
RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-04\Tugas-2
# curl "http://localhost:3000/books?author=Andrea"
{"status":"success","data":[{"id":2,"title":"Laskar Pelangi","author":"Andrea Hirata"}]}

3.GET http://localhost:3000/books/1 hasil:
RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-04\Tugas-2
# curl http://localhost:3000/books/1
{"status":"success","data":{"id":1,"title":"Bumi Manusia","author":"Pramoedya Ananta Toer"}}

4. GET http://localhost:3000/books/99 hasil:
RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-04\Tugas-2
# curl http://localhost:3000/books/99
{"status":"error","message":"Buku tidak ditemukan"}

5. GET http://localhost:3000/books -H "Content-Type: application/json" -d "{"title":"Clean Code","author":"Robert C. Martin","year":2008}" hasil:
RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-04\Tugas-2
# curl -X POST http://localhost:3000/books -H "Content-Type: application/json" -d "{\"title\":\"Clean Code\",\"author\":\"Robert C. Martin\",\"year\":2008}"
{"status":"success","message":"Buku berhasil ditambahkan","data":{"id":4,"title":"Clean Code","author":"Robert C. Martin"}}