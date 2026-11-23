# Refleksi Tugas 3 — RESTful API

**Nama** : Ilyas Nuryandra
**NIM** : 240160221015
**Kelas** : SI-VB

## Penggunaan AI
AI (DeepSeek) digunakan untuk mendiskusikan perbedaan `PUT` dan `PATCH` terkait penanganan validasi (mengapa `PUT` harus menolak request yang parsial), serta membantu merapikan struktur folder dan format markdown pada README. Bagian logika filtering ganda (`kategori` + `minStok`), fungsi validasi custom, dan pemilihan status code tetap saya tulis dan uji sendiri melalui terminal.

## Hal yang Dipelajari
1. **Konsistensi Response JSON**: Sangat penting untuk membedakan bentuk response sukses dan gagal. Menggunakan helper `sendSuccess` dan `sendError` membuat kode tidak repetitif dan memastikan client selalu menerima format yang sama.
2. **Keketatan `PUT`**: Sebelumnya saya berpikir `PUT` bisa digunakan untuk mengedit 1 field (seperti PATCH). Ternyata secara spesifikasi REST, `PUT` menggantikan representasi secara keseluruhan. Jika client hanya mengirim `stok`, field lain dianggap terhapus/nilai default. Implementasi saya menolak request parsial untuk `PUT` menggunakan validasi, sesuai prinsip tersebut.
3. **`204 No Content`**: Saya baru sadar bahwa status 204 secara harfiah berarti tidak ada body. Sebelumnya saya sering mengembalikan `{ "message": "Deleted" }` dengan status 200. Sekarang saya paham kenapa `204` tidak boleh memiliki JSON body.

## Hal yang Masih Membingungkan
- **Penempatan ID pada respons POST**: Saya mengembalikan objek utuh yang baru dibuat. Namun banyak standar (misalnya GitHub API) mengembalikan header `Location: /menu/4` bersama status 201. Saya belum yakin apakah wajib menyertakan header tersebut di tugas ini.
- **Filter query tipe array**: Jika client mengirim `/menu?kategori=Makanan&kategori=Minuman`, Express akan mem-parse `kategori` menjadi array, bukan string. Kode saya belum menangani kasus ini dan berpotensi error jika panjang array > 1. Ini butuh validasi lebih lanjut untuk mencegah server crash (status 500).
- **Error 409 Conflict**: Saya menggunakan 400 untuk semua validasi. Di beberapa referensi, konflik nama unik seharusnya menggunakan 409, tapi karena di sini tidak ada constraint unik pada `nama`, 400 sudah cukup tepat, meski masih terasa kurang spesifik.

## Rencana Perbaikan
- Menambahkan penanganan tipe data array pada query string (`kategori` dan `minStok`) sebelum melakukan filter, untuk mencegah error 500.
- Menambahkan header `Location` pada respons `POST` sukses, sebagai praktik REST tingkat lanjut.