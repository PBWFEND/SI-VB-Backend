# Kuis Formatif Pertemuan 7

## 1. Apa perbedaan tugas controller dan service?

Controller bertugas menerima permintaan dari pengguna dan mengirimkan jawaban. Service bertugas mengurus proses utama, seperti mengambil, menambah, mengubah, atau menghapus data dari database.

## 2. Mengapa validasi input tidak diletakkan di service?

Karena controller yang menerima data dari pengguna, jadi controller yang memeriksa apakah datanya sudah benar. Service bisa fokus mengurus proses dan database.

## 3. Apa fungsi `express.Router()` dan kapan digunakan?

`express.Router()` digunakan untuk mengatur kumpulan alamat API supaya kode lebih rapi. Biasanya digunakan saat aplikasi punya banyak route atau fitur.

## 4. Apa yang terjadi jika `express.json()` dipasang setelah route yang memakai `request.body`?

Data JSON dari pengguna belum sempat dibaca saat route dijalankan. Akibatnya, `request.body` bisa kosong atau `undefined`, sehingga data yang dikirim tidak terbaca.

## 5. Status code apa yang dikirim saat `POST /buku` berhasil, dan mengapa bukan `200`?

Status code yang digunakan adalah **201 Created**, karena berhasil menambahkan data buku baru. Kode `200` hanya menunjukkan bahwa permintaan berhasil, sedangkan `201` lebih tepat untuk data baru yang berhasil dibuat.

## 6. Bagaimana cara menangani parameter route yang bukan angka agar tidak menyebabkan error?

Periksa dulu apakah parameter bisa diubah menjadi angka bulat positif. Jika tidak sesuai, kirim status `400 Bad Request` dan hentikan proses agar aplikasi tidak mengalami error.

Contoh:

\`\`\`ts
const id = Number(request.params.id);

if (!Number.isInteger(id) || id <= 0) {
  return response.status(400).json({
    message: "ID harus berupa angka bulat positif"
  });
}
\`\`\`