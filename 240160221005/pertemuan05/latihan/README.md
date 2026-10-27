# LATIHAN INDIVIDU PERTEMUAN 5

Nama    : Cinta Rahmia Yulianti
NPM     : 240160221005
Kelas   : SI-VB

Latihan menerapkan resource, filter query, status code, dan response JSON
menggunakan Express.js.

## CARA MENJALANKAN

```bash
cd code/pertemuan-05
npm install
node latihan.js

hasilnya : 
Latihan REST API berjalan di http://localhost:3007

```

## DAFTAR ENDPOINT
--dibantu merapihkannya oleh deepseek--

| Method | URL             | Deskripsi                                                    |
|:-------|:----------------|:-------------------------------------------------------------|
| GET    | /mahasiswa      | Ambil semua mahasiswa (bisa filter ?prodi= & ?angkatan=)     |
| GET    | /mahasiswa/:nim | Detail mahasiswa berdasarkan NIM                             |
| POST   | /mahasiswa      | Tambah mahasiswa baru                                        |
| PATCH  | /mahasiswa/:nim | Ubah sebagian data mahasiswa                                 |
| DELETE | /mahasiswa/:nim | Hapus mahasiswa                                              |

## HASIL PENGUJIAN 
# 1) GET /mahasiswa
perintah:
curl.exe -i http://localhost:3007/mahasiswa

hasil:
            {
            "success": true,
            "message": "Data mahasiswa berhasil diambil",
            "data": [
                {
                "nim": "F1D022001",
                "nama": "Jhon Doe",
                "prodi": "Sistem Informasi",
                "angkatan": 2024
                },
                {
                "nim": "F1D022002",
                "nama": "Ani Lestari",
                "prodi": "Sistem Informasi",
                "angkatan": 2023
                }
            ]
            }

Status Code: 200 OK
response : HTTP/1.1 200 OK

# 2) GET /mahasiswa?prodi=Sistem%20Informasi 
perintah:
curl.exe -i "http://localhost:3007/mahasiswa?prodi=Sistem%20Informasi&angkatan=2024"

hasil:
        {
        "success": true,
        "message": "Data mahasiswa berhasil diambil",
        "data": [
            {
            "nim": "F1D022001",
            "nama": "Jhon Doe",
            "prodi": "Sistem Informasi",
            "angkatan": 2024
            }
        ]
        }

Status Code: 200 OK
response : HTTP/1.1 200 OK

# 3) GET /mahasiswa/F1D022001
perintah:
curl.exe -i http://localhost:3007/mahasiswa/F1D022001

hasil:
        {
        "success": true,
        "message": "Detail mahasiswa berhasil diambil",
        "data": {
            "nim": "F1D022001",
            "nama": "Jhon Doe",
            "prodi": "Sistem Informasi",
            "angkatan": 2024
        }
        }

Status Code: 200 OK
response : HTTP/1.1 200 OK

# 4) GET /mahasiswa/F1D099999 - 404 Not Found
perintah:
curl.exe -i http://localhost:3007/mahasiswa/F1D099999

hasil:
{"success":false,"message":"Mahasiswa tidak ditemukan"}

Status Code: 404 Not Found 
response : HTTP/1.1 404 Not Found   


# 5) POST /mahasiswa (valid) - 201 Created
perintah:
curl.exe -i -X POST http://localhost:3007/mahasiswa -H "Content-Type: application/json" --data-binary "@body.json"

keterangan: memperbaharui code di latihan.js nya karena saat mencoba menambahkan nama mahasiswa tidak muncul dan terjadi error langkah ini dilakukan agar perintah bisa berjalan. dan di bantu oleh deepseek pada perintah ini

hasil:
    {
        "success": true,
        "message": "Mahasiswa berhasil ditambahkan",
        "data": {
            "nim": "240160221005",
            "nama": "Cinta Rahmia Yulianti",
            "prodi": "Sistem Informasi",
            "angkatan": 2024
        }
    }

Status Code: 201 Created
response : HTTP/1.1 201 Created


# 6) POST /mahasiswa (tidak valid) - 400 Bad Request
perintah:
curl.exe -i -X POST http://localhost:3007/mahasiswa \
  -H "Content-Type: application/json" \
  -d '{"nim":"","nama":"","prodi":"","angkatan":"dua ribu"}'

hasil:
{
  "success": false,
  "message": "Validasi gagal",
  "errors": [
    "nim wajib diisi (string)",
    "nama wajib diisi (string)",
    "prodi wajib diisi (string)",
    "angkatan wajib bilangan bulat 1900–2100"
  ]
}

Status Code: 400 Bad Request
response: HTTP/1.1 400 Bad Request


# 7) PATCH /mahasiswa/F1D022001
perintah:
curl.exe -i -X PATCH http://localhost:3007/mahasiswa/F1D022001 \
  -H "Content-Type: application/json" \
  -d '{"nama":"Jhon Doe Updated","angkatan":2025}'

hasil:
{
  "success": true,
  "message": "Data mahasiswa berhasil diperbarui",
  "data": {
    "nim": "F1D022001",
    "nama": "Jhon Doe",
    "prodi": "Sistem Informasi",
    "angkatan": 2024
  }
}

Status Code: 200 OK
response : HTTP/1.1 200 OK


# 8) PATCH /mahasiswa/F1D099999 - 404 Not Found
perintah:
curl.exe -i -X PATCH http://localhost:3007/mahasiswa/F1D099999 \
  -H "Content-Type: application/json" \
  -d '{"nama":"Tidak Ada"}'

hasil:
{"success":false,"message":"Mahasiswa tidak ditemukan"}

Status Code: 404 Not Found
response : HTTP/1.1 404 Not Found


# 9) DELETE /mahasiswa/F1D022003 - 204 No Content
perintah:
curl.exe -i -X DELETE http://localhost:3007/mahasiswa/F1D022001

hasil: data terhapus

Status Code: 204 No Content
response : HTTP/1.1 204 No Content

