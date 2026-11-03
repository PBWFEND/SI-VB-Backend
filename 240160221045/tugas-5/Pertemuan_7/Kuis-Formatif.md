# Kuis Formatif Pertemuan 7

**1. Apa perbedaan tanggung jawab controller dan service?**

Controller bertanggung jawab menangani request dan response HTTP, melakukan validasi input, serta menentukan status code yang sesuai. Sementara itu, service bertanggung jawab menjalankan proses bisnis dan operasi database. Controller mengatur alur komunikasi, sedangkan service mengelola proses dan data.

**2. Mengapa validasi input tidak diletakkan di service?**

Karena validasi input merupakan tanggung jawab controller yang berhubungan dengan request dari pengguna. Dengan memisahkan validasi dari service, service dapat digunakan kembali oleh berbagai controller tanpa bergantung pada struktur request HTTP. Hal ini membuat kode lebih terstruktur dan mudah dipelihara.

**3. Apa fungsi `express.Router()` dan kapan Anda menggunakannya?**

`express.Router()` berfungsi untuk membuat kelompok route secara terpisah dan modular. Router digunakan ketika aplikasi memiliki beberapa resource atau endpoint agar pengelolaan route lebih rapi, terorganisasi, dan mudah dikembangkan.

**4. Apa yang terjadi bila `express.json()` didaftarkan setelah route yang memakai `request.body`?**

Request body tidak akan diproses oleh middleware JSON sebelum route dijalankan. Akibatnya, `request.body` dapat bernilai `undefined` sehingga data yang dikirim pengguna tidak dapat dibaca dengan benar. Oleh karena itu, `express.json()` harus didaftarkan sebelum route.

**5. Status code apa yang dikirim untuk `POST /buku` saat sukses, dan mengapa bukan `200`?**

Status code yang digunakan adalah **201 Created**, karena request POST berhasil membuat resource atau data baru. Status 201 lebih tepat daripada 200 karena secara khusus menunjukkan bahwa resource baru telah berhasil dibuat.

**6. Bagaimana cara menangani parameter route yang bukan angka tanpa menyebabkan error runtime?**

Dengan memeriksa tipe dan format parameter sebelum mengubahnya menjadi angka. Gunakan `typeof` untuk memastikan parameter berupa string, kemudian gunakan `Number()` dan `Number.isInteger()` untuk memeriksa apakah nilainya merupakan bilangan bulat yang valid. Jika tidak valid, kembalikan status **400 Bad Request** beserta pesan kesalahan.

Contoh:

```typescript
const idParam = request.params.id;

if (typeof idParam !== "string") {
  return response.status(400).json({
    success: false,
    message: "Parameter ID harus berupa teks",
  });
}

const id = Number(idParam);

if (!Number.isInteger(id) || id <= 0) {
  return response.status(400).json({
    success: false,
    message: "ID harus berupa angka bulat positif",
  });
}
```