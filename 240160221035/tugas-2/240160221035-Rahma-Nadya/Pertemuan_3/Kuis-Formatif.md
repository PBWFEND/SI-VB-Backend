1. Apa perbedaan JavaScript di browser dan JavaScript yang dijalankan Node.js?

JavaScript di browser digunakan untuk menjalankan fungsi pada halaman web, seperti mengatur tampilan dan berinteraksi dengan pengguna menggunakan DOM dan document.

Sementara itu, JavaScript yang dijalankan menggunakan Node.js berjalan di luar browser dan digunakan untuk kebutuhan backend, seperti membuat HTTP server, membaca file, mengelola proses, serta menangani jaringan.

Jadi, bahasa pemrogramannya tetap JavaScript, tetapi lingkungan dan API yang tersedia berbeda.

2. Mengapa import module lokal perlu menggunakan ./ dan ekstensi .js?

./ digunakan untuk menunjukkan bahwa module berasal dari file lokal di direktori yang sama atau jalur relatif terhadap file yang sedang dijalankan. Ekstensi .js menunjukkan file JavaScript yang ingin diimpor.

Contoh:

import { PORT } from "./config.js";

Pada contoh tersebut, program mengimpor PORT dari file config.js yang berada di direktori yang sama.

Penulisan jalur dan ekstensi yang jelas membantu Node.js menemukan module lokal yang benar.

3. Apa manfaat environment variable pada konfigurasi port?

Environment variable adalah variabel yang nilainya diberikan melalui lingkungan tempat program dijalankan. Penggunaannya pada konfigurasi port membuat port server dapat diubah tanpa harus mengedit kode program.

Contoh:

const PORT = process.env.PORT || 3003;

Artinya, server menggunakan nilai PORT dari environment jika tersedia. Jika tidak tersedia atau nilainya kosong, server menggunakan port default 3003.

Manfaatnya adalah konfigurasi menjadi lebih fleksibel dan dapat disesuaikan dengan lingkungan pengembangan maupun deployment.

4. Apa fungsi path.join()?

path.join() merupakan fungsi dari module node:path yang digunakan untuk menggabungkan beberapa bagian jalur file atau direktori menjadi satu jalur yang sesuai dengan sistem operasi.

Contoh:

import path from "node:path";

const lokasiFile = path.join("data", "buku.json");
console.log(lokasiFile);

Fungsi tersebut menggabungkan folder data dengan nama file buku.json. Penggunaan path.join() membantu menyusun jalur file dengan lebih rapi tanpa harus menggabungkan string secara manual.

5. Mengapa response HTTP perlu memanggil response.end()?

response.end() digunakan untuk menandai bahwa pengiriman HTTP response telah selesai. Fungsi ini dapat dipanggil setelah server mengirimkan data kepada client.

Contoh:

response.writeHead(200, {
  "Content-Type": "application/json"
});

response.end(JSON.stringify({
  success: true,
  message: "Server berjalan"
}));

Pada contoh tersebut, server mengirimkan status 200, menentukan bahwa respons berupa JSON, lalu mengirimkan isi respons dan menyelesaikannya melalui response.end().

Jika response tidak pernah diselesaikan, client dapat terus menunggu respons dari server.

6. Apa status code yang tepat untuk endpoint yang tidak tersedia?

Status code yang tepat adalah 404 Not Found.

Status ini menunjukkan bahwa endpoint atau resource yang diminta tidak ditemukan. Misalnya, jika server hanya menyediakan endpoint / dan /health, tetapi client meminta /tidak-ada, server seharusnya memberikan status 404.

Contoh:

response.writeHead(404, {
  "Content-Type": "application/json"
});

response.end(JSON.stringify({
  success: false,
  message: "Endpoint tidak ditemukan"
}));

Dengan demikian, client dapat mengetahui bahwa endpoint yang diminta tidak tersedia.