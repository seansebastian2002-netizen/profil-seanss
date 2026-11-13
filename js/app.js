/**
 * Aplikasi Web Profil Pribadi & Jejaring Sosial
 * Fitur: Single Page Routing, Mode Admin, Ganti Password, Edit Profil & Medsos, Penyimpanan LocalStorage
 */

// ================= 1. DATA AWAL (DEFAULT STATE) =================
const DEFAULT_DATA = {
  profile: {
    name: "Ahmad Pratama, S.Kom.",
    role: "Praktisi Teknologi Informasi & Pengembang Solusi Digital",
    bioShort: "Berpengalaman dalam pengembangan antarmuka web modern, perancangan sistem informasi yang efisien, dan kolaborasi strategis untuk transformasi digital yang berdampak nyata.",
    bioFull: `Halo dan selamat datang di laman profil resmi saya.

Saya adalah seorang profesional di bidang teknologi informasi dengan dedikasi tinggi terhadap pengembangan sistem berbasis web, rekayasa perangkat lunak, dan penyusunan tata kelola data yang adaptif. Sepanjang perjalanan profesional, fokus utama saya adalah membangun aplikasi yang tidak hanya berkinerja tinggi, namun juga memberikan pengalaman interaksi yang intuitif bagi pengguna.

Prinsip kerja saya berakar pada komitmen terhadap ketepatan teknis, keterbukaan dalam kolaborasi antardisiplin, serta pembelajaran berkelanjutan guna merespons dinamika teknologi modern.

Saya senantiasa terbuka untuk berdiskusi, bertukar wawasan, dan mengeksplorasi potensi sinergi profesional baru melalui kanal media sosial resmi yang tertera pada situs ini.`,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    skills: [
      "Pengembangan Web Frontend",
      "Perancangan Antarmuka (UI/UX)",
      "Optimasi Kinerja & SEO",
      "Manajemen Proyek Digital",
      "Integrasi API & Layanan Cloud",
      "Analisis Kebutuhan Sistem"
    ]
  },
  socials: [
    {
      id: "soc-1",
      platform: "LinkedIn",
      handle: "linkedin.com/in/ahmad-pratama",
      url: "https://www.linkedin.com",
      description: "Jejaring profesional resmi dan riwayat karier formal."
    },
    {
      id: "soc-2",
      platform: "GitHub",
      handle: "github.com/ahmad-pratama",
      url: "https://github.com",
      description: "Repositori kode sumber, kontribusi open source, dan proyek teknis."
    },
    {
      id: "soc-3",
      platform: "Instagram",
      handle: "@ahmadpratama.id",
      url: "https://instagram.com",
      description: "Dokumentasi visual kegiatan, seminar, dan wawasan harian."
    },
    {
      id: "soc-4",
      platform: "Twitter/X",
      handle: "@ahmadpratama_id",
      url: "https://x.com",
      description: "Opini singkat, diskusi seputar inovasi teknologi, dan tren terkini."
    },
    {
      id: "soc-5",
      platform: "YouTube",
      handle: "@AhmadPratamaKanal",
      url: "https://youtube.com",
      description: "Kanal konten edukatif mengenai teknologi dan tutorial perangkat lunak."
    }
  ],
  auth: {
    username: "admin",
    password: "admin123" // Default password
  }
};

// ================= 2. LOCAL STORAGE MANAGER =================
const STORAGE_KEY = "personal_profile_web_data_v1";
const SESSION_AUTH_KEY = "personal_profile_is_admin";

function loadData() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    saveData(DEFAULT_DATA);
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }
  try {
    return JSON.parse(stored);
  } catch (err) {
    console.error("Gagal membaca local storage, menggunakan data default.", err);
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }
}

function saveData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Inisialisasi State Aplikasi
let appData = loadData();
let isAdminLoggedIn = sessionStorage.getItem(SESSION_AUTH_KEY) === "true";

// Helper Pemilihan Ikon Lucide untuk Media Sosial
function getPlatformIcon(platform) {
  switch (platform.toLowerCase()) {
    case "linkedin":
      return { icon: "linkedin", color: "text-blue-600", bg: "bg-blue-50" };
    case "github":
      return { icon: "github", color: "text-slate-800", bg: "bg-slate-100" };
    case "instagram":
      return { icon: "instagram", color: "text-pink-600", bg: "bg-pink-50" };
    case "twitter/x":
    case "twitter":
    case "x":
      return { icon: "twitter", color: "text-slate-900", bg: "bg-slate-100" };
    case "youtube":
      return { icon: "youtube", color: "text-rose-600", bg: "bg-rose-50" };
    case "facebook":
      return { icon: "facebook", color: "text-blue-700", bg: "bg-blue-50" };
    case "tiktok":
      return { icon: "video", color: "text-zinc-900", bg: "bg-zinc-100" };
    default:
      return { icon: "globe", color: "text-indigo-600", bg: "bg-indigo-50" };
  }
}

// ================= 3. RENDER FUNCTION =================
function renderApp() {
  const { profile, socials } = appData;

  // Header & Brand
  const brandInitial = document.getElementById("brand-initial");
  if (brandInitial && profile.name) {
    brandInitial.textContent = profile.name.charAt(0).toUpperCase();
  }
  document.getElementById("nav-display-name").textContent = profile.name;
  document.getElementById("nav-display-role").textContent = profile.role;
  document.getElementById("footer-name").textContent = profile.name;
  document.getElementById("current-year").textContent = new Date().getFullYear();

  // Beranda / Hero
  document.getElementById("hero-name").textContent = profile.name;
  document.getElementById("hero-role").textContent = profile.role;
  document.getElementById("hero-bio-short").textContent = profile.bioShort;
  document.getElementById("hero-avatar").src = profile.avatar;

  // Halaman Profil
  document.getElementById("profile-name").textContent = profile.name;
  document.getElementById("profile-role").textContent = profile.role;
  document.getElementById("profile-bio-full").textContent = profile.bioFull;
  document.getElementById("profile-avatar").src = profile.avatar;

  // Render Keahlian / Kompetensi
  const skillsContainer = document.getElementById("skills-container");
  if (skillsContainer) {
    skillsContainer.innerHTML = "";
    (profile.skills || []).forEach(skill => {
      const badge = document.createElement("span");
      badge.className = "inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-700 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition";
      badge.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> ${escapeHtml(skill)}`;
      skillsContainer.appendChild(badge);
    });
  }

  // Render Kartu Media Sosial (Halaman Kontak)
  const socialGrid = document.getElementById("social-links-grid");
  if (socialGrid) {
    socialGrid.innerHTML = "";
    if (socials.length === 0) {
      socialGrid.innerHTML = `
        <div class="col-span-full py-12 text-center text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">
          <i data-lucide="share-2" class="w-8 h-8 mx-auto mb-2 opacity-50"></i>
          <p class="text-sm">Belum ada media sosial yang ditambahkan.</p>
        </div>
      `;
    } else {
      socials.forEach(soc => {
        const meta = getPlatformIcon(soc.platform);
        const card = document.createElement("a");
        card.href = soc.url;
        card.target = "_blank";
        card.rel = "noopener noreferrer";
        card.className = "social-card group bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm flex items-start justify-between gap-4";
        card.innerHTML = `
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-xl ${meta.bg} ${meta.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <i data-lucide="${meta.icon}" class="w-6 h-6"></i>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors text-base">${escapeHtml(soc.platform)}</h3>
                <span class="text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">Resmi</span>
              </div>
              <p class="text-xs font-semibold text-slate-500 mt-0.5">${escapeHtml(soc.handle)}</p>
              ${soc.description ? `<p class="text-xs text-slate-600 mt-2 leading-relaxed">${escapeHtml(soc.description)}</p>` : ""}
            </div>
          </div>
          <div class="p-2 rounded-xl bg-slate-50 text-slate-400 group-hover:text-indigo-600 group-hover:bg-indigo-50 transition-colors flex-shrink-0">
            <i data-lucide="external-link" class="w-4 h-4"></i>
          </div>
        `;
        socialGrid.appendChild(card);
      });
    }
  }

  // Render Daftar Media Sosial di Modal Admin (Untuk Hapus / Edit)
  renderAdminSocialList();

  // Sinkronisasi status Admin
  updateAdminUI();

  // Render ulang ikon Lucide
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function renderAdminSocialList() {
  const container = document.getElementById("admin-social-list");
  if (!container) return;
  container.innerHTML = "";

  if (appData.socials.length === 0) {
    container.innerHTML = `<p class="text-xs text-slate-400 text-center py-4">Belum ada akun media sosial.</p>`;
    return;
  }

  appData.socials.forEach((item, index) => {
    const meta = getPlatformIcon(item.platform);
    const div = document.createElement("div");
    div.className = "flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200 text-xs";
    div.innerHTML = `
      <div class="flex items-center gap-3 overflow-hidden">
        <div class="w-8 h-8 rounded-lg ${meta.bg} ${meta.color} flex items-center justify-center flex-shrink-0">
          <i data-lucide="${meta.icon}" class="w-4 h-4"></i>
        </div>
        <div class="truncate">
          <span class="font-bold text-slate-800 block truncate">${escapeHtml(item.platform)} - ${escapeHtml(item.handle)}</span>
          <span class="text-[11px] text-slate-400 truncate block">${escapeHtml(item.url)}</span>
        </div>
      </div>
      <button onclick="deleteSocialItem(${index})" class="text-rose-500 hover:text-rose-700 p-1.5 hover:bg-rose-50 rounded-lg transition ml-2 flex-shrink-0" title="Hapus Akun Ini">
        <i data-lucide="trash-2" class="w-4 h-4"></i>
      </button>
    `;
    container.appendChild(div);
  });
}

function updateAdminUI() {
  const adminBar = document.getElementById("admin-topbar");
  const btnOpenLogin = document.getElementById("btn-open-login");

  if (isAdminLoggedIn) {
    adminBar.classList.remove("hidden");
    btnOpenLogin.classList.add("hidden");
  } else {
    adminBar.classList.add("hidden");
    btnOpenLogin.classList.remove("hidden");
  }
}

// ================= 4. ROUTING & NAVIGATION =================
function navigateTo(targetPageId) {
  // Hide all sections
  document.querySelectorAll(".page-section").forEach(sec => {
    sec.classList.add("hidden");
  });

  // Show target section
  const targetSection = document.getElementById(`page-${targetPageId}`);
  if (targetSection) {
    targetSection.classList.remove("hidden");
  }

  // Update desktop active tab
  document.querySelectorAll(".nav-tab").forEach(btn => {
    if (btn.getAttribute("data-target") === targetPageId) {
      btn.classList.add("active-tab");
    } else {
      btn.classList.remove("active-tab");
    }
  });

  // Update mobile active tab
  document.querySelectorAll(".mobile-nav-tab").forEach(btn => {
    if (btn.getAttribute("data-target") === targetPageId) {
      btn.classList.add("active-tab");
    } else {
      btn.classList.remove("active-tab");
    }
  });

  // Close mobile menu
  document.getElementById("mobile-menu").classList.add("hidden");

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Event Listeners Navigasi
document.querySelectorAll(".nav-tab, .mobile-nav-tab").forEach(button => {
  button.addEventListener("click", () => {
    const target = button.getAttribute("data-target");
    if (target) {
      navigateTo(target);
      window.location.hash = target;
    }
  });
});

// Mobile Menu Toggle
const mobileBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
if (mobileBtn && mobileMenu) {
  mobileBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

// ================= 5. MODAL SYSTEM =================
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

// Handler Tutup Modal melalui tombol close atau backdrop
document.querySelectorAll(".modal-close").forEach(btn => {
  btn.addEventListener("click", (e) => {
    const parentModal = e.target.closest(".fixed");
    if (parentModal) {
      parentModal.classList.add("hidden");
      parentModal.classList.remove("flex");
    }
  });
});

window.addEventListener("click", (e) => {
  if (e.target.classList.contains("fixed") && !e.target.classList.contains("hidden")) {
    e.target.classList.add("hidden");
    e.target.classList.remove("flex");
  }
});

// Toast Notifikasi
function showToast(message) {
  const toast = document.getElementById("toast");
  const msgEl = document.getElementById("toast-message");
  msgEl.textContent = message;
  toast.classList.add("toast-visible");
  setTimeout(() => {
    toast.classList.remove("toast-visible");
  }, 3500);
}

// ================= 6. FITUR ADMIN =================

// Buka Modal Login
document.getElementById("btn-open-login").addEventListener("click", () => {
  document.getElementById("login-error").classList.add("hidden");
  document.getElementById("form-login").reset();
  openModal("modal-login");
});

// Submit Form Login
document.getElementById("form-login").addEventListener("submit", (e) => {
  e.preventDefault();
  const uname = document.getElementById("login-username").value.trim();
  const pwd = document.getElementById("login-password").value;
  const errorEl = document.getElementById("login-error");

  const storedAuth = appData.auth || DEFAULT_DATA.auth;

  if (uname === storedAuth.username && pwd === storedAuth.password) {
    isAdminLoggedIn = true;
    sessionStorage.setItem(SESSION_AUTH_KEY, "true");
    closeModal("modal-login");
    updateAdminUI();
    showToast("Selamat datang, Administrator!");
  } else {
    errorEl.classList.remove("hidden");
  }
});

// Tombol Logout Admin
document.getElementById("btn-logout").addEventListener("click", () => {
  isAdminLoggedIn = false;
  sessionStorage.removeItem(SESSION_AUTH_KEY);
  updateAdminUI();
  showToast("Anda telah keluar dari mode admin.");
});

// Buka Modal Edit Profil
document.getElementById("btn-open-edit-profile").addEventListener("click", () => {
  const p = appData.profile;
  document.getElementById("edit-name").value = p.name;
  document.getElementById("edit-role").value = p.role;
  document.getElementById("edit-bio-short").value = p.bioShort;
  document.getElementById("edit-bio-full").value = p.bioFull;
  document.getElementById("edit-skills").value = (p.skills || []).join(", ");
  document.getElementById("edit-preview-avatar").src = p.avatar;
  document.getElementById("edit-avatar-file").value = "";
  openModal("modal-edit-profile");
});

// Pratinjau Foto saat diunggah
let temporaryAvatarBase64 = null;
document.getElementById("edit-avatar-file").addEventListener("change", function(e) {
  const file = e.target.files[0];
  if (file) {
    if (file.size > 2 * 1024 * 1024) {
      alert("Ukuran gambar melebihi batas 2MB. Harap gunakan gambar yang lebih kecil.");
      e.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = function(evt) {
      temporaryAvatarBase64 = evt.target.result;
      document.getElementById("edit-preview-avatar").src = temporaryAvatarBase64;
    };
    reader.readAsDataURL(file);
  }
});

// Simpan Form Edit Profil
document.getElementById("form-edit-profile").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("edit-name").value.trim();
  const role = document.getElementById("edit-role").value.trim();
  const bioShort = document.getElementById("edit-bio-short").value.trim();
  const bioFull = document.getElementById("edit-bio-full").value.trim();
  const rawSkills = document.getElementById("edit-skills").value.trim();

  const skills = rawSkills.split(",").map(s => s.trim()).filter(s => s.length > 0);

  appData.profile.name = name;
  appData.profile.role = role;
  appData.profile.bioShort = bioShort;
  appData.profile.bioFull = bioFull;
  appData.profile.skills = skills;

  if (temporaryAvatarBase64) {
    appData.profile.avatar = temporaryAvatarBase64;
    temporaryAvatarBase64 = null;
  }

  saveData(appData);
  renderApp();
  closeModal("modal-edit-profile");
  showToast("Profil dan foto berhasil diperbarui!");
});

// Buka Modal Kelola Media Sosial
document.getElementById("btn-open-edit-social").addEventListener("click", () => {
  renderAdminSocialList();
  openModal("modal-edit-social");
});

// Tambah Media Sosial Baru
document.getElementById("form-add-social").addEventListener("submit", (e) => {
  e.preventDefault();
  const platform = document.getElementById("new-social-platform").value;
  const handle = document.getElementById("new-social-handle").value.trim();
  const url = document.getElementById("new-social-url").value.trim();

  appData.socials.push({
    id: "soc-" + Date.now(),
    platform,
    handle,
    url,
    description: `Tautan akun resmi ${platform}`
  });

  saveData(appData);
  renderApp();
  document.getElementById("form-add-social").reset();
  showToast("Akun media sosial berhasil ditambahkan!");
});

// Hapus Media Sosial
window.deleteSocialItem = function(index) {
  if (confirm("Apakah Anda yakin ingin menghapus tautan media sosial ini?")) {
    appData.socials.splice(index, 1);
    saveData(appData);
    renderApp();
    showToast("Tautan media sosial berhasil dihapus.");
  }
};

// Buka Modal Ganti Password
document.getElementById("btn-open-change-pwd").addEventListener("click", () => {
  document.getElementById("form-change-pwd").reset();
  const msgEl = document.getElementById("change-pwd-msg");
  msgEl.className = "hidden text-xs p-2.5 rounded-lg border font-medium";
  openModal("modal-change-pwd");
});

// Submit Form Ganti Password
document.getElementById("form-change-pwd").addEventListener("submit", (e) => {
  e.preventDefault();
  const oldPwd = document.getElementById("old-pwd").value;
  const newPwd = document.getElementById("new-pwd").value;
  const confirmPwd = document.getElementById("confirm-pwd").value;
  const msgEl = document.getElementById("change-pwd-msg");

  const currentAuth = appData.auth || DEFAULT_DATA.auth;

  if (oldPwd !== currentAuth.password) {
    msgEl.className = "text-xs p-2.5 rounded-lg border font-medium bg-rose-50 text-rose-600 border-rose-100 block";
    msgEl.textContent = "Password saat ini tidak cocok!";
    return;
  }

  if (newPwd.length < 6) {
    msgEl.className = "text-xs p-2.5 rounded-lg border font-medium bg-rose-50 text-rose-600 border-rose-100 block";
    msgEl.textContent = "Password baru harus minimal 6 karakter.";
    return;
  }

  if (newPwd !== confirmPwd) {
    msgEl.className = "text-xs p-2.5 rounded-lg border font-medium bg-rose-50 text-rose-600 border-rose-100 block";
    msgEl.textContent = "Konfirmasi password baru tidak cocok!";
    return;
  }

  // Simpan password baru
  appData.auth.password = newPwd;
  saveData(appData);

  msgEl.className = "text-xs p-2.5 rounded-lg border font-medium bg-emerald-50 text-emerald-700 border-emerald-100 block";
  msgEl.textContent = "Password berhasil diperbarui!";

  setTimeout(() => {
    closeModal("modal-change-pwd");
    showToast("Password admin berhasil diperbarui.");
  }, 1200);
});

// Helper XSS Escape
function escapeHtml(string) {
  if (!string) return "";
  return String(string)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Inisialisasi Saat Halaman Selesai Dimuat
window.addEventListener("DOMContentLoaded", () => {
  renderApp();

  // Handle URL hash awal (misal: #profil atau #kontak)
  const initialHash = window.location.hash.replace("#", "");
  if (["beranda", "profil", "kontak"].includes(initialHash)) {
    navigateTo(initialHash);
  } else {
    navigateTo("beranda");
  }
});
