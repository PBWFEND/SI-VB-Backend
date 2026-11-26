# 📚 Mini Project Backend — Perpustakaan

- Nama  : Aprilliana
- NIM   : 240160221004
- Kelas : SI-VB 

## 🚀 Fitur Utama
1. **Auth & Security:** JWT, bcryptjs, Role-Based Access Control (Admin/User).
2. **Operational Resilience (Tugas 20):**
   - Custom `AppError` & *Centralized Error Handler*.
   - Pemetaan error database (Prisma P2002, P2025).
   - JSON Logger dengan *Redaction* (menyensor password).
   - *Request Tracker* (`X-Request-Id` & durasi).
   - Validasi Environment (`.env`).
   - *Graceful Shutdown* (`SIGINT`).
3. **Transaksi:** Peminjaman buku dengan pengurangan/penambahan stok otomatis.

---

## 🛠️ Cara Menjalankan (CMD / Terminal)

Buka terminal di folder project, lalu jalankan secara berurutan:

```bash
# 1. Install library
npm install

# 2. Salin file environment (Windows)
copy .env.example .env

# 3. Migrasi database & Generate Prisma
npx prisma migrate dev --name init
npx prisma generate

# 4. Isi data awal (Admin, User, Buku)
npm run seed

# 5. Jalankan server
npm start
Server akan berjalan di: http://localhost:3008

🧪 Bukti Pengujian Ketahanan Operasional (Resilience)
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_12\Tugas(Mini Project)>npm start

> uts-backend-perpustakaan@1.0.0 start
> tsx server.ts

{"level":"INFO","timestamp":"2026-11-19T16:45:40.597Z","message":"🚀 API berjalan di http://localhost:3008","env":"development"}
{"level":"INFO","timestamp":"2026-11-19T16:46:09.232Z","message":"Request selesai","requestId":"136a4d46-b81b-4854-b922-b2cbd37ed729","method":"GET","url":"/health","status":200,"duration":"8ms"}
{"level":"ERROR","timestamp":"2026-11-19T16:46:41.229Z","message":"Email atau password salah","requestId":"025a0acb-47ae-4642-82b9-53ec08bdb98c","method":"POST","url":"/auth/login","body":{"email":"admin@example.com","password":"***REDACTED***"},"stack":"Error: Email atau password salah\n    at login (C:\\Users\\user\\Desktop\\240160221004_Aprilliana\\240160221004\\Pertemuan_12\\Tugas(Mini Project)\\src\\controller\\auth.controller.ts:21:27)"}
{"level":"INFO","timestamp":"2026-11-19T16:46:41.232Z","message":"Request selesai","requestId":"025a0acb-47ae-4642-82b9-53ec08bdb98c","method":"POST","url":"/auth/login","status":401,"duration":"572ms"}
{"level":"ERROR","timestamp":"2026-11-19T16:47:08.799Z","message":"Email sudah terdaftar","requestId":"62489c11-481a-421b-934a-c67224f8ef00","method":"POST","url":"/auth/register","body":{"nama":"Test","email":"admin@example.com","password":"***REDACTED***"},"stack":"Error: Email sudah terdaftar\n    at register (C:\\Users\\user\\Desktop\\240160221004_Aprilliana\\240160221004\\Pertemuan_12\\Tugas(Mini Project)\\src\\controller\\auth.controller.ts:10:27)"}
{"level":"INFO","timestamp":"2026-11-19T16:47:08.801Z","message":"Request selesai","requestId":"62489c11-481a-421b-934a-c67224f8ef00","method":"POST","url":"/auth/register","status":400,"duration":"6ms"}
{"level":"ERROR","timestamp":"2026-11-19T16:47:22.203Z","message":"Email sudah terdaftar","requestId":"25353b36-15c4-4e61-aba7-53a62e3f1bee","method":"POST","url":"/auth/register","body":{"nama":"Test","email":"admin@example.com","password":"***REDACTED***"},"stack":"Error: Email sudah terdaftar\n    at register (C:\\Users\\user\\Desktop\\240160221004_Aprilliana\\240160221004\\Pertemuan_12\\Tugas(Mini Project)\\src\\controller\\auth.controller.ts:10:27)"}
{"level":"INFO","timestamp":"2026-11-19T16:47:22.205Z","message":"Request selesai","requestId":"25353b36-15c4-4e61-aba7-53a62e3f1bee","method":"POST","url":"/auth/register","status":400,"duration":"5ms"}
{"level":"ERROR","timestamp":"2026-11-19T16:47:55.185Z","message":"Endpoint /endpoint-ngawur tidak ditemukan","requestId":"1ad26600-11ba-44fc-a934-2b2bcf73cfad","method":"GET","url":"/endpoint-ngawur","stack":"Error: Endpoint /endpoint-ngawur tidak ditemukan\n    at <anonymous> (C:\\Users\\user\\Desktop\\240160221004_Aprilliana\\240160221004\\Pertemuan_12\\Tugas(Mini Project)\\app.ts:16:35)\n    at Layer.handleRequest (C:\\Users\\user\\Desktop\\240160221004_Aprilliana\\240160221004\\Pertemuan_12\\Tugas(Mini Project)\\node_modules\\router\\lib\\layer.js:169:33)\n    at trimPrefix (C:\\Users\\user\\Desktop\\240160221004_Aprilliana\\240160221004\\Pertemuan_12\\Tugas(Mini Project)\\node_modules\\router\\index.js:356:13)\n    at C:\\Users\\user\\Desktop\\240160221004_Aprilliana\\240160221004\\Pertemuan_12\\Tugas(Mini Project)\\node_modules\\router\\index.js:311:9\n    at processParams (C:\\Users\\user\\Desktop\\240160221004_Aprilliana\\240160221004\\Pertemuan_12\\Tugas(Mini Project)\\node_modules\\router\\index.js:619:12)\n    at next (C:\\Users\\user\\Desktop\\240160221004_Aprilliana\\240160221004\\Pertemuan_12\\Tugas(Mini Project)\\node_modules\\router\\index.js:305:5)\n    at read (C:\\Users\\user\\Desktop\\240160221004_Aprilliana\\240160221004\\Pertemuan_12\\Tugas(Mini Project)\\node_modules\\body-parser\\lib\\read.js:59:5)\n    at jsonParser (C:\\Users\\user\\Desktop\\240160221004_Aprilliana\\240160221004\\Pertemuan_12\\Tugas(Mini Project)\\node_modules\\body-parser\\lib\\types\\json.js:60:5)\n    at Layer.handleRequest (C:\\Users\\user\\Desktop\\240160221004_Aprilliana\\240160221004\\Pertemuan_12\\Tugas(Mini Project)\\node_modules\\router\\lib\\layer.js:169:33)\n    at trimPrefix (C:\\Users\\user\\Desktop\\240160221004_Aprilliana\\240160221004\\Pertemuan_12\\Tugas(Mini Project)\\node_modules\\router\\index.js:356:13)"}
{"level":"INFO","timestamp":"2026-11-19T16:47:55.188Z","message":"Request selesai","requestId":"1ad26600-11ba-44fc-a934-2b2bcf73cfad","method":"GET","url":"/endpoint-ngawur","status":404,"duration":"4ms"}
{"level":"INFO","timestamp":"2026-11-19T16:51:13.166Z","message":"Menerima SIGINT. Memulai graceful shutdown..."}
{"level":"INFO","timestamp":"2026-11-19T16:51:13.173Z","message":"HTTP server ditutup."}
{"level":"INFO","timestamp":"2026-11-19T16:51:13.177Z","message":"Koneksi database diputus."}
Terminate batch job (Y/N)? y

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_12\Tugas(Mini Project)>npm start

> uts-backend-perpustakaan@1.0.0 start
> tsx server.ts

❌ FATAL: Env "JWT_SECRET" missing.

C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_12\Tugas(Mini Project)>curl -i http://localhost:3008/health
HTTP/1.1 200 OK
X-Powered-By: Express
X-Request-Id: 136a4d46-b81b-4854-b922-b2cbd37ed729
Content-Type: application/json; charset=utf-8
Content-Length: 15
ETag: W/"f-VaSQ4oDUiZblZNAEkkN+sX+q3Sg"
Date: Thu, 19 Nov 2026 16:46:09 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"status":"ok"}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_12\Tugas(Mini Project)>curl -i -X POST http://localhost:3008/auth/login -H "Content-Type: application/json" -d "{\"email\":\"admin@example.com\",\"password\":\"PASSWORD_SALAH\"}"
HTTP/1.1 401 Unauthorized
X-Powered-By: Express
X-Request-Id: 025a0acb-47ae-4642-82b9-53ec08bdb98c
Content-Type: application/json; charset=utf-8
Content-Length: 107
ETag: W/"6b-a/Cx+LnhpmkQ3Ce0/Zloqrdkn3g"
Date: Thu, 19 Nov 2026 16:46:41 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"status":"error","message":"Email atau password salah","requestId":"025a0acb-47ae-4642-82b9-53ec08bdb98c"}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_12\Tugas(Mini Project)>curl -i -X POST http://localhost:3008/auth/register -H "Content-Type: application/json" -d "{\"nama\":\"Test\",\"email\":\"admin@example.com\",\"password\":\"rahasia123\"}"
HTTP/1.1 400 Bad Request
X-Powered-By: Express
X-Request-Id: 62489c11-481a-421b-934a-c67224f8ef00
Content-Type: application/json; charset=utf-8
Content-Length: 103
ETag: W/"67-QREf2L4IUsCja5JSXVZ3RQE4/So"
Date: Thu, 19 Nov 2026 16:47:08 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"status":"error","message":"Email sudah terdaftar","requestId":"62489c11-481a-421b-934a-c67224f8ef00"}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_12\Tugas(Mini Project)>curl -i -X POST http://localhost:3008/auth/register -H "Content-Type: application/json" -d "{\"nama\":\"Test\",\"email\":\"admin@example.com\",\"password\":\"rahasia123\"}"
HTTP/1.1 400 Bad Request
X-Powered-By: Express
X-Request-Id: 25353b36-15c4-4e61-aba7-53a62e3f1bee
Content-Type: application/json; charset=utf-8
Content-Length: 103
ETag: W/"67-tl1RN4HiRWnR5IjthYfYCb/STio"
Date: Thu, 19 Nov 2026 16:47:22 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"status":"error","message":"Email sudah terdaftar","requestId":"25353b36-15c4-4e61-aba7-53a62e3f1bee"}
C:\Users\user\Desktop\240160221004_Aprilliana\240160221004\Pertemuan_12\Tugas(Mini Project)>curl -i http://localhost:3008/endpoint-ngawur
HTTP/1.1 404 Not Found
X-Powered-By: Express
X-Request-Id: 1ad26600-11ba-44fc-a934-2b2bcf73cfad
Content-Type: application/json; charset=utf-8
Content-Length: 123
ETag: W/"7b-SUhNurkOW2biFclTg9MTrxoap4U"
Date: Thu, 19 Nov 2026 16:47:55 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"status":"error","message":"Endpoint /endpoint-ngawur tidak ditemukan","requestId":"1ad26600-11ba-44fc-a934-2b2bcf73cfad"}