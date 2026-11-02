# Pertemuan 6 — Database dan ORM

## Deskripsi
Project ini mengembangkan REST API menggunakan Node.js, Express, Prisma ORM, dan database SQLite.

## Teknologi
- Node.js
- TypeScript
- Express
- Prisma ORM
- SQLite

## Instalasi

```bash
npm install
```

Buat file `.env` berdasarkan `.env.example`.

## Migration

```bash
npx prisma migrate dev --name init
npx prisma generate
```

## Menjalankan API Buku

```bash
node --experimental-strip-types server.ts
```

Alamat: `http://localhost:3008`

## Menjalankan Latihan Pengguna

```bash
node --experimental-strip-types latihan.ts
```

Alamat: `http://localhost:3009`

## Endpoint Buku

| Method | Endpoint |
|---|---|
| GET | /buku |
| GET | /buku/:id |
| POST | /buku |
| PATCH | /buku/:id |
| DELETE | /buku/:id |

## Endpoint Pengguna

| Method | Endpoint |
|---|---|
| GET | /pengguna |
| GET | /pengguna/:nim |
| POST | /pengguna |
| PATCH | /pengguna/:nim |
| DELETE | /pengguna/:nim |