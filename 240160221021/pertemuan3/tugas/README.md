# Tugas 2 - Server Informasi Kelas

Nama dan NIM: Lintang Azzahra Govarana (240160221021)

Project Node.js tanpa Express.js yang menyediakan server informasi kelas dengan konfigurasi dari environment variable, response JSON, dan operasi baca file asynchronous.

## Struktur file

```
tugas/
├── README.md
├── config.js
├── server.js
├── data/
│   └── kelas.json
└── refleksi.md
```

- `config.js`: konfigurasi nama aplikasi, port, dan environment dari environment variable.
- `server.js`: HTTP server, routing manual, dan helper response JSON.
- `data/kelas.json`: data kelas yang dibaca secara asynchronous oleh endpoint `/kelas`.

## Cara menjalankan

Syarat: Node.js versi 20 atau lebih baru.

```
node server.js
```

Server berjalan di `http://localhost:3003`. Port dan nama aplikasi dapat diubah lewat environment variable. Contoh di PowerShell:

```
$env:PORT="3050"; $env:APP_NAME="Server Kelas Saya"; node server.js
```

## Daftar endpoint

| Method | Endpoint | Fungsi | Status |
|:--|:--|:--|:--|
| GET | / | Pesan selamat datang dan daftar endpoint | 200 |
| GET | /health | Pemeriksaan status server dan versi Node.js | 200 |
| GET | /kelas | Membaca data kelas dari data/kelas.json | 200 / 500 |
| GET | /waktu | Waktu server saat ini | 200 |
| GET | endpoint lain | Endpoint tidak ditemukan | 404 |

## Contoh pengujian

```
curl.exe -i http://localhost:3003/
curl.exe -i http://localhost:3003/health
curl.exe -i http://localhost:3003/kelas
curl.exe -i http://localhost:3003/waktu
curl.exe -i http://localhost:3003/tidak-ada
```

## Bukti pengujian

Endpoint berhasil, `GET /health`:

```
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "success": true,
  "status": "up",
  "node": "v24.18.0"
}
```

Endpoint tidak tersedia, `GET /tidak-ada`:

```
HTTP/1.1 404 Not Found
Content-Type: application/json; charset=utf-8

{
  "success": false,
  "message": "Endpoint GET /tidak-ada tidak ditemukan"
}
```

Endpoint `/`, `/kelas`, dan `/waktu` juga sudah diuji lewat browser dan mengembalikan `success: true`.