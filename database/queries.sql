SELECT l.*, p.nama_perusahaan 
FROM lowongan l 
JOIN perusahaan p ON p.id_perusahaan = l.id_perusahaan 
WHERE l.status = 'aktif'   
AND (l.judul_posisi LIKE CONCAT('%', :kata_kunci, '%') OR l.lokasi LIKE CONCAT('%', :kata_kunci, '%'))   
AND (:bidang IS NULL OR l.bidang = :bidang); 