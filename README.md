<div align="center">

# 🚀 SI-VB-Backend

`2026-2027 Gasal`

[![Auto-merge](https://github.com/PBWFEND/SI-VB-Backend/actions/workflows/auto-merge.yml/badge.svg)](https://github.com/PBWFEND/SI-VB-Backend/actions/workflows/auto-merge.yml)
![Status](https://img.shields.io/badge/matkul-aktif-brightgreen)
![GitHub repo size](https://img.shields.io/github/repo-size/PBWFEND/SI-VB-Backend)
![GitHub forks](https://img.shields.io/github/forks/PBWFEND/SI-VB-Backend?label=fork&style=social)
![GitHub contributors](https://img.shields.io/github/contributors/PBWFEND/SI-VB-Backend)
![GitHub last commit](https://img.shields.io/github/last-commit/PBWFEND/SI-VB-Backend)

</div>

---

## 🔄 Alur Pengumpulan Tugas

```mermaid
flowchart LR
    A[Buat branch sesuai NIM] --> B[Commit & push ke fork/branch]
    B --> C[Open Pull Request ke main]
    C --> D{🔥 Auto-merge guard}
    D -- lolos --> E[✅ Merged otomatis]
    D -- ditolak --> F[❌ Baca komentar bot, perbaiki, push ulang]
```

PR yang lolos safety check **langsung di-merge otomatis** oleh bot.

### Aturan Auto-merge

| Cek | Limit |
|---|---|
| Base branch | `main` |
| Login GitHub mengandung NIM `2401...` | wajib (atau label `auto-merge`) |
| Jumlah file berubah | ≤ 200 file |
| Total baris terhapus | ≤ 500 baris |
| Menghapus file / menyentuh `README.md`, `.gitignore`, `.github/*` | ❌ ditolak |
| Menyentuh folder mahasiswa lain | ❌ ditolak |
| Commit `node_modules/` | ❌ ditolak |
| Conflict marker `<<<<<<<` / `>>>>>>>` | ❌ ditolak |

Kalau PR ditolak, bot akan menulis komentar di PR berisi **alasan + cara memperbaiki** (mis. perintah `git rm --cached` untuk membersihkan `node_modules`).

> **Jangan commit `node_modules/`** — tambahkan `.gitignore` berisi `node_modules/` di folder masing-masing.

<!-- ALL-CONTRIBUTORS-LIST:START -->

<table>
<tr>
<td align="center">
<a href="https://github.com/PBWFEND/SI-VB-Backend/graphs/contributors">
<img src="https://contrib.rocks/image?repo=PBWFEND/SI-VB-Backend" alt="Contributors" />
</a>
</td>
</tr>
</table>

<p align="center">
<a href="#"><img src="https://img.shields.io/github/forks/PBWFEND/SI-VB-Backend?label=fork&style=social"></a>
<a href="#"><img src="https://img.shields.io/github/contributors/PBWFEND/SI-VB-Backend"></a>
<a href="#"><img src="https://img.shields.io/github/last-commit/PBWFEND/SI-VB-Backend"></a>
</p>

<!-- ALL-CONTRIBUTORS-LIST:END -->

---

<div align="center">
<sub>🔒 README ini proteksi repo — perubahan hanya melalui maintainer.</sub>
</div>
