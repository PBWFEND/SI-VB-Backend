# Tugas 3 — Perancangan dan Implementasi RESTful API

**Nama:** Rahma Nadya
**NIM:** 240160221035
**Mata Kuliah:** Praktikum Backend

## Deskripsi

Project ini merupakan pengembangan API Absensi Organisasi menggunakan Express.js. API menyediakan pengelolaan data anggota dan absensi dengan metode HTTP yang sesuai, validasi input, filter query, serta respons JSON yang konsisten.

## Teknologi

* Node.js
* Express.js
* PowerShell untuk pengujian API

## Cara Menjalankan

1. Pastikan Node.js sudah terinstal.

2. Buka terminal pada folder project.

3. Instal dependensi:

   ```bash
   npm install
   ```

4. Jalankan server:

   ```bash
   npm start
   ```

5. Akses API melalui `http://localhost:3008`.

Data disimpan dalam array di memori, sehingga akan kembali ke data awal ketika server dimulai ulang.

## Kontrak Endpoint

| Method | Endpoint                             | Fungsi                            | Status sukses |
| ------ | ------------------------------------ | --------------------------------- | ------------- |
| GET    | `/`                                  | Mengecek API                      | 200           |
| GET    | `/anggota`                           | Mengambil semua anggota           | 200           |
| GET    | `/anggota?nama=Rahma`                | Filter berdasarkan nama           | 200           |
| GET    | `/anggota?nim=240160221035`          | Filter berdasarkan NIM            | 200           |
| GET    | `/anggota/:id`                       | Detail anggota                    | 200           |
| POST   | `/anggota`                           | Menambahkan anggota               | 201           |
| PUT    | `/anggota/:id`                       | Mengganti seluruh data anggota    | 200           |
| PATCH  | `/anggota/:id`                       | Memperbarui sebagian data anggota | 200           |
| DELETE | `/anggota/:id`                       | Menghapus anggota                 | 204           |
| GET    | `/absensi`                           | Mengambil semua absensi           | 200           |
| GET    | `/absensi?anggota_id=1&status=Hadir` | Filter absensi                    | 200           |
| GET    | `/absensi/:id`                       | Detail absensi                    | 200           |
| POST   | `/absensi`                           | Menambahkan absensi               | 201           |
| PUT    | `/absensi/:id`                       | Mengganti seluruh data absensi    | 200           |
| PATCH  | `/absensi/:id`                       | Memperbarui sebagian data absensi | 200           |
| DELETE | `/absensi/:id`                       | Menghapus absensi                 | 204           |

## Validasi dan Penanganan Error

| Status | Keterangan                             |
| ------ | -------------------------------------- |
| 400    | Input tidak valid atau tidak lengkap   |
| 404    | Resource atau endpoint tidak ditemukan |
| 204    | Penghapusan berhasil tanpa body        |
| 500    | Kesalahan internal server              |

Respons sukses menggunakan properti `success`, `message`, dan `data`. Untuk daftar data, respons juga memuat properti `total`.

## Contoh Request

### Menambahkan anggota

```json
{
  "nama": "Budi Santoso",
  "nim": "240160221099"
}
```

### Memperbarui sebagian data anggota

```json
{
  "nama": "Budi Santoso Final"
}
```

### Menambahkan absensi

```json
{
  "anggota_id": 1,
  "kegiatan_id": 1,
  "status": "Hadir"
}
```

Status absensi yang diterima adalah `Hadir`, `Izin`, `Sakit`, dan `Alpha`.

## Hasil Pengujian

Pengujian yang telah dilakukan melalui PowerShell:

* GET endpoint utama berhasil.
* GET daftar dan detail anggota berhasil.
* Filter anggota berdasarkan nama dan NIM berhasil.
* GET daftar dan detail absensi berhasil.
* POST anggota berhasil dengan status 201.
* PUT dan PATCH anggota berhasil dengan status 200.
* Input anggota yang tidak lengkap ditolak dengan status 400.
* Anggota yang tidak ditemukan menghasilkan status 404.
* DELETE anggota berhasil dengan status 204 tanpa body.

Pengujian endpoint lainnya perlu dilengkapi dan didokumentasikan dengan bukti hasil pengujian aktual.

## Bukti Pengujian

Screenshot pengujian disimpan di folder `bukti-testing/`.
