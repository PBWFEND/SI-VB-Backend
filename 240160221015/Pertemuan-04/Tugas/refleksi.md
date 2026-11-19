
---

## 6. File `refleksi.md`

```markdown
# Refleksi Tugas 2 — REST Endpoint Express.js

**Nama** : Ilyas Nuryandra
**NIM** : 240160221015
**Kelas** : SI-VB

## Penggunaan AI

AI (DeepSeek) digunakan untuk:
- Membantu debug error `Cannot find package 'express'` yang ternyata disebabkan `npm install` dijalankan di folder yang salah (bukan di folder `package.json`).
- Meminta saran susunan middleware (logger → json → route → 404 → error).
- Membuat template perintah `curl` untuk pengujian di PowerShell.

Bagian yang **tidak** memakai AI: pemilihan resource `menu`, penentuan field yang wajib divalidasi (`nama`, `harga`, `kategori`), pemilihan status code (201 untuk POST, 400 untuk validasi gagal, 404 untuk id tidak ditemukan), dan pembuatan endpoint `PATCH /menu/:id` sebagai bonus. Bagian tersebut saya putuskan berdasarkan pemahaman materi dan saya uji sendiri.

## Hal yang Dipelajari

1. **Perbedaan `app.use` vs `app.get`/`app.post`** — `app.use` mendaftarkan middleware yang berlaku untuk semua method dan prefix path, sedangkan `app.get`/`app.post` spesifik ke satu method + path.
2. **Urutan middleware sangat menentukan** — `express.json()` harus sebelum route POST, dan handler 404 harus setelah semua route valid. Salah urutan = perilaku tak terduga (body undefined, route tertutup 404).
3. **Pemisahan `app.js` dan `server.js`** — `app.js` bisa diuji dengan `supertest` tanpa membuka port. Ini praktik yang jauh lebih baik daripada menggabungkan keduanya di satu file seperti di Pertemuan 3.
4. **Validasi tetap tanggung jawab aplikasi** — `express.json()` hanya mem-parsing JSON; ia tidak memeriksa apakah `harga` berupa angka positif atau `nama` kosong. Validasi manual di handler tetap diperlukan.

## Hal yang Masih Membingungkan

- **Kapan memakai `PATCH` vs `PUT`** — saya paham teorinya (`PATCH` untuk sebagian, `PUT` untuk seluruh), tetapi di praktik masih sering ragu memilih. Untuk endpoint ubah stok menu, saya memilih `PATCH` karena hanya satu field yang berubah, tapi belum yakin apakah ini konvensi yang diterima secara umum di REST.
- **Pembedaan error 400 vs 422** — untuk input yang valid secara sintaks (JSON valid) tapi gagal validasi semantik (harga negatif, nama kosong), sebagian referensi menyarankan `422 Unprocessable Entity`, bukan `400`. Saya masih memakai `400` karena itu yang diajarkan di materi, tapi belum tahu kapan sebaiknya pindah ke `422`.
- **Cara menguji `error middleware`** — saya belum berhasil memicu error 500 secara sengaja dari route untuk melihat apakah error middleware bekerja. Mungkin perlu menambahkan route dummy yang sengaja `throw new Error()` untuk pengujian, tapi belum sempat melakukannya di tugas ini.

## Rencana Perbaikan

- Menambahkan endpoint `DELETE /menu/:id` untuk melengkapi CRUD, meskipun tidak diminta.
- Menambahkan route dummy `GET /error` yang sengaja melempar error untuk membuktikan error middleware bekerja.
- Memisahkan routing ke folder `routes/menu.routes.js` agar `app.js` tidak terlalu panjang, sesuai saran pada bagian 12 materi.