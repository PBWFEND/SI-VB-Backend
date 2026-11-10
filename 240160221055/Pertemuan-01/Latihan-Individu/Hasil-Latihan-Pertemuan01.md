### 1. Menjalankan dan Mengamati Server

Server dijalankan menggunakan perintah:

```bash
node server.js
```

Server berjalan pada `http://localhost:3000`.

#### a. GET `/`

**Method:** `GET`
**Endpoint:** `/`
**Status Code:** `200 OK`

Request:

```text
GET http://localhost:3000/
```

Response:

```json
{
  "message": "API Pertemuan 1",
  "endpoints": [
    "GET /mahasiswa",
    "POST /mahasiswa"
  ]
}
```

#### b. GET `/mahasiswa`

**Method:** `GET`
**Endpoint:** `/mahasiswa`
**Status Code:** `200 OK`

Request:

```text
GET http://localhost:3000/mahasiswa
```

Response:

```json
{
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
```

#### c. GET `/tidakada`

**Method:** `GET`
**Endpoint:** `/tidakada`
**Status Code:** `404 Not Found`

Response:

```json
{
  "success": false,
  "message": "Endpoint GET /tidakada tidak ditemukan"
}
```

Dari pengujian tersebut, endpoint yang tersedia akan memberikan response sesuai dengan route yang dibuat. Jika endpoint tidak tersedia, server memberikan status `404 Not Found`.

---

## 2. Menambahkan Endpoint GET `/about`

Pada file `latihan.js`, ditambahkan endpoint:

```text
GET /about
```

Endpoint tersebut memberikan informasi mengenai API dan pembuatnya.

Request:

```text
GET http://localhost:3001/about
```

Response:

```json
{
  "success": true,
  "message": "API Pertemuan 1",
  "author": "Rasya Putri Ramadhani"
}
```

**Status Code:** `200 OK`

---

## 3. Menambahkan Endpoint POST `/mahasiswa`

Endpoint `POST /mahasiswa` digunakan untuk menambahkan data mahasiswa baru ke dalam array `mahasiswa`.

Request yang dikirim berupa JSON:

```json
{
  "nim": "F1D022099",
  "nama": "Rasya Putri Ramadhani"
}
```

Karena menggunakan `latihan.js`, server berjalan pada port `3001`.

### Pengujian menggunakan curl

Server terlebih dahulu dijalankan dengan:

```bash
node latihan.js
```

Kemudian endpoint diuji menggunakan `curl`:

```bash
curl -i -X POST http://localhost:3001/mahasiswa -H "Content-Type: application/json" -d "{\"nim\":\"F1D022099\",\"nama\":\"Rasya Putri Ramadhani\"}"
```

Response yang diharapkan:

```text
HTTP/1.1 201 Created
```

Kemudian response JSON:

```json
{
  "success": true,
  "message": "Mahasiswa berhasil ditambahkan",
  "data": {
    "nim": "F1D022099",
    "nama": "Rasya Putri Ramadhani"
  }
}
```

Status `201 Created` menunjukkan bahwa data mahasiswa berhasil dibuat atau ditambahkan oleh server.

Setelah data ditambahkan, endpoint berikut dapat digunakan untuk melihat data:

```text
GET http://localhost:3001/mahasiswa
```

Response akan menunjukkan jumlah data mahasiswa yang bertambah dan data mahasiswa baru yang telah ditambahkan.

---

## 4. Prediksi dan Pengujian Endpoint

Sebelum melakukan pengujian, dilakukan prediksi berdasarkan endpoint yang tersedia pada `latihan.js`.

### a. PUT `/mahasiswa`

Request:

```text
PUT http://localhost:3001/mahasiswa
```

**Prediksi:** `404 Not Found`

Hal tersebut terjadi karena pada `latihan.js` tidak terdapat endpoint `PUT /mahasiswa`.

Response:

```json
{
  "success": false,
  "message": "Endpoint PUT /mahasiswa tidak ditemukan"
}
```

### b. DELETE `/mahasiswa/1`

Request:

```text
DELETE http://localhost:3001/mahasiswa/1
```

**Prediksi:** `404 Not Found`

Hal tersebut terjadi karena tidak terdapat endpoint `DELETE /mahasiswa/1` pada server.

Response:

```json
{
  "success": false,
  "message": "Endpoint DELETE /mahasiswa/1 tidak ditemukan"
}
```

### c. GET `/mahasiswa/99`

Request:

```text
GET http://localhost:3001/mahasiswa/99
```

**Prediksi:** `404 Not Found`

Hal tersebut terjadi karena `latihan.js` hanya memiliki endpoint `GET /mahasiswa`, bukan endpoint `GET /mahasiswa/:id`.

Response:

```json
{
  "success": false,
  "message": "Endpoint GET /mahasiswa/99 tidak ditemukan"
}
```

### Kesimpulan Pengujian

Hasil pengujian sesuai dengan prediksi. Endpoint yang belum didefinisikan pada server akan menghasilkan status `404 Not Found`.

---

## 5. Refleksi

HTTP request adalah permintaan yang dikirim oleh client kepada server untuk meminta atau mengirim data. HTTP response adalah balasan yang diberikan oleh server setelah memproses request tersebut. Status code penting karena memberikan informasi kepada client mengenai hasil dari request, misalnya apakah request berhasil, terdapat kesalahan pada data yang dikirim, atau endpoint yang diminta tidak ditemukan.