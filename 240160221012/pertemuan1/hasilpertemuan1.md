# latihan individu pertemuan
Nama : Fadhlan Mahdan Ghani
NPM : 240160221012
Kelas : SI-VB

# 1.Menjalankan dan Mengambil server
dengan perintah:
ndoe latihan.js
hasil : Latihan berjalan di http://localhost:3001

# 2.Pengujian endpoint GET/about
perintah yang digunakan :
 curl http://localhost:3001/about

 Response:
 {
                      "success": true,
                      "message": "API Pertemuan 1",
                      "author": "Fadhlan Mahdan Ghani"
                    }
Method: GET
Endpoint: /about
Status Code: 200 OK

Kesimpulan:
Endpoint GET /about berhasil dijalankan dan menampilkan informasi API serta nama author.
Kesimpulan:
Endpoint GET /about berhasil dijalankan dan menampilkan informasi API serta nama author.
# 3.pengujian endpoint Get/mahasiswa
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
# 4. Menambahkan Data dengan POST /mahasiswa
Perintah yang digunakan:
curl.exe -X POST http://localhost:3001/mahasiswa -H "Content-Type: application/json" -d "@body.json" 

response:
{
  "success": true,
  "message": "Mahasiswa berhasil ditambahkan",
  "data": {
    "nim": "240160221012",
    "nama": "Fadhlan mahdan ghani"
  }
}
Method: POST
Endpoint: /mahasiswa
Status Code: 201 Created

Kesimpulan:
Data mahasiswa berhasil ditambahkan ke dalam array mahasiswa. Status 201 Created menunjukkan bahwa data baru berhasil dibuat oleh server.

# 5. Mengecek Data Mahasiswa Setelah POST

Setelah data mahasiswa ditambahkan, dilakukan pengecekan kembali menggunakan endpoint GET /mahasiswa.

Keterangan:
Pengujian menggunakan curl.exe dibantu dengan DeepSeek karena sebelumnya terdapat error saat menjalankan perintah melalui terminal.

Request:
curl.exe http://localhost:3001/mahasiswa
Response:
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
      "nim": "240160221012",
      "nama": "Fadhlan mahdan ghani"
    }
  ]
}
Method: GET
Endpoint:/mahasiswa
Status Code: 200 OK

Kesimpulan:
Setelah proses POST berhasil, jumlah data mahasiswa bertambah dari 2 menjadi 3. Data mahasiswa baru dengan NIM 240160221005 dan nama Cinta Rahmia Yulianti berhasil ditambahkan.

# 6. Prediksi dan Pengujian Endpoint PUT /mahasiswa

Sebelum melakukan pengujian, dilakukan prediksi berdasarkan endpoint yang tersedia pada latihan.js.

Request:
Perintah yang digunakan:
curl.exe -X PUT http://localhost:3001/mahasiswa -H "Content-Type: application/json" -d "@body.json"
Response:

{
  "success": false,
  "message": "Endpoint PUT /mahasiswa tidak ditemukan"
}


Status Code: 404 Not Found

Kesimpulan :
Hasil pengujian sesuai dengan prediksi. Endpoint PUT /mahasiswa tidak ditemukan karena belum didefinisikan pada server.

# 7. prediksi dan pengujian endpoint DELETE /mahasiswa/1

prediksi:
status yang diprediksi adalah 404 not found karena pada latihan.js tidak terdapat endpoint DELETE/mahasiswa/1.

keterangan:
pengujian menggunakan curl.exe dibantu dengan deepseek karena terdapat error saat menjalankan perintah melalui terminal.

perintah yang digunakan:
curl.exe -X DELETE http://localhost:3001/mahasiswa/1

response:
{
  "success": false,
  "message": "Endpoint DELETE /mahasiswa/1 tidak ditemukan"
}

status code: 404 Not Found

Kesimpulan:
Hasil pengujian sesuai dengan prediksi. Endpoint DELETE /mahasiswa/1 tidak ditemukan karena belum didefinisikan pada server.

# 8. prediksi dan pengujian Endpoint GET/mahasiswa/99

request:

GET Http://localhost:3001/mahasiswa/99

Prediksi:
status yang diprediksi adalah *404 not found*. hal tersebut terjadi karena pada latihan.js hanya terdapat endpoint GET/mahasiswa,bukan GET/mahasiswa/:id.

keterangan:
pengujian menggunakan curl.exe dibantu dengan deepseek karena terdapat error saat menjalankan perintah melalui terminal.

perintah yang digunakan:

curl.exe -X GET http://localhost:3001/mahasiswa/99

response:{
  "success": false,
  "message": "Endpoint GET /mahasiswa/99 tidak ditemukan"
}

status code: 404 not found

kesimpulan:
Hasil pengujian sesuai dengan prediksi. Endpoint GET /mahasiswa/99 tidak ditemukan karena route tersebut belum dibuat pada server.

# 9. pengujian endpoint yang tidak tersedia

untuk mengetahui bagaimana server menangani endpoint yang tidak dibuat, dilakukan pengujian dengan endpoint/tidakada.

keterangan:
pengujian menggunakan curl.exe dibantu dengan deepseek karena terdapat error saat menajalankan perintah melalui terminal.

Request:
curl.exe http://localhost:3001/tidakada

response:
{
  "success": false,
  "message": "Endpoint GET /tidakada tidak ditemukan"
}

Method: GET
Endpoint:/tidakada
Status Code: 404 Not Found

Kesimpulan:
Endpoint yang tidak didefinisikan pada server akan menghasilkan status 404 Not Found.

# 10. Perbedaan HTTP Request dan Response

HTTP request adalah pesan yang dikirmkan oleh klien ke server untuk meminta data ataumengeksekusikan suatu tindakan, sedangkan HTTP response adalah balasan dari server yang berisi hasil pemrosesan dari permintaan tersebut. Dalam setiap response, server menyertakan status code yang penting bagi klien karena berfungsi sebagai indikator mengenai status akhir dari komunikasi yang terjadi. dengan mengenali status code tersebut, aplikasi klien dapatm mengetahui apakah permintaannya berhasil, mengalamai error, atau membutuhkan tindakan lanjutan tanpa harus mengurai keseluruhan isi data balasan.