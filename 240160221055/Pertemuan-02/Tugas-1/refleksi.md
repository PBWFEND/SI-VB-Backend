# Refleksi Tugas 1 — Refactor & Mini-Service

**Nama:** Rasya Putri Ramadhani
**NPM:** 240160221055

## Refleksi

Pada tugas ini saya mempelajari penerapan beberapa fitur JavaScript modern (ES6+) melalui proses refactoring kode warisan dan pembuatan service sederhana menggunakan Node.js. Tiga fitur P2 yang paling mengubah cara saya menulis kode adalah arrow function, destructuring, dan template literal.

Fitur pertama adalah arrow function. Sebelumnya, saya lebih sering menggunakan function biasa dengan penulisan yang lebih panjang. Setelah menggunakan arrow function, saya memahami bahwa fungsi dapat ditulis dengan lebih singkat dan tetap mudah dibaca. Contohnya, fungsi buatPesan dapat ditulis menggunakan const buatPesan = () =>, sehingga kode terlihat lebih sederhana.

Fitur kedua adalah destructuring. Fitur ini membantu saya mengambil nilai tertentu dari sebuah object secara langsung. Pada kode refactor, saya menggunakan { harga, jumlah } untuk mengambil kedua properti tersebut tanpa harus menuliskan item.harga dan item.jumlah berulang kali. Hal ini membuat kode perhitungan total menjadi lebih ringkas dan mudah dipahami.

Fitur ketiga adalah template literal. Saya menggunakan template literal untuk menggabungkan teks dengan nilai variabel, seperti `Total: ${total}`. Dibandingkan menggunakan operator +, penulisan ini terasa lebih jelas, terutama ketika sebuah teks memiliki beberapa nilai yang perlu dimasukkan.

Satu hal yang masih membingungkan bagi saya adalah Promise dan proses asynchronous, terutama ketika menggunakan Promise.all(). Saya sudah memahami bahwa Promise.all() dapat menjalankan beberapa proses secara paralel dan menunggu hasilnya, tetapi saya masih perlu memahami lebih dalam bagaimana JavaScript mengatur proses asynchronous tersebut dan bagaimana cara menentukan kapan penggunaannya lebih tepat dibandingkan menjalankan proses satu per satu.

Melalui tugas ini, saya menyadari bahwa penggunaan fitur ES6+ bukan hanya untuk membuat kode lebih singkat, tetapi juga dapat membuat kode lebih terstruktur, mudah dibaca, dan lebih nyaman untuk dikembangkan.