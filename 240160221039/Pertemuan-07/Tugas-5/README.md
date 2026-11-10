Tugas 4 — CRUD REST API dengan Pola Service/Controller

Nama : Resty Dewina Fitri
NPM : 240160221039
Kelas : SI - VB

PENGUJIAN
RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-07\Tugas-5
# curl http://localhost:3008/
{"success":true,"message":"CRUD REST API — Tugas 5","data":{"resources":["pengguna"],"endpoints":["GET    /pengguna","GET    /pengguna/:nim","POST   /pengguna","PATCH  /pengguna/:nim","DELETE /pengguna/:nim"]}}
RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-07\Tugas-5
# curl http://localhost:3008/pengguna
{"success":true,"message":"Daftar pengguna berhasil diambil","data":{"total":0,"data":[]}}
RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-07\Tugas-5
# curl -X POST http://localhost:3008/pengguna -H "Content-Type: application/json" -d "{\"nim\":\"240160221039\",\"nama\":\"Resty Dewina Fitri\",\"email\":\"restydf@example.com\",\"role\":\"mahasiswa\"}"
{"success":true,"message":"Pengguna berhasil dibuat","data":{"id":1,"nim":"240160221039","nama":"Resty Dewina Fitri","email":"restydf@example.com","role":"mahasiswa"}}
RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-07\Tugas-5
# curl -X POST http://localhost:3008/pengguna -H "Content-Type: application/json" -d "{\"nim\":\"240160221000\",\"nama\":\"Iqbal Faillah\",\"email\":\"iqball@example.com\",\"role\":\"mahasiswa\"}"
{"success":true,"message":"Pengguna berhasil dibuat","data":{"id":2,"nim":"240160221000","nama":"Iqbal Faillah","email":"iqball@example.com","role":"mahasiswa"}}
RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-07\Tugas-5
# curl http://localhost:3008/pengguna
{"success":true,"message":"Daftar pengguna berhasil diambil","data":{"total":2,"data":[{"id":1,"nim":"240160221039","nama":"Resty Dewina Fitri","email":"restydf@example.com","role":"mahasiswa"},{"id":2,"nim":"240160221000","nama":"Iqbal Faillah","email":"iqball@example.com","role":"mahasiswa"}]}}
RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-07\Tugas-5
# curl "http://localhost:3008/pengguna?nim=12345"
{"success":true,"message":"Daftar pengguna berhasil diambil","data":{"total":0,"data":[]}}
RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-07\Tugas-5
# curl http://localhost:3008/pengguna/240160221039
{"success":true,"message":"Detail pengguna berhasil diambil","data":{"id":1,"nim":"240160221039","nama":"Resty Dewina Fitri","email":"restydf@example.com","role":"mahasiswa"}}
RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-07\Tugas-5
# curl http://localhost:3008/pengguna/240160221000
{"success":true,"message":"Detail pengguna berhasil diambil","data":{"id":2,"nim":"240160221000","nama":"Iqbal Faillah","email":"iqball@example.com","role":"mahasiswa"}}
RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-07\Tugas-5
# curl -X PATCH http://localhost:3008/pengguna -H "Content-Type: application/json" -d "{\"nim\":\"24053621000\",\"nama\":\"nemo\",\"email\":\"nemow@example.com\",\"role\":\"mahasiswa\"}"
{"success":false,"message":"Endpoint tidak ditemukan"}
RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-07\Tugas-5
# curl -X DELETE http://localhost:3008/pengguna/12345
{"success":false,"message":"Pengguna tidak ditemukan"}
RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-07\Tugas-5
# curl -X PATCH http://localhost:3008/pengguna/240160221000 -H "Content-Type: application/json" -d "{\"nama\":\"Iqbal Fadillah\",\"role\":\"mahasiswa\"}"
{"success":true,"message":"Pengguna berhasil diperbarui","data":{"id":2,"nim":"240160221000","nama":"Iqbal Fadillah","email":"iqball@example.com","role":"mahasiswa"}}
RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-07\Tugas-5
# curl -X DELETE http://localhost:3008/pengguna/240160221000