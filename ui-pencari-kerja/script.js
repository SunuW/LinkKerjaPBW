const lowonganData = [
    {id:1, posisi:"Frontend Developer", perusahaan:"PT Teknologi Madiun", bidang:"Teknologi Informasi", lokasi: "Madiun", tipe:"Full-time", deskripsi:"Membangun antarmuka aplikasi web menggunakan HTML, CSS, dan JavaScript.", kriteria:"Menguasai HTML/CSS/JS, memahami dasar UI/UX." },
    {id:2, posisi:"UI/UX Designer", perusahaan:"PT Teknologi Madiun", bidang:"Desain", lokasi: "Remote", tipe:"Kontrak", deskripsi:"Merancang wireframe dan prototipe untuk produk digital perusahaan.", kriteria:"Menguasai Figma, memahami prinsip desain yang berpusat pada pengguna." },
    {id:3, posisi:"Digital Marketing", perusahaan:"CV Maju Bersama", bidang:"Pemasaran", lokasi: "Madiun", tipe:"Part-time", deskripsi:"Mengelola konten media sosial dan kampanye iklan digital.", kriteria:"Familiar dengan Instagram Ads dan analitik dasar." }, 
];

let lamaranSaya = [
    { id: 1, idLowongan: 2, posisi: "UI/UX Designer", perusahaan: "PT Teknologi Madiun", status: "diterima", tanggal: "8 Sep 2026" },
];

let riwayatSaya = [
    { jenjang: "SMA", institusi: "SMAN 1 Madiun", tahun: "2021 - 2023" }, 
];

let dokumenSaya = [
    { nama: "CV_Lathifah_Zahra.pdf" },
];

let idLamaranAktif = null;

// --- auth --- 
const tabLogin = document.getElementById("tab-login"); 
const tabRegister = document.getElementById("tab-register"); 
const formLogin = document.getElementById("form-login"); 
const formRegister = document.getElementById("form-register"); 
  
tabLogin.addEventListener("click", () => switchAuthTab("login")); 
tabRegister.addEventListener("click", () => switchAuthTab("register")); 
  
function switchAuthTab(which) { 
  tabLogin.classList.toggle("active", which === "login"); 
  tabRegister.classList.toggle("active", which === "register"); 
  formLogin.classList.toggle("hidden", which !== "login"); 
  formRegister.classList.toggle("hidden", which !== "register"); 
} 
  
[formLogin, formRegister].forEach(f => f.addEventListener("submit", e => { 
  e.preventDefault(); 
  document.getElementById("view-auth").classList.add("hidden"); 
  document.getElementById("view-app").classList.remove("hidden"); 
  renderAll(); 
  showToast("Berhasil masuk sebagai Pencari Kerja"); 
}));
