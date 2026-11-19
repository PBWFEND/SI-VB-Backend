# Refleksi Tugas 1 — JavaScript Modern & Async

**Nama** : Ilyas Nuryandra  
**NIM** : 240160221015  
**Kelas** : SI-VB

---

## Tiga Fitur P2 yang Paling Mengubah Cara Saya Menulis Kode

### 1. Arrow Function & Array Methods (`map`, `filter`, `reduce`)

Sebelum mengenal ES6+, saya terbiasa menulis loop `for` manual dengan variabel counter dan `array[i]` untuk mengolah data. Kode seperti itu bertele-tele dan rawan off-by-one error. Setelah memakai `map`/`filter`/`reduce`, saya bisa menyatakan **apa yang ingin saya lakukan** terhadap data, bukan **bagaimana cara mengulanginya**.

Contohnya pada `hitungTotal` di `refactor.js`: satu baris `reduce` menggantikan 4 baris loop `for` di versi legacy. Lebih ringkas, lebih mudah dibaca, dan lebih sulit salah.

### 2. Destructuring & Spread Operator

Dulu saya sering menulis `const nama = body.nama; const harga = body.harga;` secara berulang. Dengan destructuring, cukup `const { nama, harga } = body;`. Ini sangat terasa saat membuat fungsi service yang menerima banyak parameter — misalnya `create({ nama, harga, kategori, stok = 0 })` di `service.js`.

Spread operator juga mengubah cara saya menyalin data. Dulu saya pakai `Object.assign({}, asli)` atau `array.slice()`. Sekarang `{ ...asli, fieldBaru: x }` jauh lebih eksplisit dan aman dari mutasi tak sengaja.

### 3. Promise & `async`/`await`

Ini yang paling besar pengaruhnya. Sebelumnya saya bingung kenapa operasi database atau baca file harus pakai callback bersarang. Setelah paham Promise dan `async`/`await`, kode asynchronous bisa ditulis **seperti kode sinkron** — berurutan dari atas ke bawah — tapi tetap non-blocking. `try/catch` juga bisa dipakai untuk menangani error asynchronous, sama seperti kode sinkron.

`Promise.all()` di `demo.js` membuktikan bahwa beberapa kueri independen bisa berjalan paralel, memangkas waktu eksekusi secara signifikan.

---

## Satu Hal yang Masih Membingungkan

**Kapan tepatnya `??` harus dipakai, dan kapan `||`?**

Saya paham perbedaannya secara teori: `??` hanya mengganti `null`/`undefined`, sedangkan `||` mengganti semua nilai *falsy* (termasuk `0`, `""`, `false`). Tapi dalam praktik, masih sering ragu memilih. Misalnya saat menangani `stok` yang boleh bernilai `0`: kalau pakai `||`, stok 0 akan dianggap kosong dan diganti default — itu bug. Tapi kalau pakai `??`, aman.

Yang masih membingungkan: bagaimana kalau nilai yang diterima berupa **string kosong** `""` dari input form? Apakah lebih baik diperlakukan sebagai "kosong" (pakai `||`) atau dibiarkan (pakai `??`)? Saya rasa jawabannya tergantung konteks validasi, dan saya masih perlu latihan lebih banyak untuk membiasakan diri.

Selain itu, saya juga masih perlu membiasakan diri dengan **top-level await** yang hanya bisa dipakai di ESM, sementara file latihan saya memakai CommonJS (`require`). Solusinya sementara: membungkus `await` di dalam async IIFE. Ke depannya, saat masuk Node.js Fundamentals (Pertemuan 3), saya ingin memahami kapan sebaiknya memakai CommonJS vs ESM secara lebih mendalam.