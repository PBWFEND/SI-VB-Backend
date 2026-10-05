# Pertemuan 4 — Routing dan Middleware Express.js

## Identitas

**Nama:** Rasya Putri Ramadhani  
**NIM:** 240160221055  
**Mata Kuliah:** Pemrograman Backend  
**Pertemuan:** 4  
**Materi:** Routing dan Middleware Express.js  

---

## Deskripsi

Pada Pertemuan 4 dilakukan pengembangan aplikasi sederhana menggunakan Express.js dengan menerapkan konsep routing, middleware, route parameter, query parameter, HTTP method, validasi input, dan handler 404.

Aplikasi yang dikembangkan merupakan API sederhana untuk mengelola data buku. Data buku memiliki beberapa informasi, yaitu:

- `id`
- `judul`
- `penulis`
- `tersedia`

Pengembangan dilakukan berdasarkan file `latihan.js` yang telah disediakan dengan beberapa penambahan fitur sesuai instruksi tugas.

Fitur yang dikembangkan meliputi:

1. Middleware logger untuk mencatat waktu, method, dan URL.
2. Endpoint `GET /buku/:id`.
3. Query parameter `?tersedia=true` dan `?tersedia=false`.
4. Endpoint `POST /buku`.
5. Validasi field `judul` dan `penulis`.
6. Handler 404 untuk endpoint yang tidak tersedia.
7. Pengujian seluruh endpoint menggunakan `curl`.

---

# 1. Persiapan

## Instalasi Dependency

Sebelum menjalankan aplikasi, dependency terlebih dahulu di-install menggunakan perintah:

```bash
npm install
```

Hasil instalasi:

```text
added 68 packages, and audited 69 packages in 28s

27 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

Dari hasil tersebut, proses instalasi dependency berhasil dan tidak ditemukan vulnerability pada package yang diperiksa.

---

## Menjalankan Server

Server dijalankan menggunakan perintah:

```bash
node latihan.js
```

Aplikasi berjalan pada:

```text
http://localhost:3005
```

Setelah server berjalan, setiap endpoint dapat diuji menggunakan `curl`.

---

# 2. Implementasi Middleware Logger

Middleware logger digunakan untuk mencatat setiap request yang masuk ke server.

Informasi yang dicatat meliputi:

- Waktu request
- HTTP method
- URL yang diakses

Implementasi middleware:

```js
app.use((request, response, next) => {
  const waktu = new Date().toISOString();
  console.log(`${waktu} ${request.method} ${request.originalUrl}`);
  next();
});
```

Method `next()` digunakan untuk meneruskan request ke proses atau endpoint berikutnya.

Contoh format log yang dihasilkan:

```text
2026-10-05T05:20:30.123Z GET /buku
2026-10-05T05:21:10.456Z GET /buku/1
2026-10-05T05:22:15.789Z POST /buku
```

Middleware logger berhasil diterapkan sehingga setiap request yang masuk dapat dicatat oleh server.

**Hasil: Berhasil**

---

# 3. GET `/buku`

## Tujuan

Endpoint `GET /buku` digunakan untuk menampilkan seluruh data buku yang tersedia.

## Perintah Pengujian

```bash
curl http://localhost:3005/buku
```

## Hasil Pengujian

```json
{
  "success": true,
  "total": 2,
  "data": [
    {
      "id": 1,
      "judul": "Belajar Node.js",
      "penulis": "Andi",
      "tersedia": true
    },
    {
      "id": 2,
      "judul": "Dasar Express.js",
      "penulis": "Budi",
      "tersedia": false
    }
  ]
}
```

## Analisis

Endpoint berhasil mengembalikan seluruh data buku yang terdapat di dalam array `buku`.

Nilai `"success": true` menunjukkan bahwa request berhasil diproses, sedangkan `"total": 2` menunjukkan jumlah data buku yang dikembalikan pada pengujian awal adalah dua data.

**Hasil: Berhasil**

---

# 4. GET `/buku/:id`

## Tujuan

Endpoint `GET /buku/:id` digunakan untuk mengambil data buku berdasarkan ID tertentu.

Contoh:

```text
/buku/1
```

Angka `1` merupakan nilai dari route parameter `id`.

---

## 4.1 Pengujian ID yang Ditemukan

### Perintah

```bash
curl http://localhost:3005/buku/1
```

### Hasil

```json
{
  "success": true,
  "data": {
    "id": 1,
    "judul": "Belajar Node.js",
    "penulis": "Andi",
    "tersedia": true
  }
}
```

### Analisis

Data dengan ID `1` berhasil ditemukan sehingga server mengembalikan data buku tersebut.

**Hasil: Berhasil**

---

## 4.2 Pengujian ID yang Tidak Ditemukan

Untuk menguji kondisi ketika data tidak ditemukan, digunakan ID `99`.

### Perintah

```bash
curl http://localhost:3005/buku/99
```

### Hasil

```json
{
  "success": false,
  "message": "Buku tidak ditemukan"
}
```

### Analisis

Data dengan ID `99` tidak terdapat di dalam array `buku`, sehingga server mengembalikan response `404` dengan pesan `"Buku tidak ditemukan"`.

Hal ini menunjukkan bahwa endpoint telah memiliki penanganan khusus ketika data berdasarkan ID tidak ditemukan.

**Hasil: Berhasil — 404 Not Found**

---

# 5. Query Parameter `tersedia`

## Tujuan

Query parameter digunakan untuk melakukan filter data buku berdasarkan status ketersediaannya.

Terdapat dua kondisi yang diuji:

```text
tersedia=true
```

dan

```text
tersedia=false
```

---

## 5.1 Filter `tersedia=true`

### Perintah

```bash
curl "http://localhost:3005/buku?tersedia=true"
```

### Hasil Pengujian Awal

```json
{
  "success": true,
  "total": 1,
  "data": [
    {
      "id": 1,
      "judul": "Belajar Node.js",
      "penulis": "Andi",
      "tersedia": true
    }
  ]
}
```

### Analisis

Hasil menunjukkan bahwa hanya buku dengan nilai `tersedia: true` yang ditampilkan.

Pada pengujian awal terdapat satu buku yang tersedia.

Setelah dilakukan penambahan buku menggunakan endpoint `POST /buku`, jumlah buku dengan status tersedia bertambah.

Pengujian berikutnya menghasilkan:

```json
{
  "success": true,
  "total": 2,
  "data": [
    {
      "id": 1,
      "judul": "Belajar Node.js",
      "penulis": "Andi",
      "tersedia": true
    },
    {
      "id": 3,
      "judul": "Belajar Express.js",
      "penulis": "Rasya",
      "tersedia": true
    }
  ]
}
```

Hal tersebut menunjukkan bahwa filter `tersedia=true` berjalan sesuai dengan kondisi data yang ada.

**Hasil: Berhasil**

---

## 5.2 Filter `tersedia=false`

### Perintah

```bash
curl "http://localhost:3005/buku?tersedia=false"
```

### Hasil

```json
{
  "success": true,
  "total": 1,
  "data": [
    {
      "id": 2,
      "judul": "Dasar Express.js",
      "penulis": "Budi",
      "tersedia": false
    }
  ]
}
```

### Analisis

Hasil menunjukkan bahwa hanya buku yang memiliki nilai `tersedia: false` yang ditampilkan.

Dengan demikian, query parameter dapat digunakan untuk memfilter data berdasarkan kondisi yang diinginkan.

**Hasil: Berhasil**

---

# 6. POST `/buku`

## Tujuan

Endpoint `POST /buku` digunakan untuk menambahkan data buku baru.

Field yang wajib dikirimkan adalah:

- `judul`
- `penulis`

Buku baru akan mendapatkan:

```text
tersedia: true
```

secara otomatis.

---

## 6.1 Menambahkan Buku dengan Data Lengkap

### Perintah

Pengujian dilakukan menggunakan `curl.exe` karena terminal yang digunakan adalah Command Prompt.

```bash
curl.exe -X POST "http://localhost:3005/buku" -H "Content-Type: application/json" -d "{\"judul\":\"Belajar Express.js\",\"penulis\":\"Rasya\"}"
```

### Hasil

```json
{
  "success": true,
  "message": "Buku berhasil ditambahkan",
  "data": {
    "id": 3,
    "judul": "Belajar Express.js",
    "penulis": "Rasya",
    "tersedia": true
  }
}
```

### Analisis

Data buku baru berhasil ditambahkan ke dalam array `buku`.

Server menghasilkan ID baru secara otomatis, yaitu `3`.

Selain itu, nilai `tersedia` diberikan secara otomatis dengan nilai `true`.

Response menunjukkan:

```text
Buku berhasil ditambahkan
```

yang menandakan proses penambahan data berhasil.

**Hasil: Berhasil — 201 Created**

---

# 7. Validasi POST `/buku`

## Tujuan

Validasi digunakan untuk memastikan field wajib tidak boleh kosong atau tidak dikirimkan.

Field yang wajib adalah:

```text
judul
penulis
```

Jika salah satu field tidak tersedia, server akan menolak request.

---

## 7.1 POST Tanpa Field `penulis`

### Perintah

```bash
curl.exe -X POST "http://localhost:3005/buku" -H "Content-Type: application/json" -d "{\"judul\":\"Buku Baru\"}"
```

### Hasil

```json
{
  "success": false,
  "message": "Field judul dan penulis wajib diisi"
}
```

### Analisis

Request tidak berhasil diproses karena field `penulis` tidak dikirimkan.

Server memberikan pesan:

```text
Field judul dan penulis wajib diisi
```

Hal ini menunjukkan bahwa validasi field wajib telah berhasil diterapkan.

**Hasil: Berhasil — 400 Bad Request**

---

# 8. Handler 404 Endpoint

## Tujuan

Handler 404 digunakan untuk menangani request yang menuju endpoint yang tidak tersedia.

Sebagai contoh, aplikasi tidak memiliki endpoint `/mahasiswa`.

## Perintah Pengujian

```bash
curl http://localhost:3005/mahasiswa
```

## Hasil

```json
{
  "success": false,
  "message": "Endpoint tidak ditemukan"
}
```

## Analisis

Server berhasil mengenali bahwa endpoint `/mahasiswa` tidak tersedia.

Request kemudian ditangani oleh middleware 404 dan menghasilkan pesan:

```text
Endpoint tidak ditemukan
```

Handler 404 diletakkan setelah seluruh endpoint agar request yang tidak cocok dengan route yang tersedia dapat ditangani.

**Hasil: Berhasil — 404 Not Found**

---

# 9. Pengujian Setelah Penambahan Data

Setelah melakukan POST, dilakukan pengujian kembali terhadap endpoint `GET /buku` untuk memastikan data baru telah masuk.

## Perintah

```bash
curl http://localhost:3005/buku
```

## Hasil

```json
{
  "success": true,
  "total": 3,
  "data": [
    {
      "id": 1,
      "judul": "Belajar Node.js",
      "penulis": "Andi",
      "tersedia": true
    },
    {
      "id": 2,
      "judul": "Dasar Express.js",
      "penulis": "Budi",
      "tersedia": false
    },
    {
      "id": 3,
      "judul": "Belajar Express.js",
      "penulis": "Rasya",
      "tersedia": true
    }
  ]
}
```

## Analisis

Sebelum melakukan POST terdapat dua data buku.

Setelah POST berhasil, jumlah data menjadi tiga.

Hal ini menunjukkan bahwa endpoint POST berhasil menambahkan data baru ke dalam array `buku`.

Data tersebut masih tersimpan selama server berjalan karena penyimpanan yang digunakan pada latihan ini masih berupa array di dalam memory.

---

# 10. Pengujian Filter Setelah Penambahan Data

## 10.1 `tersedia=true`

```bash
curl "http://localhost:3005/buku?tersedia=true"
```

Hasil:

```json
{
  "success": true,
  "total": 2,
  "data": [
    {
      "id": 1,
      "judul": "Belajar Node.js",
      "penulis": "Andi",
      "tersedia": true
    },
    {
      "id": 3,
      "judul": "Belajar Express.js",
      "penulis": "Rasya",
      "tersedia": true
    }
  ]
}
```

Hasil tersebut menunjukkan bahwa terdapat dua buku yang tersedia.

---

## 10.2 `tersedia=false`

```bash
curl "http://localhost:3005/buku?tersedia=false"
```

Hasil:

```json
{
  "success": true,
  "total": 1,
  "data": [
    {
      "id": 2,
      "judul": "Dasar Express.js",
      "penulis": "Budi",
      "tersedia": false
    }
  ]
}
```

Hasil tersebut menunjukkan bahwa terdapat satu buku yang tidak tersedia.

---

# 11. Ringkasan Endpoint

| Method | Endpoint | Fungsi | Hasil |
|---|---|---|---|
| GET | `/buku` | Menampilkan seluruh buku | Berhasil |
| GET | `/buku?tersedia=true` | Menampilkan buku yang tersedia | Berhasil |
| GET | `/buku?tersedia=false` | Menampilkan buku yang tidak tersedia | Berhasil |
| GET | `/buku/:id` | Menampilkan buku berdasarkan ID | Berhasil |
| GET | `/buku/99` | Menguji ID yang tidak ditemukan | 404 |
| POST | `/buku` | Menambahkan buku baru | Berhasil |
| POST | `/buku` | Menguji data tanpa `penulis` | 400 |
| GET | `/mahasiswa` | Menguji endpoint yang tidak tersedia | 404 |

---

# 12. Status HTTP yang Digunakan

Dalam pengembangan aplikasi ini digunakan beberapa status HTTP untuk menunjukkan hasil dari request.

### 200 OK

Digunakan ketika request berhasil, contohnya pada:

```text
GET /buku
GET /buku/1
GET /buku?tersedia=true
GET /buku?tersedia=false
```

### 201 Created

Digunakan ketika data buku berhasil ditambahkan melalui:

```text
POST /buku
```

### 400 Bad Request

Digunakan ketika request POST tidak memenuhi data yang diwajibkan, misalnya tidak mengirimkan field `penulis`.

### 404 Not Found

Digunakan ketika:

- ID buku tidak ditemukan.
- Endpoint yang diminta tidak tersedia.

---

# 13. Kendala Selama Pengujian

Selama melakukan pengujian, terdapat kendala ketika menjalankan perintah `curl` untuk method POST.

Pada awalnya saya mencoba menggunakan format:

```text
curl -Method POST
```

dan:

```text
-ContentType
-Body
```

Namun format tersebut merupakan sintaks yang digunakan pada PowerShell, sedangkan terminal yang digunakan pada saat pengujian adalah Command Prompt.

Akibatnya, perintah tersebut tidak dapat digunakan dengan benar.

Setelah mengetahui perbedaan tersebut, pengujian dilakukan menggunakan format `curl.exe` yang sesuai untuk Command Prompt:

```bash
curl.exe -X POST "http://localhost:3005/buku" -H "Content-Type: application/json" -d "{\"judul\":\"Belajar Express.js\",\"penulis\":\"Rasya\"}"
```

Dari kendala tersebut saya memahami bahwa penggunaan command line juga perlu disesuaikan dengan terminal yang digunakan.

---

# 14. Kesimpulan

Berdasarkan implementasi dan seluruh pengujian yang telah dilakukan, aplikasi Express.js pada Pertemuan 4 berhasil dikembangkan sesuai dengan instruksi yang diberikan.

Middleware logger berhasil digunakan untuk mencatat waktu, method, dan URL dari setiap request yang masuk.

Endpoint `GET /buku/:id` berhasil digunakan untuk mengambil data buku berdasarkan ID. Ketika ID ditemukan, server mengembalikan data buku. Sebaliknya, ketika ID tidak ditemukan, server mengembalikan response 404.

Query parameter `tersedia=true` dan `tersedia=false` juga berhasil digunakan untuk melakukan filter berdasarkan status ketersediaan buku.

Endpoint `POST /buku` berhasil digunakan untuk menambahkan data buku baru. Endpoint tersebut juga dilengkapi dengan validasi terhadap field `judul` dan `penulis`. Jika data yang dikirim tidak lengkap, server memberikan response 400.

Selain itu, handler 404 berhasil diterapkan untuk menangani endpoint yang tidak tersedia.

Seluruh fitur telah diuji menggunakan `curl`, baik untuk kondisi berhasil maupun kondisi error. Dengan demikian, implementasi routing dan middleware pada latihan Pertemuan 4 dapat dinyatakan berhasil.

---

# 15. Refleksi

Pada Pertemuan 4 ini saya mempelajari lebih lanjut mengenai penggunaan Express.js, khususnya dalam penerapan routing dan middleware.

Sebelum mengerjakan latihan ini, saya sudah memahami dasar penggunaan endpoint pada Express.js, tetapi masih belum terlalu memahami bagaimana route parameter, query parameter, middleware, dan method POST digunakan secara bersamaan dalam sebuah aplikasi. Melalui latihan ini, saya menjadi lebih memahami fungsi dari masing-masing bagian tersebut.

Hal pertama yang saya pelajari adalah mengenai **middleware**. Pada latihan ini saya membuat middleware logger yang digunakan untuk mencatat waktu, method, dan URL dari setiap request. Dari implementasi tersebut saya memahami bahwa middleware merupakan bagian yang dapat dijalankan sebelum request diteruskan ke endpoint berikutnya. Saya juga menjadi lebih memahami fungsi `next()` untuk meneruskan proses request.

Saya juga belajar membedakan **route parameter** dan **query parameter**. Route parameter digunakan pada endpoint seperti:

```text
/buku/1
```

untuk mengambil data berdasarkan ID tertentu. Sedangkan query parameter digunakan pada:

```text
/buku?tersedia=true
```

untuk melakukan filter terhadap data. Setelah melakukan pengujian secara langsung, saya menjadi lebih memahami perbedaan penggunaan keduanya.

Bagian yang cukup menantang bagi saya adalah ketika melakukan pengujian menggunakan `curl`, terutama saat melakukan request `POST`. Saya sempat menggunakan format perintah yang biasa digunakan pada PowerShell, seperti `-Method`, `-ContentType`, dan `-Body`, padahal terminal yang digunakan adalah Command Prompt. Hal tersebut menyebabkan perintah tidak dapat berjalan sesuai yang diharapkan.

Setelah mengetahui penyebabnya, saya menggunakan format `curl.exe` dengan opsi `-X`, `-H`, dan `-d`. Dari kendala tersebut saya belajar bahwa ketika menemukan error, saya tidak hanya perlu melihat kode program, tetapi juga perlu memperhatikan environment dan cara menjalankan perintah yang digunakan.

Selain itu, saya menjadi lebih memahami pentingnya **validasi input**. Pada endpoint `POST /buku`, field `judul` dan `penulis` ditentukan sebagai field wajib. Jika salah satu tidak diberikan, request akan ditolak dan server memberikan response `400 Bad Request`. Hal ini menunjukkan bahwa API perlu memiliki validasi agar data yang masuk tetap sesuai dengan kebutuhan aplikasi.

Saya juga belajar mengenai penggunaan **status HTTP**. Pada latihan ini saya memahami bahwa status code dapat memberikan informasi mengenai hasil dari sebuah request. Status `200` digunakan ketika request berhasil, `201` digunakan ketika data berhasil dibuat, `400` digunakan ketika request tidak sesuai dengan ketentuan, dan `404` digunakan ketika data atau endpoint tidak ditemukan.

Hal lain yang saya pahami adalah mengenai penyimpanan data. Data buku pada latihan ini masih disimpan dalam array sehingga data yang ditambahkan melalui POST hanya tersimpan selama server masih berjalan. Ketika server dihentikan, data tambahan tersebut tidak disimpan secara permanen. Dari sini saya mulai memahami perbedaan antara penyimpanan data di memory dengan penyimpanan menggunakan database.

Menurut saya, latihan ini cukup membantu untuk memahami alur kerja sebuah API sederhana. Saya tidak hanya belajar membuat endpoint, tetapi juga belajar bagaimana request diproses, bagaimana middleware bekerja, bagaimana menangani data yang tidak ditemukan, serta bagaimana melakukan validasi terhadap input dari client.

Secara keseluruhan, saya merasa pemahaman saya terhadap Express.js menjadi lebih baik setelah menyelesaikan latihan ini. Kesulitan saat melakukan pengujian juga menjadi pengalaman yang membantu saya untuk lebih teliti dalam membaca error dan menyesuaikan perintah dengan environment yang digunakan.

Untuk pengembangan selanjutnya, saya ingin lebih memahami bagaimana API Express.js dapat dihubungkan dengan database sehingga data yang dibuat tidak hanya tersimpan sementara di dalam memory, tetapi dapat disimpan dan dikelola secara permanen.

---

# 16. Hasil Akhir

Berdasarkan seluruh proses implementasi dan pengujian:

- [x] Middleware logger berhasil dibuat.
- [x] `GET /buku` berhasil dijalankan.
- [x] `GET /buku/:id` berhasil dijalankan.
- [x] Penanganan ID yang tidak ditemukan berhasil.
- [x] Query `tersedia=true` berhasil.
- [x] Query `tersedia=false` berhasil.
- [x] `POST /buku` berhasil.
- [x] Validasi `judul` dan `penulis` berhasil.
- [x] Handler 404 berhasil.
- [x] Seluruh endpoint telah diuji menggunakan `curl`.
- [x] Hasil pengujian dan refleksi telah didokumentasikan pada README.

**Kesimpulan akhir: seluruh kebutuhan utama pada latihan Pertemuan 4 telah berhasil diimplementasikan dan diuji.**