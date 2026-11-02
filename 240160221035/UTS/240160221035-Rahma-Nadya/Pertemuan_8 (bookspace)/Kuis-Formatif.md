Kuis UTS Backend – BookSpace
1. Apa perbedaan antara data yang disimpan di memori dan data yang disimpan di database? Mengapa mini project UTS harus menggunakan database?

Data yang disimpan di memori hanya bertahan selama aplikasi berjalan. Jika server dimatikan atau di-restart, data tersebut bisa hilang. Sedangkan data yang disimpan di database bersifat persisten, sehingga tetap tersimpan meskipun server dimatikan.

Mini project UTS harus menggunakan database agar data dapat disimpan secara permanen, dikelola dengan baik, dan dapat diakses kembali kapan saja.

2. Sebutkan empat operasi CRUD dan method HTTP yang sesuai untuk masing-masing.

Empat operasi CRUD dan method HTTP yang sesuai adalah:
- Create menggunakan POST untuk menambahkan data baru.
- Read menggunakan GET untuk membaca atau mengambil data.
- Update menggunakan PUT untuk memperbarui data.
- Delete menggunakan DELETE untuk menghapus data.
3. Status code apa yang dikirim untuk POST saat sukses, dan mengapa bukan 200?

Status code yang digunakan adalah 201 Created karena request POST berhasil membuat data baru. Bukan 200 OK karena kode 201 secara khusus menunjukkan bahwa sebuah resource baru berhasil dibuat.

4. Apa yang terjadi bila express.json() didaftarkan setelah route yang membaca request.body?

Jika express.json() didaftarkan setelah route, request body tidak akan diproses terlebih dahulu oleh middleware JSON. Akibatnya, request.body bisa bernilai undefined, sehingga data yang dikirim melalui POST atau PUT tidak dapat dibaca dengan benar.

5. Bagaimana cara memastikan data yang dibuat masih ada setelah server di-restart?

Caranya adalah dengan menambahkan data ke database, kemudian mematikan server dan menjalankannya kembali. Setelah server aktif, lakukan request GET untuk mengambil data berdasarkan ID. Jika data masih muncul, berarti penyimpanan database berhasil dan data bersifat persisten.

6. Mengapa validasi input perlu dilakukan di controller, bukan di service?

Validasi input dilakukan di controller karena controller bertugas menerima request dari pengguna dan memeriksa apakah data yang dikirim sudah sesuai sebelum diteruskan ke service. Dengan begitu, data yang tidak valid dapat ditolak lebih awal dan service dapat fokus pada proses bisnis serta pengolahan data ke database.