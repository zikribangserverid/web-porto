# Spec: Web Portofolio zikri.bangserverid (Open-Source Template)

Tanggal: 2026-07-08
Status: Draft — menunggu review

## 1. Ringkasan

Website portofolio satu halaman untuk brand **zikri.bangserverid**, sekaligus **template open-source** yang bisa di-fork siapa pun. Seluruh konten (profil, project, layanan, kontak, tema) hidup di satu file `config.js` — orang lain fork repo, edit satu file, deploy. Tanpa framework, tanpa build step.

**Tujuan:**
1. Menampilkan profil, project (Khaleed, Warung Juragan), dan layanan (Web Development, Security Audit/Pentest, Server & VPS Management)
2. CTA layanan langsung ke WhatsApp (tanpa halaman pricing)
3. Bisa dipakai ulang orang lain hanya dengan mengedit `config.js`

## 2. Kebutuhan

- Bahasa konten: Indonesia
- Nomor WA: placeholder `6281234567890` (diganti pemilik sebelum deploy)
- Desain: minimalis, neobrutalism ringan, tech-savvy, aksen biru teal (dari logo)
- Logo: file `assets/logo.png` (disediakan user); ada fallback logo teks jika file tidak ada
- Static murni: bisa deploy ke GitHub Pages, Cloudflare Pages, nginx, atau Coolify
- Lisensi MIT, README berisi panduan kustomisasi

## 3. Arsitektur

```
portofolio/
├── index.html        # kerangka halaman: section kosong ber-id, dirender oleh JS
├── config.js         # SEMUA konten — satu-satunya file yang perlu diedit pemakai
├── css/style.css     # design system + layout
├── js/main.js        # baca window.SITE_CONFIG → render ke DOM
├── assets/           # logo.png, gambar project
├── LICENSE           # MIT
└── README.md         # panduan fork, edit config, deploy
```

- `index.html` memuat `config.js` lalu `main.js` (keduanya `<script>` biasa, tanpa module bundler).
- `main.js` murni vanilla JS: fungsi render per section (`renderHero`, `renderProjects`, dst), masing-masing membaca satu bagian config. Tidak ada state, tidak ada dependency.
- Jika sebuah bagian config kosong (mis. `projects: []`), section-nya disembunyikan — template tetap valid untuk pemakai yang tidak punya project.

## 4. Skema `config.js`

```js
window.SITE_CONFIG = {
  meta: { title, description, url, lang: "id" },
  theme: { accent: "#0D7377" },            // satu-satunya knob warna
  profile: {
    brand: "zikri.bangserverid",           // fallback logo teks
    logo: "assets/logo.png",               // opsional
    name, tagline, bio,                    // bio = array paragraf
    location, availability                 // utk terminal card di hero
  },
  skills: ["FastAPI", "React", ...],
  projects: [{
    name, description, image,             // image opsional → placeholder inisial
    tech: [...], url, status               // "live" | "wip" | "archived"
  }],
  services: [{
    icon,                                  // nama ikon (subset yang disediakan template)
    name, description, features: [...],
    priceNote,                             // mis. "Chat untuk penawaran"
    waMessage                              // template pesan WA per layanan
  }],
  contact: { whatsapp: "6281234567890", email, socials: [{label, url}] }
};
```

Link CTA dibangun runtime: `https://wa.me/{whatsapp}?text={encodeURIComponent(waMessage)}`.

## 5. Plan UI

### 5.1 Design tokens

| Token | Nilai | Catatan |
|---|---|---|
| `--bg` | `#FAFAF7` | off-white, hangat |
| `--surface` | `#FFFFFF` | kartu |
| `--ink` | `#14181B` | teks & border utama |
| `--muted` | `#5C6670` | teks sekunder |
| `--accent` | `#0D7377` | teal dari logo (dari `theme.accent`) |
| `--accent-soft` | `#E0F2F1` | latar chip/badge teal |
| border | `2px solid var(--ink)` | ciri neobrutalism |
| shadow | `4px 4px 0 var(--ink)` | hard shadow, tanpa blur |
| shadow hover | `6px 6px 0 var(--ink)` | kartu "terangkat" |
| radius | `6px` | "ringan" — tidak lancip penuh |
| font display/body | Space Grotesk (Google Fonts) | modern grotesk |
| font mono | JetBrains Mono | eyebrow, chips, label, angka section |
| container | max-width `1080px` | padding samping 24px |
| section spacing | `96px` desktop / `64px` mobile | |

Kesan "neobrutalism ringan": border tegas + hard shadow **hanya** pada elemen interaktif (kartu, tombol, chip) — bukan pada setiap kotak. Latar tetap lapang dan putih, tipografi besar, banyak whitespace → sisi minimalisnya.

Aksen tech-savvy: elemen monospace (eyebrow `$ whoami`, penomoran section `01.`), terminal card di hero, background grid garis tipis (opacity rendah) di section hero saja.

### 5.2 Struktur halaman (atas → bawah)

**Navbar** — sticky, latar `--bg` + border-bottom 2px.
Kiri: logo (`assets/logo.png`, tinggi 36px; fallback teks mono `zikri.bangserverid` dengan titik teal). Kanan: link `Profil · Project · Layanan` + tombol **WhatsApp** (accent, hard shadow). Mobile: link disembunyikan, sisakan logo + tombol WA (semua section tetap terjangkau lewat scroll).

**Hero** — grid 2 kolom (55/45), latar grid-lines halus.
- Kiri: eyebrow mono teal `$ whoami`, H1 besar (nama, kata kunci di-highlight blok teal), 1 paragraf tagline, dua tombol: `Lihat Project ↓` (outline) dan `Konsultasi via WA` (accent).
- Kanan: **terminal card** dekoratif — title bar dengan 3 dot + `zikri@bangserverid:~`, isi output mono dari config: `role`, `location`, `focus`, `status: open for work` (hijau terminal). Border 2px + hard shadow.
- Mobile: satu kolom, terminal card di bawah teks.

**Section Profil (`01.`)** — heading `01. Profil` (angka mono teal).
Grid 2 kolom: kiri bio (2–3 paragraf dari `profile.bio`), kanan blok **Skills**: chips mono ber-border 2px, wrap. Chip tanpa shadow (elemen non-interaktif).

**Section Project (`02.`)** — grid kartu 2 kolom (1 kolom di mobile).
Kartu: thumbnail rasio 16:9 (gambar dari config; fallback: blok accent-soft berisi inisial project besar dalam mono), badge status di pojok (Live = accent solid teks putih; WIP = amber), judul, deskripsi 2–3 baris, chips tech kecil, link `Kunjungi ↗` mono. Hover: kartu naik (translate -2px) + shadow membesar.

**Section Layanan (`03.`)** — grid 3 kartu (1 kolom mobile). Kartu paling "kuat" di halaman:
ikon (SVG outline dari subset template: `code`, `shield`, `server`, dll), judul, deskripsi, daftar fitur dengan marker mono `+` teal, garis pemisah, `priceNote` kecil (mis. *"Harga menyesuaikan scope — konsultasi gratis"*), tombol **Chat via WhatsApp** full-width accent dengan pesan pre-filled per layanan.

**Footer** — latar `--ink` (satu-satunya blok gelap; kontras penutup).
Logo/brand, link sosial dari config, copyright, credit kecil: *"Template open-source — fork di GitHub"* (link repo).

### 5.3 Komponen & interaksi

- **Tombol**: 2 varian — `accent` (bg teal, teks putih) dan `outline` (bg surface). Keduanya border 2px + shadow 4px. Hover: translate(-2px,-2px), shadow 6px. Active: translate(2px,2px), shadow 0 (efek "ditekan").
- **Kartu**: surface, border 2px, shadow 4px, radius 6px. Hover (yang punya link): naik + shadow 6px.
- **Chips**: mono 13px, border 2px, radius 4px, tanpa shadow.
- **Scroll**: `scroll-behavior: smooth`; reveal ringan per section (fade + translateY 16px) via IntersectionObserver — sekali jalan, tanpa library.
- **Aksesibilitas**: kontras AA (teal `#0D7377` di atas putih lolos untuk teks besar/tombol), focus-visible ring tegas, alt text gambar dari config, HTML semantik (`nav`, `main`, `section`, `footer`).

### 5.4 Responsive

| Breakpoint | Perilaku |
|---|---|
| ≥ 960px | Layout penuh seperti di atas |
| 640–959px | Hero & profil 1 kolom; project tetap 2 kolom; layanan 2+1 |
| < 640px | Semua 1 kolom; nav = logo + tombol WA; H1 mengecil via `clamp()` |

## 6. Konten default (config milik Zikri)

- **Profil**: Zikri / zikri.bangserverid — developer & praktisi keamanan web dari Indonesia; membangun tools untuk freelancer web dan UMKM.
- **Skills**: Python, FastAPI, React, React Native/Expo, MongoDB, PostgreSQL, Docker, Coolify, Cloudflare Workers, Nginx, Security Testing.
- **Projects**:
  - **Khaleed** — Security + Infrastructure Operations Platform; passive/active scan, incident response, log analyzer, malware scan, domain monitoring. Status: Live, url `https://app.pentestbykhaleed.com`.
  - **Warung Juragan** — aplikasi manajemen produk, kasir, dan keuangan untuk warung/UMKM. FastAPI + Expo React Native Web + MongoDB.
- **Layanan**:
  1. **Web Development** — landing page, sistem web custom, SaaS end-to-end (desain → deploy).
  2. **Security Audit & Pentest** — vulnerability scan, pentest web, hardening, incident response.
  3. **Server & VPS Management** — setup, deploy (Docker/Coolify), monitoring, maintenance.
  - Semua `priceNote`: harga menyesuaikan scope, CTA chat WA.
- **Kontak**: WA `6281234567890` (placeholder), sosial diisi placeholder yang jelas harus diganti.

## 7. Open-source

- README (ID, ringkasan EN singkat di bawah): screenshot, fitur, cara pakai (fork → edit `config.js` → deploy), tabel field config, opsi deploy (GitHub Pages/Cloudflare Pages/nginx), lisensi.
- LICENSE: MIT.
- Semua placeholder di config diberi komentar `// GANTI:` agar pemakai tahu apa yang wajib diubah.

## 8. Di luar scope (v1)

Dark mode, blog, form kontak, analytics, i18n toggle, animasi kompleks, CMS/admin.

## 9. Verifikasi

- Buka `index.html` langsung via file/local server — semua section terrender dari config.
- Ubah `theme.accent` → warna aksen berubah di seluruh halaman.
- Kosongkan `projects` → section Project hilang tanpa error.
- Hapus `assets/logo.png` → fallback logo teks muncul.
- Klik CTA layanan → membuka `wa.me` dengan pesan pre-filled yang benar (URL-encoded).
- Cek responsive di 375px, 768px, 1280px.
