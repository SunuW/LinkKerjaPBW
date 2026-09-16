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

// --- form lowongan baru (KF-07 / UC-05) ---
document.getElementById("form-lowongan").addEventListener("submit", e => {
    e.preventDefault();
    
    const baru = {
        id: nextLowonganId++,
        posisi: document.getElementById("in-posisi").value,
        bidang: document.getElementById("in-bidang").value,
        lokasi: document.getElementById("in-lokasi").value,
        tipe: document.getElementById("in-tipe").value,
        status: "aktif"
    };
    
    lowonganList.push(baru);
    e.target.reset();
    renderAll();
    
    showToast("Lowongan berhasil dipublikasikan");
    document.querySelector('.nav-btn[data-view="lowongan"]').click();
});

// --- render manajemen lowongan ---
function renderLowongan() {
    const el = document.getElementById("list-lowongan");
    
    if (lowonganList.length === 0) {
        el.innerHTML = `<div class="empty-state">Belum ada lowongan. Buat lowongan pertama Anda di menu "Publikasi Lowongan".</div>`;
        return;
    }
    
    el.innerHTML = lowonganList.map(l => `
        <div class="row">
            <div style="display:flex; gap:12px; align-items:center;">
                <div class="job-logo"></div>
                <div>
                    <div style="font-weight:600;">${l.posisi}</div>
                    <div style="font-size:0.82rem; color:var(--ink-soft);">${l.bidang} · ${l.lokasi} · ${labelTipe(l.tipe)}</div>
                </div>
            </div>
            <div style="display:flex; gap:8px; align-items:center;">
                <span class="badge badge-${l.status}">${l.status === "aktif" ? "Aktif" : "Nonaktif"}</span>
                <button class="btn btn-outline" onclick="toggleStatusLowongan(${l.id})">${l.status === "aktif" ? "Nonaktifkan" : "Aktifkan"}</button>
                <button class="btn btn-danger" onclick="hapusLowongan(${l.id})">Hapus</button>
            </div>
        </div>
    `).join("");
}

function labelTipe(t) {
    return { 
        full_time: "Full-time", 
        part_time: "Part-time", 
        magang: "Magang", 
        kontrak: "Kontrak" 
    }[t] || t;
}

function toggleStatusLowongan(id) {
    const l = lowonganList.find(x => x.id === id);
    l.status = l.status === "aktif" ? "nonaktif" : "aktif";
    renderAll();
}

function hapusLowongan(id) {
    lowonganList = lowonganList.filter(x => x.id !== id);
    kandidatList = kandidatList.filter(k => k.idLowongan !== id);
    renderAll();
    showToast("Lowongan dihapus dari publikasi");
}

// --- render kandidat masuk (UC-06) ---
function populateFilterLowongan() {
    const sel = document.getElementById("filter-lowongan");
    sel.innerHTML = `<option value="">Semua lowongan</option>` +
        lowonganList.map(l => `<option value="${l.id}">${l.posisi}</option>`).join("");
}

document.getElementById("filter-lowongan").addEventListener("change", renderKandidat);
document.getElementById("filter-status").addEventListener("change", renderKandidat);

function renderKandidat() {
    const filterLowongan = document.getElementById("filter-lowongan").value;
    const filterStatus = document.getElementById("filter-status").value;
    
    let data = kandidatList;
    if (filterLowongan) data = data.filter(k => String(k.idLowongan) === filterLowongan);
    if (filterStatus) data = data.filter(k => k.status === filterStatus);
    
    const el = document.getElementById("list-kandidat");
    if (data.length === 0) {
        el.innerHTML = `<div class="empty-state">Belum ada lamaran yang cocok dengan filter ini.</div>`;
        return;
    }
    
    el.innerHTML = data.map(k => `
        <div class="row">
            <div style="display:flex; gap:12px; align-items:center;">
                <div class="cand-avatar"></div>
                <div>
                    <div style="font-weight:600;">${k.nama}</div>
                    <div style="font-size:0.82rem; color:var(--ink-soft);">Melamar: ${k.posisiDilamar} · ${k.tanggal}</div>
                </div>
            </div>
            <div style="display:flex; gap:8px; align-items:center;">
                <span class="badge badge-${k.status}">${labelStatus(k.status)}</span>
                <button class="btn btn-outline" onclick="lihatDokumen('${k.nama}')">Lihat Dokumen</button>
                <button class="btn btn-success" onclick="ubahStatus(${k.id}, 'diterima')">Terima</button>
                <button class="btn btn-danger" onclick="ubahStatus(${k.id}, 'ditolak')">Tolak</button>
            </div>
        </div>
    `).join("");
}

function labelStatus(s) {
    return { 
        terkirim: "Terkirim", 
        ditinjau: "Ditinjau", 
        diterima: "Diterima", 
        ditolak: "Ditolak" 
    }[s] || s;
}

function ubahStatus(id, status) {
    const k = kandidatList.find(x => x.id === id);
    k.status = status;
    renderAll();
    showToast(`Status lamaran ${k.nama} diperbarui menjadi "${labelStatus(status)}"`);
}

function lihatDokumen(nama) {
    showToast(`Membuka dokumen lamaran milik ${nama} (contoh — belum tersambung penyimpanan file)`);
}
