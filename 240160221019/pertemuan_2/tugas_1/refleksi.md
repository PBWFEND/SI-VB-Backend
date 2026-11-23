# REFLEKSI TUGAS 1 - REFACTOR & MINI-SERVICE

# SISTEM INFORMASI PERPUSTAKAAN
Nama    : Kikan Khairani
NPM     : 240160221019
Kelas   : SI-5B

# Refleksi

Nama saya Kikan Khairani. Setelah mengerjakan Tugas 1, saya menyadari refactoring bukan sekadar merapikan kode, tapi mengubah cara berpikir. Tiga fitur F2 yang paling mengubah cara saya menulis kode adalah: arrow function dan async/await, yang membuat kode asinkron jadi lebih rapi dan mudah dibaca dibanding callback bersarang; destructuring dan spread operator, yang menghemat baris kode saat mengambil atau menggabungkan data objek; serta array method seperti .find(), .filter(), dan .reduce(), yang membuat kode lebih deklaratif dibanding loop for manual.

Satu hal yang masih membingungkan saya adalah perilaku Promise.all ketika salah satu promise gagal. Awalnya saya kira promise yang berhasil tetap mengembalikan hasilnya, ternyata jika satu saja reject, seluruh proses langsung gagal. Saya masih perlu memahami kapan memakai Promise.all dan kapan Promise.allSettled, terutama untuk kasus nyata seperti mengambil data dari beberapa API yang mungkin sebagian down.
