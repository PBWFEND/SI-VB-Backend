## 21. Kuis Formatif

**1. Apa perbedaan authentication dan authorization?**

Authentication adalah proses untuk memastikan identitas pengguna, misalnya dengan memasukkan email dan password saat login. Sedangkan authorization adalah proses menentukan hak akses pengguna setelah berhasil login, misalnya apakah pengguna boleh melihat, menambah, atau menghapus data.

**2. Apa fungsi salt pada password hashing?**

Salt berfungsi sebagai nilai acak yang ditambahkan saat proses hashing password. Tujuannya agar password yang sama bisa menghasilkan hash yang berbeda, sehingga lebih sulit ditebak oleh orang lain.

**3. Mengapa password tidak disimpan sebagai plaintext?**

Karena jika database bocor, password pengguna bisa langsung diketahui oleh orang lain. Oleh karena itu, password harus di-hash terlebih dahulu agar tidak tersimpan dalam bentuk aslinya.

**4. Mengapa kegagalan login sebaiknya memakai pesan umum?**

Agar orang lain tidak bisa mengetahui apakah email atau akun yang dimasukkan sudah terdaftar atau belum. Contohnya menggunakan pesan "Email atau password tidak sesuai". Dengan begitu, informasi akun pengguna tetap lebih terlindungi.

**5. Sebutkan satu perbedaan session dan token.**

Session menyimpan informasi login pengguna di sisi server, sedangkan token membawa informasi autentikasi yang dikirim oleh client setiap melakukan request ke server. Keduanya digunakan untuk mempertahankan status login pengguna.
