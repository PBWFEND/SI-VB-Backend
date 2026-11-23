# Tugas 2 - REST API Buku (Express.js)

Ini adalah project Tugas 2 mata kuliah Pemrograman Berbasis Web Back-end. Project ini merupakan lanjutan dari Tugas 1, di mana resource yang sudah dibuat diimplementasikan menjadi REST API menggunakan Express.js.

Aplikasi ini menyediakan endpoint untuk mengelola data buku, mulai dari melihat daftar buku, mencari buku berdasarkan nama penulis, melihat detail buku, sampai menambahkan buku baru.

**Nama:** Kikan Khairani  
**NPM:** 240160221019  
**Kelas:** [Isi Kelas]

## Fitur

- Menampilkan seluruh data buku.
- Mencari buku berdasarkan nama penulis menggunakan query parameter.
- Menampilkan detail buku berdasarkan ID menggunakan route parameter.
- Menambahkan data buku baru.
- Middleware JSON parser dan logger.
- Response JSON untuk setiap request.
- Penanganan buku yang tidak ditemukan dan error pada server.

## Struktur Folder

```text
tugas_2/
├── node_modules/
├── routes/
│   └── books.js
├── app.js
├── server.js
├── package.json
├── package-lock.json
└── README.md
```

## Cara Menjalankan

1. Masuk ke folder project:

```bash
cd 240160221019/pertemuan_4/tugas_2
```

2. Install dependencies:

```bash
npm install
```

3. Jalankan server:

```bash
node server.js
```

Server berjalan pada:

```text
http://localhost:3000
```

## Daftar Endpoint

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/books` | Menampilkan semua daftar buku |
| GET | `/books?author=Andrea` | Mencari buku berdasarkan nama penulis |
| GET | `/books/:id` | Menampilkan detail buku berdasarkan ID |
| POST | `/books` | Menambahkan buku baru |

## Contoh Request dan Hasil

**1. GET http://localhost:3000/books**

Menampilkan seluruh daftar buku.

```powershell
curl.exe http://localhost:3000/books
```

Hasil:

```json
{"status":"success","data":[{"id":1,"title":"Bumi Manusia","author":"Pramoedya Ananta Toer"},{"id":2,"title":"Laskar Pelangi","author":"Andrea Hirata"},{"id":3,"title":"Filosofi Teras","author":"Henry Manampiring"}]}
```

**2. GET http://localhost:3000/books?author=Andrea**

Mencari buku berdasarkan nama penulis menggunakan query parameter.

```powershell
curl.exe "http://localhost:3000/books?author=Andrea"
```

Hasil:

```json
{"status":"success","data":[{"id":2,"title":"Laskar Pelangi","author":"Andrea Hirata"}]}
```

**3. GET http://localhost:3000/books/1**

Menampilkan detail buku berdasarkan ID.

```powershell
curl.exe http://localhost:3000/books/1
```

Hasil:

```json
{"status":"success","data":{"id":1,"title":"Bumi Manusia","author":"Pramoedya Ananta Toer"}}
```

**4. GET http://localhost:3000/books/99**

Menguji pencarian buku dengan ID yang tidak tersedia.

```powershell
curl.exe http://localhost:3000/books/99
```

Hasil:

```json
{"status":"error","message":"Buku tidak ditemukan"}
```

**5. POST http://localhost:3000/books**

Menambahkan data buku baru dengan mengirimkan data JSON.

Membuat file `data.json` terlebih dahulu:

```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "year": 2008
}
```

Perintah untuk mengirimkan data:

```powershell
curl.exe -X POST http://localhost:3000/books -H "Content-Type: application/json" -d "@data.json"
```

Hasil:

```json
{"status":"success","message":"Buku berhasil ditambahkan","data":{"id":4,"title":"Clean Code","author":"Robert C. Martin"}}
```

## Hasil Pengujian

Pengujian dilakukan menggunakan PowerShell dengan menjalankan server menggunakan perintah `node server.js` dan mengirimkan request menggunakan `curl.exe`.

Lokasi project:

```text
C:\Users\Hp\Desktop\240160221019-Kikan-Khairani\240160221019\pertemuan_4\tugas_2
```

Hasil pengujian endpoint:

| No. | Pengujian | Hasil |
|---|---|---|
| 1 | GET `/books` | Berhasil menampilkan 3 data buku |
| 2 | GET `/books?author=Andrea` | Berhasil menampilkan buku Laskar Pelangi |
| 3 | GET `/books/1` | Berhasil menampilkan detail Bumi Manusia |
| 4 | GET `/books/99` | Berhasil menampilkan pesan buku tidak ditemukan |
| 5 | POST `/books` | Berhasil menambahkan buku Clean Code dengan ID 4 |

Seluruh lima pengujian endpoint di atas berhasil setelah request POST dikirim menggunakan file `data.json`.

## Kesimpulan

Berdasarkan hasil praktikum, REST API Buku berhasil dibuat menggunakan Express.js. Aplikasi dapat menampilkan seluruh data buku, melakukan pencarian berdasarkan nama penulis, menampilkan detail buku berdasarkan ID, serta menambahkan data buku baru.

Pengujian juga menunjukkan bahwa aplikasi dapat memberikan response error ketika buku dengan ID yang diminta tidak ditemukan. Dengan demikian, implementasi routing, route parameter, query parameter, middleware, dan response JSON pada project ini telah berjalan sesuai dengan hasil pengujian.