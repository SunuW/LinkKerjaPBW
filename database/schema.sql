CREATE DATABASE IF NOT EXISTS linkkerja; 
USE linkkerja; 
CREATE TABLE users (    
     id_user       INT AUTO_INCREMENT PRIMARY KEY,     
     nama          VARCHAR(100) NOT NULL,     
     email         VARCHAR(150) NOT NULL UNIQUE,    
     password_hash VARCHAR(255) NOT NULL,     
     role         ENUM('pencari_kerja', 'perekrut') NOT NULL,     
     is_verified   BOOLEAN NOT NULL DEFAULT FALSE,     
     dibuat_pada   TIMESTAMP DEFAULT CURRENT_TIMESTAMP 
);   