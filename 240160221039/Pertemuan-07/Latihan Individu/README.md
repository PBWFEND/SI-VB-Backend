Tugas 4 — Integrasi Database dan ORM untuk REST API
Project REST API untuk resource Buku menggunakan Express + Prisma + SQLite.

Nama : Resty Dewina Fitri
NPM : 240160221039
Kelas : SI - VB

PENGUJIAN
Setting environment for using XAMPP for Windows.
RESTY@DESKTOP-2MUUTN0 c:\xampp
# curl http://localhost:3008/buku
{"success":true,"message":"Daftar buku berhasil diambil","data":{"total":0,"data":[]}}
RESTY@DESKTOP-2MUUTN0 c:\xampp
# curl http://localhost:3008/buku/1
{"success":false,"message":"Buku tidak ditemukan"}
RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-06\Tugas-4
# curl -X POST http://localhost:3008/buku -H "Content-Type: application/json" -d "{\"judul\":\"Pemrograman Node.js\",\"penulis\":\"Resty Dewina Fitri\",\"tahun\":2026,\"stok\":10}"
{"success":true,"message":"Buku berhasil dibuat","data":{"id":1,"judul":"Pemrograman Node.js","penulis":"Resty Dewina Fitri","tahun":2026,"stok":10}}
RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-06\Tugas-4
# curl -X POST http://localhost:3008/buku -H "Content-Type: application/json" -d "{\"judul\":\"Pemrograman Node.js\",\"penulis\":\"Resty Dewina Fitri\",\"tahun\":2026,\"stok\":20}"
{"success":true,"message":"Buku berhasil dibuat","data":{"id":2,"judul":"Pemrograman Node.js","penulis":"Resty Dewina Fitri","tahun":2026,"stok":20}}
RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-06\Tugas-4
# curl -X DELETE http://localhost:3008/buku/1