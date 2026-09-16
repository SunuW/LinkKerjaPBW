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
    {nama: "CV_Lathifah_Widya_Zahra.pdf"},
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

[formLogin, formRegister].forEach(f => f.addEventListener("submit", e => {e.preventDefault();
document.getElementById("view-auth").classList.add("hidden");
document.getElementById("view-app").classList.remove("hidden"); 
renderAll();
showToast("Behasil masuk sebagai Pencari Kerja");
}));

// --- navigation ---
document.querySelectorAll(".nav-btn").forEach(btn => { 
  btn.addEventListener("click", () => setPanel(btn.dataset.view)); 
});

function setPanel(view) {
    document.querySelectorAll(".nav-btn").forEach(b => b.classList.toggle("active", b.dataset.view === view));
    document.querySelectorAll("[data-panel]").forEach(p => p.classList.toggle("hidden", p.dataset.panel !== view));
    const titles = {
        beranda: ["Beranda", "Rekomendasi lowongan untuk Anda hari ini"],
        cari: ["Cari Lowongan", "Gunakan filter untuk menemukan lowongan yang"],
        detail: ["Detail Lowongan", "Tinjau detail sebelum mengirim lamaran."], 
        lamaran: ["Lamaran Saya", "Pantau status setiap lamaran yang Anda kirim."], 
        profil: ["Profil & CV", "Kelola data diri, riwayat, dan dokumen pendukung."]
    };
    document.getElementById("page-title").textContent = titles[view][0];
    document.getElementById("page-subtitle").textContent = titles[view][1]; 
}

// --- filter pencarian (KF-03) ---
document.getElementById("filter-kata-kunci").addEventListener("input", renderPencarian);
document.getElementById("filter-bidang").addEventListener("change", renderPencarian);
  
function renderPencarian() { 
  const kata = document.getElementById("filter-kata-kunci").value.toLowerCase(); 
  const bidang = document.getElementById("filter-bidang").value; 
  let data = lowonganData.filter(l => 
    (!kata || `${l.posisi} ${l.lokasi} ${l.perusahaan}`.toLowerCase().includes(kata)) 
&& 
    (!bidang || l.bidang === bidang) 
  ); 
  const el = document.getElementById("list-lowongan"); 
  el.innerHTML = data.length ? data.map(cardLowongan).join("") 
    : `<div class="empty-state">Tidak ditemukan hasil yang relevan.</div>`; 
} 
function cardLowongan(l) {
    return `
    <div class="row">
        <div style="display: flex; gap: 12px; align-items: center;">
            <div class="job-logo"></div>
            <div>
                <div style="font-weight:600;">${l.posisi}</div>
                <div style="font-size:0.82rem; color:var(--ink-soft);">${l.perusahaan} • ${l.lokasi} • ${l.tipe}</div>
            </div>
        </div>
        <button class="btn btn-outline" onclick="lihatDetail(${l.id})">Lihat Detail</button>
    </div>`;
}

// --- rekomendasi beranda (KF-04) ---
function renderRekomendasi() {
    document.getElementById("list-rekomendasi").innerHTML = lowonganData.slice(0,2).map(cardLowongan).join("");
}


