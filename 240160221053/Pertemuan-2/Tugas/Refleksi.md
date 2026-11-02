# Refleksi Tugas 1 - Refactor & Mini Service

Nama : Athiyya Salsabila Hermawan
npm : 240160221053
Kelas : SI-VB

# Refleksi
Setelah mengerjakan tugas ini, saya menyadari bahwa penerapan fitur ES6+ sangat mengubah cara saya menulis kode. Pertama, penggunaan `async/await` membuat kode asinkronus, seperti simulasi *delay* database, terlihat dan terbaca seperti kode sinkronus biasa, sehingga saya tidak perlu lagi bersarang di dalam *callback* dan penanganan error menjadi lebih rapi dengan `try/catch`. Kedua, *destructuring* sangat menghemat baris kode saat mengambil properti objek, cukup dengan menulis `const { title, author } = book`, kode pun menjadi lebih bersih dan fokus pada data yang dibutuhkan. Ketiga, *array methods* seperti `.filter()` dan `.map()` mengubah cara saya mengolah data dari `for` loop yang panjang menjadi satu baris kode deklaratif yang lebih ekspresif dan mudah dipahami.

Meskipun begitu, setelah mengerjakan tugas ini masih ada satu hal yang membingungkan bagi saya, yaitu kapan tepatnya harus memilih antara `Promise.all()` dan `Promise.allSettled()`. Saya masih perlu berlatih untuk menentukan strategi terbaik agar aplikasi tetap tangguh saat ada satu kueri paralel yang gagal, tanpa kehilangan data lain yang sebenarnya berhasil diambil.
