# Pertemuan 2 — JavaScript Modern (ES6+) & Asynchronous untuk Backend

Laporan dan dokumentasi latihan individu mengenai fitur JavaScript modern (ES6+) serta asynchronous programming (Promise, `async/await`, dan `Promise.all`) dalam studi kasus e-warung kampus.

- **Nama**: Sutiawan
- **NIM**: 240160221046
- **Mata Kuliah**: Praktikum Pemrograman Backend

---

## 1. Studi Kasus Data Transaksi

Data transaksi yang digunakan pada [latihan.js](file:///d:/Backend/240160221046/Pertemuan-02/latihan.js):
```javascript
const transaksi = [
  { id: 1, nama: "Kopi Hitam", harga: 15000, jumlah: 2 },
  { id: 2, nama: "Roti Bakar", harga: 12000, jumlah: 3 },
  { id: 3, nama: "Air Mineral", harga: 5000, jumlah: 10 },
];
```

---

## 2. Rincian Pengerjaan TODO

### TODO 1 — Destructuring + Template Literal
- **Tujuan**: Mengambil properti item pertama tanpa mengakses `transaksi[0].nama`.
- **Implementasi**:
  ```javascript
  const [{ nama: namaPertama, harga: hargaPertama }] = transaksi;
  console.log(`Item pertama: ${namaPertama} (${formatRupiah(hargaPertama)})`);
  ```
- **Hasil**:
  ```text
  Item pertama: Kopi Hitam (Rp15.000)
  ```

---

### TODO 2 — map + reduce
- **Tujuan**: Menghitung subtotal tiap item (`harga * jumlah`) menggunakan `map`, kemudian menghitung total seluruh struk menggunakan `reduce`.
- **Implementasi**:
  ```javascript
  const subtotal = transaksi.map((item) => item.harga * item.jumlah);
  const totalStruk = subtotal.reduce((acc, curr) => acc + curr, 0);
  ```
- **Hasil**:
  ```text
  Subtotal tiap item: [ 30000, 36000, 50000 ]
  Total struk: Rp116.000
  ```

---

### TODO 3 — filter + spread
- **Tujuan**: Menyaring item dengan harga di atas Rp10.000 dan mengumpulkan nama-namanya ke dalam array baru menggunakan spread operator.
- **Implementasi**:
  ```javascript
  const itemMahal = transaksi.filter((item) => item.harga > 10000);
  const namaItemTermahal = [...itemMahal.map((item) => item.nama)];
  ```
- **Hasil**:
  ```text
  Array nama item dengan harga > 10000: [ 'Kopi Hitam', 'Roti Bakar' ]
  ```

---

### TODO 4 — Promise + async/await
- **Tujuan**: Mensimulasikan proses pembayaran asinkron dengan penundaan `delayMs`. Jika total transaksi > Rp100.000, berikan diskon 10% menggunakan fungsi `hitungDiskon` dari `modul-02.js`.
- **Implementasi**:
  ```javascript
  function prosesPembayaran(total, delayMs = 500) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const diskon = total > 100000 ? hitungDiskon(total, 10) : 0;
        const kembali = total - diskon;
        resolve({ status: "lunas", total, kembali });
      }, delayMs);
    });
  }
  ```
- **Hasil**:
  ```text
  Hasil pembayaran: { status: 'lunas', total: 116000, kembali: 104400 }
  ```

---

### TODO 5 — Promise.all (Eksekusi Paralel)
- **Tujuan**: Menjalankan 3 proses asinkron laporan cabang secara bersamaan dan membuktikan eksekusi paralel melalui pengukuran selisih waktu (`Date.now()`).
- **Implementasi**:
  ```javascript
  const mulai = Date.now();
  const laporanCabang = await Promise.all([
    tunda(200, 50),
    tunda(300, 80),
    tunda(100, 70),
  ]);
  const totalPenjualan = laporanCabang.reduce((acc, curr) => acc + curr, 0);
  const waktuEksekusi = Date.now() - mulai;
  ```
- **Hasil**:
  ```text
  Laporan 3 cabang: [ 50, 80, 70 ]
  Total penjualan cabang: 200
  Total waktu eksekusi: ±308ms (terbukti paralel karena mendekati ~300ms, bukan 600ms)
  ```

---

### TODO 6 (Bonus) — Mini Formatter Struk
- **Tujuan**: Mencetak struk belanja yang rapi dan terformat menggunakan `.map()`, `.padEnd(20)`, dan template literal multi-baris.
- **Hasil Cetak**:
  ```text
  ========================================
             STRUK E-WARUNG KAMPUS        
  ========================================
  1. Kopi Hitam           x2  Rp30.000
  2. Roti Bakar           x3  Rp36.000
  3. Air Mineral          x10  Rp50.000
  ----------------------------------------
  Total:                Rp116.000
  ========================================
  ```

---

## 3. Cara Menjalankan

```powershell
cd d:\Backend\240160221046\Pertemuan-02
node latihan.js
```

