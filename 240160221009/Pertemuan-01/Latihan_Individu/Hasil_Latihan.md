# LATIHAN INDIVIDU PERTEMUAN 1 – API MAHASISWA

**Nama:** Disti Setiawati  
**NIM:** 240160221009  

## 1. Menjalankan Server

Server dijalankan menggunakan perintah:

```bash
node Latihan.js
```

Server berhasil berjalan pada:

```text
http://localhost:3001
```

## 2. Hasil Pengujian Endpoint

### 2.1 GET /about

**Method:** GET  
**Endpoint:** `/about`

Hasil pengujian:

```json
{
  "success": true,
  "message": "API Pertemuan 1",
  "author": "Disti Setiawati"
}
```

**Status:** 200 OK

Hasilnya berhasil menampilkan informasi API dan nama author.

### 2.2 GET /mahasiswa

**Method:** GET  
**Endpoint:** `/mahasiswa`

Hasil pengujian:

```json
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
      "nim": "240160221009",
      "nama": "Disti Setiawati"
    }
  ]
}
```

**Status:** 200 OK

Data mahasiswa berhasil ditampilkan.

### 2.3 POST /mahasiswa

**Method:** POST  
**Endpoint:** `/mahasiswa`

Data yang dikirim:

```json
{
  "nim": "240160221009",
  "nama": "Disti Setiawati"
}
```

Hasil pengujian:

```json
{
  "success": true,
  "message": "Mahasiswa berhasil ditambahkan",
  "data": {
    "nim": "240160221009",
    "nama": "Disti Setiawati"
  }
}
```

**Status:** 201 Created

Data mahasiswa berhasil ditambahkan.

## 3. Prediksi dan Pengujian Method

### 3.1 PUT /mahasiswa

**Prediksi:** 404 Not Found

Endpoint `PUT /mahasiswa` belum dibuat pada program.

Hasil pengujian:

```json
{
  "success": false,
  "message": "Endpoint PUT /mahasiswa tidak ditemukan"
}
```

**Status:** 404 Not Found

Hasilnya sesuai dengan prediksi.

### 3.2 DELETE /mahasiswa/1

**Prediksi:** 404 Not Found

Endpoint `DELETE /mahasiswa/1` belum dibuat pada program.

Hasil pengujian:

```json
{
  "success": false,
  "message": "Endpoint DELETE /mahasiswa/1 tidak ditemukan"
}
```

**Status:** 404 Not Found

Hasilnya sesuai dengan prediksi.

### 3.3 GET /mahasiswa/99

**Prediksi:** 404 Not Found

Program hanya memiliki endpoint `GET /mahasiswa`, sehingga endpoint `GET /mahasiswa/99` tidak tersedia.

Hasil pengujian:

```json
{
  "success": false,
  "message": "Endpoint GET /mahasiswa/99 tidak ditemukan"
}
```

**Status:** 404 Not Found

Hasilnya sesuai dengan prediksi.

## 4. Refleksi

HTTP request adalah permintaan yang dikirim dari client ke server, sedangkan HTTP response adalah balasan dari server. Status code digunakan untuk mengetahui hasil dari request yang dikirim. Contohnya, status 200 berarti request berhasil dan status 404 berarti endpoint tidak ditemukan.