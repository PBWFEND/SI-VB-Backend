# Sistem Informasi Absensi Organisasi

## Deskripsi Sistem

Sistem Informasi Absensi Organisasi merupakan sistem yang digunakan untuk mengelola dan mencatat kehadiran anggota dalam suatu organisasi secara terkomputerisasi. Pengguna sistem terdiri dari anggota organisasi dan pengurus atau admin. Anggota dapat melakukan absensi dengan mencatat waktu kehadiran, sedangkan pengurus dapat mengelola data anggota, melihat dan memantau data absensi, serta membuat laporan kehadiran. Sistem ini memiliki fitur utama berupa pengelolaan data anggota, pencatatan absensi, melihat riwayat kehadiran, dan pengelolaan data absensi. Sistem menyediakan API berbasis HTTP yang memungkinkan client berkomunikasi dengan back end dan database menggunakan format JSON.
    ## Resource dan Endpoint

Sistem Informasi Absensi Organisasi memiliki 2 resource utama, yaitu `anggota` dan `absensi`.

### 1. Resource Anggota

| Operasi | Method | Endpoint | Request Body | Response Body | Status Code |
|---|---|---|---|---|---|
| Melihat semua anggota | GET | `/anggota` | Tidak ada | Data seluruh anggota | 200, 500 |
| Melihat anggota berdasarkan ID | GET | `/anggota/:id` | Tidak ada | Data anggota berdasarkan ID | 200, 404 |
| Menambah anggota | POST | `/anggota` | Data anggota | Data anggota yang berhasil ditambahkan | 201, 400 |
| Mengubah anggota | PUT | `/anggota/:id` | Data anggota yang diubah | Data anggota yang berhasil diubah | 200, 400, 404 |

### 2. Resource Absensi

| Operasi | Method | Endpoint | Request Body | Response Body | Status Code |
|---|---|---|---|---|---|
| Melihat semua absensi | GET | `/absensi` | Tidak ada | Data seluruh absensi | 200, 500 |
| Melihat absensi berdasarkan ID | GET | `/absensi/:id` | Tidak ada | Data absensi berdasarkan ID | 200, 404 |
| Membuat absensi | POST | `/absensi` | Data absensi | Data absensi yang berhasil dibuat | 201, 400 |
| Mengubah absensi | PUT | `/absensi/:id` | Data absensi yang diubah | Data absensi yang berhasil diubah | 200, 400, 404 |

### Keterangan Status Code

- **200 OK**: Request berhasil.
- **201 Created**: Data berhasil dibuat.
- **400 Bad Request**: Data atau request yang dikirim tidak valid.
- **404 Not Found**: Data atau endpoint yang diminta tidak ditemukan.
- **500 Internal Server Error**: Terjadi kesalahan pada server.
# Sistem Informasi Absensi Organisasi

## 1. Deskripsi Sistem

Sistem Informasi Absensi Organisasi merupakan sistem yang digunakan untuk mengelola dan mencatat kehadiran anggota dalam suatu organisasi secara terkomputerisasi. Sistem ini digunakan oleh anggota organisasi dan pengurus atau admin. Anggota dapat melakukan absensi dengan mencatat waktu kehadiran, sedangkan pengurus atau admin dapat mengelola data anggota, melihat data absensi, memantau kehadiran anggota, serta mengelola data absensi. Fitur utama sistem meliputi pengelolaan data anggota, pencatatan absensi, melihat riwayat kehadiran, dan pengelolaan data absensi. Sistem menyediakan API berbasis HTTP yang memungkinkan client berkomunikasi dengan back end dan database menggunakan format JSON.

---

## 2. Resource

Sistem Informasi Absensi Organisasi memiliki 2 resource utama:

1. **Anggota**
2. **Absensi**

Resource `anggota` digunakan untuk mengelola data anggota organisasi.

Resource `absensi` digunakan untuk mencatat dan mengelola data kehadiran anggota organisasi.

---

## 3. Arsitektur Sistem

Arsitektur sistem menggunakan pola komunikasi antara client, back end, dan database.

Alur sistem:

**Client → HTTP Request → Back End / REST API → Database → Back End → HTTP Response → Client**

Keterangan:

- **Client** mengirimkan request kepada server.
- **HTTP Request** digunakan untuk meminta atau mengirim data.
- **Back End / REST API** menerima dan memproses request dari client.
- **Database** digunakan untuk menyimpan dan mengambil data.
- **HTTP Response** dikirimkan oleh back end kepada client dalam format JSON.

Diagram arsitektur tersedia pada folder `diagram`.

---

## 4. Resource dan Endpoint

### 4.1 Resource Anggota

| Operasi | Method | Endpoint | Request Body | Response Body | Status Code |
|---|---|---|---|---|---|
| Melihat semua anggota | GET | `/anggota` | Tidak ada | Data seluruh anggota | 200, 500 |
| Melihat anggota berdasarkan ID | GET | `/anggota/:id` | Tidak ada | Data anggota berdasarkan ID | 200, 404 |
| Menambah anggota | POST | `/anggota` | Data anggota | Data anggota yang berhasil ditambahkan | 201, 400 |
| Mengubah anggota | PUT | `/anggota/:id` | Data anggota yang diubah | Data anggota yang berhasil diubah | 200, 400, 404 |

### 4.2 Resource Absensi

| Operasi | Method | Endpoint | Request Body | Response Body | Status Code |
|---|---|---|---|---|---|
| Melihat semua absensi | GET | `/absensi` | Tidak ada | Data seluruh absensi | 200, 500 |
| Melihat absensi berdasarkan ID | GET | `/absensi/:id` | Tidak ada | Data absensi berdasarkan ID | 200, 404 |
| Membuat absensi | POST | `/absensi` | Data absensi | Data absensi yang berhasil dibuat | 201, 400 |
| Mengubah absensi | PUT | `/absensi/:id` | Data absensi yang diubah | Data absensi yang berhasil diubah | 200, 400, 404 |

### Keterangan Status Code

- **200 OK**: Request berhasil diproses.
- **201 Created**: Data berhasil dibuat.
- **400 Bad Request**: Data atau request yang dikirim tidak valid.
- **404 Not Found**: Data yang diminta tidak ditemukan.
- **500 Internal Server Error**: Terjadi kesalahan pada server.

---

## 5. Contoh JSON

### 5.1 Resource Anggota

#### Request Body

Contoh request untuk menambahkan anggota melalui endpoint `POST /anggota`.

```json
{
  "nama": "Rifqie",
  "nim": "240160221046",
  "jabatan": "Anggota",
  "no_hp": "081234567890"
}
## 6. Skenario Uji

### Skenario Uji 1 — Melihat Semua Data Anggota

**Tujuan:**  
Menguji endpoint untuk menampilkan seluruh data anggota.

**Request:**

```http
GET /anggota