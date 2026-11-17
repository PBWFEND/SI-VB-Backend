# Latihan Individu — Pertemuan 5

**Nama** : Kikan Khairani  
**NPM** : 240160221019  
**Kelas** : [Isi Kelas]

---

## 📖 Deskripsi

Latihan ini merupakan implementasi REST API menggunakan Node.js dan Express.js untuk mengelola data mahasiswa. Pada latihan ini diterapkan beberapa fitur backend, yaitu:

1. Middleware logger yang mencatat **method** dan **URL** setiap request.
2. Endpoint `GET /mahasiswa/:nim` untuk mengambil data mahasiswa berdasarkan NIM dan memberikan respons jika data tidak ditemukan.
3. Filter `GET /mahasiswa?prodi=Sistem%20Informasi` untuk mencari mahasiswa berdasarkan program studi.
4. Filter `GET /mahasiswa?angkatan=2024` untuk mencari mahasiswa berdasarkan tahun angkatan.
5. Endpoint `POST /mahasiswa` untuk menambahkan data mahasiswa dengan validasi `nim`, `nama`, `prodi`, dan `angkatan`.
6. Endpoint `PATCH /mahasiswa/:nim` untuk memperbarui sebagian data mahasiswa.
7. Penanganan kondisi ketika data tidak ditemukan dan validasi input tidak terpenuhi.

### Daftar Endpoint

| No | Method | Endpoint | Query Params | Body (JSON) | Status Sukses | Status Error |
|:--:|:------:|:---------|:-------------|:------------|:-------------:|:------------:|
| 1 | **GET** | `/mahasiswa` | `?prodi=`, `?angkatan=` | — | `200 OK` | — |
| 2 | **GET** | `/mahasiswa/:nim` | — | — | `200 OK` | `404 Not Found` |
| 3 | **POST** | `/mahasiswa` | — | `{ nim, nama, prodi, angkatan }` | `201 Created` | `400 Bad Request` |
| 4 | **PATCH** | `/mahasiswa/:nim` | — | `{ nama?, prodi?, angkatan? }` | `200 OK` | `404 Not Found` |

### Status HTTP

| Status | Keterangan | Digunakan Pada |
|:------:|:-----------|:---------------|
| `200 OK` | Request berhasil | GET, PATCH |
| `201 Created` | Data mahasiswa berhasil ditambahkan | POST |
| `400 Bad Request` | Validasi gagal atau NIM duplikat | POST |
| `404 Not Found` | Data mahasiswa tidak ditemukan | GET detail, PATCH |
| `500 Internal Server Error` | Terjadi kesalahan pada server | Fallback |

---

## 🚀 Cara Menjalankan

### Prasyarat

- Node.js versi 18 atau lebih baru.
- NPM (Node Package Manager).

### Langkah-langkah

**1. Masuk ke direktori project**

```bash
cd 240160221019/pertemuan_5/latihan_individu
```

**2. Install dependencies**

```bash
npm install
```

**3. Jalankan server**

```bash
node latihan.js
```

Jika berhasil dijalankan, akan muncul pesan:

```text
Latihan REST API berjalan di http://localhost:3007
```

---

## BUKTI PENGERJAAN

### 1. Menjalankan Server

Project dijalankan melalui terminal PowerShell menggunakan perintah `node latihan.js`.

```text
PS C:\Users\Hp\Desktop\240160221019-Kikan-Khairani\240160221019\pertemuan_5\latihan_individu> node latihan.js

Latihan REST API berjalan di http://localhost:3007
```

### 2. Middleware Logger

Middleware logger berhasil mencatat waktu request, method, dan URL yang diakses.

```text
[2026-11-02T03:33:13.742Z] GET /mahasiswa
[2026-11-02T03:33:54.929Z] GET /mahasiswa
[2026-11-02T03:34:24.894Z] GET /mahasiswa?prodi=Sistem%20Informasi
[2026-11-02T03:34:56.987Z] GET /mahasiswa?angkatan=2024
[2026-11-02T03:35:40.151Z] GET /mahasiswa/240160221019
[2026-11-02T03:36:03.601Z] GET /mahasiswa/F1D022999
[2026-11-02T03:36:30.376Z] POST /mahasiswa
[2026-11-02T03:42:04.321Z] PATCH /mahasiswa/240160221020
[2026-11-02T03:42:54.285Z] PATCH /mahasiswa/999999999999
[2026-11-02T03:44:03.582Z] POST /mahasiswa
```

### 3. Pengujian GET /mahasiswa

Pengujian ini dilakukan untuk mengambil seluruh data mahasiswa yang tersedia.

**Perintah:**

```bash
curl.exe http://localhost:3007/mahasiswa
```

**Hasil:**

```json
{
  "success": true,
  "message": "Data mahasiswa berhasil diambil",
  "data": [
    {
      "nim": "240160221019",
      "nama": "Kikan Khairani",
      "prodi": "Sistem Informasi",
      "angkatan": 2024
    },
    {
      "nim": "230789192007",
      "nama": "William Jakrapatr",
      "prodi": "Sistem Informasi",
      "angkatan": 2023
    }
  ]
}
```

### 4. Pengujian Filter GET /mahasiswa?prodi=Sistem Informasi

Pengujian ini digunakan untuk mengambil data mahasiswa berdasarkan program studi.

**Perintah:**

```bash
curl.exe "http://localhost:3007/mahasiswa?prodi=Sistem%20Informasi"
```

**Hasil:**

```json
{
  "success": true,
  "message": "Data mahasiswa berhasil diambil",
  "data": [
    {
      "nim": "240160221019",
      "nama": "Kikan Khairani",
      "prodi": "Sistem Informasi",
      "angkatan": 2024
    },
    {
      "nim": "230789192007",
      "nama": "William Jakrapatr",
      "prodi": "Sistem Informasi",
      "angkatan": 2023
    }
  ]
}
```

### 5. Pengujian Filter GET /mahasiswa?angkatan=2024

Pengujian ini digunakan untuk mengambil data mahasiswa berdasarkan tahun angkatan.

**Perintah:**

```bash
curl.exe "http://localhost:3007/mahasiswa?angkatan=2024"
```

**Hasil:**

```json
{
  "success": true,
  "message": "Data mahasiswa berhasil diambil",
  "data": [
    {
      "nim": "240160221019",
      "nama": "Kikan Khairani",
      "prodi": "Sistem Informasi",
      "angkatan": 2024
    }
  ]
}
```

### 6. Pengujian GET /mahasiswa/:nim

Pengujian ini dilakukan untuk mengambil detail mahasiswa berdasarkan NIM.

**Perintah:**

```bash
curl.exe http://localhost:3007/mahasiswa/240160221019
```

**Hasil:**

```json
{
  "success": true,
  "message": "Detail mahasiswa berhasil diambil",
  "data": {
    "nim": "240160221019",
    "nama": "Kikan Khairani",
    "prodi": "Sistem Informasi",
    "angkatan": 2024
  }
}
```

### 7. Pengujian GET dengan NIM Tidak Ditemukan

Pengujian ini dilakukan untuk memastikan sistem memberikan respons ketika NIM yang dimasukkan tidak tersedia.

**Perintah:**

```bash
curl.exe http://localhost:3007/mahasiswa/F1D022999
```

**Hasil:**

```json
{
  "success": false,
  "message": "Mahasiswa tidak ditemukan"
}
```

### 8. Pengujian POST /mahasiswa

Pengujian ini digunakan untuk menambahkan data mahasiswa baru.

Data dikirim melalui file `data.json` dengan isi:

```json
{
  "nim": "240160221020",
  "nama": "Kikan Khairani",
  "prodi": "Sistem Informasi",
  "angkatan": 2024
}
```

**Perintah:**

```bash
curl.exe -X POST http://localhost:3007/mahasiswa -H "Content-Type: application/json" --data-binary "@data.json"
```

**Hasil:**

```json
{
  "success": true,
  "message": "Mahasiswa berhasil ditambahkan",
  "data": {
    "nim": "240160221020",
    "nama": "Kikan Khairani",
    "prodi": "Sistem Informasi",
    "angkatan": 2024
  }
}
```

### 9. Pengujian Validasi POST

Pengujian ini dilakukan dengan mengirimkan data mahasiswa yang memiliki NIM kosong untuk memastikan validasi berjalan.

File `invalid.json`:

```json
{
  "nim": "",
  "nama": "Budi Santoso",
  "prodi": "Sistem Informasi",
  "angkatan": 2024
}
```

**Perintah:**

```bash
curl.exe -X POST http://localhost:3007/mahasiswa -H "Content-Type: application/json" --data-binary "@invalid.json"
```

**Hasil:**

```json
{
  "success": false,
  "message": "Validasi gagal",
  "details": [
    "NIM wajib diisi"
  ]
}
```

### 10. Pengujian PATCH /mahasiswa/:nim

Pengujian ini digunakan untuk memperbarui sebagian data mahasiswa berdasarkan NIM.

File `patch.json`:

```json
{
  "nama": "Kikan Khairani Baru"
}
```

**Perintah:**

```bash
curl.exe -X PATCH http://localhost:3007/mahasiswa/240160221020 -H "Content-Type: application/json" --data-binary "@patch.json"
```

**Hasil:**

```json
{
  "success": true,
  "message": "Data mahasiswa berhasil diperbarui",
  "data": {
    "nim": "240160221020",
    "nama": "Kikan Khairani Baru",
    "prodi": "Sistem Informasi",
    "angkatan": 2024
  }
}
```

### 11. Pengujian PATCH dengan NIM Tidak Ditemukan

Pengujian ini dilakukan untuk memastikan sistem memberikan respons ketika NIM yang akan diperbarui tidak tersedia.

**Perintah:**

```bash
curl.exe -X PATCH http://localhost:3007/mahasiswa/999999999999 -H "Content-Type: application/json" --data-binary "@patch.json"
```

**Hasil:**

```json
{
  "success": false,
  "message": "Mahasiswa tidak ditemukan"
}
```

---

## Kesimpulan

Berdasarkan latihan yang telah dikerjakan, REST API pengelolaan data mahasiswa berhasil dibuat menggunakan Node.js dan Express.js. Fitur yang diterapkan meliputi middleware logger, pengambilan data mahasiswa, pencarian berdasarkan NIM, filter berdasarkan program studi dan angkatan, penambahan data dengan validasi, serta pembaruan sebagian data menggunakan method PATCH.

Pengujian menunjukkan bahwa endpoint dapat memberikan respons sesuai dengan kondisi request, termasuk ketika data tidak ditemukan dan ketika validasi input gagal.