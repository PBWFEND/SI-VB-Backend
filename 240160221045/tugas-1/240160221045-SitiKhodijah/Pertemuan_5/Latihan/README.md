# Pertemuan 5 - Latihan RESTful API

**Nama:** Siti Khodijah  
**NIM:** 240160221045  
**Program Studi:** Sistem Informasi

## 1. GET Semua Mahasiswa
- Method: GET
- URL: http://localhost:3007/mahasiswa
- Status: 200 OK

## 2. GET Filter Berdasarkan Prodi
- Method: GET
- URL: http://localhost:3007/mahasiswa?prodi=Sistem%20Informasi
- Status: 200 OK

## 3. GET Mahasiswa Berdasarkan NIM
- Method: GET
- URL: http://localhost:3007/mahasiswa/F1D022001
- Status: 200 OK

## 4. GET Mahasiswa Tidak Ditemukan
- Method: GET
- URL: http://localhost:3007/mahasiswa/F1D999999
- Status: 404 Not Found

## 5. POST Tambah Mahasiswa
- Method: POST
- URL: http://localhost:3007/mahasiswa
- Status: 201 Created (percobaan sebelumnya)

Body JSON:
```json
{
  "nim": "F1D022003",
  "nama": "Siti Khodijah",
  "prodi": "Sistem Informasi",
  "angkatan": 2024
}
```

Catatan: Percobaan POST dengan NIM 240160221045 mendapat respons bahwa NIM sudah terdaftar.

## 6. POST Data Tidak Valid
- Method: POST
- URL: http://localhost:3007/mahasiswa
- Status: 400 Bad Request

Body JSON tidak lengkap:
```json
{
  "nim": "240160221046",
  "prodi": "Sistem Informasi",
  "angkatan": 2024
}
```

## 7. PATCH Update Mahasiswa
- Method: PATCH
- URL: http://localhost:3007/mahasiswa/F1D022002
- Status: 200 OK

Body JSON:
```json
{
  "nama": "Ani Lestari Update"
}
```

## 8. DELETE Mahasiswa
- Method: DELETE
- URL: http://localhost:3007/mahasiswa/240160221045
- Status: 204 No Content
- Response: Tidak ada body (No Content).