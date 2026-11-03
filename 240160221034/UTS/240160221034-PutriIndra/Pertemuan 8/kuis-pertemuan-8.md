# Kuis Formatif Pertemuan 8

## 1. Apa perbedaan antara data yang disimpan di memori dan data yang disimpan di database? Mengapa mini project UTS harus menggunakan database?

**Jawaban:**

Data yang disimpan di memori hanya bertahan selama aplikasi berjalan. Ketika server dihentikan atau di-restart, data tersebut dapat hilang.

Sementara itu, data yang disimpan di database bersifat persisten sehingga tetap tersedia meskipun server dihentikan atau di-restart.

Mini project UTS harus menggunakan database agar data buku dapat disimpan secara permanen dan dikelola dengan baik.

## 2. Sebutkan empat operasi CRUD dan method HTTP yang sesuai untuk masing-masing.

**Jawaban:**

1. **Create** — POST, untuk menambahkan data baru.
2. **Read** — GET, untuk membaca atau mengambil data.
3. **Update** — PUT atau PATCH, untuk memperbarui data.
4. **Delete** — DELETE, untuk menghapus data.

## 3. Status code apa yang dikirim untuk POST saat sukses, dan mengapa bukan 200?

**Jawaban:**

Status code yang umum digunakan adalah **201 Created** karena menunjukkan bahwa data baru berhasil dibuat.

Status code 200 OK menunjukkan permintaan berhasil diproses, tetapi 201 lebih spesifik untuk proses pembuatan resource baru.

## 4. Apa yang terjadi bila express.json() didaftarkan setelah route yang membaca request.body?

**Jawaban:**

Route yang dijalankan sebelum middleware express.json() tidak dapat membaca body JSON dengan benar karena request body belum diproses oleh middleware tersebut.

Akibatnya, request.body dapat bernilai undefined.

Oleh karena itu, express.json() harus didaftarkan sebelum route yang membutuhkan request.body.

## 5. Bagaimana cara memastikan data yang dibuat masih ada setelah server di-restart?

**Jawaban:**

Caranya adalah dengan menyimpan data ke database, bukan hanya ke variabel atau array di memori.

Setelah data dibuat, server dapat dihentikan dan dijalankan kembali. Kemudian lakukan request GET untuk memastikan data tersebut masih tersimpan di database.

## 6. Mengapa validasi input perlu dilakukan di controller, bukan di service?

**Jawaban:**

Controller bertugas menangani request dan response dari client, sehingga cocok untuk memeriksa input yang dikirim pengguna sebelum diteruskan ke service.

Service bertugas menangani logika bisnis dan proses pengolahan data.

Pemisahan ini membuat kode lebih terstruktur dan memudahkan pemeliharaan aplikasi. Validasi penting juga dapat tetap diperkuat di service apabila dibutuhkan untuk menjaga aturan bisnis.
