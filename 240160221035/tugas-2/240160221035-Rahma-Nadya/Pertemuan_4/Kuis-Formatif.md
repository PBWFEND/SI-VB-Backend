**1. Apa perbedaan Node.js dan Express.js?**

Node.js adalah runtime yang digunakan untuk menjalankan JavaScript di luar browser, sedangkan Express.js adalah framework yang berjalan di atas Node.js untuk mempermudah pembuatan server dan REST API.

**2. Apa fungsi `app.use(express.json())`?**

Fungsinya untuk membaca data request yang dikirim dalam format JSON agar bisa diakses melalui `req.body`, misalnya saat menambahkan data anggota atau absensi.

**3. Apa perbedaan route parameter dan query parameter?**

Route parameter adalah parameter yang menjadi bagian dari URL untuk menentukan data tertentu, sedangkan query parameter digunakan untuk mengirim informasi tambahan melalui URL, misalnya untuk pencarian atau filter data.

Contoh:
- Route parameter: `/anggota/1`
- Query parameter: `/anggota?nama=rahma`

**4. Mengapa middleware perlu memanggil `next()`?**

`next()` digunakan untuk meneruskan proses request ke middleware atau handler berikutnya. Jika tidak dipanggil dan middleware tidak mengirim respons, request bisa berhenti dan tidak mendapatkan respons.

**5. Di bagian mana handler 404 dan error middleware diletakkan?**

Handler 404 diletakkan setelah seluruh endpoint API, sedangkan error middleware diletakkan setelah handler 404 dan sebelum `module.exports = app;`. Urutan ini membantu Express menangani endpoint yang tidak ditemukan dan error yang diteruskan ke middleware.

**6. Status code apa yang digunakan ketika resource berhasil dibuat?**

Status code yang digunakan adalah **201 Created**, yaitu ketika sebuah resource atau data baru berhasil dibuat, misalnya saat menambahkan anggota melalui `POST /anggota` atau absensi melalui `POST /absensi`.