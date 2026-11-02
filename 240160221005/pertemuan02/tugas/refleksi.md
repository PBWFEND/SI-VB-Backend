# Refleksi Tugas 1 — Refactor & Mini-Service Laboratorium

Setelah mengerjakan Tugas 1 ini, saya menyadari bahwa refactoring bukan sekadar merapikan kode, melainkan mengubah cara saya berpikir saat menulis program. Ada tiga fitur JavaScript modern (P2) yang paling mengubah cara saya menulis kode.

**Pertama, arrow function dan async/await.** Dulu saya sering menulis callback bersarang, sehingga kode sulit dibaca. Sekarang dengan async/await, alur service laboratorium saya jadi jauh lebih rapi dan mudah diikuti. Fungsi `findAll`, `findById`, `create`, `update`, dan `delete` semuanya berjalan berurutan tanpa perlu `then()` berantai.

**Kedua, destructuring dan spread operator.** Saya tidak perlu lagi menulis `lab.nama`, `lab.kapasitas`, `lab.lokasi` berulang kali. Saat update, cukup memakai `{ ...labLama, ...data, id: labLama.id }` sehingga data lama tidak termutasi dan `id` tetap terjaga.

**Ketiga, array method seperti `.find()`, `.map()`, dan `.findIndex()`.** Saya mengganti loop `for` manual dengan method ini, dan hasilnya kode jadi lebih deklaratif — cukup menyatakan apa yang dicari, bukan bagaimana caranya. Misalnya `laboratorium.find((item) => item.id === Number(id))` jauh lebih jelas dibanding loop dengan flag `found`.

Meskipun banyak kemudahan, ada satu hal yang masih membingungkan bagi saya, yaitu **perilaku `Promise.all` ketika salah satu promise gagal**. Saya sempat mengira promise yang berhasil tetap akan mengembalikan hasilnya, ternyata jika satu saja `reject`, seluruh proses langsung gagal dan masuk ke blok `catch`. Saya masih perlu memahami kapan sebaiknya memakai `Promise.all` dan kapan memakai `Promise.allSettled`, terutama untuk kasus nyata seperti mengambil data dari beberapa laboratorium yang mungkin sebagian tidak ditemukan atau server-nya sedang *down*.