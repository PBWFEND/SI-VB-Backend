# Tugas 2 — REST Endpoint dengan Express.js

**Mata Kuliah:** Backend Development (CPMK117)  
**Nama:** [Zhilan Maulana]  
**NIM:** [240160221049]  
**Kelas:** [SI-VB]

API REST untuk resource **buku perpustakaan** menggunakan Express.js 5,
dengan pemisahan `app.js`/`server.js`, routing modular, middleware JSON+logger,
serta handler 404 dan error middleware.

---

## Struktur Project

```text
tugas-2/<nim>-<nama>/pertemuan-04/
├── package.json
├── .gitignore
├── app.js                    # Express app
├── server.js                 # Entry point (listen)
├── routes/
│   └── buku.routes.js        # Router /buku
├── middleware/
│   ├── logger.js             # Logger waktu/method/URL
│   └── errorHandler.js       # 404 + error middleware
├── data/
│   └── buku.js               # Database in-memory
└── README.md