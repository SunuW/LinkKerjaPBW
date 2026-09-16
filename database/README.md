# Database LinkKerja

Skema ini mendukung seluruh kebutuhan fungsional (KF-01 s.d. KF-10) dan use case pada SKPL-OO LinkKerja.

## Cara Mengimpor

**MySQL 8.0:**
```bash
mysql -u root -p < schema.sql
```

**PostgreSQL 15:** sesuaikan dulu tipe `AUTO_INCREMENT` → `SERIAL` dan `ENUM(...)` → tipe `TEXT` dengan `CHECK`, lalu:
```bash
psql -U postgres -f schema.sql
```

## Ringkasan Tabel

| Tabel | Keterangan |
|---|---|
| `users` | Akun dasar, membedakan peran `pencari_kerja` dan `perekrut` |
| `profil_pencari_kerja` | Data diri pencari kerja |
| `riwayat_pendidikan` | Riwayat pendidikan (bagian dari CV) |
| `pengalaman_kerja` | Riwayat pengalaman kerja (bagian dari CV) |
| `dokumen` | CV, sertifikat, portofolio yang diunggah |
| `perusahaan` | Data perusahaan milik akun perekrut |
| `lowongan` | Lowongan pekerjaan yang dipublikasikan |
| `lamaran` | Lamaran yang dikirim pencari kerja ke suatu lowongan |
| `notifikasi` | Notifikasi status lamaran & lowongan baru |

Diagram ERD dan query pendukung (`queries.sql`) ditambahkan oleh Sandya sesuai instruksi pada `modules/Modul_Database_Sandya.docx`.
