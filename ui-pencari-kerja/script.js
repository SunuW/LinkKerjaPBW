// =====================================================================
// LinkKerja — UI Pencari Kerja (contoh data di memori, belum tersambung API)
// Dikerjakan oleh: Lathifah Widya Zahra (254311035)
// =====================================================================

const lowonganData = [
  { id: 1, posisi: "Frontend Developer", perusahaan: "PT Teknologi Madiun", bidang: "Teknologi Informasi", lokasi: "Madiun", tipe: "Full-time",
    deskripsi: "Membangun antarmuka aplikasi web menggunakan HTML, CSS, dan JavaScript.",
    kriteria: "Menguasai HTML/CSS/JS, memahami dasar UI/UX." },
  { id: 2, posisi: "UI/UX Designer", perusahaan: "PT Teknologi Madiun", bidang: "Desain", lokasi: "Remote", tipe: "Kontrak",
    deskripsi: "Merancang wireframe dan prototipe untuk produk digital perusahaan.",
    kriteria: "Menguasai Figma, memahami prinsip desain yang berpusat pada pengguna." },
  { id: 3, posisi: "Digital Marketing", perusahaan: "CV Maju Bersama", bidang: "Pemasaran", lokasi: "Madiun", tipe: "Part-time",
    deskripsi: "Mengelola konten media sosial dan kampanye iklan digital.",
    kriteria: "Familiar dengan Instagram Ads dan analitik dasar." },
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

// --- navigation ---
document.querySelectorAll(".nav-btn").forEach(btn => {
  btn.addEventListener("click", () => setPanel(btn.dataset.view));
});

function setPanel(view) {
  document.querySelectorAll(".nav-btn").forEach(b => b.classList.toggle("active", b.dataset.view === view));
  document.querySelectorAll("[data-panel]").forEach(p => p.classList.toggle("hidden", p.dataset.panel !== view));
  const titles = {
    beranda: ["Beranda", "Rekomendasi lowongan untuk Anda hari ini."],
    cari: ["Cari Lowongan", "Gunakan filter untuk menemukan lowongan yang relevan."],
    detail: ["Detail Lowongan", "Tinjau detail sebelum mengirim lamaran."],
    lamaran: ["Lamaran Saya", "Pantau status setiap lamaran yang Anda kirim."],
    profil: ["Profil & CV", "Kelola data diri, riwayat, dan dokumen pendukung."],
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
    (!kata || `${l.posisi} ${l.lokasi} ${l.perusahaan}`.toLowerCase().includes(kata)) &&
    (!bidang || l.bidang === bidang)
  );
  const el = document.getElementById("list-lowongan");
  el.innerHTML = data.length ? data.map(cardLowongan).join("")
    : `<div class="empty-state">Tidak ditemukan hasil yang relevan.</div>`;
}

function cardLowongan(l) {
  return `
    <div class="row">
      <div style="display:flex; gap:12px; align-items:center;">
        <div class="job-logo"></div>
        <div>
          <div style="font-weight:600;">${l.posisi}</div>
          <div style="font-size:0.82rem; color:var(--ink-soft);">${l.perusahaan} · ${l.lokasi} · ${l.tipe}</div>
        </div>
      </div>
      <button class="btn btn-outline" onclick="lihatDetail(${l.id})">Lihat Detail</button>
    </div>`;
}

// --- rekomendasi beranda (KF-04) ---
function renderRekomendasi() {
  document.getElementById("list-rekomendasi").innerHTML = lowonganData.slice(0, 2).map(cardLowongan).join("");
}

// --- detail & lamar (UC-04) ---
function lihatDetail(id) {
  const l = lowonganData.find(x => x.id === id);
  idLamaranAktif = id;
  document.getElementById("detail-content").innerHTML = `
    <div style="display:flex; gap:14px; align-items:center; margin-bottom:16px;">
      <div class="job-logo" style="width:56px; height:56px;"></div>
      <div>
        <h2 style="margin:0;">${l.posisi}</h2>
        <p style="margin:2px 0; color:var(--ink-soft);">${l.perusahaan} · ${l.lokasi} · ${l.tipe} · ${l.bidang}</p>
      </div>
    </div>
    <h4>Deskripsi pekerjaan</h4>
    <p>${l.deskripsi}</p>
    <h4>Kriteria</h4>
    <p>${l.kriteria}</p>
    <div class="field" style="max-width:360px;">
      <label>Unggah dokumen pendukung (PDF/JPG)</label>
      <input type="file" accept=".pdf,.jpg,.jpeg" id="input-lamar-dokumen">
    </div>
    <button class="btn btn-primary" onclick="kirimLamaran(${l.id})">Lamar Sekarang</button>
  `;
  setPanel("detail");
}

function kembaliKeCari() { setPanel("cari"); }

function kirimLamaran(idLowongan) {
  const sudahAda = lamaranSaya.find(x => x.idLowongan === idLowongan);
  if (sudahAda) { showToast("Anda sudah pernah melamar posisi ini"); return; }
  const l = lowonganData.find(x => x.id === idLowongan);
  lamaranSaya.push({ id: lamaranSaya.length + 1, idLowongan, posisi: l.posisi, perusahaan: l.perusahaan, status: "terkirim", tanggal: "Hari ini" });
  showToast("Lamaran terkirim! Anda dapat memantau statusnya di menu 'Lamaran Saya'.");
  renderAll();
  setPanel("lamaran");
}

// --- lamaran saya / tracker (KF-06, UC-07) ---
function renderLamaranSaya() {
  const el = document.getElementById("list-lamaran-saya");
  if (lamaranSaya.length === 0) {
    el.innerHTML = `<div class="empty-state">Anda belum memiliki riwayat lamaran.</div>`;
    return;
  }
  el.innerHTML = lamaranSaya.map(a => `
    <div class="row">
      <div>
        <div style="font-weight:600;">${a.posisi}</div>
        <div style="font-size:0.82rem; color:var(--ink-soft);">${a.perusahaan} · Dikirim ${a.tanggal}</div>
      </div>
      <span class="badge badge-${a.status}">${labelStatus(a.status)}</span>
    </div>
  `).join("");
}

function labelStatus(s) {
  return { terkirim: "Terkirim", ditinjau: "Ditinjau", diterima: "Diterima", ditolak: "Ditolak" }[s] || s;
}

// --- profil: riwayat & dokumen (KF-01, KF-02) ---
function renderRiwayat() {
  document.getElementById("list-riwayat").innerHTML = riwayatSaya.map((r, i) => `
    <div class="row">
      <div>
        <div style="font-weight:600;">${r.jenjang} — ${r.institusi}</div>
        <div style="font-size:0.82rem; color:var(--ink-soft);">${r.tahun}</div>
      </div>
      <button class="btn btn-ghost" onclick="hapusRiwayat(${i})">Hapus</button>
    </div>
  `).join("");
}

function tambahRiwayat() {
  riwayatSaya.push({ jenjang: "D-IV", institusi: "Politeknik Negeri Madiun", tahun: "2023 - sekarang" });
  renderRiwayat();
}

function hapusRiwayat(i) { riwayatSaya.splice(i, 1); renderRiwayat(); }

function renderDokumen() {
  document.getElementById("list-dokumen").innerHTML = dokumenSaya.map((d, i) => `
    <div class="row">
      <div>📎 ${d.nama}</div>
      <button class="btn btn-ghost" onclick="hapusDokumen(${i})">Hapus</button>
    </div>
  `).join("") || `<div class="empty-state">Belum ada dokumen diunggah.</div>`;
}

function hapusDokumen(i) { dokumenSaya.splice(i, 1); renderDokumen(); }

document.getElementById("input-dokumen").addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;
  const ext = file.name.split(".").pop().toLowerCase();
  if (!["pdf", "jpg", "jpeg"].includes(ext)) {
    showToast("Unggah file dalam bentuk PDF atau JPG");
    return;
  }
  dokumenSaya.push({ nama: file.name });
  renderDokumen();
});

function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.remove("hidden");
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => t.classList.add("hidden"), 2600);
}

function renderAll() {
  renderRekomendasi();
  renderPencarian();
  renderLamaranSaya();
  renderRiwayat();
  renderDokumen();
}
