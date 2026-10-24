# Kuis Pertemuan 1

### 1. Sebutkan 4 bagian penyusun HTTP request.

**Jawaban:**

Empat bagian penyusun HTTP request adalah:

1. Request Line — berisi metode HTTP, URL atau path tujuan, dan versi HTTP.
2. Headers — berisi informasi tambahan tentang request, seperti tipe konten.
3. Blank Line — baris kosong yang memisahkan headers dengan body.
4. Body — berisi data yang dikirim ke server. Bagian ini tidak selalu ada.

### 2. Method apa yang tepat untuk: (a) mengambil daftar buku, (b) menambah buku baru, (c) mengubah stok buku saja, (d) menghapus buku?

**Jawaban:**

a. GET — untuk mengambil atau menampilkan daftar buku.
b. POST — untuk menambahkan buku baru.
c. PATCH — untuk mengubah sebagian data buku saja, misalnya stok buku.
d. DELETE — untuk menghapus buku.

### 3. Apa arti status `201`, `404`, dan `500`?

**Jawaban:**

1. 201 Created — menandakan bahwa data atau sumber daya baru berhasil dibuat oleh server.
2. 404 Not Found — menandakan bahwa sumber daya atau halaman yang diminta tidak ditemukan di server.
3. 500 Internal Server Error — menandakan bahwa terjadi kesalahan internal pada server saat memproses permintaan.

### 4. Mengapa GET /hapusBuku?id=1 dianggap tidak REST? 

**Jawaban**

Karena method GET seharusnya digunakan untuk mengambil atau membaca data, bukan untuk menghapus data. Menghapus buku sebaiknya menggunakan method DELETE, misalnya DELETE/buku/1, agar sesuai dengan prinsip REST dan fungsi HTTP method.

### 5. Apa fungsi JSON.stringify() dan JSON.parse() di Node.js?

**Jawaban**

1. JSON.stringify() berfungsi untuk mengubah objek atau data JavaScript menjadi string berformat JSON, sehingga dapat dikirim atau disimpan sebagai teks.
2. JSON.parse() berfungsi untuk mengubah string berformat JSON menjadi objek atau data JavaScript agar dapat diolah kembali oleh program.