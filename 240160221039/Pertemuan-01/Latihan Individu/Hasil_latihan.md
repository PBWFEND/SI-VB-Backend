RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-01\Latihan Individu
# node latihan.js
Latihan berjalan di http://localhost:3001
Kerjakan semua TODO 1-4, lalu uji setiap endpoint.

RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-01\Latihan Individu
# curl http://localhost:3001/about
{
  "success": true,
  "message": "API Pertemuan 1",
  "author": "Resty Dewina Fitri"
}

RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-01\Latihan Individu
# curl http://localhost:3001/mahasiswa
{
  "success": true,
  "total": 2,
  "data": [
    {
      "nim": "F1D022001",
      "nama": "Jhon Doe"
    },
    {
      "nim": "F1D022002",
      "nama": "Ani Lestari"
    }
  ]
}

RESTY@DESKTOP-2MUUTN0 D:\240160221039\Pertemuan-01\Latihan Individu
# curl -X POST http://localhost:3001/mahasiswa
{
  "success": false,
  "message": "Field 'nim' dan 'nama' wajib diisi"
}