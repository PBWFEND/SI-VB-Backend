# BookSpace – API Manajemen Buku

## Deskripsi Project

BookSpace adalah aplikasi backend berbasis REST API untuk mengelola data buku. Project ini dibuat sebagai Mini Project UTS mata kuliah Praktikum Backend.

Aplikasi ini menyediakan fitur CRUD (Create, Read, Update, Delete) untuk menambahkan, melihat, memperbarui, dan menghapus data buku.

## Teknologi yang Digunakan

* Node.js
* Express.js
* TypeScript
* Prisma ORM
* SQLite

## Struktur Project

```text
Pertemuan_8 (bookspace)/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── src/
│   ├── controller/
│   │   └── buku.controller.ts
│   ├── lib/
│   │   └── prisma.ts
│   ├── routes/
│   │   └── buku.routes.ts
│   ├── service/
│   │   └── buku.service.ts
│   └── index.ts
├── .env.example
├── .gitignore
├── prisma.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Cara Menjalankan Project

1. Clone repository atau buka folder project.
2. Install dependencies:

```bash
npm install
```

3. Siapkan file `.env` dengan konfigurasi database sesuai project:

```env
DATABASE_URL="file:./dev.db"
```

4. Jalankan migrasi database:

```bash
npx prisma migrate dev --name init
```

5. Generate Prisma Client:

```bash
npx prisma generate
```

6. Jalankan server:

```bash
npx tsx src/index.ts
```

Server berjalan di:

`http://localhost:3000`

## Daftar Endpoint API

| Method | Endpoint        | Fungsi                          |
| ------ | --------------- | ------------------------------- |
| GET    | `/api/buku`     | Menampilkan semua buku          |
| GET    | `/api/buku/:id` | Menampilkan buku berdasarkan ID |
| POST   | `/api/buku`     | Menambahkan buku                |
| PUT    | `/api/buku/:id` | Memperbarui data buku           |
| DELETE | `/api/buku/:id` | Menghapus buku                  |

## Contoh Pengujian Menggunakan curl.exe

Pengujian API dapat dilakukan melalui terminal PowerShell menggunakan perintah berikut.

**1. GET semua buku**

```powershell
curl.exe -i http://localhost:3000/api/buku
```

**2. POST tambah buku**

```powershell
$json = '{"judul":"Laskar Pelangi","penulis":"Andrea Hirata","penerbit":"Bentang Pustaka","tahun":2005,"stok":10}'
$json | curl.exe -i -X POST "http://localhost:3000/api/buku" -H "Content-Type: application/json" --data-binary "@-"
```

**3. GET buku berdasarkan ID**

```powershell
curl.exe -i http://localhost:3000/api/buku/1
```

**4. PUT update buku**

```powershell
$json = '{"judul":"Laskar Pelangi Revisi","stok":15}'
$json | curl.exe -i -X PUT "http://localhost:3000/api/buku/1" -H "Content-Type: application/json" --data-binary "@-"
```

**5. DELETE buku**

```powershell
curl.exe -i -X DELETE http://localhost:3000/api/buku/1
```

**6. POST data kosong (pengujian validasi)**

```powershell
$json = '{}'
$json | curl.exe -i -X POST "http://localhost:3000/api/buku" -H "Content-Type: application/json" --data-binary "@-"
```

**7. POST tahun negatif**

```powershell
$json = '{"judul":"Buku Tes","penulis":"Rahma","tahun":-2025,"stok":10}'
$json | curl.exe -i -X POST "http://localhost:3000/api/buku" -H "Content-Type: application/json" --data-binary "@-"
```

**8. POST tahun berupa teks**

```powershell
$json = '{"judul":"Buku Tes","penulis":"Rahma","tahun":"abc","stok":10}'
$json | curl.exe -i -X POST "http://localhost:3000/api/buku" -H "Content-Type: application/json" --data-binary "@-"
```

**9. POST stok negatif**

```powershell
$json = '{"judul":"Buku Tes","penulis":"Rahma","tahun":2025,"stok":-5}'
$json | curl.exe -i -X POST "http://localhost:3000/api/buku" -H "Content-Type: application/json" --data-binary "@-"
```

**10. POST stok berupa teks**

```powershell
$json = '{"judul":"Buku Tes","penulis":"Rahma","tahun":2025,"stok":"banyak"}'
$json | curl.exe -i -X POST "http://localhost:3000/api/buku" -H "Content-Type: application/json" --data-binary "@-"
```

**11. GET ID tidak valid**

```powershell
curl.exe -i http://localhost:3000/api/buku/abc
```

**12. GET buku yang tidak ditemukan**

```powershell
curl.exe -i http://localhost:3000/api/buku/999
```

**13. GET endpoint tidak tersedia (pengujian 404)**

```powershell
curl.exe -i http://localhost:3000/api/mahasiswa
```

**Catatan:** Pastikan server sudah berjalan sebelum menjalankan perintah pengujian. ID `1` digunakan sebagai contoh dan harus tersedia di database. Sesuaikan ID dengan data yang tersedia.

## Contoh Request POST

Endpoint:

`POST http://localhost:3000/api/buku`

Request Body:

```json
{
  "judul": "Laskar Pelangi",
  "penulis": "Andrea Hirata",
  "penerbit": "Bentang Pustaka",
  "tahun": 2005,
  "stok": 10
}
```

## Hasil Pengujian API

Pengujian dilakukan menggunakan `curl.exe` melalui terminal PowerShell.

| No. | Pengujian                   | Status Code     | Hasil            |
| --- | --------------------------- | --------------- | ---------------- |
| 1   | GET semua buku              | 200 OK          | Berhasil         |
| 2   | POST tambah buku            | 201 Created     | Berhasil         |
| 3   | GET buku berdasarkan ID     | 200 OK          | Berhasil         |
| 4   | PUT update buku             | 200 OK          | Berhasil         |
| 5   | DELETE buku                 | 200 OK          | Berhasil         |
| 6   | POST data kosong            | 400 Bad Request | Berhasil ditolak |
| 7   | POST tahun negatif          | 400 Bad Request | Berhasil ditolak |
| 8   | POST tahun berupa teks      | 400 Bad Request | Berhasil ditolak |
| 9   | POST stok negatif           | 400 Bad Request | Berhasil ditolak |
| 10  | POST stok berupa teks       | 400 Bad Request | Berhasil ditolak |
| 11  | GET ID tidak valid          | 400 Bad Request | Berhasil ditolak |
| 12  | GET data tidak ditemukan    | 404 Not Found   | Berhasil ditolak |
| 13  | GET endpoint tidak tersedia | 404 Not Found   | Berhasil ditolak |

## Pengujian Persistensi

Pengujian dilakukan dengan menambahkan data buku ke database, mematikan server, kemudian menjalankan server kembali. Setelah server aktif, data buku diperiksa menggunakan endpoint GET berdasarkan ID.

Hasil pengujian menunjukkan bahwa data tetap tersimpan setelah server di-restart.

## Validasi Input

API melakukan validasi pada field `judul` dan `penulis`. Jika kedua field tersebut kosong, API mengembalikan status `400 Bad Request` dengan pesan:

```json
{
  "message": "Judul dan penulis wajib diisi"
}
```

Selain itu, API juga melakukan validasi pada field `tahun` dan `stok`.

* Tahun harus berupa bilangan bulat yang valid, tidak kurang dari 1, dan tidak melebihi tahun saat ini.
* Stok harus berupa bilangan bulat dan tidak boleh negatif.

## Handler 404

API menyediakan handler 404 untuk menangani endpoint yang tidak ditemukan.

Jika pengguna mengakses endpoint yang tidak tersedia, API mengembalikan status `404 Not Found` dengan pesan:

```json
{
  "message": "Endpoint tidak ditemukan"
}
```

## Bukti Pengujian

Screenshot hasil pengujian disimpan dalam folder `bukti-testing/`.

## Penutup

BookSpace telah menyediakan fitur CRUD untuk pengelolaan data buku menggunakan Express, TypeScript, Prisma ORM, dan SQLite. Pengujian dilakukan untuk memastikan endpoint berjalan dengan baik, validasi input berfungsi, dan data tetap tersimpan setelah server di-restart.
