# LATIHAN INDIVIDU — PERTEMUAN 4

**Nama:** Kikan Khairani  
**NPM:** 240160221019  
**Kelas:** SI

## Deskripsi Singkat

Pada Pertemuan 4, dilakukan latihan pembuatan REST API menggunakan Express.js dengan objek pengelolaan data berupa buku. Aplikasi ini dibuat untuk mempraktikkan cara kerja server dalam menerima dan memproses permintaan dari client melalui beberapa endpoint. Fitur yang diterapkan meliputi menampilkan seluruh data buku, mencari buku berdasarkan ID, memfilter buku berdasarkan status ketersediaan, serta menambahkan data buku baru. Selain itu, terdapat middleware untuk mencatat aktivitas request, validasi data sebelum penyimpanan, dan penanganan kesalahan ketika client mengakses data atau endpoint yang tidak tersedia. Seluruh proses pengujian dilakukan menggunakan curl melalui PowerShell.

## Struktur Folder

```text
240160221019-Kikan-Khairani/
└── 240160221019/
    └── pertemuan_4/
        └── latihan_individu/
            ├── latihan.js
            ├── package.json
            ├── package-lock.json
            ├── data.json
            ├── verifikasi.json
            └── node_modules/
```

## Cara Menjalankan

Buka PowerShell pada folder proyek, kemudian jalankan perintah berikut:

**1. Masuk ke folder proyek**

```powershell
cd 240160221019/pertemuan_4/latihan_individu
```

**2. Instal dependency**

```bash
npm install
```

**3. Jalankan server**

```bash
node latihan.js
```

Server berhasil dijalankan pada alamat:

```text
http://localhost:3005
```

## Hasil Pengujian curl

### 1. GET /buku

**Perintah:**

```bash
curl.exe http://localhost:3005/buku
```

**Hasil:**

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

### 2. GET /buku?tersedia=true

**Perintah:**

```bash
curl.exe "http://localhost:3005/buku?tersedia=true"
```

**Hasil:**

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

### 3. GET /buku/1 (ditemukan)

**Perintah:**

```bash
curl.exe http://localhost:3005/buku/1
```

**Hasil:**

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

### 4. GET /buku/99 (tidak ditemukan)

**Perintah:**

```bash
curl.exe -i http://localhost:3005/buku/99
```

**Hasil:**

```text
HTTP/1.1 404 Not Found
Content-Type: application/json; charset=utf-8
Content-Length: 50
ETag: W/"32-2kLOF8Jziq6AV3cHCrWWwt8Je2c"
Date: Mon, 02 Nov 2026 02:27:03 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"success":false,"message":"Buku tidak ditemukan"}
```

### 5. POST /buku (berhasil)

**Perintah:**

```bash
curl.exe -X POST http://localhost:3005/buku -H "Content-Type: application/json" -d "@data.json"
```

**Isi file data.json:**

```json
{
  "judul": "Belajar React",
  "penulis": "Cici"
}
```

**Hasil:**

```json
{
  "success": true,
  "message": "Buku berhasil ditambahkan",
  "data": {
    "id": 3,
    "judul": "Belajar React",
    "penulis": "Cici",
    "tersedia": true
  }
}
```

### 6. POST /buku (validasi gagal)

**Perintah:**

```bash
curl.exe -X POST http://localhost:3005/buku -H "Content-Type: application/json" -d "@verifikasi.json"
```

**Hasil:**

```json
{
  "success": false,
  "message": "Field 'judul' dan 'penulis' wajib diisi"
}
```

### 7. GET /siswa (endpoint tidak ada)

**Perintah:**

```bash
curl.exe -i http://localhost:300