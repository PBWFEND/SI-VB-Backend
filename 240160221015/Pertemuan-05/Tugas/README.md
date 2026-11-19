# Tugas 3 — RESTful API E-Warung Kampus

**Nama** : Ilyas Nuryandra  
**NIM** : 240160221015  
**Kelas** : SI-VB  
**Resource** : `menu`

## Cara Menjalankan

1. Jalankan `npm install` di folder ini.
2. Jalankan `npm start`.
3. Server akan berjalan di `http://localhost:3008`.

## Katalog Endpoint

| Method | Endpoint | Deskripsi | Status Sukses |
|:-------|:---------|:----------|:-------------:|
| GET | `/menu` | Daftar semua menu | 200 |
| GET | `/menu?kategori=Makanan&minStok=5` | Filter berdasarkan kategori dan minimal stok | 200 |
| GET | `/menu/:id` | Detail menu | 200 |
| POST | `/menu` | Tambah menu baru | 201 |
| PUT | `/menu/:id` | Ganti seluruh data menu | 200 |
| PATCH | `/menu/:id` | Ubah sebagian data menu (misal: stok) | 200 |
| DELETE | `/menu/:id` | Hapus menu | 204 |
| * | Selain di atas | Endpoint tidak ditemukan | 404 |

## Hasil Pengujian

### 1. GET /menu (200 OK)
```bash
curl.exe -i http://localhost:3008/menu
```
Response:
```json
{
  "success": true,
  "message": "Daftar menu berhasil diambil",
  "data": {
    "total": 3,
    "filter": { "kategori": "semua", "minStok": "semua" },
    "data": [
      { "id": 1, "nama": "Nasi Goreng Spesial", "harga": 15000, "kategori": "Makanan", "stok": 20 },
      { "id": 2, "nama": "Mie Ayam", "harga": 12000, "kategori": "Makanan", "stok": 15 },
      { "id": 3, "nama": "Es Teh Manis", "harga": 5000, "kategori": "Minuman", "stok": 50 }
    ]
  }
}
```

### 2. GET /menu?kategori=Makanan&minStok=16 (200 OK - Filter)
```bash
curl.exe -i "http://localhost:3008/menu?kategori=Makanan&minStok=16"
```
Response:
```json
{
  "success": true,
  "message": "Daftar menu berhasil diambil",
  "data": {
    "total": 1,
    "filter": { "kategori": "Makanan", "minStok": "16" },
    "data": [
      { "id": 1, "nama": "Nasi Goreng Spesial", "harga": 15000, "kategori": "Makanan", "stok": 20 }
    ]
  }
}
```

### 3. GET /menu/1 (200 OK - Detail)
```bash
curl.exe -i http://localhost:3008/menu/1
```
Response:
```json
{
  "success": true,
  "message": "Detail menu berhasil diambil",
  "data": { "id": 1, "nama": "Nasi Goreng Spesial", "harga": 15000, "kategori": "Makanan", "stok": 20 }
}
```

### 4. GET /menu/99 (404 Not Found)
```bash
curl.exe -i http://localhost:3008/menu/99
```
Response:
```json
{ "success": false, "message": "Menu dengan id 99 tidak ditemukan" }
```

### 5. POST /menu (201 Created)
```bash
curl.exe -i -X POST http://localhost:3008/menu -H "Content-Type: application/json" -d "{\"nama\":\"Bakso Urat\",\"harga\":13000,\"kategori\":\"Makanan\",\"stok\":10}"
```
Response:
```json
{
  "success": true,
  "message": "Menu berhasil ditambahkan",
  "data": { "id": 4, "nama": "Bakso Urat", "harga": 13000, "kategori": "Makanan", "stok": 10 }
}
```

### 6. POST /menu - Validasi Gagal (400 Bad Request)
```bash
curl.exe -i -X POST http://localhost:3008/menu -H "Content-Type: application/json" -d "{\"nama\":\"Es Jeruk\",\"harga\":-500,\"kategori\":\"Minuman\"}"
```
Response:
```json
{
  "success": false,
  "message": "Data menu tidak valid",
  "details": [
    "Field 'stok' wajib diisi",
    "Field 'harga' harus berupa bilangan bulat positif"
  ]
}
```

### 7. PUT /menu/2 (200 OK)
```bash
curl.exe -i -X PUT http://localhost:3008/menu/2 -H "Content-Type: application/json" -d "{\"nama\":\"Mie Ayam Bakso\",\"harga\":14000,\"kategori\":\"Makanan\",\"stok\":10}"
```
Response:
```json
{
  "success": true,
  "message": "Data menu berhasil diganti (PUT)",
  "data": { "id": 2, "nama": "Mie Ayam Bakso", "harga": 14000, "kategori": "Makanan", "stok": 10 }
}
```

### 8. PUT /menu/2 - Validasi Gagal karena parsial (400 Bad Request)
```bash
curl.exe -i -X PUT http://localhost:3008/menu/2 -H "Content-Type: application/json" -d "{\"stok\":50}"
```
Response:
```json
{
  "success": false,
  "message": "Data menu tidak valid untuk diperbarui (PUT)",
  "details": [
    "Field 'nama' wajib diisi",
    "Field 'harga' wajib diisi",
    "Field 'kategori' wajib diisi"
  ]
}
```

### 9. PATCH /menu/1 (200 OK - Partial Update)
```bash
curl.exe -i -X PATCH http://localhost:3008/menu/1 -H "Content-Type: application/json" -d "{\"stok\":25}"
```
Response:
```json
{
  "success": true,
  "message": "Data menu berhasil diperbarui (PATCH)",
  "data": { "id": 1, "nama": "Nasi Goreng Spesial", "harga": 15000, "kategori": "Makanan", "stok": 25 }
}
```

### 10. DELETE /menu/3 (204 No Content)
```bash
curl.exe -i -X DELETE http://localhost:3008/menu/3
```
Response:
```http
HTTP/1.1 204 No Content
```
*(Tidak ada response body)*

## Catatan Implementasi
- **PUT vs PATCH**: `PUT` memberlakukan validasi penuh (semua field wajib ada). Jika ada yang kurang, status 400. `PATCH` memperbolehkan pengiriman field parsial.
- **204 No Content**: Digunakan untuk `DELETE` karena resource sudah tidak ada, sehingga tidak ada data yang masuk akal untuk dikembalikan. Body respons dikosongkan secara eksplisit (`res.send()`).
- **Validasi**: Membedakan error karena tipe data salah dengan error karena field kurang. Array `details` digunakan untuk memetakan semua error validasi agar client bisa memperbaikinya sekaligus.