# LATIHAN INDIVIDU PERTEMUAN 1 — API MAHASISWA

Nama : Aprilliana Fratiwi
NIM : 240160221004
Kelas : SI-VB

## 1. Menjalankan dan Mengamati Server

File `latihan.js` berada pada folder:

```text
Desktop
└── Prak-Backend
    └── Pertemuan_01
        └── latihan.js

Server dijalankan menggunakan Command Prompt (CMD).

Pertama masuk ke folder Pertemuan 1 menggunakan perintah:
cd Desktop "user\Desktop\Prak-Backend\Pertemuan_01"

Kemudian server dijalankan dengan perintah:

node latihan.js

Hasil:

Latihan berjalan di 'http://localhost:3001'
Kerjakan semua TODO 1-4, lalu uji setiap endpoint.

Server berjalan pada http://localhost:3001.

Pengujian Endpoint GET /about

## 2. Endpoint GET /about digunakan untuk menampilkan informasi API dan nama pembuat API.

Request

Perintah yang digunakan pada CMD:

curl http://localhost:3001/about
Response
{
  "success": true,
  "message": "API Pertemuan 1",
  "author": "Aprilliana Fratiwi"
}

Method: GET

Endpoint: /about

Status Code: 200 OK

Kesimpulan:
Endpoint GET /about berhasil dijalankan dan menampilkan informasi API serta nama author.

## 3. Pengujian Endpoint GET /mahasiswa

Perintah yang digunakan:

curl http://localhost:3001/mahasiswa
Response
{
  "success": true,
  "total": 2,
  "data": [
    {
      "nim": "F1D022001",
      "nama": "Jhon Doe"
    },
    {
      "nim": "F1D022002",
      "nama": "Ani Lestari"
    }
  ]
}

Method: GET

Endpoint: /mahasiswa

Status Code: 200 OK

Kesimpulan

Endpoint GET /mahasiswa berhasil menampilkan seluruh data mahasiswa. Pada kondisi awal terdapat 2 data mahasiswa.

## 4. Menambahkan Data dengan POST /mahasiswa

Perintah yang digunakan pada CMD:

curl -X POST http://localhost:3001/mahasiswa -H "Content-Type: application/json" -d "{\"nim\":\"240160221004\",\"nama\":\"Aprilliana Fratiwi\"}"
Response
{
  "success": true,
  "message": "Mahasiswa berhasil ditambahkan",
  "data": {
    "nim": "240160221004",
    "nama": "Aprilliana Fratiwi"
  }
}

Method: POST

Endpoint: /mahasiswa

Status Code: 201 Created

Kesimpulan

Data mahasiswa berhasil ditambahkan ke dalam array mahasiswa. Status 201 Created menunjukkan bahwa data baru berhasil dibuat oleh server.

## Mengecek Data Mahasiswa Setelah POST

Setelah data mahasiswa ditambahkan, dilakukan pengecekan kembali menggunakan endpoint GET /mahasiswa.

Request
curl http://localhost:3001/mahasiswa
Response
{
  "success": true,
  "total": 3,
  "data": [
    {
      "nim": "F1D022001",
      "nama": "Jhon Doe"
    },
    {
      "nim": "F1D022002",
      "nama": "Ani Lestari"
    },
    {
      "nim": "240160221004",
      "nama": "Aprilliana Fratiwi"
    }
  ]
}

Method: GET

Endpoint: /mahasiswa

Status Code: 200 OK

Kesimpulan

Setelah proses POST berhasil, jumlah data mahasiswa bertambah dari 2 menjadi 3. Data mahasiswa baru dengan NIM F1D022099 dan nama Aprilliana Fratiwi berhasil ditambahkan.

## Prediksi dan Pengujian Endpoint PUT /mahasiswa

Sebelum melakukan pengujian, dilakukan prediksi berdasarkan endpoint yang tersedia pada latihan.js.

Request
PUT http://localhost:3001/mahasiswa

Body:

{
  "nama": "Siapa"
}
Prediksi

Status yang diprediksi:

404 Not Found

Hal tersebut terjadi karena pada latihan.js tidak terdapat endpoint PUT /mahasiswa.

Pengujian

Perintah yang digunakan:

curl -X PUT http://localhost:3001/mahasiswa -H "Content-Type: application/json" -d "{\"nama\":\"Siapa\"}"
Response
{
  "success": false,
  "message": "Endpoint PUT /mahasiswa tidak ditemukan"
}

Status Code: 404 Not Found

Kesimpulan

Hasil pengujian sesuai dengan prediksi. Endpoint PUT /mahasiswa tidak ditemukan karena belum didefinisikan pada server.

## Prediksi dan Pengujian Endpoint DELETE /mahasiswa/1
Request
DELETE http://localhost:3001/mahasiswa/1
Prediksi

Status yang diprediksi:

404 Not Found

Hal tersebut terjadi karena pada latihan.js tidak terdapat endpoint DELETE /mahasiswa/1.

Pengujian

Perintah yang digunakan:

curl -X DELETE http://localhost:3001/mahasiswa/1
Response
{
  "success": false,
  "message": "Endpoint DELETE /mahasiswa/1 tidak ditemukan"
}

Status Code: 404 Not Found

Kesimpulan

Hasil pengujian sesuai dengan prediksi. Endpoint DELETE /mahasiswa/1 tidak ditemukan karena belum didefinisikan pada server.

## Prediksi dan Pengujian Endpoint GET /mahasiswa/99
Request
GET http://localhost:3001/mahasiswa/99
Prediksi

Status yang diprediksi:

404 Not Found

Hal tersebut terjadi karena pada latihan.js hanya terdapat endpoint GET /mahasiswa, bukan GET /mahasiswa/:id.

Pengujian

Perintah yang digunakan:

curl http://localhost:3001/mahasiswa/99
Response
{
  "success": false,
  "message": "Endpoint GET /mahasiswa/99 tidak ditemukan"
}

Status Code: 404 Not Found

Kesimpulan

Hasil pengujian sesuai dengan prediksi. Endpoint GET /mahasiswa/99 tidak ditemukan karena route tersebut belum dibuat pada server.

## Pengujian Endpoint yang Tidak Tersedia

Untuk mengetahui bagaimana server menangani endpoint yang tidak dibuat, dilakukan pengujian dengan endpoint /tidakada.

Request
curl http://localhost:3001/tidakada
Response
{
  "success": false,
  "message": "Endpoint GET /tidakada tidak ditemukan"
}

Method: GET

Endpoint: /tidakada

Status Code: 404 Not Found

Kesimpulan

Endpoint yang tidak didefinisikan pada server akan menghasilkan status 404 Not Found.

## 5. "Tulis 3 kalimat: apa perbedaan mendasar HTTP request dan response, dan mengapa status code penting bagi client?"

Jawaban:"HTTP request adalah permintaan yang dikirim oleh client kepada server, sedangkan HTTP response adalah balasan yang diberikan server kepada client. Status code penting karena memberi informasi kepada client apakah request berhasil, gagal, atau mengalami masalah tertentu. Dengan status code, client dapat menentukan tindakan selanjutnya berdasarkan hasil dari request yang dikirim."
