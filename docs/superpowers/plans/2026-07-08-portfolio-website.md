# Web Portofolio zikri.bangserverid — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Website portofolio satu halaman (dark cyber modern) yang seluruh kontennya dirender dari `config.js`, siap deploy ke Cloudflare Pages, dan bisa di-fork sebagai template open-source.

**Architecture:** Static murni — `index.html` berisi kerangka section kosong; `js/main.js` (vanilla JS, IIFE, tanpa dependency) membaca `window.SITE_CONFIG` dari `config.js` dan merender DOM per section; `css/style.css` memuat seluruh design system. Section dengan data kosong dihapus dari DOM. Tanpa build step.

**Tech Stack:** HTML5, CSS3 (custom properties, color-mix, grid), vanilla JS ES5-compatible, Google Fonts (Space Grotesk + JetBrains Mono).

**Spec:** `docs/superpowers/specs/2026-07-08-portfolio-website-design.md`

## Global Constraints

- Tanpa build step, tanpa npm dependency, tanpa framework — semua file bisa dibuka langsung dari static server.
- Semua konten HANYA dari `config.js`. Tidak ada teks konten hardcoded di HTML/JS (label UI kecil seperti "Chat via WhatsApp" boleh di JS).
- Konten berbahasa Indonesia. Nomor WA placeholder: `6281234567890`.
- Warna persis dari spec: `--bg #0B1014`, `--panel #10171D`, `--panel-2 #141D25`, `--line #1E2A33`, `--line-strong #2A3843`, `--text #E6EDF3`, `--text-2 #B9C6D0`, `--heading #F2F7FA`, `--muted #8B98A5`, `--accent #2DD4BF`, `--accent-ink #04342C`. Dark-only, flat: tanpa box-shadow, glow, atau gradien (kecuali grid-lines hero).
- Font: Space Grotesk (display/body) + JetBrains Mono (mono) via Google Fonts.
- Radius 4px, border 1px, container max-width 1080px, section padding 96px/64px.
- Semua teks dirender via `textContent` (bukan innerHTML) kecuali ikon SVG statis dari map internal — mencegah XSS dari config.
- Hormati `prefers-reduced-motion`. Kontras AA. HTML semantik.
- Commit sering, pesan commit bahasa Indonesia dengan prefix conventional (`feat:`, `docs:`, `style:`), diakhiri `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.

---

### Task 1: `config.js` + LICENSE + struktur folder

**Files:**
- Create: `config.js`
- Create: `LICENSE`
- Create: `.gitignore`
- Create: `assets/.gitkeep`

**Interfaces:**
- Produces: `window.SITE_CONFIG` dengan bentuk persis seperti di bawah. Task 3–5 membaca: `meta.{title,description,url,repo,lang}`, `theme.accent`, `profile.{brand,logo,name,headline{pre,highlight,post},tagline,bio[],terminal{title,lines[{label,value}],status}}`, `skills[]`, `projects[{name,description,image,tech[],url,status}]`, `services[{icon,name,description,features[],priceNote,waMessage}]`, `contact.{whatsapp,waDefaultMessage,email,socials[{label,url}]}`.

- [ ] **Step 1: Buat `config.js`**

```js
// ============================================================
// config.js — SATU-SATUNYA file yang perlu kamu edit.
// Baris bertanda "GANTI:" wajib disesuaikan sebelum deploy.
// ============================================================
window.SITE_CONFIG = {
  meta: {
    title: "Zikri — Web Developer & Security Engineer",
    description:
      "Portofolio zikri.bangserverid — jasa web development, security audit & pentest, dan server management untuk freelancer & UMKM Indonesia.",
    url: "https://portofolio.pages.dev", // GANTI: URL situs kamu setelah deploy
    repo: "https://github.com/USERNAME/portofolio", // GANTI: link repo (dipakai di footer). Kosongkan "" untuk sembunyikan
    lang: "id"
  },

  theme: {
    // Satu-satunya knob warna. Catatan: kalau diganti warna terang lain,
    // teks tombol memakai warna gelap tetap (--accent-ink di style.css).
    accent: "#2DD4BF"
  },

  profile: {
    brand: "zikri.bangserverid",
    logo: "assets/logo.png", // opsional — kalau file tidak ada, otomatis fallback ke logo teks
    name: "Zikri",
    headline: {
      pre: "Web developer &",
      highlight: "security_", // bagian yang diwarnai teal
      post: "engineer"
    },
    tagline:
      "Membangun web, mengamankan server, dan bikin tools yang benar-benar dipakai — untuk freelancer & UMKM Indonesia.",
    bio: [
      "Saya Zikri — web developer dan praktisi keamanan web dari Indonesia. Lewat brand zikri.bangserverid, saya membangun aplikasi web, mengelola server, dan mengamankan keduanya.",
      "Fokus saya membuat tools yang benar-benar dipakai: dari platform security operations untuk freelancer web, sampai aplikasi kasir untuk warung. Prinsip saya sederhana — software yang baik itu aman, cepat, dan jalan terus."
    ],
    terminal: {
      title: "audit.log",
      lines: [
        { label: "role", value: "fullstack + security" },
        { label: "lokasi", value: "Indonesia" },
        { label: "fokus", value: "SaaS · pentest · server ops" }
      ],
      status: "open for work"
    }
  },

  skills: [
    "Python", "FastAPI", "React", "React Native / Expo",
    "MongoDB", "PostgreSQL", "Docker", "Coolify",
    "Cloudflare", "Nginx", "Security Testing", "CI/CD"
  ],

  projects: [
    {
      name: "Khaleed",
      description:
        "Security + Infrastructure Operations Platform — passive & active scan, incident response, log analyzer, malware scan, dan domain monitoring dalam satu dashboard. Dibangun untuk freelancer web & agency Indonesia.",
      image: "", // opsional: "assets/khaleed.png" — kosong = placeholder inisial
      tech: ["FastAPI", "React", "PostgreSQL", "Docker"],
      url: "https://app.pentestbykhaleed.com",
      status: "live" // "live" | "wip" | "archived"
    },
    {
      name: "Warung Juragan",
      description:
        "Aplikasi manajemen produk, kasir, dan keuangan untuk warung & UMKM — dari pencatatan stok sampai laporan keuangan harian.",
      image: "",
      tech: ["FastAPI", "Expo", "MongoDB"],
      url: "",
      status: "live"
    }
  ],

  services: [
    {
      icon: "code", // pilihan: code | shield | server | globe | tool
      name: "Web Development",
      description:
        "Pembuatan website dan aplikasi web custom — dari landing page sampai SaaS end-to-end.",
      features: [
        "Landing page & company profile",
        "Sistem web custom / SaaS",
        "Integrasi API & payment gateway",
        "Desain sampai deploy"
      ],
      priceNote: "harga menyesuaikan scope — konsultasi gratis",
      waMessage:
        "Halo Zikri, saya tertarik dengan layanan Web Development. Bisa konsultasi?"
    },
    {
      icon: "shield",
      name: "Security Audit & Pentest",
      description:
        "Audit keamanan menyeluruh untuk website dan aplikasi web — temukan celah sebelum orang lain.",
      features: [
        "Vulnerability assessment",
        "Penetration testing + report",
        "Hardening & patching",
        "Incident response"
      ],
      priceNote: "harga menyesuaikan scope — konsultasi gratis",
      waMessage:
        "Halo Zikri, saya tertarik dengan layanan Security Audit & Pentest. Bisa konsultasi?"
    },
    {
      icon: "server",
      name: "Server & VPS Management",
      description:
        "Setup, deploy, dan maintenance server tanpa pusing — biar kamu fokus ke bisnis.",
      features: [
        "Setup VPS & hardening",
        "Deploy Docker / Coolify",
        "Monitoring & alerting",
        "Backup & maintenance rutin"
      ],
      priceNote: "harga menyesuaikan scope — konsultasi gratis",
      waMessage:
        "Halo Zikri, saya tertarik dengan layanan Server & VPS Management. Bisa konsultasi?"
    }
  ],

  contact: {
    whatsapp: "6281234567890", // GANTI: nomor WA kamu, format internasional tanpa +
    waDefaultMessage: "Halo Zikri, saya lihat portofolio kamu. Bisa diskusi project?",
    email: "kangserverid@gmail.com", // GANTI kalau perlu. Kosongkan "" untuk sembunyikan
    socials: [
      { label: "GitHub", url: "https://github.com/USERNAME" }, // GANTI
      { label: "Instagram", url: "https://instagram.com/USERNAME" } // GANTI
    ]
  }
};
```

- [ ] **Step 2: Buat `LICENSE` (MIT)**

```text
MIT License

Copyright (c) 2026 Zikri (zikri.bangserverid)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

- [ ] **Step 3: Buat `.gitignore` dan `assets/.gitkeep`**

`.gitignore`:
```text
.DS_Store
```

`assets/.gitkeep`: file kosong (agar folder ikut ter-commit; logo & gambar project ditaruh user di sini).

- [ ] **Step 4: Verifikasi struktur config**

Run:
```bash
node -e 'global.window={};require("./config.js");var c=window.SITE_CONFIG;var miss=["meta","theme","profile","skills","projects","services","contact"].filter(function(k){return !(k in c)});if(miss.length){console.error("Field hilang:",miss.join(","));process.exit(1)}if(!/^[0-9]+$/.test(c.contact.whatsapp)){console.error("contact.whatsapp harus digit saja");process.exit(1)}console.log("config OK:",c.projects.length,"project,",c.services.length,"layanan,",c.skills.length,"skills")'
```
Expected: `config OK: 2 project, 3 layanan, 12 skills`

- [ ] **Step 5: Commit**

```bash
git add config.js LICENSE .gitignore assets/.gitkeep
git commit -m "feat: config terpusat, lisensi MIT, struktur folder

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 2: `index.html` + design tokens & base CSS

**Files:**
- Create: `index.html`
- Create: `css/style.css`

**Interfaces:**
- Produces: elemen ber-id `#site-nav`, `#hero`, `#profil`, `#project`, `#layanan`, `#site-footer` (Task 3–5 merender ke sini). Class CSS yang dipakai Task 3–6: `.container`, `.btn`, `.btn-accent`, `.btn-outline`, `.btn-sm`, `.chip`, `.chips`, `.section-title`, `.num`.

- [ ] **Step 1: Buat `index.html`**

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>zikri.bangserverid</title>
  <meta name="description" content="">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <nav id="site-nav" aria-label="Navigasi utama"></nav>
  <main>
    <header id="hero"></header>
    <section id="profil" aria-label="Profil"></section>
    <section id="project" aria-label="Project"></section>
    <section id="layanan" aria-label="Layanan"></section>
  </main>
  <footer id="site-footer"></footer>
  <noscript><p class="noscript">Situs ini membutuhkan JavaScript untuk menampilkan konten.</p></noscript>
  <script src="config.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Buat `css/style.css` — tokens, base, komponen umum**

```css
:root {
  --bg: #0B1014;
  --panel: #10171D;
  --panel-2: #141D25;
  --line: #1E2A33;
  --line-strong: #2A3843;
  --text: #E6EDF3;
  --text-2: #B9C6D0;
  --heading: #F2F7FA;
  --muted: #8B98A5;
  --accent: #2DD4BF;
  --accent-ink: #04342C;
  --accent-dim: color-mix(in srgb, var(--accent) 10%, transparent);
  --font-sans: "Space Grotesk", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, monospace;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

html { scroll-behavior: smooth; color-scheme: dark; }

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-sans);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

.container { max-width: 1080px; margin: 0 auto; padding: 0 24px; }

main > * { padding: 96px 0; }

a { color: var(--accent); text-decoration: none; }
a:focus-visible, button:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}

.btn {
  display: inline-block;
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: 15px;
  padding: 10px 20px;
  border-radius: 4px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: transform .15s ease, filter .15s ease, border-color .15s ease, color .15s ease;
}
.btn-sm { padding: 7px 14px; font-size: 14px; }
.btn-accent { background: var(--accent); color: var(--accent-ink); }
.btn-accent:hover { transform: translateY(-1px); filter: brightness(1.08); }
.btn-outline { background: transparent; color: var(--text); border-color: var(--line-strong); }
.btn-outline:hover { border-color: var(--accent); color: var(--accent); }

.chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chip {
  font-family: var(--font-mono);
  font-size: 13px;
  padding: 3px 10px;
  border: 1px solid var(--line);
  border-radius: 4px;
  color: var(--text-2);
}

.section-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--heading);
  margin-bottom: 40px;
}
.section-title .num {
  font-family: var(--font-mono);
  font-weight: 500;
  color: var(--accent);
  margin-right: 8px;
}

.noscript {
  padding: 48px 24px;
  text-align: center;
  font-family: var(--font-mono);
  color: var(--muted);
}
```

- [ ] **Step 3: Verifikasi halaman tersaji**

Run:
```bash
python3 -m http.server 8788 >/dev/null 2>&1 &
sleep 1
curl -s http://localhost:8788/ | grep -c 'id="site-nav"\|id="hero"\|id="layanan"'
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8788/css/style.css
```
Expected: `3` lalu `200`. (Server dibiarkan jalan untuk task berikutnya, atau matikan dengan `kill %1`.)

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: kerangka HTML + design tokens dark cyber

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 3: `js/main.js` — helpers, meta/theme, navbar, hero + terminal

**Files:**
- Create: `js/main.js`
- Modify: `css/style.css` (append style nav, hero, terminal, brackets)

**Interfaces:**
- Consumes: `window.SITE_CONFIG` (Task 1), id `#site-nav` `#hero` (Task 2).
- Produces: helper yang dipakai Task 4–6 di file yang sama: `el(tag, cls, text)` → HTMLElement; `waLink(message)` → string URL; `sectionTitle(num, title)` → HTMLElement `.section-title`; `brackets(innerNode)` → wrapper `.brackets` dengan 4 `.corner`; object `ICONS` berisi string SVG untuk key `code|shield|server|globe|tool`.

- [ ] **Step 1: Buat `js/main.js` dengan helpers + render nav & hero**

```js
(function () {
  "use strict";
  var C = window.SITE_CONFIG;
  if (!C) return;

  // ---------- helpers ----------
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text !== undefined) n.textContent = text;
    return n;
  }

  function waLink(message) {
    return "https://wa.me/" + C.contact.whatsapp +
      "?text=" + encodeURIComponent(message || "");
  }

  function extLink(node, href) {
    node.href = href;
    node.target = "_blank";
    node.rel = "noopener";
    return node;
  }

  function sectionTitle(num, title) {
    var h = el("h2", "section-title");
    h.appendChild(el("span", "num", num));
    h.appendChild(document.createTextNode(title));
    return h;
  }

  function brackets(innerNode) {
    var w = el("div", "brackets");
    ["tl", "tr", "bl", "br"].forEach(function (p) {
      w.appendChild(el("span", "corner " + p));
    });
    w.appendChild(innerNode);
    return w;
  }

  function brandText() {
    var s = el("span", "brand-text");
    var parts = C.profile.brand.split(".");
    parts.forEach(function (p, i) {
      if (i > 0) s.appendChild(el("span", "dot", "."));
      s.appendChild(document.createTextNode(p));
    });
    return s;
  }

  var ICONS = {
    code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="7 8 3 12 7 16"/><polyline points="17 8 21 12 17 16"/><line x1="14" y1="4" x2="10" y2="20"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v5c0 4.4-2.9 8.1-7 10-4.1-1.9-7-5.6-7-10V6z"/><polyline points="9 12 11 14 15 10"/></svg>',
    server: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="7" rx="1"/><rect x="3" y="13" width="18" height="7" rx="1"/><line x1="7" y1="7.5" x2="7" y2="7.5"/><line x1="7" y1="16.5" x2="7" y2="16.5"/></svg>',
    globe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.9 5.7 3.9 9S14.5 18.4 12 21c-2.5-2.6-3.9-5.7-3.9-9S9.5 5.6 12 3z"/></svg>',
    tool: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4 4 0 0 0-5.2 5.2L4 17v3h3l5.5-5.5a4 4 0 0 0 5.2-5.2L15 12l-3-3z"/></svg>'
  };

  function icon(name) {
    var s = el("span", "icon");
    s.setAttribute("aria-hidden", "true");
    s.innerHTML = ICONS[name] || ICONS.code;
    return s;
  }

  // ---------- meta & theme ----------
  function applyMetaTheme() {
    document.title = C.meta.title;
    var md = document.querySelector('meta[name="description"]');
    if (md) md.setAttribute("content", C.meta.description);
    document.documentElement.lang = C.meta.lang || "id";
    if (C.theme && C.theme.accent) {
      document.documentElement.style.setProperty("--accent", C.theme.accent);
    }
  }

  // ---------- navbar ----------
  function renderNav() {
    var nav = document.getElementById("site-nav");
    var inner = el("div", "container nav-inner");

    var brand = el("a", "brand");
    brand.href = "#";
    if (C.profile.logo) {
      var img = document.createElement("img");
      img.src = C.profile.logo;
      img.alt = C.profile.brand;
      img.onerror = function () { brand.replaceChild(brandText(), img); };
      brand.appendChild(img);
    } else {
      brand.appendChild(brandText());
    }
    inner.appendChild(brand);

    var right = el("div", "nav-links");
    [
      ["#profil", "Profil", C.profile.bio && C.profile.bio.length],
      ["#project", "Project", C.projects && C.projects.length],
      ["#layanan", "Layanan", C.services && C.services.length]
    ].forEach(function (item) {
      if (!item[2]) return;
      var a = el("a", "nav-item", item[1]);
      a.href = item[0];
      right.appendChild(a);
    });

    var sys = el("span", "sys-label");
    sys.appendChild(el("span", "led"));
    sys.appendChild(document.createTextNode("SYS.ONLINE"));
    right.appendChild(sys);

    right.appendChild(
      extLink(el("a", "btn btn-accent btn-sm", "WhatsApp"),
        waLink(C.contact.waDefaultMessage))
    );

    inner.appendChild(right);
    nav.appendChild(inner);
  }

  // ---------- hero ----------
  function renderHero() {
    var hero = document.getElementById("hero");
    var grid = el("div", "container hero-grid");

    var left = el("div");
    left.appendChild(el("p", "eyebrow",
      "// " + C.profile.brand + ":~$ whoami"));

    var h1 = el("h1");
    h1.appendChild(document.createTextNode(C.profile.headline.pre + " "));
    h1.appendChild(el("br"));
    h1.appendChild(el("span", "hl", C.profile.headline.highlight));
    h1.appendChild(document.createTextNode(C.profile.headline.post));
    left.appendChild(h1);

    left.appendChild(el("p", "tagline", C.profile.tagline));

    var cta = el("div", "hero-cta");
    cta.appendChild(
      extLink(el("a", "btn btn-accent", "Konsultasi via WA"),
        waLink(C.contact.waDefaultMessage))
    );
    var look = el("a", "btn btn-outline", "Lihat project");
    look.href = C.projects && C.projects.length ? "#project" : "#layanan";
    cta.appendChild(look);
    left.appendChild(cta);
    grid.appendChild(left);

    var t = C.profile.terminal;
    if (t) {
      var term = el("div", "terminal");
      var bar = el("div", "terminal-bar");
      bar.appendChild(el("span", "t-title", t.title));
      bar.appendChild(el("span", "t-live", "● live"));
      term.appendChild(bar);

      var body = el("div", "terminal-body");
      (t.lines || []).forEach(function (line) {
        var row = el("div");
        row.appendChild(el("span", "p", "> "));
        row.appendChild(el("span", "k", line.label + ": "));
        row.appendChild(document.createTextNode(line.value));
        body.appendChild(row);
      });
      var st = el("div");
      st.appendChild(el("span", "p", "> "));
      st.appendChild(el("span", "k", "status: "));
      st.appendChild(el("span", "p", t.status + " "));
      st.appendChild(el("span", "cursor", "▊"));
      body.appendChild(st);
      term.appendChild(body);

      grid.appendChild(brackets(term));
    }

    hero.appendChild(grid);
  }

  // ---------- init ----------
  applyMetaTheme();
  renderNav();
  renderHero();
})();
```

- [ ] **Step 2: Append CSS nav + hero + terminal + brackets ke `css/style.css`**

```css
#site-nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: color-mix(in srgb, var(--bg) 85%, transparent);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--line);
}
.nav-inner { display: flex; align-items: center; justify-content: space-between; height: 64px; }
.nav-links { display: flex; gap: 24px; align-items: center; }
.nav-links .nav-item { color: var(--muted); font-size: 15px; }
.nav-links .nav-item:hover { color: var(--accent); }
.brand { display: flex; align-items: center; gap: 10px; }
.brand img { height: 32px; display: block; }
.brand-text { font-family: var(--font-mono); font-weight: 500; font-size: 16px; color: var(--heading); }
.brand-text .dot { color: var(--accent); }
.sys-label {
  display: flex; align-items: center; gap: 6px;
  font-family: var(--font-mono); font-size: 12px;
  color: var(--muted); letter-spacing: .05em;
}
.led { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); animation: pulse 2.4s ease-in-out infinite; }
@keyframes pulse { 0%, 100% { opacity: 1 } 50% { opacity: .35 } }

#hero {
  background-image:
    linear-gradient(color-mix(in srgb, var(--accent) 4%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, var(--accent) 4%, transparent) 1px, transparent 1px);
  background-size: 32px 32px;
}
.hero-grid { display: grid; grid-template-columns: 55fr 45fr; gap: 48px; align-items: center; }
.eyebrow { font-family: var(--font-mono); font-size: 14px; color: var(--accent); margin-bottom: 16px; overflow-wrap: anywhere; }
h1 { font-size: clamp(2.2rem, 5vw, 3.4rem); line-height: 1.12; color: var(--heading); font-weight: 700; }
h1 .hl { color: var(--accent); }
.tagline { color: var(--muted); font-size: 18px; margin: 20px 0 32px; max-width: 46ch; }
.hero-cta { display: flex; gap: 14px; flex-wrap: wrap; }

.brackets { position: relative; padding: 10px; }
.corner { position: absolute; width: 16px; height: 16px; border: 0 solid var(--accent); }
.corner.tl { top: 0; left: 0; border-top-width: 1.5px; border-left-width: 1.5px; }
.corner.tr { top: 0; right: 0; border-top-width: 1.5px; border-right-width: 1.5px; }
.corner.bl { bottom: 0; left: 0; border-bottom-width: 1.5px; border-left-width: 1.5px; }
.corner.br { bottom: 0; right: 0; border-bottom-width: 1.5px; border-right-width: 1.5px; }

.terminal { background: var(--panel); border: 1px solid var(--line); border-radius: 4px; overflow: hidden; }
.terminal-bar {
  display: flex; justify-content: space-between; align-items: center;
  padding: 8px 14px; border-bottom: 1px solid var(--line); background: var(--panel-2);
}
.t-title { font-family: var(--font-mono); font-size: 12px; color: var(--muted); }
.t-live { font-family: var(--font-mono); font-size: 12px; color: var(--accent); }
.terminal-body { font-family: var(--font-mono); font-size: 14px; line-height: 2; padding: 16px 18px; color: var(--text); }
.terminal-body .p { color: var(--accent); }
.terminal-body .k { color: var(--muted); }
.cursor { display: inline-block; color: var(--accent); animation: blink 1.1s steps(1) infinite; }
@keyframes blink { 50% { opacity: 0 } }
```

- [ ] **Step 3: Verifikasi render di browser**

Run: buka `http://localhost:8788/` di browser (atau preview tool).
Checklist:
- Judul tab berubah jadi "Zikri — Web Developer & Security Engineer"
- Navbar: brand text `zikri.bangserverid` dengan titik teal (logo.png belum ada → fallback bekerja), `● SYS.ONLINE` berkedip pelan, tombol WhatsApp teal
- Hero: eyebrow mono `// zikri.bangserverid:~$ whoami`, H1 dengan `security_` teal, dua tombol
- Terminal card dalam corner brackets teal, kursor `▊` berkedip
- Klik tombol WhatsApp → URL `https://wa.me/6281234567890?text=...` (cek href, tidak perlu benar-benar membuka WA)

- [ ] **Step 4: Commit**

```bash
git add js/main.js css/style.css
git commit -m "feat: render navbar & hero dengan terminal card dari config

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 4: Section Profil + Project

**Files:**
- Modify: `js/main.js` (tambah `renderProfil`, `renderProjects` + panggil di init)
- Modify: `css/style.css` (append)

**Interfaces:**
- Consumes: `el`, `sectionTitle`, `brackets`, `extLink` (Task 3); `C.profile.bio`, `C.skills`, `C.projects` (Task 1).

- [ ] **Step 1: Tambah fungsi render di `js/main.js`** (sisipkan sebelum blok `// ---------- init ----------`)

```js
  // ---------- profil ----------
  function renderProfil() {
    var sec = document.getElementById("profil");
    if (!C.profile.bio || !C.profile.bio.length) { sec.remove(); return; }
    var c = el("div", "container");
    c.appendChild(sectionTitle("01.", "Profil"));

    var grid = el("div", "profil-grid");
    var bio = el("div", "bio");
    C.profile.bio.forEach(function (p) { bio.appendChild(el("p", null, p)); });
    grid.appendChild(bio);

    if (C.skills && C.skills.length) {
      var panel = el("div", "skills-panel");
      panel.appendChild(el("h3", null, "// skills"));
      var chips = el("div", "chips");
      C.skills.forEach(function (s) { chips.appendChild(el("span", "chip", s)); });
      panel.appendChild(chips);
      grid.appendChild(panel);
    }
    c.appendChild(grid);
    sec.appendChild(c);
  }

  // ---------- projects ----------
  function initials(name) {
    return name.split(/\s+/).map(function (w) { return w[0]; })
      .join("").slice(0, 2).toUpperCase();
  }

  var STATUS = {
    live: { text: "● LIVE", cls: "badge badge-live" },
    wip: { text: "● WIP", cls: "badge badge-wip" },
    archived: { text: "■ ARCHIVED", cls: "badge badge-archived" }
  };

  function renderProjects() {
    var sec = document.getElementById("project");
    if (!C.projects || !C.projects.length) { sec.remove(); return; }
    var c = el("div", "container");
    c.appendChild(sectionTitle("02.", "Project"));

    var grid = el("div", "project-grid");
    C.projects.forEach(function (p) {
      var card = el("article", "card");

      var thumb = el("div", "thumb");
      if (p.image) {
        var img = document.createElement("img");
        img.src = p.image;
        img.alt = "Tampilan project " + p.name;
        img.loading = "lazy";
        thumb.appendChild(img);
      } else {
        thumb.appendChild(el("span", "initials", initials(p.name)));
      }
      var st = STATUS[p.status];
      if (st) thumb.appendChild(el("span", st.cls, st.text));
      card.appendChild(thumb);

      var body = el("div", "card-body");
      body.appendChild(el("h3", null, p.name));
      body.appendChild(el("p", "desc", p.description));
      if (p.tech && p.tech.length) {
        var chips = el("div", "chips");
        p.tech.forEach(function (t) { chips.appendChild(el("span", "chip", t)); });
        body.appendChild(chips);
      }
      if (p.url) {
        body.appendChild(
          extLink(el("a", "card-link", "Kunjungi ↗"), p.url)
        );
      }
      card.appendChild(body);
      grid.appendChild(card);
    });
    c.appendChild(grid);
    sec.appendChild(c);
  }
```

Lalu di blok init, setelah `renderHero();` tambahkan:

```js
  renderProfil();
  renderProjects();
```

- [ ] **Step 2: Append CSS profil + project ke `css/style.css`**

```css
.profil-grid { display: grid; grid-template-columns: 3fr 2fr; gap: 48px; align-items: start; }
.bio p { color: var(--text-2); font-size: 16px; }
.bio p + p { margin-top: 14px; }
.skills-panel { background: var(--panel); border: 1px solid var(--line); border-radius: 4px; padding: 20px; }
.skills-panel h3 {
  font-family: var(--font-mono); font-size: 13px; font-weight: 500;
  color: var(--muted); letter-spacing: .08em; margin-bottom: 14px;
}

.project-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.card { background: var(--panel); border: 1px solid var(--line); border-radius: 4px; overflow: hidden; transition: border-color .2s ease; }
.card:hover { border-color: var(--accent); }
.thumb { position: relative; aspect-ratio: 16 / 9; background: var(--panel-2); display: flex; align-items: center; justify-content: center; }
.thumb img { width: 100%; height: 100%; object-fit: cover; }
.thumb .initials { font-family: var(--font-mono); font-size: 40px; font-weight: 500; color: var(--accent); }
.badge {
  position: absolute; top: 10px; right: 10px;
  font-family: var(--font-mono); font-size: 11px; letter-spacing: .06em;
  padding: 3px 9px; border-radius: 3px;
}
.badge-live { color: var(--accent); background: var(--accent-dim); border: 1px solid var(--accent); }
.badge-wip { color: #EF9F27; background: rgba(239, 159, 39, .1); border: 1px solid #EF9F27; }
.badge-archived { color: var(--muted); background: transparent; border: 1px solid var(--line-strong); }
.card-body { padding: 18px 20px 20px; }
.card-body h3 { color: var(--heading); font-size: 20px; margin-bottom: 8px; }
.card-body .desc { color: var(--muted); font-size: 15px; margin-bottom: 14px; }
.card-link { font-family: var(--font-mono); font-size: 14px; display: inline-block; margin-top: 14px; }
```

- [ ] **Step 3: Verifikasi di browser**

Buka `http://localhost:8788/`. Checklist:
- Section `01. Profil`: dua paragraf bio kiri, panel `// skills` kanan berisi 12 chips
- Section `02. Project`: dua kartu — Khaleed (badge `● LIVE`, inisial `K` di thumbnail, link `Kunjungi ↗` ke app.pentestbykhaleed.com) dan Warung Juragan (tanpa link karena url kosong)
- Hover kartu → border menyala teal
- Uji edge case: set sementara `projects: []` di config.js → section Project & link nav "Project" hilang tanpa error di console → kembalikan lagi

- [ ] **Step 4: Commit**

```bash
git add js/main.js css/style.css
git commit -m "feat: section profil dan project cards

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 5: Section Layanan + Footer

**Files:**
- Modify: `js/main.js` (tambah `renderServices`, `renderFooter` + panggil di init)
- Modify: `css/style.css` (append)

**Interfaces:**
- Consumes: `el`, `sectionTitle`, `waLink`, `extLink`, `icon` (Task 3); `C.services`, `C.contact`, `C.meta.repo` (Task 1).

- [ ] **Step 1: Tambah fungsi render di `js/main.js`** (sisipkan sebelum blok init)

```js
  // ---------- services ----------
  function renderServices() {
    var sec = document.getElementById("layanan");
    if (!C.services || !C.services.length) { sec.remove(); return; }
    var c = el("div", "container");
    c.appendChild(sectionTitle("03.", "Layanan"));

    var grid = el("div", "service-grid");
    C.services.forEach(function (s) {
      var card = el("article", "service");
      card.appendChild(icon(s.icon));
      card.appendChild(el("h3", null, s.name));
      card.appendChild(el("p", "desc", s.description));

      if (s.features && s.features.length) {
        var ul = el("ul", "features");
        s.features.forEach(function (f) { ul.appendChild(el("li", null, f)); });
        card.appendChild(ul);
      }
      if (s.priceNote) card.appendChild(el("p", "price-note", s.priceNote));
      card.appendChild(
        extLink(el("a", "btn btn-accent", "Chat via WhatsApp"),
          waLink(s.waMessage))
      );
      grid.appendChild(card);
    });
    c.appendChild(grid);
    sec.appendChild(c);
  }

  // ---------- footer ----------
  function renderFooter() {
    var f = document.getElementById("site-footer");
    var inner = el("div", "container footer-inner");

    inner.appendChild(brandText());

    var soc = el("div", "footer-socials");
    (C.contact.socials || []).forEach(function (s) {
      soc.appendChild(extLink(el("a", null, s.label), s.url));
    });
    if (C.contact.email) {
      var mail = el("a", null, "Email");
      mail.href = "mailto:" + C.contact.email;
      soc.appendChild(mail);
    }
    inner.appendChild(soc);

    var right = el("div", "footer-meta");
    right.appendChild(el("p", "copyright",
      "© " + new Date().getFullYear() + " " + C.profile.brand));
    if (C.meta.repo) {
      var credit = el("p", "credit");
      credit.appendChild(document.createTextNode("template open-source — "));
      credit.appendChild(extLink(el("a", null, "fork di GitHub ↗"), C.meta.repo));
      right.appendChild(credit);
    }
    inner.appendChild(right);
    f.appendChild(inner);
  }
```

Lalu di blok init, setelah `renderProjects();` tambahkan:

```js
  renderServices();
  renderFooter();
```

- [ ] **Step 2: Append CSS layanan + footer ke `css/style.css`**

```css
.service-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.service {
  display: flex; flex-direction: column;
  background: var(--panel); border: 1px solid var(--line); border-radius: 4px;
  padding: 24px; transition: border-color .2s ease;
}
.service:hover { border-color: var(--accent); }
.service .icon { color: var(--accent); width: 28px; height: 28px; margin-bottom: 16px; }
.service .icon svg { width: 100%; height: 100%; display: block; }
.service h3 { color: var(--heading); font-size: 20px; margin-bottom: 8px; }
.service .desc { color: var(--muted); font-size: 15px; margin-bottom: 16px; }
.features { list-style: none; margin-bottom: 20px; flex: 1; }
.features li {
  font-family: var(--font-mono); font-size: 13.5px; color: var(--text-2);
  padding-left: 18px; position: relative; margin-bottom: 8px;
}
.features li::before { content: ">"; position: absolute; left: 0; color: var(--accent); }
.price-note {
  font-family: var(--font-mono); font-size: 12px; color: var(--muted);
  border-top: 1px solid var(--line); padding-top: 14px; margin-bottom: 14px;
}
.service .btn { text-align: center; width: 100%; }

#site-footer { border-top: 1px solid var(--line); padding: 32px 0; }
.footer-inner { display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; }
.footer-socials { display: flex; gap: 18px; }
.footer-socials a { color: var(--muted); font-size: 14px; }
.footer-socials a:hover { color: var(--accent); }
.footer-meta { text-align: right; }
.copyright, .credit { font-family: var(--font-mono); font-size: 12px; color: var(--muted); }
```

- [ ] **Step 3: Verifikasi CTA WhatsApp**

Buka `http://localhost:8788/`, lalu di console browser jalankan:
```js
[...document.querySelectorAll('a[href^="https://wa.me/"]')].map(a => decodeURIComponent(a.href))
```
Expected: 5 link (1 navbar, 1 hero, 3 layanan); link layanan memuat pesan sesuai `waMessage` masing-masing (Web Development / Security Audit / Server & VPS). Checklist visual:
- Section `03. Layanan`: 3 kartu dengan ikon teal (code/shield/server), fitur bermarker `>`, price note di atas garis, tombol full-width
- Footer: brand, GitHub · Instagram · Email, copyright 2026, credit "fork di GitHub ↗"

- [ ] **Step 4: Commit**

```bash
git add js/main.js css/style.css
git commit -m "feat: section layanan dengan CTA WhatsApp dan footer

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 6: Responsive, scroll reveal, reduced motion

**Files:**
- Modify: `js/main.js` (tambah `initReveal` + panggil di init)
- Modify: `css/style.css` (append)

**Interfaces:**
- Consumes: struktur DOM hasil Task 3–5.

- [ ] **Step 1: Tambah `initReveal` di `js/main.js`** (sisipkan sebelum blok init)

```js
  // ---------- scroll reveal ----------
  function initReveal() {
    if (!("IntersectionObserver" in window)) return;
    var targets = document.querySelectorAll("main > *, #site-footer");
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    targets.forEach(function (t) {
      t.classList.add("reveal");
      obs.observe(t);
    });
  }
```

Lalu di blok init, setelah `renderFooter();` tambahkan:

```js
  initReveal();
```

- [ ] **Step 2: Append CSS reveal + responsive + reduced motion ke `css/style.css`**

```css
.reveal { opacity: 0; transform: translateY(16px); transition: opacity .6s ease, transform .6s ease; }
.reveal.visible { opacity: 1; transform: none; }

@media (max-width: 959px) {
  main > * { padding: 64px 0; }
  .hero-grid, .profil-grid { grid-template-columns: 1fr; gap: 40px; }
  .service-grid { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 639px) {
  .nav-links { gap: 14px; }
  .nav-links .nav-item, .sys-label { display: none; }
  .project-grid, .service-grid { grid-template-columns: 1fr; }
  .footer-inner { flex-direction: column; align-items: flex-start; }
  .footer-meta { text-align: left; }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .led, .cursor { animation: none; }
  .reveal { opacity: 1; transform: none; transition: none; }
  .btn, .card, .service { transition: none; }
}
```

- [ ] **Step 3: Verifikasi responsive & motion**

Di browser `http://localhost:8788/`:
- Lebar 1280px: hero 2 kolom, project 2 kolom, layanan 3 kolom
- Lebar 768px: hero & profil 1 kolom, layanan 2 kolom (1 kartu turun ke bawah)
- Lebar 375px: semua 1 kolom; navbar hanya logo + tombol WhatsApp; tidak ada horizontal scroll
- Scroll dari atas ke bawah: tiap section fade-in sekali
- DevTools → Rendering → emulate `prefers-reduced-motion` → kursor & LED berhenti berkedip, section langsung terlihat
- Console browser bersih (tanpa error)

- [ ] **Step 4: Commit**

```bash
git add js/main.js css/style.css
git commit -m "feat: responsive layout, scroll reveal, dukungan reduced motion

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 7: README (panduan kustomisasi + deploy Cloudflare Pages) + verifikasi akhir

**Files:**
- Create: `README.md`

**Interfaces:**
- Consumes: seluruh field `config.js` (Task 1) — tabel di README harus cocok dengan field yang benar-benar ada.

- [ ] **Step 1: Buat `README.md`**

````markdown
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
| `profile.headline` | Judul hero: `pre` + `highlight` (diwarnai) + `post` |
| `profile.tagline`, `profile.bio` | Tagline hero & paragraf bio (array) |
| `profile.terminal` | Isi terminal card di hero (`lines`, `status`) |
| `skills` | Array chip skill |
| `projects[]` | `name`, `description`, `image`, `tech[]`, `url`, `status` (`live`/`wip`/`archived`) |
| `services[]` | `icon` (`code`/`shield`/`server`/`globe`/`tool`), `features[]`, `priceNote`, `waMessage` |
| `contact.whatsapp` | Nomor WA format internasional tanpa `+` (mis. `628123456789`) |
| `contact.waDefaultMessage` | Pesan WA untuk tombol navbar & hero |
| `contact.email`, `contact.socials[]` | Kontak footer — kosongkan untuk sembunyikan |

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
````

- [ ] **Step 2: Verifikasi akhir (checklist spec §9)**

- `node -e '...'` validasi config (perintah Task 1 Step 4) → `config OK`
- Buka situs: semua section terrender dari config
- Ubah `theme.accent` ke `"#F59E0B"` sementara → seluruh aksen berubah (prompt, tombol, border hover, grid hero) → kembalikan
- Set `projects: []` sementara → section & nav "Project" hilang, tombol hero "Lihat project" mengarah ke `#layanan` → kembalikan
- `assets/logo.png` tidak ada → logo teks tampil kontras di latar gelap
- Klik tiap CTA layanan → `wa.me/6281234567890` dengan pesan ter-encode benar
- Responsive 375px / 768px / 1280px tanpa horizontal scroll
- Emulasi `prefers-reduced-motion` → semua animasi mati
- Console browser bersih

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs: README panduan kustomisasi & deploy Cloudflare Pages

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```
