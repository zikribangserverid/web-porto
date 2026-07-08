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
