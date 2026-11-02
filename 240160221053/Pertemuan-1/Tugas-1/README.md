# Tugas 1 - Analisis & Design API
# SISTEM INFORMASI PERPUSTAKAAN

Nama : Athiyya Salsabila Hermawan
npm : 240160221053
Kelas : SI-VB

# Deskripsi Sistem
Sistem Informasi Perpustakaan adalah sebuah platform berbasis web yang dirancang untuk memudahkan pengelolaan sirkulasi buku dan inventaris. Pengguna utama dari sistem ini adalah Pustakawan (Admin) yang bertugas mengelola data buku dan memantau peminjaman, serta Anggota (Siswa/Mahasiswa) yang dapat mencari katalog buku dan melakukan peminjaman secara mandiri. Fitur utama dari sistem ini meliputi manajemen data buku (CRUD), manajemen data anggota, pencatatan transaksi peminjaman dan pengembalian buku, serta perhitungan denda otomatis jika terjadi keterlambatan pengembalian.

# Contoh JSON
Resource 1: Books (Buku)

Request Body (POST /api/books):

json
{
  "title": "Bumi Manusia",
  "author": "Pramoedya Ananta Toer",
  "isbn": "978-979-97312-3-3",
  "stock": 5
}
Response Body (GET /api/books/1):

json
{
  "status": "success",
  "data": {
    "id": 1,
    "title": "Bumi Manusia",
    "author": "Pramoedya Ananta Toer",
    "isbn": "978-979-97312-3-3",
    "stock": 4,
    "created_at": "2023-10-25T08:00:00Z"
  }
}
Resource 2: Loans (Peminjaman)

Request Body (POST /api/loans):

json
{
  "book_id": 1,
  "member_id": 105,
  "loan_date": "2023-10-26"
}
Response Body (POST /api/loans):

json
{
  "status": "success",
  "message": "Peminjaman berhasil dicatat",
  "data": {
    "loan_id": 88,
    "book_id": 1,
    "member_id": 105,
    "loan_date": "2023-10-26",
    "due_date": "2023-11-02",
    "status": "borrowed"
  }
}
# Skenario Uji (Test Scenarios)
Skenario 1: Sukses Peminjaman Buku (Happy Path)

Request: POST /api/loans dengan body {"book_id": 1, "member_id": 105, "loan_date": "2023-10-26"}.

Kondisi: Buku dengan ID 1 tersedia (stok > 0), dan Member ID 105 terdaftar aktif.

Response: Status 201 Created. Body berisi detail ID peminjaman baru dan tanggal jatuh tempo.

Skenario 2: Gagal Menambahkan Buku (Validasi Gagal)

Request: POST /api/books dengan body {"title": "", "author": "Penulis A", "isbn": "12345", "stock": 2} (title kosong).

Kondisi: Sistem memvalidasi bahwa title tidak boleh kosong.

Response: Status 400 Bad Request. Body berisi pesan error: {"error": "Validation failed", "message": "Title is required"}.

Skenario 3: Gagal Mencari Buku (Data Tidak Ditemukan)

Request: GET /api/books/999

Kondisi: Tidak ada buku dengan ID 999 di dalam database.

Response: Status 404 Not Found. Body berisi pesan error: {"error": "Not Found", "message": "Book with ID 999 does not exist"}.