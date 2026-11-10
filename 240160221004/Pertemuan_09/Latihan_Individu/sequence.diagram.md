`SEQUENCE_DIAGRAM.md` — **Gambar Sequence Pembuatan Salt & Verifikasi Login**

Nama    : Aprilliana Fratiwi
NPM     : 240160221004
Kelas   : SI -VB

```markdown
# Sequence Diagram — Pembuatan Salt & Verifikasi Login

Diagram ini menggunakan format **Mermaid**. Anda bisa merendernya di [Mermaid Live Editor](https://mermaid.live) atau VS Code (dengan ekstensi Markdown Preview Mermaid).

---

## A. Sequence Pembuatan Salt (Register)

```mermaid
sequenceDiagram
    participant C as Client
    participant Ctrl as Controller
    participant S as Service
    participant DB as Database (Prisma)

    C->>Ctrl: POST /register (nim, nama, email, password)
    Ctrl->>Ctrl: Validasi input (nim angka, email, password ≥ 8)
    Ctrl->>S: buatAkun(nim, nama, email, password)
    S->>S: randomBytes(16) → salt
    S->>S: scrypt(password, salt) → derivedKey
    S->>S: Format hash = "scrypt$salt$key"
    S->>DB: INSERT pengguna (nim, nama, email, passwordHash)
    DB-->>S: Return Profil (id, nim, nama, email, createdAt)
    S-->>Ctrl: Return ProfilPublik
    Ctrl-->>C: 201 Created (JSON Profil, TANPA hash)