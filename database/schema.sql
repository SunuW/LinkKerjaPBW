-- =====================================================================
-- LinkKerja - Skema Database
-- Sesuai SKPL-OO Kelompok MacOS
-- DBMS target: MySQL 8.0 / PostgreSQL 15 (sintaks di bawah kompatibel MySQL 8)
-- Dikerjakan oleh: Sandya Yudha (254311057)
-- =====================================================================

CREATE DATABASE IF NOT EXISTS linkkerja;
USE linkkerja;

-- 1. USERS
-- Akun dasar untuk kedua peran (pencari kerja & perekrut). Lihat UC-01 Login,
-- Register (halaman 'Daftar'), dan KNF-05 (autentikasi aman).
CREATE TABLE users (
    id_user       INT AUTO_INCREMENT PRIMARY KEY,
    nama          VARCHAR(100) NOT NULL,
    email         VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role          ENUM('pencari_kerja', 'perekrut') NOT NULL,
    is_verified   BOOLEAN NOT NULL DEFAULT FALSE,
    dibuat_pada   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. PROFIL_PENCARI_KERJA
-- Data diri pencari kerja. Terkait KF-01 (buat/edit profil), UC-02 Mengelola Profil.
CREATE TABLE profil_pencari_kerja (
    id_profil     INT AUTO_INCREMENT PRIMARY KEY,
    id_user       INT NOT NULL,
    alamat        VARCHAR(255),
    no_telepon    VARCHAR(20),
    ringkasan     TEXT,
    foto_profil   VARCHAR(255),
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE
);

-- 3. RIWAYAT_PENDIDIKAN
-- Bagian dari profil pencari kerja (riwayat hidup / CV). KF-01, KF-02.
CREATE TABLE riwayat_pendidikan (
    id_pendidikan INT AUTO_INCREMENT PRIMARY KEY,
    id_profil     INT NOT NULL,
    jenjang       VARCHAR(50),
    institusi     VARCHAR(150),
    jurusan       VARCHAR(100),
    tahun_mulai   YEAR,
    tahun_selesai YEAR,
    FOREIGN KEY (id_profil) REFERENCES profil_pencari_kerja(id_profil) ON DELETE CASCADE
);

-- 4. PENGALAMAN_KERJA
-- Bagian dari profil pencari kerja. KF-01.
CREATE TABLE pengalaman_kerja (
    id_pengalaman INT AUTO_INCREMENT PRIMARY KEY,
    id_profil     INT NOT NULL,
    posisi        VARCHAR(100),
    perusahaan    VARCHAR(150),
    tahun_mulai   YEAR,
    tahun_selesai YEAR,
    deskripsi     TEXT,
    FOREIGN KEY (id_profil) REFERENCES profil_pencari_kerja(id_profil) ON DELETE CASCADE
);

-- 5. DOKUMEN
-- CV, sertifikat, portofolio yang diunggah pencari kerja. KF-02.
CREATE TABLE dokumen (
    id_dokumen    INT AUTO_INCREMENT PRIMARY KEY,
    id_profil     INT NOT NULL,
    jenis         ENUM('cv', 'sertifikat', 'portofolio', 'lainnya') NOT NULL,
    nama_file     VARCHAR(255) NOT NULL,
    path_file     VARCHAR(255) NOT NULL,
    diunggah_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_profil) REFERENCES profil_pencari_kerja(id_profil) ON DELETE CASCADE
);

-- 6. PERUSAHAAN
-- Data perusahaan/instansi milik akun perekrut.
CREATE TABLE perusahaan (
    id_perusahaan INT AUTO_INCREMENT PRIMARY KEY,
    id_user       INT NOT NULL,
    nama_perusahaan VARCHAR(150) NOT NULL,
    bidang        VARCHAR(100),
    lokasi        VARCHAR(150),
    deskripsi     TEXT,
    logo          VARCHAR(255),
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE
);

-- 7. LOWONGAN
-- Lowongan pekerjaan yang dipublikasikan perekrut. KF-07, UC-05 Mengunggah Lowongan.
CREATE TABLE lowongan (
    id_lowongan   INT AUTO_INCREMENT PRIMARY KEY,
    id_perusahaan INT NOT NULL,
    judul_posisi  VARCHAR(150) NOT NULL,
    bidang        VARCHAR(100),
    lokasi        VARCHAR(150),
    tipe_kerja    ENUM('full_time', 'part_time', 'magang', 'kontrak') NOT NULL,
    deskripsi     TEXT,
    kriteria      TEXT,
    status        ENUM('aktif', 'nonaktif') NOT NULL DEFAULT 'aktif',
    dipublikasikan_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_perusahaan) REFERENCES perusahaan(id_perusahaan) ON DELETE CASCADE
);

-- 8. LAMARAN
-- Lamaran yang dikirim pencari kerja ke suatu lowongan. KF-06, KF-08, KF-09, KF-10,
-- UC-04 Melamar Pekerjaan, UC-06 Menyeleksi Kandidat, UC-07 Melihat Status Lamaran.
CREATE TABLE lamaran (
    id_lamaran    INT AUTO_INCREMENT PRIMARY KEY,
    id_lowongan   INT NOT NULL,
    id_profil     INT NOT NULL,
    id_dokumen    INT,
    status        ENUM('terkirim', 'ditinjau', 'diterima', 'ditolak') NOT NULL DEFAULT 'terkirim',
    dikirim_pada  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    diperbarui_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_lowongan) REFERENCES lowongan(id_lowongan) ON DELETE CASCADE,
    FOREIGN KEY (id_profil) REFERENCES profil_pencari_kerja(id_profil) ON DELETE CASCADE,
    FOREIGN KEY (id_dokumen) REFERENCES dokumen(id_dokumen) ON DELETE SET NULL,
    UNIQUE KEY unik_lamaran (id_lowongan, id_profil) -- satu pencari kerja hanya bisa melamar 1x per lowongan
);

-- 9. NOTIFIKASI
-- Notifikasi status lamaran & lowongan baru. KF-05, dan disebutkan di deskripsi umum sistem.
CREATE TABLE notifikasi (
    id_notifikasi INT AUTO_INCREMENT PRIMARY KEY,
    id_user       INT NOT NULL,
    judul         VARCHAR(150) NOT NULL,
    pesan         TEXT NOT NULL,
    sudah_dibaca  BOOLEAN NOT NULL DEFAULT FALSE,
    dibuat_pada   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE
);

-- =====================================================================
-- DATA CONTOH (SEED) - untuk keperluan demo UI, boleh diganti/ditambah
-- =====================================================================

INSERT INTO users (nama, email, password_hash, role, is_verified) VALUES
('Nabil Sunu Widyadhana', 'nabil@contoh.com', 'hash_dummy_1', 'perekrut', TRUE),
('Lathifah Widya Zahra', 'zahra@contoh.com', 'hash_dummy_2', 'pencari_kerja', TRUE);

INSERT INTO perusahaan (id_user, nama_perusahaan, bidang, lokasi, deskripsi) VALUES
(1, 'PT Teknologi Madiun', 'Teknologi Informasi', 'Madiun, Jawa Timur', 'Perusahaan pengembang perangkat lunak.');

INSERT INTO profil_pencari_kerja (id_user, alamat, no_telepon, ringkasan) VALUES
(2, 'Madiun, Jawa Timur', '081234567890', 'Mahasiswa TRPL yang tertarik pada pengembangan web.');

INSERT INTO lowongan (id_perusahaan, judul_posisi, bidang, lokasi, tipe_kerja, deskripsi, kriteria) VALUES
(1, 'Frontend Developer', 'Teknologi Informasi', 'Madiun', 'full_time',
 'Membangun antarmuka aplikasi web menggunakan HTML, CSS, dan JavaScript.',
 'Menguasai HTML/CSS/JS, memahami dasar UI/UX.');
