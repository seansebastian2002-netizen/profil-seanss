# Aplikasi Web Profil Pribadi & Jejaring Sosial

Aplikasi web profil personal modern berbasis HTML, Tailwind CSS, dan JavaScript murni. Dirancang khusus dengan tampilan tema terang (*light theme*), tata bahasa semi-formal, dan tanpa mencantumkan nomor handphone, alamat fisik, maupun email, melainkan berfokus penuh pada jejaring profesional & media sosial.

---

## 🌟 Fitur Utama

1. **Halaman Navigasi Terstruktur**:
   - **Beranda**: Hero section, foto profil, peran/spesialisasi, dan ringkasan singkat.
   - **Profil Lengkap**: Biografi mendalam, nilai profesional, serta daftar keahlian/kompetensi.
   - **Kontak Medsos**: Penghubung media sosial terverifikasi (LinkedIn, GitHub, Instagram, Twitter/X, YouTube, TikTok, dll.).
2. **Sistem Pengunjung & Admin Terpisah**:
   - **Pengunjung Umum**: Bebas menjelajahi seluruh profil dan tautan medsos tanpa perlu registrasi atau login.
   - **Admin Khusus**: Memiliki panel khusus untuk mengelola seluruh data website.
3. **Pengelolaan Profil & Foto**:
   - Admin dapat mengunggah foto profil langsung dari komputer/HP (otomatis dikonversi ke format base64) atau menggunakan URL gambar.
   - Mengubah nama, gelar/spesialisasi, deskripsi singkat, biografi lengkap, dan daftar keahlian.
4. **Pengelolaan Media Sosial Dinamis**:
   - Admin dapat menambah platform media sosial baru, mengatur nama pengguna (*handle*), dan link URL profil.
   - Menghapus media sosial yang tidak lagi digunakan.
5. **Ganti Password Admin**:
   - Admin dapat memperbarui password login kapan saja dengan verifikasi kata sandi saat ini.
6. **Penyimpanan Lokal (Persistence)**:
   - Seluruh perubahan data langsung tersimpan di peramban (*LocalStorage*).

---

## 🔐 Kredensial Akses Admin Bawaan

- **Username**: `admin`
- **Password**: `admin123`

> **Tips Keamanan**: Segera masuk ke menu admin dan klik tombol **"Ganti Password"** untuk mengganti password bawaan dengan kata sandi pribadi Anda.

---

## 📁 Struktur File

```text
personal-profile-web/
├── index.html        # Halaman utama aplikasi (Single Page Application)
├── css/
│   └── style.css     # Gaya tambahan dan animasi halus
├── js/
│   └── app.js        # Logika aplikasi, autentikasi, router, dan LocalStorage
├── vercel.json       # Konfigurasi optimasi hosting di Vercel
└── README.md         # Dokumentasi panduan penggunaan & deployment
```

---

## 🚀 Panduan Upload / Deploy ke Vercel

Aplikasi ini berjenis statis (HTML, CSS, JS murni), sehingga sangat cepat dimuat dan dapat langsung di-deploy ke Vercel secara gratis.

### Cara 1: Menggunakan GitHub (Paling Direkomendasikan)
1. Buat repositori baru di akun GitHub Anda (misalnya: `profil-pribadi`).
2. Unggah seluruh file di dalam folder ini ke repositori tersebut:
   ```bash
   git init
   git add .
   git commit -m "Inisialisasi web profil pribadi"
   git branch -M main
   git remote add origin https://github.com/USERNAME-ANDA/NAMA-REPO.git
   git push -u origin main
   ```
3. Buka dashboard [Vercel](https://vercel.com) dan klik **"Add New..."** > **"Project"**.
4. Pilih repositori GitHub Anda dan klik **Deploy**.
5. Website Anda langsung aktif dengan domain gratis seperti `https://profil-pribadi.vercel.app`.

### Cara 2: Menggunakan Vercel CLI (Langsung dari Terminal)
1. Pasang Vercel CLI jika belum ada:
   ```bash
   npm install -g vercel
   ```
2. Jalankan perintah deploy di folder proyek:
   ```bash
   vercel
   ```
3. Ikuti panduan di layar terminal hingga tautan website Anda selesai dibuat.
