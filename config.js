// ============================================================
// config.js — SATU-SATUNYA file yang perlu kamu edit.
// Baris bertanda "GANTI:" wajib disesuaikan sebelum deploy.
// ============================================================
window.SITE_CONFIG = {
  meta: {
    title: "Zikri — Web Developer & Security Engineer | zikri.bangserverid",
    description:
      "Zikri (zikri.bangserverid) — devops & security engineer dari Indonesia. Jasa pembuatan website, security audit & pentest, dan manajemen server/VPS untuk freelancer & UMKM.",
    url: "https://zikri.karsaweb.id", // GANTI: URL final situs setelah deploy (atau custom domain)
    repo: "https://github.com/zikribangserverid/web-porto", // link repo (footer). Kosongkan "" untuk sembunyikan
    author: "Zikri",
    keywords: "web developer indonesia, jasa pembuatan website, security audit, penetration testing, pentest website, manajemen server, vps, devops, zikri.bangserverid, freelance developer indonesia",
    image: "assets/og-image.png", // gambar share sosial/preview (1200x630). Otomatis dijadikan URL absolut dari meta.url
    twitter: "", // handle X/Twitter tanpa "@" (opsional) — mis. "zikribangserverid"
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
    photo: "https://github.com/zikribangserverid.png", // GANTI: URL gambar ATAU path lokal (mis. "assets/profile.jpg"). Kalau gagal dimuat, otomatis fallback ke monogram inisial
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
      title: "whoami",
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
      image: "https://cdn.scalev.com/uploads/1783034484/oKJ2an2mrZruLwHF68QkMA/1783034484481-khaleed.webp", // opsional: URL gambar (https://...) atau path lokal. Kosong/gagal muat = placeholder inisial
      tech: ["FastAPI", "React", "PostgreSQL", "Docker"],
      url: "https://app.pentestbykhaleed.com",
      status: "live" // "live" | "wip" | "archived"
    },
    {
      name: "Warung Juragan",
      description:
        "Aplikasi manajemen produk, kasir, dan keuangan untuk warung & UMKM — dari pencatatan stok sampai laporan keuangan harian.",
      image: "https://cdn.scalev.com/uploads/1783034484/oKJ2an2mrZruLwHF68QkMA/1783034484481-khaleed.webp",
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
    whatsapp: "6285117142879", // GANTI: boleh angka saja (62812...) ATAU URL lengkap (https://wa.me/62812...)
    waDefaultMessage: "Halo Zikri, saya lihat portofolio kamu. Bisa diskusi project?",
    email: "kangserverid@gmail.com", // GANTI kalau perlu. Kosongkan "" untuk sembunyikan
    socials: [
      { label: "GitHub", url: "https://github.com/zikribangserverid" }, // GANTI kalau berbeda
      { label: "Instagram", url: "https://www.instagram.com/zikri.bangserverid/" } // GANTI: isi URL Instagram kamu (kosong = tidak tampil)
    ]
  }
};
