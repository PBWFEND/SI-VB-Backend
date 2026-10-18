# Kuis Pertemuan 2

### 1. Mengapa `const` menjadi pilihan default, dan kapan `let` diperlukan?

**Jawaban:**

`const` menjadi pilihan default karena nilai variabelnya tidak bisa ditugaskan ulang (*reassigned*), sehingga kode lebih aman dan mudah dipahami. `let` diperlukan ketika nilai variabel perlu diubah atau ditugaskan ulang selama program berjalan.

### 2. Apa beda `map`, `filter`, dan `find`? Berikan satu contoh kebutuhan untuk masing-masing.

**Jawaban:**

1. `map()` — digunakan untuk mengubah setiap elemen dalam array menjadi array baru. Contoh: mengambil nama dari daftar objek buku.
2. `filter()` — digunakan untuk memilih semua elemen yang memenuhi kondisi tertentu. Contoh: mencari semua buku yang stoknya lebih dari nol.
3. `find()` — digunakan untuk menemukan elemen pertama yang memenuhi kondisi tertentu. Contoh: mencari satu buku berdasarkan ID.

### 3. Prediksi output dan jelaskan urutannya.

**Jawaban:**

Output:

A
D
C
B

**Penjelasan:**

Pertama, A ditampilkan karena dijalankan secara langsung. Setelah itu, B dijadwalkan menggunakan setTimeout(), lalu C dijadwalkan melalui Promise.then(). Selanjutnya, D ditampilkan karena juga merupakan perintah langsung.

Setelah semua perintah langsung selesai dijalankan, C ditampilkan lebih dahulu karena proses Promise dijalankan sebelum setTimeout(). Terakhir, B ditampilkan.



### 4. Apa yang dikembalikan `async` function? Apa fungsi `try/catch` di sana?

**Jawaban:**

`async` function selalu mengembalikan sebuah `Promise`. Jika fungsi mengembalikan nilai biasa, nilai tersebut akan menjadi hasil pemenuhan (*fulfilled value*) dari Promise.

`try/catch` digunakan untuk menangani error. Kode di dalam `try` dijalankan terlebih dahulu, sedangkan `catch` menangani error yang terjadi, termasuk penolakan Promise saat menggunakan `await` di dalam blok `try`.

### 5. Tiga kueri independen masing-masing membutuhkan waktu 100 ms. Berapa total waktu secara berurutan dan dengan `Promise.all()`? Kapan sebaiknya `Promise.all()` tidak digunakan?

**Jawaban:**

- Secara berurutan: sekitar 300 ms, karena setiap kueri menunggu kueri sebelumnya selesai.
- Dengan `Promise.all()`: sekitar 100 ms, jika ketiga kueri benar-benar dijalankan secara bersamaan dan masing-masing membutuhkan 100 ms.

`Promise.all()` sebaiknya tidak digunakan jika proses-proses tersebut saling bergantung dan harus menunggu hasil proses sebelumnya. Selain itu, jika salah satu Promise ditolak (*rejected*), `Promise.all()` juga akan ditolak, sehingga perlu dipertimbangkan apakah penanganan error tersebut sesuai dengan kebutuhan program.