1. Apa perbedaan tanggung jawab controller dan service?

Controller bertugas menerima request dari pengguna, melakukan validasi input, memanggil service, dan mengirim response. Sedangkan service bertugas menjalankan proses bisnis dan berkomunikasi dengan database.

2. Mengapa validasi input tidak diletakkan di service?

Karena validasi input seperti memeriksa tipe data, format, dan kelengkapan request merupakan tanggung jawab controller. Dengan begitu, service bisa lebih fokus pada proses bisnis dan pengolahan data. Namun, validasi aturan bisnis tetap bisa dilakukan di service.

3. Apa fungsi express.Router() dan kapan Anda menggunakannya?

express.Router() berfungsi untuk membuat router terpisah agar pengelolaan endpoint lebih terstruktur. Digunakan ketika aplikasi memiliki banyak endpoint sehingga setiap resource dapat dikelompokkan dalam file routes tersendiri, seperti Anggota dan Absensi.

4. Apa yang terjadi bila express.json() didaftarkan setelah route yang memakai request.body?

Request body tidak akan diproses terlebih dahulu oleh middleware JSON. Akibatnya, request.body bisa bernilai undefined, sehingga data dari pengguna tidak dapat dibaca dengan benar. Oleh karena itu, express.json() harus didaftarkan sebelum route.

5. Status code apa yang dikirim untuk POST /buku saat sukses, dan mengapa bukan 200?

Status code yang digunakan adalah 201 Created, karena request POST berhasil membuat data atau resource baru. Status 200 biasanya digunakan untuk request yang berhasil diproses, tetapi bukan status khusus untuk menandakan pembuatan resource.

6. Bagaimana cara menangani parameter route yang bukan angka tanpa menyebabkan error runtime?

Dengan mengubah parameter menjadi angka menggunakan Number(), lalu memeriksa apakah nilainya merupakan bilangan bulat positif menggunakan Number.isInteger() dan kondisi lebih besar dari nol. Jika tidak valid, kembalikan status 400 Bad Request sebelum melakukan query database.

Contoh:
const id = Number(req.params.id);

if (!Number.isInteger(id) || id <= 0) {
  return res.status(400).json({
    success: false,
    message: "ID tidak valid",
  });
}