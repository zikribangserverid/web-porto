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
- Desain: **dark cyber modern** — minimalis, flat, tech-savvy, bergaya security dashboard/terminal, aksen teal terang (turunan warna logo). *(Revisi dari draft awal yang neobrutalism terang — diputuskan bersama user 2026-07-08.)*
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
  theme: { accent: "#2DD4BF" },            // satu-satunya knob warna
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
| `--bg` | `#0B1014` | latar utama, biru-hitam pekat |
| `--panel` | `#10171D` | kartu/panel |
| `--panel-2` | `#141D25` | hover panel / title bar terminal |
| `--line` | `#1E2A33` | border tipis 1px default |
| `--line-strong` | `#2A3843` | border tombol outline / hover |
| `--text` | `#E6EDF3` | teks utama |
| `--heading` | `#F2F7FA` | judul |
| `--muted` | `#8B98A5` | teks sekunder |
| `--accent` | `#2DD4BF` | teal terang (dari `theme.accent`) |
| `--accent-ink` | `#04342C` | teks di atas tombol accent |
| `--accent-dim` | `#2DD4BF1A` | latar badge/chip teal (10% alpha) |
| border | `1px solid var(--line)` | flat, tanpa shadow |
| radius | `4px` | tegas, sedikit membulat |
| font display/body | Space Grotesk (Google Fonts) | modern grotesk |
| font mono | JetBrains Mono | prompt, chips, label HUD, angka section |
| container | max-width `1080px` | padding samping 24px |
| section spacing | `96px` desktop / `64px` mobile | |

Prinsip **dark cyber modern**: flat total — tanpa drop shadow, tanpa glow berlebih, tanpa gradien. Kedalaman dibangun dari tingkatan warna panel (`--bg` → `--panel` → `--panel-2`) dan border tipis. Teal terang dipakai hemat: prompt, status, marker, tombol utama — supaya tiap kemunculannya "menyala".

Elemen cyber/HUD (dipakai terukur, bukan di semua tempat):
- **Corner brackets** teal di sudut elemen unggulan (terminal card hero, thumbnail project)
- **Microlabel mono uppercase** dengan LED dot: `● SYS.ONLINE` di navbar, `● live` di panel
- **Prompt marker** `>` dan `$` teal untuk list dan eyebrow (`// zikri@bangserverid:~$ whoami`)
- **Grid background** garis teal opacity ~4% di hero saja
- **Kursor blink** `▊` di akhir baris status terminal (animasi CSS sederhana)
- Penomoran section mono teal: `01.` `02.` `03.`

### 5.1b Logo di latar gelap

Logo asli (teal gelap) berpotensi kurang kontras di `--bg`. Solusi: README menyarankan versi logo terang; fallback logo teks mono (`zikri.bangserverid` dengan titik teal menyala) sudah terlihat bagus di dark dan jadi default yang aman untuk semua pemakai template.

### 5.2 Struktur halaman (atas → bawah)

**Navbar** — sticky, latar `--bg` semi-transparan (backdrop-blur ringan) + border-bottom 1px `--line`.
Kiri: logo (`assets/logo.png`, tinggi 32px; fallback teks mono `zikri.bangserverid` dengan titik teal). Tengah/kanan: link `Profil · Project · Layanan`, microlabel `● SYS.ONLINE` (LED teal berkedip pelan), tombol **WhatsApp** (solid accent, teks `--accent-ink`). Mobile: link disembunyikan, sisakan logo + tombol WA (semua section tetap terjangkau lewat scroll).

**Hero** — grid 2 kolom (55/45), latar grid-lines teal ~4%.
- Kiri: eyebrow mono teal `// zikri@bangserverid:~$ whoami`, H1 besar warna `--heading` (kata kunci diberi warna teal + underscore gaya kode: `security_`), 1 paragraf tagline `--muted`, dua tombol: `Konsultasi via WA` (accent) dan `Lihat project` (outline).
- Kanan: **panel terminal** dekoratif dalam corner brackets teal — title bar `audit.log` + `● live`, isi output mono dari config: `role`, `lokasi`, `fokus`, `status: open for work` (teal, kursor `▊` blink).
- Mobile: satu kolom, panel terminal di bawah teks.

**Section Profil (`01.`)** — heading `01. Profil` (angka mono teal).
Grid 2 kolom: kiri bio (2–3 paragraf dari `profile.bio`), kanan panel **Skills** (`--panel`, border 1px): chips mono, wrap.

**Section Project (`02.`)** — grid kartu 2 kolom (1 kolom di mobile).
Kartu (`--panel`, border 1px): thumbnail rasio 16:9 (gambar dari config; fallback: blok `--panel-2` + corner brackets + inisial project mono teal besar), badge status mono di pojok (`● LIVE` teal di `--accent-dim`; `● WIP` amber), judul, deskripsi 2–3 baris, chips tech kecil, link `Kunjungi ↗` mono teal. Hover: border berubah `--accent`, judul ikut teal.

**Section Layanan (`03.`)** — grid 3 kartu (1 kolom mobile). Kartu paling "kuat" di halaman:
ikon outline teal (subset SVG template: `code`, `shield`, `server`, dll), judul, deskripsi, daftar fitur dengan marker mono `>` teal, garis pemisah 1px, `priceNote` kecil mono (mis. *"harga menyesuaikan scope — konsultasi gratis"*), tombol **Chat via WhatsApp** full-width solid accent dengan pesan pre-filled per layanan.

**Footer** — border-top 1px `--line`, latar `--bg`.
Logo/brand, link sosial dari config, copyright mono kecil, credit: *"Template open-source — fork di GitHub"* (link repo).

### 5.3 Komponen & interaksi

- **Tombol**: 2 varian — `accent` (bg `--accent`, teks `--accent-ink`, radius 4px) dan `outline` (transparan, border 1px `--line-strong`). Hover accent: sedikit lebih terang + translate -1px; hover outline: border & teks jadi teal. Flat, tanpa shadow.
- **Kartu/panel**: `--panel`, border 1px `--line`, radius 4px. Hover (yang punya link): border `--accent`.
- **Chips**: mono 12–13px, latar `--accent-dim` atau transparan ber-border `--line`, teks `--text`.
- **Corner brackets**: pseudo-element 4 sudut (border teal 1.5px, 14px) pada terminal hero & thumbnail project.
- **Animasi khas** (hemat, CSS murni): kursor `▊` blink di terminal; LED `SYS.ONLINE` pulse pelan; reveal per section (fade + translateY 16px) via IntersectionObserver — sekali jalan, tanpa library. Hormati `prefers-reduced-motion`.
- **Aksesibilitas**: kontras AA di dark (`#E6EDF3` di `#0B1014` ≈ 15:1; `#2DD4BF` di `#0B1014` ≈ 9:1; `#04342C` di `#2DD4BF` lolos), focus-visible ring teal tegas, alt text gambar dari config, HTML semantik (`nav`, `main`, `section`, `footer`), `color-scheme: dark`.

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

- README (ID, ringkasan EN singkat di bawah): screenshot, fitur, cara pakai (fork → edit `config.js` → deploy), tabel field config, panduan deploy, lisensi.
- **Panduan deploy di README** — **Cloudflare Pages sebagai jalur utama** (deploy milik Zikri juga ke sini), langkah demi langkah: connect repo GitHub → framework preset *None* → build command kosong → output directory `/` → deploy; termasuk cara set custom domain. Alternatif singkat: GitHub Pages dan nginx/Coolify.
- LICENSE: MIT.
- Semua placeholder di config diberi komentar `// GANTI:` agar pemakai tahu apa yang wajib diubah.

## 8. Di luar scope (v1)

Light mode / toggle tema (situs dark-only), blog, form kontak, analytics, i18n toggle, animasi kompleks (glitch/typing effect), CMS/admin.

## 9. Verifikasi

- Buka `index.html` langsung via file/local server — semua section terrender dari config.
- Ubah `theme.accent` → warna aksen berubah di seluruh halaman.
- Kosongkan `projects` → section Project hilang tanpa error.
- Hapus `assets/logo.png` → fallback logo teks muncul (dan tetap kontras di latar gelap).
- Set `prefers-reduced-motion` → animasi blink/pulse/reveal mati.
- Klik CTA layanan → membuka `wa.me` dengan pesan pre-filled yang benar (URL-encoded).
- Cek responsive di 375px, 768px, 1280px.
