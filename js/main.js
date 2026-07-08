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
    var wa = String(C.contact.whatsapp || "").trim();
    var base;
    if (/wa\.me|whatsapp\.com|^https?:\/\//i.test(wa)) {
      // Sudah berupa URL (mis. "https://wa.me/62812..." atau "wa.me/62812...")
      base = /^https?:\/\//i.test(wa) ? wa : "https://" + wa.replace(/^\/+/, "");
    } else {
      // Angka saja (mis. "62812...") — buang karakter non-digit
      base = "https://wa.me/" + wa.replace(/[^0-9]/g, "");
    }
    var sep = base.indexOf("?") > -1 ? "&" : "?";
    return base + sep + "text=" + encodeURIComponent(message || "");
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

  // Ikon brand sosial (filled, viewBox 0 0 24 24). Cocokkan berdasarkan label.
  var SOCIAL_ICONS = {
    github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    twitter: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
    youtube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>',
    telegram: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>',
    email: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 4H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-10 5L2 8V6l10 5 10-5v2z"/></svg>'
  };
  SOCIAL_ICONS.mail = SOCIAL_ICONS.email;

  function socialIconNode(label) {
    var key = String(label || "").toLowerCase().replace(/[^a-z]/g, "");
    var svg = SOCIAL_ICONS[key];
    if (!svg) return null;
    var s = el("span", "si");
    s.setAttribute("aria-hidden", "true");
    s.innerHTML = svg;
    return s;
  }

  function monogram(name) {
    return (name || "").split(/\s+/).map(function (w) { return w[0]; })
      .join("").slice(0, 2).toUpperCase();
  }

  // Sosial media yang benar-benar diisi (punya label + url non-kosong).
  function activeSocials() {
    return (C.contact.socials || []).filter(function (s) {
      return s && s.label && s.url && String(s.url).trim() !== "";
    });
  }

  // ---------- meta, theme & SEO ----------
  function baseUrl() {
    return String(C.meta.url || "").replace(/\/+$/, "");
  }

  function absUrl(path) {
    if (!path) return "";
    if (/^https?:\/\//.test(path)) return path;
    return baseUrl() + "/" + String(path).replace(/^\/+/, "");
  }

  // Judul dari headline: "Web developer &" + "security_" + "engineer"
  //   -> "Web developer & security engineer"
  function headlineText() {
    var h = C.profile.headline;
    if (!h) return "";
    return [h.pre, h.highlight, h.post].join(" ")
      .replace(/_/g, " ").replace(/\s+/g, " ").trim();
  }

  function upsertMeta(attr, key, content) {
    if (content == null || content === "") return;
    var m = document.head.querySelector("meta[" + attr + '="' + key + '"]');
    if (!m) {
      m = document.createElement("meta");
      m.setAttribute(attr, key);
      document.head.appendChild(m);
    }
    m.setAttribute("content", content);
  }

  function upsertLink(rel, href) {
    if (!href) return;
    var l = document.head.querySelector('link[rel="' + rel + '"]');
    if (!l) {
      l = document.createElement("link");
      l.setAttribute("rel", rel);
      document.head.appendChild(l);
    }
    l.setAttribute("href", href);
  }

  function buildJsonLd() {
    var url = baseUrl() + "/";
    var pid = url + "#person";
    var wid = url + "#website";
    var socials = activeSocials().map(function (s) { return s.url; });
    var person = {
      "@type": "Person",
      "@id": pid,
      name: C.profile.name || C.profile.brand,
      alternateName: C.profile.brand,
      url: url,
      jobTitle: headlineText() || undefined,
      description: (C.profile.bio && C.profile.bio[0]) || C.meta.description,
      knowsAbout: C.skills && C.skills.length ? C.skills : undefined,
      address: { "@type": "PostalAddress", addressCountry: "ID" }
    };
    if (C.profile.photo) person.image = absUrl(C.profile.photo);
    if (socials.length) person.sameAs = socials;

    var graph = [
      person,
      {
        "@type": "WebSite",
        "@id": wid,
        url: url,
        name: C.profile.brand,
        description: C.meta.description,
        inLanguage: (C.meta.lang || "id") + "-ID",
        publisher: { "@id": pid }
      },
      {
        "@type": "ProfilePage",
        "@id": url + "#webpage",
        url: url,
        name: C.meta.title,
        isPartOf: { "@id": wid },
        about: { "@id": pid },
        inLanguage: (C.meta.lang || "id") + "-ID"
      }
    ];

    if (C.services && C.services.length) {
      person.hasOfferCatalog = {
        "@type": "OfferCatalog",
        name: "Layanan",
        itemListElement: C.services.map(function (s) {
          return {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: s.name,
              description: s.description,
              provider: { "@id": pid }
            }
          };
        })
      };
    }

    return { "@context": "https://schema.org", "@graph": graph };
  }

  function applySeo() {
    var m = C.meta || {};
    var url = baseUrl() + "/";
    var ogImg = absUrl(m.image);
    var ht = headlineText();
    var ogTitle = (C.profile.name || C.profile.brand) + (ht ? " — " + ht : "");

    document.title = m.title || document.title;
    document.documentElement.lang = m.lang || "id";
    upsertMeta("name", "description", m.description);
    upsertMeta("name", "keywords", m.keywords);
    upsertMeta("name", "author", m.author);
    upsertLink("canonical", url);

    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", C.profile.brand);
    upsertMeta("property", "og:title", ogTitle);
    upsertMeta("property", "og:description", m.description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", ogImg);
    upsertMeta("property", "og:locale", (m.lang || "id") + "_ID");

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", ogTitle);
    upsertMeta("name", "twitter:description", m.description);
    upsertMeta("name", "twitter:image", ogImg);
    if (m.twitter) {
      upsertMeta("name", "twitter:site", "@" + m.twitter);
      upsertMeta("name", "twitter:creator", "@" + m.twitter);
    }

    // Perbarui JSON-LD dari config (mengganti baseline statis di HTML)
    try {
      var ld = document.getElementById("ld-json");
      if (!ld) {
        ld = document.createElement("script");
        ld.type = "application/ld+json";
        ld.id = "ld-json";
        document.head.appendChild(ld);
      }
      ld.textContent = JSON.stringify(buildJsonLd());
    } catch (e) { /* JSON-LD statis tetap dipakai kalau gagal */ }
  }

  function applyMetaTheme() {
    applySeo();
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

    grid.appendChild(brackets(renderProfileCard()));

    hero.appendChild(grid);
  }

  // ---------- profile card (panel kanan hero) ----------
  function renderProfileCard() {
    var t = C.profile.terminal || {};
    var card = el("div", "profile-card");

    var bar = el("div", "pc-bar");
    bar.appendChild(el("span", "t-title", t.title || "whoami"));
    bar.appendChild(el("span", "t-live", "● online"));
    card.appendChild(bar);

    var body = el("div", "pc-body");

    // identitas: foto + nama + handle
    var id = el("div", "pc-id");
    var photo = el("div", "pc-photo");
    if (C.profile.photo) {
      var img = document.createElement("img");
      img.src = C.profile.photo;
      img.alt = "Foto " + (C.profile.name || C.profile.brand);
      img.onerror = function () {
        photo.replaceChild(el("span", "pc-monogram", monogram(C.profile.name)), img);
      };
      photo.appendChild(img);
    } else {
      photo.appendChild(el("span", "pc-monogram", monogram(C.profile.name)));
    }
    id.appendChild(photo);

    var idText = el("div", "pc-idtext");
    idText.appendChild(el("div", "pc-name", C.profile.name || C.profile.brand));
    idText.appendChild(el("div", "pc-handle", C.profile.brand));
    id.appendChild(idText);
    body.appendChild(id);

    // readout mono (role, lokasi, fokus, status)
    if ((t.lines && t.lines.length) || t.status) {
      body.appendChild(el("div", "pc-divider"));
      var readout = el("div", "pc-readout");
      (t.lines || []).forEach(function (line) {
        var row = el("div");
        row.appendChild(el("span", "p", "> "));
        row.appendChild(el("span", "k", line.label + ": "));
        row.appendChild(document.createTextNode(line.value));
        readout.appendChild(row);
      });
      if (t.status) {
        var st = el("div");
        st.appendChild(el("span", "p", "> "));
        st.appendChild(el("span", "k", "status: "));
        st.appendChild(el("span", "p", t.status + " "));
        st.appendChild(el("span", "cursor", "▊"));
        readout.appendChild(st);
      }
      body.appendChild(readout);
    }

    // sosial media (hanya yang diisi)
    var socials = activeSocials();
    if (socials.length) {
      body.appendChild(el("div", "pc-divider"));
      var soc = el("div", "pc-socials");
      socials.forEach(function (s) {
        var a = extLink(el("a"), s.url);
        a.setAttribute("aria-label", s.label);
        a.title = s.label;
        var ic = socialIconNode(s.label);
        if (ic) {
          a.appendChild(ic);
        } else {
          a.className = "text";
          a.textContent = s.label;
        }
        soc.appendChild(a);
      });
      body.appendChild(soc);
    }

    card.appendChild(body);
    return card;
  }

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
        img.src = p.image; // boleh URL gambar atau path lokal
        img.alt = "Tampilan project " + p.name;
        img.loading = "lazy";
        img.onerror = function () {
          thumb.replaceChild(el("span", "initials", initials(p.name)), img);
        };
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
    activeSocials().forEach(function (s) {
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

  // ---------- init ----------
  applyMetaTheme();
  renderNav();
  renderHero();
  renderProfil();
  renderProjects();
  renderServices();
  renderFooter();
  initReveal();
})();
