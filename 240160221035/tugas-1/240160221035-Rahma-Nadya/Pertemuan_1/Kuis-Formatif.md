1. Sebutkan 4 bagian penyusun HTTP request!

Empat bagian penyusun HTTP request adalah:

Method, menentukan tindakan yang ingin dilakukan.
URL/Path, menunjukkan alamat tujuan yang diakses.
Headers, berisi informasi tambahan tentang request.
Body, berisi data yang dikirim ke server.
2. Method HTTP yang tepat

a. Mengambil daftar buku: GET

b. Menambahkan buku baru: POST

c. Mengubah stok buku saja: PATCH

d. Menghapus buku: DELETE

3. Arti status code
201 Created: Data baru berhasil dibuat.
404 Not Found: Resource atau endpoint yang diminta tidak ditemukan.
500 Internal Server Error: Terjadi kesalahan pada server.
4. Mengapa GET /hapusBuku?id=1 dianggap tidak REST?

Karena method GET seharusnya digunakan untuk mengambil data, bukan menghapus data. Selain itu, URL REST sebaiknya menunjukkan resource yang dikelola, sedangkan method HTTP menunjukkan tindakan yang dilakukan.

Contoh yang lebih sesuai adalah DELETE /buku/1 untuk menghapus buku dengan ID 1.

5. Fungsi JSON.stringify() dan JSON.parse()

JSON.stringify() berfungsi mengubah object JavaScript menjadi string JSON, sedangkan JSON.parse() mengubah string JSON menjadi object JavaScript agar bisa diolah oleh program.

Contoh:

const buku = {
  id: 1,
  judul: "Belajar Node.js"
};

const teksJSON = JSON.stringify(buku);
const objekBuku = JSON.parse(teksJSON);