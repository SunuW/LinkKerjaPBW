CREATE DATABASE IF NOT EXISTS linkkerja; 
USE linkkerja; 
CREATE TABLE users (    
     id_user       INT AUTO_INCREMENT PRIMARY KEY,     
     nama          VARCHAR(100) NOT NULL,     
     email         VARCHAR(150) NOT NULL UNIQUE,    
     password_hash VARCHAR(255) NOT NULL,     
     role         ENUM('pencari_kerja', 'perekrut') NOT NULL,     
     is_verified   BOOLEAN NOT NULL DEFAULT FALSE,     
     dibuat_pada   TIMESTAMP DEFAULT CURRENT_TIMESTAMP );   
CREATE TABLE profil_pencari_kerja (    
     id_profil     INT AUTO_INCREMENT PRIMARY KEY,     
     id_user       INT NOT NULL,     
     alamat        VARCHAR(255),     
     no_telepon    VARCHAR(20),     
     ringkasan     TEXT,     
     foto_profil   VARCHAR(255),     
     FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE ); 
CREATE TABLE riwayat_pendidikan (     
    id_pendidikan INT AUTO_INCREMENT PRIMARY KEY,     
    id_profil     INT NOT NULL,     
    jenjang       VARCHAR(50),    
    institusi     VARCHAR(150),     
    jurusan       VARCHAR(100),     
    tahun_mulai   YEAR,     
    tahun_selesai YEAR,     
    FOREIGN KEY (id_profil) REFERENCES profil_pencari_kerja(id_profil) ON DELETE CASCADE ); 
CREATE TABLE pengalaman_kerja (    
    id_pengalaman INT AUTO_INCREMENT PRIMARY KEY,     
    id_profil     INT NOT NULL,     
    posisi        VARCHAR(100),     
    perusahaan    VARCHAR(150),     
    tahun_mulai   YEAR,     
    tahun_selesai YEAR,     
    deskripsi     TEXT,     
    FOREIGN KEY (id_profil) REFERENCES profil_pencari_kerja(id_profil) ON DELETE CASCADE ); 
CREATE TABLE dokumen (     
    id_dokumen    INT AUTO_INCREMENT PRIMARY KEY,     
    id_profil     INT NOT NULL,     
    jenis         ENUM('cv', 'sertifikat', 'portofolio', 'lainnya') NOT NULL,     
    nama_file     VARCHAR(255) NOT NULL,     
    path_file     VARCHAR(255) NOT NULL,     
    diunggah_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,     
    FOREIGN KEY (id_profil) REFERENCES profil_pencari_kerja(id_profil) ON DELETE CASCADE ); 
CREATE TABLE perusahaan (     
    id_perusahaan INT AUTO_INCREMENT PRIMARY KEY,     
    id_user       INT NOT NULL,     
    nama_perusahaan VARCHAR(150) NOT NULL,     
    bidang        VARCHAR(100),     
    lokasi        VARCHAR(150),     
    deskripsi     TEXT,     
    logo          VARCHAR(255),     
    FOREIGN KEY (id_user) REFERENCES users(id_user) ON DELETE CASCADE ); 
CREATE TABLE lowongan (     
    id_lowongan   INT AUTO_INCREMENT PRIMARY KEY,     
    id_perusahaan INT NOT NULL,     
    judul_posisi  VARCHAR(150) NOT NULL,     
    bidang        VARCHAR(100),     
    lokasi        VARCHAR(150),     
    tipe_kerja    ENUM('full_time', 'part_time', 'magang', 'kontrak') NOT NULL,     
    deskripsi     TEXT,     
    kriteria      TEXT,     status        ENUM('aktif', 'nonaktif') NOT NULL DEFAULT 'aktif',     
    dipublikasikan_pada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,     
    FOREIGN KEY (id_perusahaan) REFERENCES perusahaan(id_perusahaan) ON DELETE CASCADE );   
