# Tugas 2 — Aplikasi Express.js Resource `laboratorium`

Nama    :Cinta Rahmia Yulianti
NPM     :240160221005
Kelas   : SI-VB

Aplikasi Express.js sederhana untuk mengelola data laboratorium kampus.


# 1) Struktur Project
├── package.json
├── app.js 
├── server.js 
├── routes/
│ └── laboratorium.js 
├── controllers/
│ └── laboratoriumController.js 
├── data/
│ └── laboratorium.js 
└── middlewares/
├── logger.js 
└── errorHandler.js 

# 2) Cara Menjalankan

```bash
# 1. Install dependency
npm install

# 2. Jalankan server
npm start

# 3. Mode development (auto-reload)
npm run dev

hasilnya : 
node --watch server.js

============================================
🚀 Server berjalan di http://localhost:3001
📚 Endpoint utama: http://localhost:3001/laboratorium
============================================

```

# 3) Daftar Endpoint

============================================
🚀 Server berjalan di http://localhost:3001
📚 Endpoint utama: http://localhost:3001/laboratorium
============================================
[2026-10-13T03:22:03.130Z] GET /laboratorium → 200 (98 ms)
[2026-10-13T03:27:17.035Z] GET /laboratorium → 200 (6 ms)
[2026-10-13T03:30:48.406Z] GET /laboratorium?status=tersedia → 200 (6 ms)
[2026-10-13T03:34:18.501Z] GET /laboratorium?status=tersedia → 200 (2 ms)
[2026-10-13T03:36:29.399Z] GET /laboratorium/1 → 200 (17 ms)
[2026-10-13T03:37:47.750Z] POST /laboratorium → 201 (6 ms)
[2026-10-13T03:43:06.670Z] PUT /laboratorium/1 → 200 (75 ms)
[2026-10-13T03:43:56.908Z] DELETE /laboratorium/1 → 200 (5 ms)


# 4) Contoh Request dan Hasil Pengujian

```bash 
# 1. GET semua laboratorium
perintah :  
curl http://localhost:3001/laboratorium  atau 
curl.exe -s http://localhost:3001/laboratorium | ConvertFrom-Json | ConvertTo-Json -Depth 10 
--- agar hasil lebih rapih ---

hasil pengujian :
StatusCode        : 200
StatusDescription : OK
Content           : {
                        "success":  true,
                        "total":  3,
                        "data":  [
                                    {
                                        "id":  1,
                                        "nama":  "Lab RPL",
                                        "kapasitas":  40,
                                        "lokasi":  "Gedung A Lantai 2",
                                        "status":  "tersedia"
                                    },
                                    {
                                        "id":  2,
                                        "nama":  "Lab Jaringan",
                                        "kapasitas":  30,
                                        "lokasi":  "Gedung B Lantai 1",
                                        "status":  "digunakan"
                                    },
                                    {
                                        "id":  3,
                                        "nama":  "Lab Multimedia",
                                        "kapasitas":  25,
                                        "lokasi":  "Gedung C Lantai 3",
                                        "status":  "maintenance"
                                    }
                                ]
                    }
                

# 2. GET dengan query parameter
perintah : irm "http://localhost:3001/laboratorium?status=tersedia" | ConvertTo-Json -Depth 10 atau curl http://localhost:3001/laboratorium

hasil pengujian:

StatusCode        : 200
StatusDescription : OK
Content           :{
                    "success":  true,
                    "total":  1,
                    "data":  [
                                {
                                    "id":  1,
                                    "nama":  "Lab RPL",
                                    "kapasitas":  40,
                                    "lokasi":  "Gedung A Lantai 2",
                                    "status":  "tersedia"
                                }
                            ]
                }

# 3. GET detail laboratorium
perintah :
curl http://localhost:3001/laboratorium/1

hasil pengujian :
StatusCode        : 200
StatusDescription : OK
Content           : {"success":true,"data":{"id":1,"nama":"Lab 
                    RPL","kapasitas":40,"lokasi":"Gedung A Lantai 2","status":"tersedia"}}

# 4. POST tambah laboratorium
perintah :
Set-Content -Path body.json -Value '{"nama":"Lab AI","kapasitas":20,"lokasi":"Gedung D Lantai 4"}' -Encoding ascii
curl.exe -X POST http://localhost:3001/laboratorium -H "Content-Type: application/json" -d "@body.json"

hasil pengujian :
{"success":true,"message":"Laboratorium berhasil ditambahkan","data":{"id":4,"nama":"Lab AI","kapasitas":20,"lokasi":"Gedung D Lantai 4","status":"tersedia"}}

`

# 5. PUT update laboratorium
perintah :
Set-Content -Path update.json -Value '{"status":"maintenance"}' -Encoding ascii
curl.exe -X PUT http://localhost:3001/laboratorium/1 -H "Content-Type: application/json" -d "@update.json"

hasil pengujian: 
{"success":true,"message":"Laboratorium berhasil diperbarui","data":{"id":1,"nama":"Lab RPL","kapasitas":40,"lokasi":"Gedung A Lantai 2","status":"maintenance"}}
`

# 6.  DELETE laboratorium
perintah :
curl.exe -X DELETE http://localhost:3001/laboratorium/1

hasil pengujian:
{"success":true,"message":"Laboratorium berhasil dihapus","data":{"id":1,"nama":"Lab RPL","kapasitas":40,"lokasi":"Gedung A Lantai 2","status":"maintenance"}}