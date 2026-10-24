# Latihan individu pertemuan 1 - API MAHASISWA
Nama :Muhamad Kurnia
NPM : 240160221025
Kelas : SI-VB

# 1. Menjalankan dan mengambil server

server dijalankan dengan perintah :
 node latihan.js

Hasil :
Latihan berjalan di http://localhost:3001  
Kerjakan semua TODO 1-4, lalu uji setiap endpoint.

# 2. Pengujian endpoint GET/about
perintah : curl http://localhost:3001/about

response :
 {
                      "success": true,
                      "message": "API Pertemuan 1",
                      "author": "Muhamad Kurnia"
                    }

Method: GET
Endpoint: /about
Status Code: 200 OK

Kesimpulan:
Endpoint GET /about berhasil dijalankan dan menampilkan informasi API serta nama author.

# 3. Pengujian Endpoint GET /mahasiswa
perintah yang digunakan:
curl http://localhost:3001/mahasiswa

response:

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

 Method : GET
Endpoint: /mahasiswa 
Status Code: 200 OK

Kesimpulan:
Endpoint GET /mahasiswa berhasil menampilkan seluruh data mahasiswa. Pada kondisi awal terdapat 2 data mahasiswa.

# 4. menambahkan data dengan post/mahasiswa
perintah:
curl.exe -X POST http://localhost:3001/mahasiswa -H "Content-Type: application/json" -d "@body.json"
respnse:

  "success": true,
  "message": "Mahasiswa berhasil ditambahkan",
  "data": {
    "nim": "240160221025",
    "nama": "Muhamad Kurnia"
  }
Method: POST
Endpoint: /mahasiswa
Status Code: 201 Created

# Mengecek Data Mahasiswa Setelah POST

Perintah:

text
curl.exe http://localhost:3000/mahasiswa
Response:

json
{
  "success": true,
  "message": "Data mahasiswa berhasil diambil",
  "total": 3,
  "data": [
    { "nim": "F1D022001", "nama": "Jhon Doe" },
    { "nim": "F1D022002", "nama": "Ani Lestari" },
    { "nim": "240160221025", "nama": "Muhamad Kurnia" }
  ]
}
Method: GET

Endpoint: /mahasiswa

Status Code: 200 OK

Kesimpulan: Setelah proses POST berhasil, jumlah data mahasiswa bertambah dari 2 menjadi 3. Data mahasiswa baru dengan NIM 240160221025 dan nama Muhamad Kurnia berhasil ditambahkan.

# Prediksi dan Pengujian Endpoint PUT /mahasiswa
Perintah:

text
curl.exe -X PUT http://localhost:3000/mahasiswa -H "Content-Type: application/json" -d "@body.json"
Response:

json
{
  "success": false,
  "message": "Endpoint PUT /mahasiswa tidak ditemukan"
}
Status Code: 404 Not Found

Kesimpulan: Endpoint PUT /mahasiswa tidak ditemukan karena pada server.js hanya didefinisikan route GET /, GET /mahasiswa, dan POST /mahasiswa.

7. Pengujian Endpoint DELETE /mahasiswa/1 (tidak tersedia)
Perintah:

text
curl.exe -X DELETE http://localhost:3000/mahasiswa/1
Response:

json
{
  "success": false,
  "message": "Endpoint DELETE /mahasiswa/1 tidak ditemukan"
}
Status Code: 404 Not Found

Kesimpulan: Endpoint DELETE /mahasiswa/1 tidak ditemukan karena route tersebut belum didefinisikan pada server.js.

8. Pengujian Endpoint GET /mahasiswa/99 (tidak tersedia)
Perintah:

text
curl.exe -X GET http://localhost:3000/mahasiswa/99
Response:

json
{
  "success": false,
  "message": "Endpoint GET /mahasiswa/99 tidak ditemukan"
}
Status Code: 404 Not Found

Kesimpulan: Endpoint GET /mahasiswa/99 tidak ditemukan karena pada server.js hanya ada GET /mahasiswa, bukan GET /mahasiswa/:nim.

9. Pengujian Endpoint Tidak Dikenal (/tidakada)
Perintah:

text
curl.exe http://localhost:3000/tidakada
Response:

json
{
  "success": false,
  "message": "Endpoint GET /tidakada tidak ditemukan"
}
Method: GET

Endpoint: /tidakada

Status Code: 404 Not Found

Kesimpulan: Endpoint yang tidak didefinisikan pada server akan menghasilkan status 404 Not Found.

10. Perbedaan HTTP Request dan HTTP Response
HTTP request adalah pesan yang dikirim oleh klien ke server untuk meminta data atau mengeksekusi suatu tindakan, sedangkan HTTP response adalah balasan dari server yang berisi hasil pemrosesan permintaan tersebut. Setiap response menyertakan status code yang penting bagi klien karena berfungsi sebagai indikator status akhir komunikasi. Dengan mengenali status code tersebut, aplikasi klien dapat mengetahui apakah permintaannya berhasil (200 OK, 201 Created), gagal karena input tidak valid (400 Bad Request), atau endpoint tidak ditemukan (404 Not Found) tanpa harus mengurai seluruh isi body balasan.