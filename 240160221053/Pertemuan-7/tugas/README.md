# Tugas 5 — CRUD REST API dengan Pola Service/Controller

Implementasi CRUD REST API untuk resource **`pengguna`** menggunakan **Express**, **TypeScript**, **Prisma ORM**, dan database **SQLite**, dengan arsitektur berlapis (Route → Controller → Service → Prisma).

**Nama** : Athiyya Salsabila Hermawan  
**NPM** : 240160221053  
**Kelas** : SI - VB

---

## ✨ Fitur

- Layered Architecture (Route → Controller → Service → Prisma)
- Validasi input di controller (tipe, format, field wajib)
- Status code tepat: `200`, `201`, `204`, `400`, `404`, `500`
- Response seragam: `{ success, message, data? }`
- Middleware 404 & error handler global
- CRUD lengkap + filter opsional `?nim=`


## 🛠 hasil Pengujian
PS D:\240160221053\Pertemuan-7\tugas> node --experimental-strip-types server.ts                                     
CRUD REST API berjalan di http://localhost:3008                                                         
[2026-11-02T09:16:33.049Z] GET /
[2026-11-02T09:16:41.903Z] GET /pengguna
[2026-11-02T09:17:05.400Z] GET /pengguna?nim=12345
[2026-11-02T09:20:29.777Z] POST /pengguna
[2026-11-02T09:21:08.553Z] GET /pengguna/12345
[2026-11-02T09:24:34.872Z] PATCH /pengguna/12345
[2026-11-02T09:25:51.233Z] DELETE /pengguna/12345
[2026-11-02T09:28:10.182Z] GET /pengguna/99999
[2026-11-02T09:28:39.228Z] GET /endpoint-ngaco

PS D:\240160221053> cd Pertemuan-7/tugas                     
PS D:\240160221053\Pertemuan-7\tugas> curl.exe http://localhost:3008/          
{"success":true,"message":"CRUD REST API — Tugas 5","data":{"resources":["pengguna"],"endpoints":["GET    /pengguna","GET    /pengguna/:nim","POST   /pengguna","PATCH  /pengguna/:nim","DELETE /pengguna/:nim"]}}
PS D:\240160221053\Pertemuan-7\tugas> curl.exe http://localhost:3008/pengguna  
{"success":true,"message":"Daftar pengguna berhasil diambil","data":{"total":0,"data":[]}}
PS D:\240160221053\Pertemuan-7\tugas> curl.exe "http://localhost:3008/pengguna?nim=12345"                           
{"success":true,"message":"Daftar pengguna berhasil diambil","data":{"total":0,"data":[]}} 
PS D:\240160221053\Pertemuan-7\tugas> curl.exe -X POST http://localhost:3008/pengguna -H "Content-Type: application/json" --data-binary "@body.json"
{"success":true,"message":"Pengguna berhasil dibuat","data":{"nim":"12345","nama":"Salsa","email":"salsa@example.com","role":"mahasiswa"}}
PS D:\240160221053\Pertemuan-7\tugas> curl.exe http://localhost:3008/pengguna/12345                                 
{"success":true,"message":"Detail pengguna berhasil diambil","data":{"nim":"12345","nama":"Salsa","email":"salsa@example.com","role":"mahasiswa"}}
PS D:\240160221053\Pertemuan-7\tugas> curl.exe -X PATCH http://localhost:3008/pengguna/12345 -H "Content-Type: application/json" -d "{\"nama\":\"Salsabila\"}"
{"success":false,"message":"Terjadi kesalahan pada server"}curl: (3) URL rejected: Port number was not a decimal number between 0 and 65535
PS D:\240160221053\Pertemuan-7\tugas> $body = @{
>>   nama = "Salsabila"
>> } | ConvertTo-Json
>> 
>> Invoke-RestMethod -Uri "http://localhost:3008/pengguna/12345" -Method PATCH -ContentType "application/json" -Body $body

success message                      data                                                                 
------- -------                      ----                                                                 
   True Pengguna berhasil diperbarui @{nim=12345; nama=Salsabila; email=salsa@example.com; role=mahasiswa}


PS D:\240160221053\Pertemuan-7\tugas> curl.exe -X DELETE http://localhost:3008/pengguna/12345
PS D:\240160221053\Pertemuan-7\tugas> curl.exe http://localhost:3008/pengguna/99999
{"success":false,"message":"Pengguna tidak ditemukan"}
PS D:\240160221053\Pertemuan-7\tugas> curl.exe http://localhost:3008/endpoint-ngaco
{"success":false,"message":"Endpoint tidak ditemukan"}