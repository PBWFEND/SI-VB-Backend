# Tugas 1 — Analisis & Desain API
## Sistem Informasi Absensi Kelas

**Nama:** Salwa Ananda Rachmat  
**NPM:** 240160221043

### 1. Deskripsi Sistem

Sistem Informasi Absensi Kelas merupakan sistem yang digunakan untuk mengelola data mahasiswa dan mencatat kehadiran mahasiswa dalam kegiatan perkuliahan. Sistem ini menyediakan fitur untuk menambahkan, menampilkan, mengubah, dan menghapus data mahasiswa serta mencatat dan mengelola data absensi kelas.

Data absensi berisi informasi mahasiswa, tanggal perkuliahan, mata kuliah, dan status kehadiran seperti Hadir, Izin, Sakit, dan Alpa. Dengan adanya sistem ini, proses pencatatan kehadiran mahasiswa dapat dilakukan dengan lebih terstruktur.

### 2. Resource

Sistem memiliki dua resource utama, yaitu:

#### A. Mahasiswa

Resource `mahasiswa` digunakan untuk mengelola data mahasiswa.

Atribut:
- `id`
- `nama`
- `npm`
- `kelas`

#### B. Absensi

Resource `absensi` digunakan untuk mengelola data kehadiran mahasiswa dalam kegiatan perkuliahan.

Atribut:
- `id`
- `id_mahasiswa`
- `tanggal`
- `mata_kuliah`
- `status`

Nilai `status` yang digunakan:
- `Hadir`
- `Izin`
- `Sakit`
- `Alpa`

### 3. Tabel Resource & Endpoint

| No. | Operasi | Method | Endpoint | Request Body | Status Sukses | Status Gagal |
|---|---|---|---|---|---|---|
| 1 | Menampilkan semua mahasiswa | GET | `/mahasiswa` | - | 200 OK | 500 Internal Server Error |
| 2 | Menampilkan mahasiswa berdasarkan ID | GET | `/mahasiswa/:id` | - | 200 OK | 404 Not Found |
| 3 | Menambahkan mahasiswa | POST | `/mahasiswa` | Data mahasiswa | 201 Created | 400 Bad Request |
| 4 | Mengubah data mahasiswa | PUT | `/mahasiswa/:id` | Data mahasiswa | 200 OK | 400 Bad Request, 404 Not Found |
| 5 | Menghapus mahasiswa | DELETE | `/mahasiswa/:id` | - | 200 OK | 404 Not Found |
| 6 | Menampilkan semua absensi | GET | `/absensi` | - | 200 OK | 500 Internal Server Error |
| 7 | Menampilkan absensi berdasarkan ID | GET | `/absensi/:id` | - | 200 OK | 404 Not Found |
| 8 | Menambahkan absensi | POST | `/absensi` | Data absensi | 201 Created | 400 Bad Request, 404 Not Found |
| 9 | Mengubah data absensi | PUT | `/absensi/:id` | Data absensi | 200 OK | 400 Bad Request, 404 Not Found |
| 10 | Menghapus data absensi | DELETE | `/absensi/:id` | - | 200 OK | 404 Not Found |

**Keterangan status code:**
- `200 OK`: Permintaan berhasil diproses.
- `201 Created`: Data baru berhasil dibuat.
- `400 Bad Request`: Data yang dikirim tidak lengkap atau tidak valid.
- `404 Not Found`: Data atau endpoint yang diminta tidak ditemukan.
- `500 Internal Server Error`: Terjadi kesalahan pada server.

### 4. Contoh JSON

#### A. Resource Mahasiswa

**Request Body — POST `/mahasiswa`**

```json
{
  "nama": "Salwa Ananda Rachmat",
  "npm": "240160221043",
  "kelas": "SI-VB"
}
```

**Response Body**

```json
{
  "message": "Mahasiswa berhasil ditambahkan",
  "data": {
    "id": 1,
    "nama": "Salwa Ananda Rachmat",
    "npm": "240160221043",
    "kelas": "SI-VB"
  }
}
```

#### B. Resource Absensi

**Request Body — POST `/absensi`**

```json
{
  "id_mahasiswa": 1,
  "tanggal": "2026-10-22",
  "mata_kuliah": "Pemrograman Web",
  "status": "Hadir"
}
```

**Response Body**

```json
{
  "message": "Absensi berhasil dicatat",
  "data": {
    "id": 1,
    "id_mahasiswa": 1,
    "tanggal": "2026-10-22",
    "mata_kuliah": "Pemrograman Web",
    "status": "Hadir"
  }
}
```

### 5. Skenario Uji

#### Skenario 1 — Berhasil Menampilkan Data Mahasiswa

**Request**

```http
GET /mahasiswa/1
```

**Response**

```json
{
  "message": "Data mahasiswa ditemukan",
  "data": {
    "id": 1,
    "nama": "Salwa Ananda Rachmat",
    "npm": "240160221043",
    "kelas": "SI-VB"
  }
}
```

**Status:** `200 OK`

#### Skenario 2 — Berhasil Menambahkan Data Absensi

**Request**

```http
POST /absensi
```

**Request Body**

```json
{
  "id_mahasiswa": 1,
  "tanggal": "2026-10-22",
  "mata_kuliah": "Pemrograman Web",
  "status": "Hadir"
}
```

**Response**

```json
{
  "message": "Absensi berhasil dicatat",
  "data": {
    "id": 1,
    "id_mahasiswa": 1,
    "tanggal": "2026-10-22",
    "mata_kuliah": "Pemrograman Web",
    "status": "Hadir"
  }
}
```

**Status:** `201 Created`

#### Skenario 3 — Gagal Karena Mahasiswa Tidak Ditemukan

**Request**

```http
GET /mahasiswa/999
```

**Response**

```json
{
  "message": "Mahasiswa tidak ditemukan"
}
```

**Status:** `404 Not Found`

### 6. Arsitektur Sistem

Alur komunikasi sistem adalah:

**Client → HTTP Request → Back End/API → Database → Data → Back End/API → HTTP Response → Client**

Komponen yang digunakan:
- **Client:** Admin atau dosen yang mengelola absensi kelas.
- **Back End/API:** Menyediakan endpoint `/mahasiswa` dan `/absensi`.
- **Database:** Menyimpan data mahasiswa dan data absensi.

Untuk implementasi awal, data dapat disimpan dalam array JavaScript. Jika ingin data tersimpan secara permanen, sistem dapat dikembangkan menggunakan database seperti MySQL.