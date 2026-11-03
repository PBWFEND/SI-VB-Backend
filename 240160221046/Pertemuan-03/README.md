# Pertemuan 3 — Modul, File, Environment, & HTTP Server

Laporan dan dokumentasi latihan individu mengenai Node.js Fundamentals: konfigurasi Environment Variables, manipulasi file secara asinkron dengan `node:fs/promises`, penanganan error dengan `try/catch`, dan endpoint HTTP berbasis data JSON.

- **Nama**: Sutiawan
- **NIM**: 240160221046
- **Mata Kuliah**: Praktikum Pemrograman Backend

---

## 1. Komponen & Implementasi

### 1. Environment Variable `COURSE_CODE` ([config.js](file:///d:/Backend/240160221046/Pertemuan-03/config.js))
Menyediakan konfigurasi terpusat dengan nilai bawaan:
```javascript
export const COURSE_CODE = process.env.COURSE_CODE ?? "CPMK115";
```

### 2. Fungsi `bacaJSON(namaFile)` dengan `try/catch` ([latihan.js](file:///d:/Backend/240160221046/Pertemuan-03/latihan.js) & [server.js](file:///d:/Backend/240160221046/Pertemuan-03/server.js))
Membaca file JSON secara asinkron dan menangani kemungkinan error file tidak ditemukan (`ENOENT`):
```javascript
export async function bacaJSON(namaFile) {
  try {
    const isi = await readFile(namaFile, "utf8");
    return JSON.parse(isi);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.warn(`[bacaJSON] File tidak ditemukan: ${namaFile}`);
      return null;
    }
    console.error(`[bacaJSON] Gagal membaca atau mem-parse JSON: ${error.message}`);
    return null;
  }
}
```

### 3. Endpoint `GET /students` ([server.js](file:///d:/Backend/240160221046/Pertemuan-03/server.js))
Membaca file data [students.json](file:///d:/Backend/240160221046/Pertemuan-03/students.json) via `bacaJSON` dan mengembalikan response JSON:
```json
{
  "success": true,
  "courseCode": "CPMK115",
  "total": 3,
  "data": [
    { "nim": "240160221046", "nama": "Sutiawan", "prodi": "Teknik Informatika" },
    { "nim": "F1D022001", "nama": "Jhon Doe", "prodi": "Sistem Informasi" },
    { "nim": "F1D022002", "nama": "Ani Lestari", "prodi": "Teknik Informatika" }
  ]
}
```

---

## 2. Hasil Pengujian Tiga Kondisi

### Kondisi 1: Endpoint Tersedia (`GET /` dan `GET /students`)

```powershell
curl.exe -i http://localhost:3003/
```
**Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "Selamat datang di API Pertemuan 3",
  "courseCode": "CPMK115",
  "endpoints": [
    "GET /",
    "GET /health",
    "GET /students"
  ]
}
```

```powershell
curl.exe -i http://localhost:3003/students
```
**Response (`200 OK`)**:
```json
{
  "success": true,
  "courseCode": "CPMK115",
  "total": 3,
  "data": [
    { "nim": "240160221046", "nama": "Sutiawan", "prodi": "Teknik Informatika" },
    { "nim": "F1D022001", "nama": "Jhon Doe", "prodi": "Sistem Informasi" },
    { "nim": "F1D022002", "nama": "Ani Lestari", "prodi": "Teknik Informatika" }
  ]
}
```

---

### Kondisi 2: Endpoint Tidak Tersedia (`404 Not Found`)

```powershell
curl.exe -i http://localhost:3003/tidak-ada
```
**Response (`404 Not Found`)**:
```json
{
  "success": false,
  "message": "Endpoint GET /tidak-ada tidak ditemukan"
}
```

---

### Kondisi 3: Environment Variable Diubah

Menjalankan server dengan `COURSE_CODE="IF202"`:
```powershell
$env:COURSE_CODE="IF202"; node server.js
```
Lalu panggil endpoint:
```powershell
curl.exe -i http://localhost:3003/students
```
**Response (`200 OK`)**:
```json
{
  "success": true,
  "courseCode": "IF202",
  "total": 3,
  "data": [
    { "nim": "240160221046", "nama": "Sutiawan", "prodi": "Teknik Informatika" },
    { "nim": "F1D022001", "nama": "Jhon Doe", "prodi": "Sistem Informasi" },
    { "nim": "F1D022002", "nama": "Ani Lestari", "prodi": "Teknik Informatika" }
  ]
}
```
Nilai `courseCode` dinamis mengikuti environment variable yang diberikan.

---

## 3. Cara Menjalankan

```powershell
cd d:\Backend\240160221046\Pertemuan-03

# Uji script latihan filesystem & try/catch
node latihan.js

# Jalankan server
node server.js
```
