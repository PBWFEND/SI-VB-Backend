1. Mengapa const menjadi pilihan default, dan kapan let diperlukan?

const menjadi pilihan default karena digunakan untuk variabel yang nilainya tidak perlu ditetapkan ulang. Penggunaan const membantu mengurangi perubahan nilai variabel yang tidak diperlukan sehingga kode lebih mudah dipahami dan dikelola.

Sementara itu, let digunakan ketika nilai variabel memang perlu berubah selama program berjalan, misalnya untuk penghitung atau akumulator.

Contoh:

const PORT = 3000;
let totalRequest = 0;

totalRequest++;

Pada contoh tersebut, PORT menggunakan const karena nilainya tetap, sedangkan totalRequest menggunakan let karena nilainya bertambah.

2. Apa beda map, filter, dan find? Berikan satu contoh kebutuhan untuk masing-masing.

Ketiganya merupakan method JavaScript yang digunakan untuk mengolah data dalam array, tetapi memiliki fungsi yang berbeda.

map() digunakan untuk mengubah setiap elemen array menjadi bentuk baru. Contohnya, mengambil daftar judul dari data buku.
filter() digunakan untuk menyaring elemen array berdasarkan kondisi tertentu. Contohnya, menampilkan buku yang stoknya masih tersedia.
find() digunakan untuk mencari satu elemen pertama yang memenuhi kondisi. Contohnya, mencari buku berdasarkan ID tertentu.

Contoh kode:

const buku = [
  { id: 1, judul: "Belajar Node.js", stok: 3 },
  { id: 2, judul: "Dasar JavaScript", stok: 0 },
  { id: 3, judul: "REST API", stok: 5 }
];

// map: mengambil semua judul buku
const judulBuku = buku.map((b) => b.judul);

// filter: mengambil buku yang stoknya tersedia
const bukuTersedia = buku.filter((b) => b.stok > 0);

// find: mencari buku dengan ID 2
const detailBuku = buku.find((b) => b.id === 2);
3. Prediksi output dan jelaskan urutannya.

Kode:

console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");

Output yang dihasilkan adalah:

A
D
C
B

Penjelasan urutannya:

A dicetak terlebih dahulu karena console.log("A") merupakan kode synchronous yang langsung dijalankan.
D dicetak berikutnya karena kode synchronous tetap berjalan sebelum callback asynchronous dijalankan.
C dicetak setelah kode synchronous selesai karena .then() pada Promise dijalankan melalui microtask queue.
B dicetak terakhir karena callback setTimeout() dijalankan melalui task queue setelah kode synchronous dan microtask yang sudah menunggu selesai diproses.

Walaupun waktu pada setTimeout() adalah 0 milidetik, callback-nya tidak langsung dijalankan sebelum kode synchronous selesai.

4. Apa yang dikembalikan async function? Apa fungsi try/catch di sana?

Fungsi async selalu mengembalikan sebuah Promise. Jika fungsi menghasilkan nilai, nilai tersebut menjadi hasil pemenuhan Promise. Jika terjadi kesalahan yang tidak ditangani di dalam fungsi, Promise dapat berakhir dengan status rejected.

try/catch digunakan untuk menangani kesalahan saat menjalankan operasi asynchronous menggunakan await. Kode dalam try dijalankan terlebih dahulu, sedangkan catch menangani kesalahan yang terjadi agar program dapat memberikan respons yang sesuai.

Contoh:

async function ambilBuku() {
  try {
    const hasil = await prosesAmbilBuku();
    console.log(hasil);
  } catch (err) {
    console.log("Terjadi kesalahan:", err.message);
  }
}

Pada contoh tersebut, await menunggu hasil dari prosesAmbilBuku(). Jika operasi tersebut gagal, kesalahannya dapat ditangani oleh catch.

5. Tiga kueri independen masing-masing membutuhkan waktu 100 ms. Berapa total waktu secara berurutan dan dengan Promise.all()? Kapan sebaiknya Promise.all() tidak digunakan?

Jika tiga kueri dijalankan secara berurutan, total waktu yang dibutuhkan adalah:

100 ms + 100 ms + 100 ms = 300 ms.

Jika ketiga kueri dijalankan menggunakan Promise.all(), estimasi waktu totalnya sekitar 100 ms, dengan asumsi ketiganya benar-benar berjalan secara konkuren dan masing-masing membutuhkan waktu sekitar 100 ms.

Promise.all() cocok digunakan ketika beberapa operasi asynchronous saling independen, sehingga tidak perlu menunggu satu operasi selesai sebelum memulai operasi lainnya.

Promise.all() sebaiknya tidak digunakan ketika suatu operasi bergantung pada hasil operasi sebelumnya. Selain itu, jika setiap operasi perlu dinilai keberhasilannya secara terpisah dan kegagalan satu operasi tidak boleh membuat hasil lainnya diabaikan, Promise.allSettled() dapat menjadi pilihan yang lebih sesuai