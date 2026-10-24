# Refleksi Tugas 1 — Refactor & Mini-Service

Nama : Aprilliana Fratiwi
NPM : 240160221004
Kelas : 5B

# Refleksi

Setelah mengerjakan Tugas 1 ini, saya menyadari bahwa refactoring bukan sekadar merapikan kode, melainkan mengubah cara saya berpikir saat menulis program. Ada tiga fitur JavaScript modern (F2) yang paling mengubah cara saya menulis kode. Pertama, arrow function dan async/await. Dulu saya sering menulis callback bersarang, sehingga kode sulit dibaca. Sekarang dengan async/await, alur service saya jadi jauh lebih rapi dan mudah diikuti. Kedua, destructuring dan spread operator. Saya tidak perlu lagi menulis book.title, book.author berulang kali, dan saat update cukup memakai { ...oldBook, ...updatedData } sehingga data lama tidak termutasi. Ketiga, array method seperti .find(), .filter(), dan .reduce(). Saya mengganti loop for manual dengan method ini, dan hasilnya kode jadi lebih deklaratif — cukup menyatakan apa yang dicari, bukan bagaimana caranya.

Meskipun banyak kemudahan, ada satu hal yang masih membingungkan bagi saya, yaitu perilaku Promise.all ketika salah satu promise gagal. Saya sempat mengira promise yang berhasil tetap akan mengembalikan hasilnya, ternyata jika satu saja reject, seluruh proses langsung gagal. Saya masih perlu memahami kapan sebaiknya memakai Promise.all dan kapan memakai Promise.allSettled, terutama untuk kasus nyata seperti mengambil data dari beberapa API yang mungkin sebagian down.
