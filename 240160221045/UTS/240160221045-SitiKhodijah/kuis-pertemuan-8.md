\# Kuis Formatif Pertemuan 8



\*\*Waktu:\*\* 10 menit  

\*\*Ketentuan:\*\* Dikerjakan tanpa menggunakan catatan.



\## Soal dan Jawaban



\### 1. Apa perbedaan antara data yang disimpan di memori dan data yang disimpan di database? Mengapa mini project UTS harus menggunakan database?



\*\*Jawaban:\*\*

\- Data di memori hanya tersimpan sementara selama aplikasi berjalan. Data dapat hilang ketika server dihentikan atau di-restart.

\- Data di database disimpan secara permanen sehingga dapat diakses kembali meskipun server dihentikan.



Mini project UTS harus menggunakan database agar data dapat tersimpan secara persisten dan tidak hilang ketika server di-restart.



\### 2. Sebutkan empat operasi CRUD dan method HTTP yang sesuai untuk masing-masing.



\*\*Jawaban:\*\*



| Operasi CRUD | Method HTTP | Fungsi |

|---|---|---|

| Create | POST | Menambahkan data |

| Read | GET | Membaca atau mengambil data |

| Update | PUT/PATCH | Mengubah data |

| Delete | DELETE | Menghapus data |



\### 3. Status code apa yang dikirim untuk POST saat sukses, dan mengapa bukan 200?



\*\*Jawaban:\*\*



Status code yang digunakan adalah \*\*201 Created\*\*, karena request POST berhasil membuat resource atau data baru. Kode 200 menunjukkan request berhasil secara umum, sedangkan 201 secara khusus menunjukkan bahwa resource baru telah dibuat.



\### 4. Apa yang terjadi bila express.json() didaftarkan setelah route yang membaca request.body?



\*\*Jawaban:\*\*



Route tidak dapat membaca body JSON dengan benar karena middleware `express.json()` belum dijalankan ketika request masuk ke route. Akibatnya, `request.body` bisa bernilai `undefined`.



Karena itu, `express.json()` harus didaftarkan sebelum route:



```ts

app.use(express.json());

app.use("/api/buku", bukuRoutes);

```



\### 5. Bagaimana cara memastikan data yang dibuat masih ada setelah server di-restart?



\*\*Jawaban:\*\*



Gunakan database seperti SQLite untuk menyimpan data secara persisten. Setelah data dibuat, hentikan server lalu jalankan kembali. Kemudian lakukan request GET untuk memastikan data yang sebelumnya dibuat masih tersedia.



\### 6. Mengapa validasi input perlu dilakukan di controller, bukan di service?



\*\*Jawaban:\*\*



Controller bertugas menangani request dari pengguna, memeriksa input, dan menentukan response HTTP yang sesuai. Validasi di controller membantu memastikan data yang masuk sudah benar sebelum diteruskan ke service.



Service berfokus pada logika bisnis dan operasi database sehingga tanggung jawab setiap bagian aplikasi tetap terpisah dan mudah dikelola.



\---



\*\*Nama:\*\* Siti Khodijah  

\*\*NIM:\*\* 240160221045  

\*\*Mata Kuliah:\*\* Praktikum Backend

