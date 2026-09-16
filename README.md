# LinkKerja — Tugas Pemrograman Berbasis Web (PBW)

LinkKerja adalah platform yang menghubungkan **pencari kerja** dengan **perekrut**, dibangun berdasarkan dokumen SKPL-OO "LinkKerja" (Kelompok MacOS). Repositori ini berisi implementasi UI untuk kedua peran pengguna beserta skema databasenya.

## Anggota Kelompok & Pembagian Tugas

| Nama | NIM | Bagian | Folder | Branch kerja | Modul |
|---|---|---|---|---|---|
| Nabil Sunu Widyadhana | 254311058 | UI Perekrut (ketua) | `ui-perekrut/` | `fitur/ui-perekrut` | `modules/Modul_UI_Perekrut_Nabil.docx` |
| Lathifah Widya Zahra | 254311035 | UI Pencari Kerja | `ui-pencari-kerja/` | `fitur/ui-pencari-kerja` | `modules/Modul_UI_Pencari_Kerja_Lathifah.docx` |
| Sandya Yudha | 254311057 | Database | `database/` | `fitur/database` | `modules/Modul_Database_Sandya.docx` |

Setiap anggota mengerjakan bagiannya sendiri di branch masing-masing, lalu menggabungkannya ke `main` melalui Pull Request. Langkah lengkapnya ada di modul masing-masing pada folder `modules/`.

## Struktur Folder

```
LinkKerja/
├── ui-perekrut/         → tampilan untuk Perekrut (dasbor, publikasi & manajemen lowongan, seleksi kandidat)
├── ui-pencari-kerja/     → tampilan untuk Pencari Kerja (cari lowongan, lamar, tracker lamaran, profil & CV)
├── shared/style.css     → gaya (warna, komponen) yang dipakai bersama oleh kedua UI
├── database/schema.sql  → skema database (9 tabel) + data contoh
├── modules/              → modul pengerjaan (docx) untuk masing-masing anggota
└── docs/                 → tempat menyimpan tangkapan layar bukti pengerjaan
```

## Menjalankan UI

Kedua UI adalah halaman statis (HTML/CSS/JS) tanpa proses build. Buka langsung di browser:

- UI Perekrut: buka `ui-perekrut/index.html`
- UI Pencari Kerja: buka `ui-pencari-kerja/index.html`

Data yang tampil masih berupa contoh di memori (belum tersambung ke database sungguhan). Login/daftar cukup mengisi form apa saja untuk masuk ke tampilan utama.

## Palet Warna

- **Primary**: `rgb(0, 200, 255)` — `#00c8ff`
- **Secondary**: `rgb(80, 0, 255)` — `#5000ff`
- Dipakai sebagai gradasi pada aksen utama (logo, tombol utama, avatar) — lihat `shared/style.css`.

## Database

Lihat `database/README.md` untuk cara mengimpor `schema.sql`.

## Cara Kelompok Ini Berkolaborasi di GitHub

1. Ketua (Nabil) membuat repositori ini di akunnya sendiri dan meng-upload seluruh isi folder ini ke branch `main`.
2. Ketua mengundang Lathifah dan Sandya sebagai *collaborator* pada repositori.
3. Setiap anggota `git clone` repositori ini, lalu bekerja di branch fitur masing-masing (lihat tabel di atas) — instruksi rinci ada di modul masing-masing.
4. Setiap anggota membuat Pull Request ke `main` setelah bagiannya selesai, ditinjau, lalu digabungkan (merge).

> Ganti tautan repositori pada setiap modul (`<link-repo-linkkerja-milik-Nabil>`) dengan URL repo GitHub yang sebenarnya setelah dibuat.
