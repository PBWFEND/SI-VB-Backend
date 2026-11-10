1. GET Collection — Semua Mahasiswa
RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-05\Tugas-3
# curl http://localhost:3008/mahasiswa
{"success":true,"message":"Daftar mahasiswa berhasil diambil","data":{"total":2,"data":[{"nim":"240160221039","nama":"Resty Dewina Fitri","prodi":"Sistem Informasi","angkatan":2024},{"nim":"239023109087","nama":"Iqbal Fadillah","prodi":"Teknik Informatika","angkatan":2023}]}}

2. GET Collection — Filter Query
RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-05\Tugas-3
# curl "http://localhost:3008/mahasiswa?prodi=Sistem%20Informasi&angkatan=2024"
{"success":true,"message":"Daftar mahasiswa berhasil diambil","data":{"total":1,"data":[{"nim":"240160221039","nama":"Resty Dewina Fitri","prodi":"Sistem Informasi","angkatan":2024}]}}

3. GET Detail — Berdasarkan NIM
RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-05\Tugas-3
# curl http://localhost:3008/mahasiswa/240160221039
{"success":true,"message":"Detail mahasiswa berhasil diambil","data":{"nim":"240160221039","nama":"Resty Dewina Fitri","prodi":"Sistem Informasi","angkatan":2024}}

4. GET Detail — NIM Tidak Ditemukan
RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-05\Tugas-3
# curl http://localhost:3008/mahasiswa/23790374836
{"success":false,"message":"Mahasiswa tidak ditemukan"}

5. POST — Tambah Mahasiswa:
RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-05\Tugas-3
# curl -X POST http://localhost:3008/mahasiswa -H "Content-Type: application/json" -d "{\"nim\":\"230160221067\",\"nama\":\"Nemoo\",\"prodi\":\"Teknik Informatika\",\"angkatan\":2023}"
{"success":true,"message":"Mahasiswa berhasil ditambahkan","data":{"nim":"230160221067","nama":"Nemoo","prodi":"Teknik Informatika","angkatan":2023}}

6. PUT — Ganti Seluruh Data:
RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-05\Tugas-3
# curl -X PUT http://localhost:3008/mahasiswa/240160221039 -H "Content-Type: application/json" -d "{\"nama\":\"Resty Dewina Fitri Updated\",\"prodi\":\"Sistem Informasi\",\"angkatan\":2025}"
{"success":true,"message":"Data mahasiswa berhasil diganti","data":{"nim":"240160221039","nama":"Resty Dewina Fitri Updated","prodi":"Sistem Informasi","angkatan":2025}}

7. PATCH — Update Sebagian:
RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-05\Tugas-3
# curl -X PATCH http://localhost:3008/mahasiswa/230160221067 -H "Content-Type: application/json" -d "{\"nama\":\"Iqbal Fadillah\"}"
{"success":true,"message":"Data mahasiswa berhasil diperbarui","data":{"nim":"230160221067","nama":"Iqbal Fadillah","prodi":"Teknik Informatika","angkatan":2023}}

8. DELETE — Hapus:
RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-05\Tugas-3
# curl -X DELETE http://localhost:3008/mahasiswa/230160221067 -i
HTTP/1.1 204 No Content
Date: Fri, 30 Oct 2026 11:39:25 GMT
Connection: keep-alive
Keep-Alive: timeout=5

RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-05\Tugas-3
# curl -X POST http://localhost:3008/mahasiswa -H "Content-Type: application/json" -d "{\"nim\":\"F1D022004\"}"
{"success":false,"message":"Validasi gagal","details":["Nama wajib diisi","Prodi wajib diisi","Angkatan wajib diisi"]}

#npminstall & node tugas.js
RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-05\Tugas-3
# npm install

added 68 packages, and audited 69 packages in 39s

28 packages are looking for funding
  run `npm fund` for details

2 vulnerabilities (1 moderate, 1 high)

To address all issues, run:
  npm audit fix

Run `npm audit` for details.

RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-05\Tugas-3
# node tugas.js
Tugas 3 REST API berjalan di http://localhost:3008
[2026-10-30T11:24:41.603Z] GET /mahasiswa
[2026-10-30T11:25:17.834Z] GET /mahasiswa?prodi=Sistem%20Informasi&angkatan=2024
[2026-10-30T11:26:09.933Z] GET /mahasiswa/240160221039
[2026-10-30T11:26:36.908Z] GET /mahasiswa/23790374836
[2026-10-30T11:27:59.242Z] POST /mahasiswa
[2026-10-30T11:28:59.334Z] PUT /mahasiswa/F1D022001
[2026-10-30T11:35:12.235Z] PUT /mahasiswa/240160221039
[2026-10-30T11:36:58.773Z] PATCH /mahasiswa/230160221067
[2026-10-30T11:39:25.786Z] DELETE /mahasiswa/230160221067
[2026-10-30T11:42:49.222Z] POST /mahasiswa
[2026-10-30T11:46:21.464Z] POST /mahasiswa
