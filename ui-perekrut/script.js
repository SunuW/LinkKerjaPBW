let lowonganList = [
    { id: 1, posisi: "Frontend Developer", bidang: "Teknologi Informasi", lokasi: "Madiun", tipe: "full_time", status: "aktif" },
    { id: 2, posisi: "UI/UX Designer", bidang: "Desain", lokasi: "Remote", tipe: "kontrak", status: "aktif" }
];

let kandidatList = [
    { id: 1, idLowongan: 1, nama: "Lathifah Widya Zahra", posisiDilamar: "Frontend Developer", status: "terkirim", tanggal: "12 Sep 2026" },
    { id: 2, idLowongan: 1, nama: "Budi Santoso", posisiDilamar: "Frontend Developer", status: "ditinjau", tanggal: "10 Sep 2026" },
    { id: 3, idLowongan: 2, nama: "Rina Amelia", posisiDilamar: "UI/UX Designer", status: "diterima", tanggal: "8 Sep 2026" }
];

let nextLowonganId = 3;

// --- auth tabs ---
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

[formLogin, formRegister].forEach(f => {
    f.addEventListener("submit", e => {
        e.preventDefault();
        document.getElementById("view-auth").classList.add("hidden");
        document.getElementById("view-app").classList.remove("hidden");
        renderAll();
        showToast("Berhasil masuk sebagai Perekrut");
    });
});

// --- navigation ---
document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        
        const view = btn.dataset.view;
        document.querySelectorAll("[data-panel]").forEach(p => p.classList.toggle("hidden", p.dataset.panel !== view));
        
        const titles = {
            dashboard: ["Dasbor", "Ringkasan aktivitas rekrutmen Anda hari ini."],
            publikasi: ["Publikasi Lowongan", "Buat lowongan baru agar dapat dilihat pencari kerja."],
            lowongan: ["Manajemen Lowongan", "Kelola, ubah, atau nonaktifkan lowongan yang sudah dipasang."],
            kandidat: ["Kandidat Masuk", "Tinjau pelamar dan tentukan status lamaran mereka."],
            perusahaan: ["Profil Perusahaan", "Data ini akan tampil pada setiap lowongan yang Anda pasang."]
        };
        
        document.getElementById("page-title").textContent = titles[view][0];
        document.getElementById("page-subtitle").textContent = titles[view][1];
    });
});
