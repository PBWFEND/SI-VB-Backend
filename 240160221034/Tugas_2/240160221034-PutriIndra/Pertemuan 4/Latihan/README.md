# Latihan Pertemuan 4 — Express.js

## Tujuan

Menerapkan routing dan middleware menggunakan Express.js, termasuk route parameter, query parameter, serta penanganan respons HTTP.

## Cara Menjalankan Program

1. Buka terminal pada folder `Latihan`.

2. Install Express.js dengan perintah:

   ```bash
   npm install express
   ```

3. Jalankan program dengan perintah:

   `node latihan.js`
   

4. Jika berhasil, server akan berjalan di alamat:

   `http://localhost:3005`

## Daftar Endpoint

| Method | Endpoint               | Keterangan                                      |
| ------ | ---------------------- | ----------------------------------------------- |
| GET    | `/buku`                | Menampilkan semua data buku                     |
| GET    | `/buku?tersedia=true`  | Menampilkan buku yang tersedia                  |
| GET    | `/buku?tersedia=false` | Menampilkan buku yang tidak tersedia            |
| GET    | `/buku/:id`            | Menampilkan detail buku berdasarkan ID          |
| POST   | `/buku`                | Menambahkan data buku baru                      |
| GET    | `/peminjaman`          | Menguji penanganan endpoint yang tidak tersedia |

## Hasil Pengujian

1. **GET `/buku`**

   Berhasil menampilkan seluruh data buku dengan jumlah 2 buku.

2. **GET `/buku?tersedia=true`**

   Berhasil menampilkan buku yang tersedia, yaitu *Belajar Node.js*.

3. **GET `/buku?tersedia=false`**

   Berhasil menampilkan buku yang tidak tersedia, yaitu *Dasar Express.js*.

4. **GET `/buku/1`**

   Berhasil menampilkan detail buku dengan ID 1, yaitu *Belajar Node.js*.

5. **GET `/buku/99`**

   Berhasil mengembalikan status HTTP 404 dengan pesan "Buku tidak ditemukan" karena buku dengan ID tersebut tidak ada.

6. **GET `/peminjaman`**

   Berhasil mengembalikan status HTTP 404 dengan pesan "Endpoint tidak ditemukan" karena endpoint tersebut tidak tersedia.

7. **POST `/buku`**

   Berhasil menambahkan buku baru dengan data berikut:

   * ID: 3
   * Judul: Laskar Pelangi
   * Penulis: Andrea Hirata
   * Tersedia: true

   Server memberikan pesan "Buku berhasil ditambahkan".

## Middleware

Program menggunakan beberapa middleware, yaitu:

1. express.json() untuk membaca data JSON yang dikirim melalui request.
2. Middleware logger untuk mencatat waktu, method HTTP, dan URL setiap request yang masuk.
3. Handler 404 untuk menangani request ke endpoint yang tidak tersedia.

## Kesimpulan

Latihan Pertemuan 4 berhasil dijalankan dan diuji. Program menerapkan routing Express.js, route parameter, query parameter, middleware logger, validasi input, penambahan data buku melalui method POST, serta penanganan endpoint yang tidak ditemukan.