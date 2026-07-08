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
