SELECT l.*, p.nama_perusahaan 
FROM lowongan l 
JOIN perusahaan p ON p.id_perusahaan = l.id_perusahaan 
WHERE l.status = 'aktif'   
AND (l.judul_posisi LIKE CONCAT('%', :kata_kunci, '%') OR l.lokasi LIKE CONCAT('%', :kata_kunci, '%'))   
AND (:bidang IS NULL OR l.bidang = :bidang); 
SELECT a.id_lamaran, a.status, a.dikirim_pada, u.nama, u.email, pp.no_telepon 
FROM lamaran a 
JOIN profil_pencari_kerja pp ON pp.id_profil = a.id_profil 
JOIN users u ON u.id_user = pp.id_user 
WHERE a.id_lowongan = :id_lowongan 
ORDER BY a.dikirim_pada DESC; 
UPDATE lamaran SET status = :status_baru WHERE id_lamaran = :id_lamaran; 