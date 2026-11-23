# LATIHAN INDIVIDU PERTEMUAN 1 - API MAHASISWA

Nama : Ilyas Nuryandra
NPM : 240160221015
Kelas : SI-VB

---

## 1. Menjalankan dan Mengambil Server

Server dijalankan dengan perintah:


node latihan.js


Hasil:


Latihan berjalan di http://localhost:3001


Selanjutnya, dilakukan pengerjaan TODO 1–4 dan pengujian terhadap setiap endpoint yang tersedia.

---

## 2. Pengujian Endpoint GET /about

Endpoint GET `/about` digunakan untuk menampilkan informasi API dan nama pembuat API.

Perintah yang digunakan:


curl http://localhost:3001/about


Response:

json
{
  "success": true,
  "message": "API Pertemuan 1",
  "author": "Ilyas Nuryandra"
}


Method: GET
Endpoint: /about
Status Code: 200 OK

Kesimpulan:
Endpoint GET /about berhasil dijalankan dan menampilkan informasi API serta nama author.

---

## 3. Pengujian Endpoint GET /mahasiswa

Perintah yang digunakan:


curl http://localhost:3001/mahasiswa


Response:

json
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

Kesimpulan:
Endpoint GET /mahasiswa berhasil menampilkan seluruh data mahasiswa. Pada kondisi awal terdapat 2 data mahasiswa.

---

## 4. Menambahkan Data dengan POST /mahasiswa

Keterangan:
Pada proses pengujian menggunakan perintah `curl.exe`, terdapat kendala berupa error saat menjalankan perintah melalui terminal. Oleh karena itu, proses perbaikan perintah dibantu dengan DeepSeek hingga perintah dapat dijalankan dengan benar.

Perintah yang digunakan:


curl.exe -X POST http://localhost:3001/mahasiswa -H "Content-Type: application/json" -d "@Pertemuan-01/Latihan/data.json"

Response:

-H "Content-Type: application/json" -d "@Pertemuan-01/Latihan/data.json"
{
  "success": true,
  "message": "Mahasiswa berhasil ditambahkan",
  "data": {
    "nim": "240160221015",
    "nama": "Ilyas Nuryandra"
  }
}


Method: POST
Endpoint: /mahasiswa
Status Code: 201 Created

Kesimpulan:
Data mahasiswa berhasil ditambahkan ke dalam array mahasiswa. Status 201 Created menunjukkan bahwa data baru berhasil dibuat oleh server.

---

## Mengecek Data Mahasiswa Setelah POST

Setelah data mahasiswa ditambahkan, dilakukan pengecekan kembali menggunakan endpoint GET `/mahasiswa`.

Keterangan:
Pengujian menggunakan `curl.exe` dibantu dengan DeepSeek karena sebelumnya terdapat error saat menjalankan perintah melalui terminal.

Request:


curl.exe http://localhost:3001/mahasiswa


Response:

json
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
      "nim": "240160221015",
      "nama": "Ilyas Nuryandra"
    }
  ]
}


Method: GET
Endpoint: /mahasiswa
Status Code: 200 OK

Kesimpulan:
Setelah proses POST berhasil, jumlah data mahasiswa bertambah dari 2 menjadi 3. Data mahasiswa baru dengan NIM `240160221015` dan nama `Ilyas Nuryandra` berhasil ditambahkan.

---

## Prediksi dan Pengujian Endpoint PUT /mahasiswa

Sebelum melakukan pengujian, dilakukan prediksi berdasarkan endpoint yang tersedia pada `latihan.js`.

Request:


PUT http://localhost:3001/mahasiswa


Prediksi:
Status yang diprediksi adalah 404 Not Found karena pada `latihan.js` tidak terdapat handler untuk method PUT pada endpoint `/mahasiswa`.

Keterangan:
Pengujian menggunakan `curl.exe` dibantu dengan DeepSeek karena terdapat error saat menjalankan perintah melalui terminal.

Perintah yang digunakan:


curl.exe -X PUT http://localhost:3001/mahasiswa -H "Content-Type: application/json" -d "@body.json"


Response:

json
{
  "success": false,
  "message": "Endpoint PUT /mahasiswa tidak ditemukan"
}


Status Code: 404 Not Found

Kesimpulan:
Hasil pengujian sesuai dengan prediksi. Endpoint PUT `/mahasiswa` tidak ditemukan karena belum didefinisikan pada server.

---

## Prediksi dan Pengujian Endpoint DELETE /mahasiswa/1

Request:


DELETE http://localhost:3001/mahasiswa/1


Prediksi:
Status yang diprediksi adalah 404 Not Found karena pada `latihan.js` tidak terdapat endpoint DELETE `/mahasiswa/1`, dan pencocokan URL menggunakan string persis sehingga path dengan segmen tambahan tidak akan cocok.

Keterangan:
Pengujian menggunakan `curl.exe` dibantu dengan DeepSeek karena terdapat error saat menjalankan perintah melalui terminal.

Perintah yang digunakan:


curl.exe -X DELETE http://localhost:3001/mahasiswa/1


Response:

json
{
  "success": false,
  "message": "Endpoint DELETE /mahasiswa/1 tidak ditemukan"
}


Status Code: 404 Not Found

Kesimpulan:
Hasil pengujian sesuai dengan prediksi. Endpoint DELETE `/mahasiswa/1` tidak ditemukan karena belum didefinisikan pada server.

---

## Prediksi dan Pengujian Endpoint GET /mahasiswa/99

Request:


GET http://localhost:3001/mahasiswa/99


Prediksi:
Status yang diprediksi adalah 404 Not Found. Hal tersebut terjadi karena pada `latihan.js` hanya terdapat endpoint GET `/mahasiswa`, bukan GET `/mahasiswa/:id`. Selain itu, pencocokan URL menggunakan string persis (`url === "/mahasiswa"`) sehingga `/mahasiswa/99` tidak akan cocok.

Keterangan:
Pengujian menggunakan `curl.exe` dibantu dengan DeepSeek karena terdapat error saat menjalankan perintah melalui terminal.

Perintah yang digunakan:


curl.exe -X GET http://localhost:3001/mahasiswa/99


Response:

json
{
  "success": false,
  "message": "Endpoint GET /mahasiswa/99 tidak ditemukan"
}


Status Code: 404 Not Found

Kesimpulan:
Hasil pengujian sesuai dengan prediksi. Endpoint GET `/mahasiswa/99` tidak ditemukan karena route tersebut belum dibuat pada server.

---

## Pengujian Endpoint yang Tidak Tersedia

Untuk mengetahui bagaimana server menangani endpoint yang tidak dibuat, dilakukan pengujian dengan endpoint `/tidakada`.

Keterangan:
Pengujian menggunakan `curl.exe` dibantu dengan DeepSeek karena terdapat error saat menjalankan perintah melalui terminal.

Request:


curl.exe http://localhost:3001/tidak-ada


Response:

json
{
  "success": false,
  "message": "Endpoint GET /tidakada tidak ditemukan"
}


Method: GET
Endpoint: `/tidakada`
Status Code: 404 Not Found

Kesimpulan:
Endpoint yang tidak didefinisikan pada server akan menghasilkan status 404 Not Found.

---

## 5. Perbedaan HTTP Request dan Response

HTTP Request mengalir dari client ke server untuk meminta data atau layanan. Sedangkan HTTP Response mengalir dari server ke client sebagai balasan atas permintaan tersebut. Jadi, Request adalah permintaan, sementara Response adalah balasan atau hasil dari permintaan.

Request membawa method, URL/path, headers, dan body (untuk POST/PUT/PATCH). Response membawa status code, headers, dan body hasil. Keduanya memiliki struktur mirip, tetapi arah dan perannya berbeda.

Status code pada response penting karena memberi ringkasan hasil dalam 3 digit sehingga client dapat menentukan tindakan berikutnya tanpa harus mem-parsing seluruh body. Contohnya 200 berarti berhasil, 201 berarti data baru berhasil dibuat, 400 berarti input dari client tidak valid, 404 berarti resource tidak ditemukan, dan 500 berarti terjadi kesalahan di sisi server.