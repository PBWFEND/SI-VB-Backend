# Refleksi Tugas 1 — JavaScript Modern untuk Backend

**Nama:** [Nama Mahasiswa]  
**NIM:** [NIM]  
**Kelas:** [SI-VA / SI-VB]

---

## Tiga Fitur P2 yang Paling Mengubah Cara Saya Menulis Kode

### 1. `async/await` + `try/catch`
Sebelumnya saya menulis callback bersarang yang sulit dibaca (callback hell).
Dengan `async/await`, alur kode menjadi linear seperti kode synchronous, dan
`try/catch` membuat penanganan error lebih terpusat. Di `service.js`, setiap
fungsi (`findAll`, `findById`, `create`, `update`, `remove`) kini konsisten
memakai pola ini sehingga mudah diprediksi.

### 2. Destructuring + Default Value
Destructuring parameter di `create({ judul, penulis, tahun, stok = 0 })` membuat
signature fungsi langsung mendokumentasikan field yang dibutuhkan. Default value
`stok = 0` menghilangkan kebutuhan pengecekan `if (stok === undefined)` di dalam
body fungsi. Pola `const { id } = req.body ?? {}` di `refactor.js` juga mencegah
error `TypeError: Cannot read properties of undefined`.

### 3. `Promise.all()` untuk Operasi Paralel
Sebelumnya saya menjalankan kueri secara berurutan sehingga waktu eksekusi
terakumulasi. Dengan `Promise.all()`, dua kueri independen di `demo.js`
berjalan konkuren — total waktu menjadi waktu terlama, bukan jumlah keduanya.
Ini penting untuk dashboard/statistik yang menggabungkan banyak resource.

---

## Satu Hal yang Masih Membingungkan

Perbedaan perilaku `??` vs `||` masih perlu saya latih lebih lanjut, terutama
ketika nilai `0`, `""`, atau `false` adalah nilai valid yang tidak boleh diganti
default. Saya paham secara teori bahwa `??` hanya peduli `null`/`undefined`,
tetapi dalam kode nyata saya masih sering ragu memilih operator yang tepat.
Saya berencana memperbanyak latihan dengan kasus stok `0` dan string kosong
sebelum Pertemuan 3.

---

## Catatan Penggunaan AI

- Menggunakan AI untuk memeriksa apakah pola early-return di `refactor.js`
  sudah setara perilakunya dengan versi `if/else` asli.
- Menggunakan AI untuk menjelaskan mengapa `Promise.all([findAll(), findAll()])`
  tetap berjalan paralel meskipun memanggil fungsi yang sama.
- Seluruh kode diuji manual dengan `node demo.js` sebelum diserahkan.