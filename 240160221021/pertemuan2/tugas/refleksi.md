# Refleksi Pertemuan 2

Nama dan NIM: Lintang Azzahra Govarana (240160221021)

## Tiga fitur yang paling mengubah cara saya menulis kode

1. **map dan reduce.** Untuk menghitung subtotal dan total struk, saya tidak perlu menulis perulangan panjang. map mengubah tiap item menjadi subtotal, lalu reduce menjumlahkannya menjadi satu total (Rp116.000).

2. **async/await.** Proses yang butuh waktu, seperti pembayaran atau akses data, bisa ditulis berurutan dengan await sehingga lebih mudah dibaca.

3. **Promise.all.** Pada latihan 5, tiga laporan cabang selesai dalam sekitar 300 ms, bukan 600 ms, karena dijalankan bersamaan.

## Satu hal yang masih membingungkan

Saya masih bingung mengapa urutan hasil di terminal bisa berbeda dengan urutan kode ditulis. Misalnya, hasil pembayaran (500 ms) muncul paling akhir, padahal kodenya ditulis lebih dulu daripada laporan cabang (300 ms).