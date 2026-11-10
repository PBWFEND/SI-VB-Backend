# Hasil Latihan Individu — Pertemuan 3

## 1. Endpoint GET /students

Endpoint `GET /students` dibuat untuk menampilkan data mahasiswa yang disimpan pada file `mahasiswa.json`.

Hasil pengujian menunjukkan bahwa endpoint dapat diakses dengan baik dan mengembalikan data mahasiswa dalam format JSON.

**Endpoint:**

```text
GET /students
```

**Hasil:**

```text
HTTP/1.1 200 OK
```

Data mahasiswa berhasil ditampilkan.

---

## 2. Environment Variable COURSE_CODE

Program menggunakan environment variable `COURSE_CODE` dengan nilai default `CPMK115`.

Jika tidak diberikan nilai lain, program menggunakan:

```text
COURSE_CODE=CPMK115
```

Environment variable juga berhasil diubah menjadi:

```text
COURSE_CODE=CPMK999
```

Program menampilkan nilai `CPMK999`, sehingga perubahan environment variable berhasil diterapkan.

---

## 3. Function bacaJSON()

Program memiliki fungsi `bacaJSON(namaFile)` yang digunakan untuk membaca file JSON secara asynchronous.

Fungsi tersebut menggunakan modul bawaan:

```javascript
import { readFile } from "node:fs/promises";
```

Kemudian isi file dibaca dan diubah menjadi object/array JavaScript menggunakan `JSON.pars
