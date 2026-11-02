\# UTS Mini Project Backend — Sistem Perpustakaan



\*\*Nama:\*\* Siti Khodijah  

\*\*NIM:\*\* 240160221045  

\*\*Mata Kuliah:\*\* Praktikum Backend



\## Deskripsi

Aplikasi REST API sederhana untuk mengelola data buku pada sistem perpustakaan. Aplikasi dibuat menggunakan Node.js, Express 5, TypeScript, Prisma ORM 7, dan SQLite.



\## Teknologi

\- Node.js 20+

\- Express 5

\- TypeScript

\- Prisma ORM 7

\- SQLite



\## Struktur Proyek

```text

Pertemuan\_8/

├── bukti-UTS/

├── prisma/

│   ├── migrations/

│   └── schema.prisma

├── src/

│   ├── controller/

│   │   └── buku.controller.ts

│   ├── routes/

│   │   └── buku.routes.ts

│   └── service/

│       └── buku.service.ts

├── .env.example

├── .gitignore

├── app.ts

├── client.ts

├── package.json

├── prisma.config.ts

├── README.md

├── server.ts

└── tsconfig.json

```



\## Instalasi dan Menjalankan Proyek



1\. Install dependencies:



&#x20;  ```bash

&#x20;  npm install

&#x20;  ```



2\. Buat file `.env` berdasarkan `.env.example`.



3\. Jalankan migrasi database:



&#x20;  ```bash

&#x20;  npx prisma migrate dev

&#x20;  ```



4\. Generate Prisma Client:



&#x20;  ```bash

&#x20;  npx prisma generate

&#x20;  ```



5\. Jalankan server dalam mode development:



&#x20;  ```bash

&#x20;  npm run dev

&#x20;  ```



Server akan menampilkan alamat localhost dan port yang digunakan pada terminal.



\## Endpoint API



| Method | Endpoint | Keterangan |

|---|---|---|

| GET | `/health` | Memeriksa kondisi API |

| GET | `/api/buku` | Mengambil semua buku |

| GET | `/api/buku/:id` | Mengambil detail buku |

| POST | `/api/buku` | Menambahkan buku |

| PATCH | `/api/buku/:id` | Mengubah data buku |

| DELETE | `/api/buku/:id` | Menghapus buku |



\## Contoh Request



\### Menambahkan Buku



```bash

curl -X POST http://localhost:PORT/api/buku \\

\-H "Content-Type: application/json" \\

\-d "{\\"judul\\":\\"Laskar Pelangi\\",\\"penulis\\":\\"Andrea Hirata\\",\\"tahun\\":2005,\\"stok\\":10}"

```



Ganti `PORT` dengan port yang ditampilkan saat server berjalan.



\### Mengubah Stok Buku



```bash

curl -X PATCH http://localhost:PORT/api/buku/2 \\

\-H "Content-Type: application/json" \\

\-d "{\\"stok\\":15}"

```



\### Menghapus Buku



```bash

curl -X DELETE http://localhost:PORT/api/buku/2

```



\## Arsitektur Aplikasi



Aplikasi menggunakan pemisahan tanggung jawab:



\- \*\*Routes:\*\* Mengatur endpoint API.

\- \*\*Controller:\*\* Menangani request, validasi input, dan response.

\- \*\*Service:\*\* Menangani proses pengolahan data melalui Prisma.

\- \*\*Client:\*\* Mengatur koneksi Prisma ke database SQLite.



\## Validasi dan Error Handling



Aplikasi menerapkan validasi data ketika menambahkan dan mengubah buku.



Kode status HTTP yang digunakan:

\- `200 OK`: Request berhasil.

\- `201 Created`: Data berhasil ditambahkan.

\- `204 No Content`: Data berhasil dihapus.

\- `400 Bad Request`: Data tidak valid.

\- `404 Not Found`: Data atau endpoint tidak ditemukan.

\- `500 Internal Server Error`: Terjadi kesalahan pada server.



\## Database



Aplikasi menggunakan SQLite sebagai database dan Prisma ORM untuk operasi CRUD. Data disimpan secara persisten sehingga tidak hilang ketika server dihentikan atau dijalankan kembali.



\## Bukti Pengujian



Screenshot pengujian API tersedia pada folder `bukti-UTS`, meliputi:

1\. Server berjalan.

2\. Health check.

3\. GET semua buku.

4\. POST tambah buku.

5\. GET detail buku.

6\. PATCH update buku.

7\. DELETE buku.

8\. Validasi 400 Bad Request.

9\. Not Found 404.



\---

\*\*Dibuat oleh Siti Khodijah — 240160221045\*\*

