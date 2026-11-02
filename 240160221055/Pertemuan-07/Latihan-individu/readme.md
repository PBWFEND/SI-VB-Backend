# Latihan Individu Pertemuan 7

## Deskripsi

Project ini merupakan latihan pengembangan REST API untuk resource **Pengguna** menggunakan Express, Prisma, dan SQLite.

Pada latihan ini, resource pengguna memiliki beberapa fitur, yaitu:

- Menampilkan daftar pengguna.
- Menampilkan pengguna berdasarkan filter NIM.
- Menambahkan pengguna baru.
- Menghapus pengguna berdasarkan NIM.
- Melakukan validasi input sebelum data diproses ke database.

## Teknologi yang Digunakan

- Node.js
- Express
- Prisma
- SQLite
- TypeScript

## Struktur Sederhana

```text
Latihan-Individu/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
├── client.ts
├── latihan.ts
├── package.json
├── prisma.config.ts
├── README.md
└── refleksi.md
```

## Instalasi

Masuk ke folder project:

```bash
cd code/pertemuan-07
```

Install dependency:

```bash
npm install
```

Jalankan migration database:

```bash
npx prisma migrate dev --name pengguna
```

## Menjalankan Server

Jalankan perintah:

```bash
node --experimental-strip-types latihan.ts
```

Server akan berjalan pada:

```text
http://localhost:3009
```

## Endpoint API

### 1. GET /pengguna

Menampilkan seluruh data pengguna.

```bash
curl.exe -i "http://localhost:3009/pengguna"
```

Status berhasil:

```text
200 OK
```

### 2. GET /pengguna?nim=

Menampilkan pengguna berdasarkan filter NIM.

```bash
curl.exe -i "http://localhost:3009/pengguna?nim=240160221055"
```

Status berhasil:

```text
200 OK
```

### 3. POST /pengguna

Menambahkan pengguna baru.

Contoh data:

```json
{
  "nim": "240160221055",
  "nama": "Rasya Putri Ramadhani",
  "email": "rasya@example.com",
  "role": "USER"
}
```

Untuk pengujian menggunakan PowerShell, buat file JSON terlebih dahulu:

```powershell
Set-Content -Path pengguna.json -Value '{"nim":"240160221055","nama":"Rasya Putri Ramadhani","email":"rasya@example.com","role":"USER"}'
```

Kemudian jalankan:

```bash
curl.exe -i -X POST "http://localhost:3009/pengguna" -H "Content-Type: application/json" --data-binary "@pengguna.json"
```

Status berhasil:

```text
201 Created
```

### 4. DELETE /pengguna/:nim

Menghapus pengguna berdasarkan NIM.

```bash
curl.exe -i -X DELETE "http://localhost:3009/pengguna/240160221055"
```

Status berhasil:

```text
204 No Content
```

Jika pengguna tidak ditemukan, endpoint akan mengembalikan:

```text
404 Not Found
```

## Hasil Pengujian

Pengujian dilakukan menggunakan `curl` melalui PowerShell dengan hasil:

| Endpoint | Status | Hasil |
|---|---|---|
| GET `/pengguna` | 200 OK | Berhasil menampilkan daftar pengguna |
| POST `/pengguna` | 201 Created | Berhasil menambahkan pengguna |
| GET `/pengguna?nim=240160221055` | 200 OK | Berhasil menampilkan pengguna berdasarkan NIM |
| DELETE `/pengguna/240160221055` | 204 No Content | Berhasil menghapus pengguna |

## Catatan

File berikut tidak perlu disertakan saat melakukan commit ke GitHub:

```text
node_modules/
.env
*.db
```