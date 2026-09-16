// ===================================================================== 
// LinkKerja — UI Pencari Kerja (contoh data di memori, belum tersambung API)

const lowonganData = [
    {id: 1, posisi: "Frontend Developer", perusahaan: "PT Teknologi Madiun", bidang: "Teknologi Informasi", lokasi:"Madiun", tipe:"Full-time", deskripsi: "Membangun antarmuka aplikasi web menggunakan HTML, CSS, dan Javascript.", kriteria: "Menguasai HTML/CSS/Javascript, memahami dasar UI/UX."}, 
    {id: 2, posisi: "UI/UX Designer", perusahaan: "PT Teknologi Madiun", bidang:" Desain", lokasi: "Remote", tipe: "Kontrak", deskripsi: "Merancang wireframe dan prototype untuk produk digital perusahaan.", kriteria: "Menguasai Figma, memahami prinsip desain yang berpusat pada pengguna."},
    {id: 3, posisi: "Digital Marketing", perusahaan: "CV Maju Bersama", bidang:" Pemasaran", lokasi: "Madiun", tipe: "Part-time", deskripsi: "Mengelola konten sosial media dan kampanye iklan digital.", kriteria: "Familiar dengan Instagram Ads dan analitik dasar."},
];

let lamaranSaya = [
    {id: 1, idLowongan: 2, posisi:"UI/UX Designer", perusahaan:"PT Teknologi Madiun", status: "diterima", tanggal: "8 Sep 2026"},
];

let riwayatSaya = [
    {jenjang: "SMA", institusi:"SMAN 1 Madiun", tahun: "2021-2023"},
];

let dokumenSaya = [
    [nama: "CV_Lathifah_Widya_Zahra.pdf"],
];

let idLamaranAktif = null;
