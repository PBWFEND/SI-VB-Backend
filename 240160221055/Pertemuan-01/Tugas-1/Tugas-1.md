# Tugas 1 — Analisis & Desain API
## Sistem Informasi Absensi Organisasi

**Nama:** Rasya Putri Ramadhani  
**NPM:** 240160221055

### 1. Deskripsi Sistem

Sistem Informasi Absensi Organisasi merupakan sistem yang digunakan oleh pengurus organisasi sebagai admin untuk mengelola data anggota dan mencatat kehadiran anggota dalam berbagai kegiatan organisasi. Sistem ini menyediakan fitur untuk menambahkan, melihat, mengubah, dan menghapus data anggota serta mencatat, melihat, mengubah, dan menghapus data absensi. Data absensi mencatat anggota, tanggal, kegiatan, dan status kehadiran seperti Hadir, Izin, Sakit, dan Alpa.

---

### 2. Resource

Sistem memiliki dua resource utama, yaitu:

#### A. Anggota

Resource `anggota` digunakan untuk mengelola data anggota organisasi.

Atribut:

* `id`
* `nama`
* `npm`
* `divisi`

#### B. Absensi

Resource `absensi` digunakan untuk mengelola data kehadiran anggota dalam kegiatan organisasi.

Atribut:

* `id`
* `id_anggota`
* `tanggal`
* `kegiatan`
* `status`

Nilai `status` yang digunakan:

* `Hadir`
* `Izin`
* `Sakit`
* `Alpa`

---

### 3. Tabel Resource & Endpoint

| No. | Operasi                            | Method | Endpoint       | Request Body | Response Body           | Status Sukses | Status Gagal                   |
| --- | ---------------------------------- | ------ | -------------- | ------------ | ----------------------- | ------------- | ------------------------------ |
| 1   | Menampilkan semua anggota          | GET    | `/anggota`     | -            | Daftar anggota          | 200 OK        | 500 Internal Server Error      |
| 2   | Menampilkan anggota berdasarkan ID | GET    | `/anggota/:id` | -            | Data anggota            | 200 OK        | 404 Not Found                  |
| 3   | Menambahkan anggota                | POST   | `/anggota`     | Data anggota | Data anggota baru       | 201 Created   | 400 Bad Request                |
| 4   | Mengubah anggota                   | PUT    | `/anggota/:id` | Data anggota | Data anggota diperbarui | 200 OK        | 400 Bad Request, 404 Not Found |
| 5   | Menghapus anggota                  | DELETE | `/anggota/:id` | -            | Pesan berhasil dihapus  | 200 OK        | 404 Not Found                  |
| 6   | Menampilkan semua absensi          | GET    | `/absensi`     | -            | Daftar absensi          | 200 OK        | 500 Internal Server Error      |
| 7   | Menampilkan absensi berdasarkan ID | GET    | `/absensi/:id` | -            | Data absensi            | 200 OK        | 404 Not Found                  |
| 8   | Menambahkan absensi                | POST   | `/absensi`     | Data absensi | Data absensi baru       | 201 Created   | 400 Bad Request, 404 Not Found |
| 9   | Mengubah absensi                   | PUT    | `/absensi/:id` | Data absensi | Data absensi diperbarui | 200 OK        | 400 Bad Request, 404 Not Found |
| 10  | Menghapus absensi                  | DELETE | `/absensi/:id` | -            | Pesan berhasil dihapus  | 200 OK        | 404 Not Found                  |

**Keterangan status code:**

* `200 OK` — permintaan berhasil diproses.
* `201 Created` — data baru berhasil dibuat.
* `400 Bad Request` — data atau format request tidak valid.
* `404 Not Found` — data yang diminta tidak ditemukan.
* `500 Internal Server Error` — terjadi kesalahan pada server.

---

### 4. Contoh JSON

#### A. Resource Anggota

**Request Body — POST `/anggota`**

```json
{
  "nama": "Rasya Putri Ramadhani",
  "npm": "240160221055",
  "divisi": "Backend"
}
```

**Response Body**

```json
{
  "message": "Anggota berhasil ditambahkan",
  "data": {
    "id": 1,
    "nama": "Rasya Putri Ramadhani",
    "npm": "240160221055",
    "divisi": "Backend"
  }
}
```

#### B. Resource Absensi

**Request Body — POST `/absensi`**

```json
{
  "id_anggota": 1,
  "tanggal": "2026-09-22",
  "kegiatan": "Pembelajaran Rutin dan Workshop",
  "status": "Hadir"
}
```

**Response Body**

```json
{
  "message": "Absensi berhasil dicatat",
  "data": {
    "id": 1,
    "id_anggota": 1,
    "tanggal": "2026-09-22",
    "kegiatan": "Pembelajaran Rutin dan Workshop",
    "status": "Hadir"
  }
}
```

---

### 5. Skenario Uji

#### Skenario 1 — Berhasil Menampilkan Data Anggota

**Request**

```http
GET /anggota/1
```

**Response**

```json
{
  "message": "Data anggota ditemukan",
  "data": {
    "id": 1,
    "nama": "Rasya Putri Ramadhani",
    "npm": "240160221055",
    "divisi": "Backend"
  }
}
```

**Status:** `200 OK`

---

#### Skenario 2 — Berhasil Menambahkan Data Absensi

**Request**

```http
POST /absensi
```

**Request Body**

```json
{
  "id_anggota": 1,
  "tanggal": "2026-09-22",
  "kegiatan": "Pembelajaran Rutin dan Workshop",
  "status": "Hadir"
}
```

**Response**

```json
{
  "message": "Absensi berhasil dicatat",
  "data": {
    "id": 1,
    "id_anggota": 1,
    "tanggal": "2026-09-22",
    "kegiatan": "Pembelajaran Rutin dan Workshop",
    "status": "Hadir"
  }
}
```

**Status:** `201 Created`

---

#### Skenario 3 — Gagal Karena Data Anggota Tidak Ditemukan

**Request**

```http
GET /anggota/999
```

**Response**

```json
{
  "message": "Anggota tidak ditemukan"
}
```

**Status:** `404 Not Found`

---

### 6. Arsitektur Sistem

Alur komunikasi sistem adalah:

**Client → HTTP Request → Back End/API → Database → Data → Back End/API → HTTP Response → Client**

Komponen yang digunakan:

* **Client:** Pengurus/Admin
* **Back End/API:** menyediakan endpoint `/anggota` dan `/absensi`
* **Database:** menyimpan data `anggota` dan `absensi`

Diagram arsitektur tersedia pada file `diagram.png`, sedangkan file sumber diagram tersedia pada `diagram.excalidraw`.