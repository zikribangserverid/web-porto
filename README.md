# Portofolio — zikri.bangserverid

Template web portofolio satu halaman bergaya **dark cyber** untuk developer:
profil, project, dan layanan dengan CTA langsung ke WhatsApp.
Static murni — **tanpa framework, tanpa build step, tanpa dependency**.

**Demo:** https://portofolio.pages.dev <!-- GANTI dengan URL kamu -->

## Fitur

- Semua konten diatur dari **satu file**: `config.js`
- CTA WhatsApp dengan pesan otomatis per layanan (`wa.me`)
- Dark cyber design: terminal card, HUD brackets, aksen teal (warna bisa diganti)
- Responsive, aksesibel (kontras AA, `prefers-reduced-motion`)
- Section otomatis disembunyikan kalau datanya kosong

## Cara pakai

1. **Fork / clone** repo ini
2. **Edit `config.js`** — semua baris bertanda `// GANTI:` wajib disesuaikan
   (nomor WhatsApp, link repo, sosial media)
3. **Logo (opsional):** taruh file logo di `assets/logo.png`.
   Tanpa file logo, situs memakai logo teks dari `profile.brand`.
   Disarankan logo versi terang karena latar situs gelap.
4. **Preview lokal:**
   ```bash
   python3 -m http.server 8788
   # buka http://localhost:8788
   ```

## Konfigurasi (`config.js`)

| Field | Isi |
|---|---|
| `meta.title`, `meta.description` | Judul tab & deskripsi SEO |
| `meta.url`, `meta.repo` | URL situs & link repo (footer). `repo: ""` menyembunyikan credit |
| `theme.accent` | Warna aksen (default teal `#2DD4BF`) |
| `profile.brand` | Nama brand — dipakai logo teks & footer |
| `profile.logo` | Path logo, fallback otomatis ke teks kalau file tidak ada |
| `profile.photo` | Foto profil untuk kartu di hero. Fallback otomatis ke monogram inisial kalau file tidak ada |
| `profile.name` | Nama yang ditonjolkan di kartu profil hero |
| `profile.headline` | Judul hero: `pre` + `highlight` (diwarnai) + `post` |
| `profile.tagline`, `profile.bio` | Tagline hero & paragraf bio (array) |
| `profile.terminal` | Readout mono di kartu profil hero (`title`, `lines`, `status`) |
| `skills` | Array chip skill |
| `projects[]` | `name`, `description`, `image`, `tech[]`, `url`, `status` (`live`/`wip`/`archived`) |
| `services[]` | `icon` (`code`/`shield`/`server`/`globe`/`tool`), `features[]`, `priceNote`, `waMessage` |
| `contact.whatsapp` | Nomor WA format internasional tanpa `+` (mis. `628123456789`) |
| `contact.waDefaultMessage` | Pesan WA untuk tombol navbar & hero |
| `contact.socials[]` | Ditampilkan sebagai ikon di kartu profil hero **dan** di footer. Ikon dikenali otomatis dari `label` (GitHub, Instagram, LinkedIn, X/Twitter, YouTube, Facebook, WhatsApp, Telegram, Email); label lain tampil sebagai teks |
| `contact.email` | Kontak footer — kosongkan untuk sembunyikan |

## Deploy

### Cloudflare Pages (disarankan)

1. Push repo ke GitHub
2. Buka [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → tab **Pages** → **Connect to Git**
3. Pilih repo kamu, lalu isi build settings:
   - **Framework preset:** `None`
   - **Build command:** *(kosongkan)*
   - **Build output directory:** `/`
4. Klik **Save and Deploy** — situs live di `https://<nama-project>.pages.dev`
5. *(Opsional)* Custom domain: buka project → **Custom domains** → **Set up a custom domain**. Kalau domain kamu sudah di Cloudflare, DNS-nya otomatis dibuatkan.

Setiap `git push` ke branch utama akan otomatis men-deploy ulang.

Alternatif via CLI tanpa connect Git:
```bash
npx wrangler pages deploy . --project-name=portofolio
```

### GitHub Pages

Repo → **Settings** → **Pages** → Source: **Deploy from a branch** → pilih `main` + folder `/ (root)`.

### Nginx / Coolify / server sendiri

Cukup serve folder ini sebagai static files — tidak ada proses build.

## Lisensi

[MIT](LICENSE) — silakan fork, modifikasi, dan pakai untuk portofolio kamu sendiri.

---

*One-page dark-cyber portfolio template. All content lives in a single
`config.js` — fork it, edit one file, deploy anywhere static (Cloudflare
Pages recommended, zero build step). MIT licensed.*
