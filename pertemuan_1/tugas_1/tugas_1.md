# TUGAS 1 - ANALISIS & DESAIN API

# SISTEM INFORMASI PERPUSTAKAAN
Nama    : Kikan Khairani
NPM     : 240160221019
Kelas   : SI-5B

# 1. Deskripsi Sistem
Sistem Informasi Perpustakaan Kampus adalah aplikasi berbasis web yang digunakan oleh mahasiswa, dosen, dan staf pustakawan untuk mengelola serta mengakses koleksi buku secara digital. Pengguna umum (mahasiswa/dosen) dapat mencari buku, melihat ketersediaan, meminjam, dan mengembalikan buku, sedangkan pustakawan dapat menambah, mengubah, atau menghapus data buku serta memantau status peminjaman. Fitur utamanya meliputi manajemen katalog buku (CRUD), pencarian buku berdasarkan judul/penulis, peminjaman dan pengembalian, serta pelacakan status stok dan riwayat peminjaman. Sistem dibangun dengan arsitektur client-server di mana front-end mengirim HTTP Request ke back-end, back-end memproses logika dan berinteraksi dengan database, lalu mengembalikan HTTP Response ke client.

# 3. Resource & Endpoint

Resource 1: books (Buku)
    1. Ambil semua buku
    Operasi : Ambil semua buku
    Method : GET
    Endpoint : /books
    Request Body : -
    Response Body : [{id, judul, penulis, stok}]
    Status Code : 200 (sukses) / 500 (gagal)

    2. Ambil buku by ID
    Operasi : Ambil buku berdasarkan ID
    Method : GET
    Endpoint : /books/{id}
    Request Body : -
    Response Body : {id, judul, penulis, stok}
    Status Code : 200 (sukses) / 404, 500 (gagal)

    3. Tambah buku
    Operasi : Tambah buku baru
    Method : POST
    Endpoint : /books
    Request Body : {judul, penulis, stok}
    Response Body : {id, judul, penulis, stok}
    Status Code : 201 (sukses) / 400, 500 (gagal)

    4. Update buku
    Operasi : Update data buku
    Method : PUT
    Endpoint : /books/{id}
    Request Body : {judul, penulis, stok}
    Response Body : {id, judul, penulis, stok}
    Status Code : 200 (sukses) / 400, 404, 500 (gagal)

    5. Hapus buku
    Operasi : Hapus buku
    Method : DELETE
    Endpoint : /books/{id}
    Request Body : -
    Response Body : {message}
    Status Code : 200 (sukses) / 404, 500 (gagal)

 Resource 2: loans (Peminjaman)
    6. Ambil semua peminjaman
    Operasi : Ambil semua data peminjaman
    Method : GET
    Endpoint : /loans
    Request Body : -
    Response Body : [{id, book_id, user_id, tgl_pinjam, status}]
    Status Code : 200 (sukses) / 500 (gagal)

    7. Buat peminjaman
    Operasi : Buat peminjaman baru
    Method : POST
    Endpoint : /loans
    Request Body : {book_id, user_id, tgl_pinjam}
    Response Body : {id, book_id, user_id, status}
    Status Code : 201 (sukses) / 400, 404, 500 (gagal)

    8. Update status peminjaman
    Operasi : Update status peminjaman
    Method : PUT
    Endpoint : /loans/{id}
    Request Body : {status}
    Response Body : {id, status}
    Status Code : 200 (sukses) / 400, 404, 500 (gagal)

    9. Hapus peminjaman
    Operasi : Hapus data peminjaman
    Method : DELETE
    Endpoint : /loans/{id}
    Request Body : -
    Response Body : {message}
    Status Code : 200 (sukses) / 404, 500 (gagal)

# 4. Contoh JSON
Resource books
Request Body (POST /books):

json
{
  "judul": "Pemrograman Web Modern",
  "penulis": "Budi Santoso",
  "stok": 5
}
Response Body (201 Created):

json
{
  "id": 101,
  "judul": "Pemrograman Web Modern",
  "penulis": "Budi Santoso",
  "stok": 5
}
Resource loans
Request Body (POST /loans):

json
{
  "book_id": 101,
  "user_id": 2024001,
  "tgl_pinjam": "2025-01-15"
}
Response Body (201 Created):

json
{
  "id": 501,
  "book_id": 101,
  "user_id": 2024001,
  "tgl_pinjam": "2025-01-15",
  "status": "dipinjam"
}

# 5. Skenario Uji
Skenario 1 - Sukses: Menambah Buku Baru
Request:

http
POST /v1/books HTTP/1.1
Host: api.perpustakaan.ac.id
Content-Type: application/json

{
  "judul": "Basis Data Lanjut",
  "penulis": "Siti Aminah",
  "stok": 3
}
Response:

http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": 102,
  "judul": "Basis Data Lanjut",
  "penulis": "Siti Aminah",
  "stok": 3
}
Penjelasan: Buku berhasil ditambahkan, server mengembalikan 201 Created beserta data buku dengan ID baru.

Skenario 2 - Sukses: Membuat Peminjaman
Request:

http
POST /v1/loans HTTP/1.1
Host: api.perpustakaan.ac.id
Content-Type: application/json

{
  "book_id": 102,
  "user_id": 2024002,
  "tgl_pinjam": "2025-01-16"
}
Response:

http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "id": 502,
  "book_id": 102,
  "user_id": 2024002,
  "tgl_pinjam": "2025-01-16",
  "status": "dipinjam"
}
Penjelasan: Peminjaman tercatat, stok buku berkurang 1, status awal dipinjam.

Skenario 3 - Gagal: Buku Tidak Ditemukan (404)
Request:

http
GET /v1/books/9999 HTTP/1.1
Host: api.perpustakaan.ac.id
Response:

http
HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "error": "Not Found",
  "message": "Buku dengan id 9999 tidak ditemukan",
  "status": 404
}