# Tugas 2 — Project Node.js & HTTP Server Sederhana

**Mata Kuliah:** Backend Development (CPMK115)  
**Nama:** [Zhilan Maulana]  
**NIM:** [240160221049]  
**Kelas:** [SI-VB]

Project Node.js murni (tanpa Express.js) yang menyediakan endpoint informasi kelas
dan daftar mahasiswa, dengan konfigurasi melalui environment variable serta
pembacaan file JSON secara asynchronous.

---

## Struktur File

```text
tugas-2/<nim>-<nama>/
├── README.md          # Dokumentasi ini
├── config.js          # Konfigurasi environment variable
├── server.js          # HTTP server & routing
├── data/
│   └── mahasiswa.json # Data mahasiswa (filesystem async)
└── refleksi.md        # Refleksi pengerjaan