1. const menjadi pilihan default karena nilai variabel tidak bisa diisi ulang sehingga kode lebih aman. let digunakan ketika nilai variabel perlu diubah selama program berjalan.

2.  map: Mengubah setiap elemen array. Contoh: mengubah semua nama mahasiswa menjadi huruf kapital

    filter: Memilih semua elemen yang memenuhi kondisi. Contoh: mencari semua mahasiswa dari jurusan Informatika.

    find: Mengambil elemen pertama yang memenuhi kondisi. Contoh: mencari mahasiswa berdasarkan NIM tertentu.

3. Prediksi output dan jelaskan urutannya.

Kode:

console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");


Output:
A
D
C
B


Penjelasan: A dan D dijalankan langsung. Setelah itu, callback Promise (C) dijalankan sebelum callback setTimeout (B), meskipun waktunya 0 milidetik.

4. async function selalu mengembalikan sebuah Promise. try/catch digunakan untuk menangani error agar program dapat memberikan respons yang sesuai ketika terjadi kegagalan, misalnya saat mengambil data dari server.

5. - Berurutan: sekitar 300 ms karena setiap kueri menunggu kueri sebelumnya selesai.
- Dengan Promise.all(): sekitar 100 ms karena ketiga kueri dijalankan secara bersamaan.
Promise.all() sebaiknya tidak digunakan jika suatu proses bergantung pada hasil proses sebelumnya atau jika kita perlu menunggu semua proses selesai meskipun ada yang gagal. Dalam kasus tersebut, Promise.allSettled() bisa menjadi pilihan jika semua hasil tetap perlu diketahui.