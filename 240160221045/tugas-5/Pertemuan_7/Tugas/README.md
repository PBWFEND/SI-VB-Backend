# \# Tugas 5 - Pertemuan 7

# 

# \## REST API Mahasiswa dengan Express.js dan Prisma ORM

# 

# \### 1. Deskripsi Project

# 

# Project ini merupakan REST API untuk mengelola data mahasiswa menggunakan Node.js, TypeScript, Express.js 5, Prisma ORM 7, dan SQLite.

# 

# API menyediakan fitur CRUD (Create, Read, Update, Delete).

# 

# \### 2. Teknologi

# 

# \- Node.js

# \- TypeScript

# \- Express.js 5

# \- Prisma ORM 7

# \- SQLite

# \- LibSQL Adapter

# 

# \### 3. Struktur Folder

# 

# ```text

# Tugas/

# ├── prisma/

# │   ├── migrations/

# │   └── schema.prisma

# ├── src/

# │   ├── controller/

# │   │   └── mahasiswa.controller.ts

# │   ├── routes/

# │   │   └── mahasiswa.routes.ts

# │   └── service/

# │       └── mahasiswa.service.ts

# ├── bukti-testing/

# ├── app.ts

# ├── server.ts

# ├── client.ts

# ├── prisma.config.ts

# ├── .env.example

# ├── .gitignore

# ├── package.json

# └── README.md

# ```

# 

# \### 4. Arsitektur Aplikasi

# 

# Project menggunakan tiga lapisan:

# 

# \*\*Routes\*\*

# 

# Mengatur endpoint API dan menghubungkan HTTP method dengan controller.

# 

# \*\*Controller\*\*

# 

# Menangani request dan response HTTP, validasi input, pemanggilan service, serta penentuan status code.

# 

# \*\*Service\*\*

# 

# Menangani operasi database menggunakan Prisma ORM.

# 

# \*\*Alur aplikasi:\*\*

# 

# ```text

# Client -> Routes -> Controller -> Service -> Database

# ```

# 

# Response dikembalikan melalui Controller kepada Client.

# 

# \### 5. Data Mahasiswa

# 

# | Field | Tipe Data | Keterangan |

# |---|---|---|

# | nim | String | Primary key |

# | nama | String | Nama mahasiswa |

# | prodi | String | Program studi |

# | angkatan | Int | Tahun angkatan |

# 

# \### 6. Daftar Endpoint API

# 

# | Method | Endpoint | Fungsi |

# |---|---|---|

# | GET | `/mahasiswa` | Mengambil semua mahasiswa |

# | GET | `/mahasiswa/:nim` | Mengambil detail mahasiswa |

# | POST | `/mahasiswa` | Menambahkan mahasiswa |

# | PATCH | `/mahasiswa/:nim` | Memperbarui data mahasiswa |

# | DELETE | `/mahasiswa/:nim` | Menghapus mahasiswa |

# 

# \### 7. Status Code

# 

# \- \*\*200 OK\*\*: Request berhasil.

# \- \*\*201 Created\*\*: Data berhasil dibuat.

# \- \*\*204 No Content\*\*: Data berhasil dihapus.

# \- \*\*400 Bad Request\*\*: Validasi input gagal.

# \- \*\*404 Not Found\*\*: Data atau endpoint tidak ditemukan.

# \- \*\*500 Internal Server Error\*\*: Terjadi kesalahan server.

# 

# \### 8. Cara Menjalankan Project

# 

# \*\*Install dependencies:\*\*

# 

# ```powershell

# npm install

# ```

# 

# \*\*Jalankan migrasi database:\*\*

# 

# ```powershell

# npx prisma migrate dev

# ```

# 

# \*\*Generate Prisma Client:\*\*

# 

# ```powershell

# npx prisma generate

# ```

# 

# \*\*Jalankan server:\*\*

# 

# ```powershell

# npx tsx server.ts

# ```

# 

# Server berjalan pada:

# 

# `http://localhost:3011`

# 

# \### 9. Contoh Pengujian API

# 

# Pengujian dilakukan menggunakan PowerShell.

# 

# \*\*A. GET semua mahasiswa\*\*

# 

# ```powershell

# Invoke-RestMethod -Uri "http://localhost:3011/mahasiswa" -Method GET

# ```

# 

# \*\*B. POST mahasiswa\*\*

# 

# ```powershell

# $body = @{

# &#x20;   nim = "240160221045"

# &#x20;   nama = "Siti"

# &#x20;   prodi = "Sistem Informasi"

# &#x20;   angkatan = 2024

# } | ConvertTo-Json

# 

# Invoke-RestMethod -Uri "http://localhost:3011/mahasiswa" -Method POST -ContentType "application/json" -Body $body

# ```

# 

# \*\*C. GET detail mahasiswa\*\*

# 

# ```powershell

# Invoke-RestMethod -Uri "http://localhost:3011/mahasiswa/240160221045" -Method GET

# ```

# 

# \*\*D. PATCH mahasiswa\*\*

# 

# ```powershell

# $body = @{

# &#x20;   prodi = "Teknik Informatika"

# } | ConvertTo-Json

# 

# Invoke-RestMethod -Uri "http://localhost:3011/mahasiswa/240160221045" -Method PATCH -ContentType "application/json" -Body $body

# ```

# 

# \*\*E. DELETE mahasiswa\*\*

# 

# ```powershell

# Invoke-WebRequest -UseBasicParsing -Uri "http://localhost:3011/mahasiswa/240160221045" -Method DELETE

# ```

# 

# \### 10. Middleware dan Error Handling

# 

# Aplikasi menggunakan:

# 

# \- `express.json()` untuk membaca request body JSON.

# \- Logger untuk mencatat HTTP method dan URL.

# \- 404 handler untuk endpoint yang tidak tersedia.

# \- Error handler untuk menangani kesalahan server.

# 

# \### 11. Bukti Testing

# 

# Seluruh hasil pengujian disimpan dalam folder `bukti-testing`:

# 

# 1\. GET mahasiswa kosong.

# 2\. POST mahasiswa.

# 3\. GET mahasiswa setelah POST.

# 4\. GET detail mahasiswa.

# 5\. PATCH mahasiswa.

# 6\. POST validasi gagal.

# 7\. PATCH validasi gagal.

# 8\. GET mahasiswa tidak ditemukan.

# 9\. DELETE mahasiswa.

# 10\. GET setelah DELETE.

# 11\. DELETE mahasiswa tidak ditemukan.

# 12\. Endpoint tidak ditemukan.

