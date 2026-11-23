# TUGAS 1 — ANALISIS & DESAIN API

**Nama** : Ilyas Nuryandra
**NIM** : 240160221015
**Kelas** : SI-VB
**Domain** : E-Warung Kampus

---

## 1. Deskripsi Sistem

E-Warung Kampus adalah sistem informasi pemesanan makanan dan minuman untuk lingkungan kampus. Sistem ini melayani dua jenis pengguna: **mahasiswa** sebagai pemesan, dan **penjual/pengelola warung** sebagai pihak yang mengelola menu dan memproses pesanan. Fitur utamanya meliputi: melihat daftar menu yang tersedia, melakukan pemesanan makanan/minuman, melihat status pesanan, serta pengelolaan menu (tambah, ubah, hapus) dan pengelolaan pesanan oleh penjual. Sistem ini dirancang untuk dipakai dari web admin warung dan aplikasi mobile mahasiswa, sehingga komunikasi data dilakukan melalui API berbasis JSON.

---

## 2. Diagram Arsitektur

Diagram arsitektur dibuat menggunakan **Excalidraw** dan diekspor sebagai PNG. File sumber (`.excalidraw`) disertakan agar mudah direvisi.

Alur yang digambarkan:

```
Client (Aplikasi Mobile Mahasiswa / Web Admin Warung)
        │
        │  HTTP Request (method, path, headers, body JSON)
        ▼
Server Back End (Node.js / Express.js)
        │
        │  Logika bisnis & validasi
        ▼
Database (MySQL / MongoDB)
        │
        │  Hasil query
        ▼
Server Back End
        │
        │  HTTP Response (status code, headers, body JSON)
        ▼
Client
```

File yang disertakan:
- `diagram.png` — hasil ekspor
- `diagram.excalidraw` — file sumber

---

## 3. Tabel Resource & Endpoint

Sistem ini memiliki **2 resource** utama: `menu` dan `pesanan`.

### Resource: Menu

| Operasi | Method | Endpoint | Request Body | Response Body | Status Sukses | Status Gagal |
|:--------|:-------|:---------|:-------------|:--------------|:-------------:|:------------:|
| Ambil semua menu | GET | `/menu` | — | `{ success, total, data: [...] }` | 200 | 500 |
| Ambil satu menu | GET | `/menu/:id` | — | `{ success, data: {...} }` | 200 | 404, 500 |
| Tambah menu | POST | `/menu` | `{ nama, harga, kategori, stok }` | `{ success, message, data: {...} }` | 201 | 400, 500 |
| Ganti data menu utuh | PUT | `/menu/:id` | `{ nama, harga, kategori, stok }` | `{ success, data: {...} }` | 200 | 400, 404, 500 |
| Ubah sebagian data menu | PATCH | `/menu/:id` | `{ stok }` atau `{ harga }` | `{ success, data: {...} }` | 200 | 400, 404, 500 |
| Hapus menu | DELETE | `/menu/:id` | — | `{ success, message }` | 204 | 404, 500 |

### Resource: Pesanan

| Operasi | Method | Endpoint | Request Body | Response Body | Status Sukses | Status Gagal |
|:--------|:-------|:---------|:-------------|:--------------|:-------------:|:------------:|
| Ambil semua pesanan | GET | `/pesanan` | — | `{ success, total, data: [...] }` | 200 | 500 |
| Ambil satu pesanan | GET | `/pesanan/:id` | — | `{ success, data: {...} }` | 200 | 404, 500 |
| Buat pesanan baru | POST | `/pesanan` | `{ nim, items: [{ menuId, qty }] }` | `{ success, message, data: {...} }` | 201 | 400, 404, 500 |
| Ubah status pesanan | PATCH | `/pesanan/:id` | `{ status }` | `{ success, data: {...} }` | 200 | 400, 404, 500 |
| Batalkan pesanan | DELETE | `/pesanan/:id` | — | `{ success, message }` | 204 | 404, 500 |

Total: **2 resource, 11 endpoint** (memenuhi minimal 8 endpoint).

---

## 4. Contoh JSON

### Resource Menu

**Contoh request body — POST /menu:**

```json
{
  "nama": "Nasi Goreng Spesial",
  "harga": 15000,
  "kategori": "Makanan",
  "stok": 20
}
```

**Contoh response body — GET /menu/1:**

```json
{
  "success": true,
  "data": {
    "id": 1,
    "nama": "Nasi Goreng Spesial",
    "harga": 15000,
    "kategori": "Makanan",
    "stok": 20,
    "tersedia": true
  }
}
```

### Resource Pesanan

**Contoh request body — POST /pesanan:**

```json
{
  "nim": "240160221015",
  "items": [
    { "menuId": 1, "qty": 2 },
    { "menuId": 3, "qty": 1 }
  ]
}
```

**Contoh response body — POST /pesanan (201 Created):**

```json
{
  "success": true,
  "message": "Pesanan berhasil dibuat",
  "data": {
    "id": 101,
    "nim": "240160221015",
    "items": [
      {
        "menuId": 1,
        "nama": "Nasi Goreng Spesial",
        "qty": 2,
        "subtotal": 30000
      },
      {
        "menuId": 3,
        "nama": "Es Teh Manis",
        "qty": 1,
        "subtotal": 5000
      }
    ],
    "total": 35000,
    "status": "menunggu",
    "dibuatPada": "2026-09-14T10:30:00.000Z"
  }
}
```

---

## 5. Skenario Uji

### Skenario 1 — Berhasil (POST /pesanan)

Request:

```http
POST /pesanan HTTP/1.1
Content-Type: application/json

{
  "nim": "240160221015",
  "items": [
    { "menuId": 1, "qty": 2 },
    { "menuId": 3, "qty": 1 }
  ]
}
```

Response:

```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "success": true,
  "message": "Pesanan berhasil dibuat",
  "data": {
    "id": 101,
    "nim": "240160221015",
    "total": 35000,
    "status": "menunggu"
  }
}
```

Penjelasan: Pesanan berhasil dibuat karena semua menu yang dipesan tersedia dan stok mencukupi. Server mengembalikan status 201 Created beserta data pesanan yang baru dibuat.

### Skenario 2 — Berhasil (PATCH /menu/2)

Request:

```http
PATCH /menu/2 HTTP/1.1
Content-Type: application/json

{
  "stok": 5
}
```

Response:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "data": {
    "id": 2,
    "nama": "Mie Ayam",
    "harga": 12000,
    "kategori": "Makanan",
    "stok": 5,
    "tersedia": true
  }
}
```

Penjelasan: PATCH hanya mengubah field `stok` tanpa mengubah field lain. Server mengembalikan status 200 OK dengan data menu yang sudah diperbarui.

### Skenario 3 — Gagal (GET /menu/99)

Request:

```http
GET /menu/99 HTTP/1.1
```

Response:

```http
HTTP/1.1 404 Not Found
Content-Type: application/json

{
  "success": false,
  "message": "Menu dengan id 99 tidak ditemukan"
}
```

Penjelasan: Server mengembalikan status 404 Not Found karena menu dengan id 99 tidak ada di database. Status ini memberi tahu client bahwa resource yang diminta tidak ditemukan, sehingga client dapat menampilkan pesan yang sesuai kepada pengguna tanpa harus mem-parsing body terlebih dahulu.

---

## Catatan Pengumpulan

Sesuai instruksi pada bagian 21, tugas ini diserahkan dengan cara:

1. Clone repository kelas `SI-VB-Backend`
2. Membuat branch dengan NIM: `git switch -c 240160221015`
3. Membuat folder `tugas-1/240160221015-Ilyas Nuryandra/` berisi:
   - `tugas-1.md` — dokumen ini
   - `diagram.png` — hasil ekspor diagram
   - `diagram.excalidraw` — file sumber diagram
4. Commit dan push ke branch NIM
5. Membuat Pull Request dari branch NIM menuju branch utama repository kelas

---

## Pemanfaatan AI

Pada proses pengerjaan tugas ini, AI (DeepSeek) digunakan untuk membantu merapikan struktur penulisan dokumen dan memeriksa konsistensi penamaan endpoint. Pemilihan domain, perancangan resource, pemetaan method, dan penentuan status code dikerjakan sendiri berdasarkan pemahaman materi Pertemuan 1.