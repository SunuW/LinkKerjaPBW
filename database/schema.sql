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
     