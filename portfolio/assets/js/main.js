/* ============================================================================
 *  PORTFOLIO main.js  —  renders sections from window.PORTFOLIO (data.js)
 *  NOW WITH SUPABASE INTEGRATION: Fetches dynamic content when available
 *  Separation of data & UI (PRD §8): all content lives in data.js or Supabase.
 * ==========================================================================*/

import { fetchProjects, fetchCertificates, isSupabaseAvailable } from './api.js'

(function () {
  "use strict";

  var P = window.PORTFOLIO || {};
  var dynamicProjects = null;
  var dynamicCertificates = null;

  function el(id) { return document.getElementById(id); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function escUrl(s) {
    // Hanya izinkan http/https (blokir javascript:, data:, vbscript:, dll.)
    var v = String(s == null ? "" : s).trim();
    if (!/^(https?:)?\/\//i.test(v) && !v.startsWith("#")) return "#";
    return esc(v);
  }
  function $(html) { return html; } // alias for readability

  /* ----------------------------- JOURNEY -------------------------------- */
  function renderJourney() {
    var list = P.journey || [], root = el("journey-body");
    if (!root) return;
    if (!list.length) { root.innerHTML = emptyState("TODO: ADD JOURNEY — belum ada data perjalanan."); return; }
    var items = list.map(function (j) {
      return (
        '<div class="relative pl-8 pb-8">' +
          '<div class="absolute -left-[5px] top-1 w-2 h-2 bg-blueprint-cyan"></div>' +
          '<div class="font-label-sm text-label-sm text-blueprint-cyan mb-1">' + esc(j.year || "") + '</div>' +
          '<h4 class="font-body-lg text-body-lg text-on-surface mb-1 uppercase">' + esc(j.title || "") + '</h4>' +
          '<p class="font-body-md text-body-md text-on-surface-variant">' + esc(j.desc || "") + '</p>' +
        '</div>'
      );
    }).join("");
    root.innerHTML = '<div class="relative border-l border-blueprint-cyan/30 ml-4 space-y-2 pb-4">' + items + '</div>';
  }

  /* ----------------------------- HERO ----------------------------------- */
  function renderHero() {
    var p = P.profile || {}, root = el("hero-root");
    if (!root) return;
    var soc = p.socials || {}, links = "";
    if (soc.github) links += linkBtn(soc.github, "code", "GitHub");
    if (soc.linkedin) links += linkBtn(soc.linkedin, "link", "LinkedIn");
    if (soc.discord) links += linkBtn(soc.discord, "forum", "Discord");
    if (soc.instagram) links += svgBtn(soc.instagram, ICONS.instagram, "Instagram");
    if (soc.facebook) links += svgBtn(soc.facebook, ICONS.facebook, "Facebook");
    if (soc.twitter) links += linkBtn(soc.twitter, "alternate_email", "Twitter");

    var avail = p.available
      ? '<div class="w-2 h-2 bg-blueprint-cyan"></div> STATUS: ' + esc(p.status || "ACTIVE")
      : '<div class="w-2 h-2 bg-outline"></div> CURRENTLY UNAVAILABLE';
    var meta = avail +
      ' <span class="text-outline">//</span> FIELD: ' + esc(p.field || "SOFTWARE DEVELOPMENT") +
      ' <span class="text-outline">//</span> LOCATION: ' + esc(p.location || "KENDARI, INDONESIA");

    var avatarInner = (p.avatar)
      ? '<img class="w-full h-full object-cover" alt="' + esc(p.name || "Profile") + '" src="' + esc(p.avatar) + '">'
      : '<div class="w-full h-full flex items-center justify-center bg-surface-container text-blueprint-cyan font-display-lg-mobile text-[64px] uppercase">' + esc((p.name || "A").trim().charAt(0)) + '</div>';

    root.innerHTML = $(
      '<div class="col-span-1 md:col-span-7 flex flex-col gap-6 relative z-10">' +
        '<div class="font-label-caps text-label-caps text-blueprint-cyan tracking-widest flex flex-wrap items-center gap-2">' + meta + '</div>' +
        '<h1 class="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface uppercase leading-none">' +
          esc(p.name || "Your Name") + '<br><span class="text-blueprint-cyan">' + esc(p.title || "Developer") + '</span></h1>' +
        '<p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl border-l border-blueprint-cyan/30 pl-4 py-2">' + esc(p.heroBio || "") + '</p>' +
        '<div class="flex items-center gap-4 mt-4">' +
          '<a href="#projects" class="border border-blueprint-cyan text-blueprint-cyan font-label-caps text-label-caps px-6 py-3 uppercase hover:bg-blueprint-cyan/10 transition-colors flex items-center gap-2">' +
            '<span class="material-symbols-outlined text-[18px]">terminal</span> VIEW PROJECTS</a>' +
          '<a href="#contact" class="border border-outline-variant text-on-surface-variant font-label-caps text-label-caps px-6 py-3 uppercase hover:border-blueprint-cyan hover:text-blueprint-cyan transition-colors flex items-center gap-2">' +
            '<span class="material-symbols-outlined text-[18px]">link</span> CONNECT</a>' +
          '<div class="flex gap-4 border border-outline-variant p-2">' + links + '</div>' +
        '</div>' +
      '</div>' +
      '<div class="col-span-1 md:col-span-5 relative" style="margin-top: 1.5rem;">' +
        '<div class="relative w-full bg-surface border border-blueprint-cyan/30 plate-corners p-2" style="aspect-ratio: 595 / 842;">' +
          '<div class="corner-tl"></div><div class="corner-tr"></div><div class="corner-bl"></div><div class="corner-br"></div>' +
          '<div class="w-full h-full relative overflow-hidden bg-surface-container">' +
            avatarInner +
            '<div class="absolute bottom-4 left-4 bg-surface/90 border border-blueprint-cyan/50 px-3 py-1 font-label-sm text-label-sm text-blueprint-cyan backdrop-blur-sm">PROFILE_LOADED</div>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }
  var ICONS = {
    instagram: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>'
  };
  function svgBtn(href, svg, label) {
    return '<a class="text-outline hover:text-blueprint-cyan transition-colors inline-flex items-center justify-center w-6 h-6" href="' + escUrl(href) +
      '" target="_blank" rel="noopener" aria-label="' + esc(label) + '">' + svg + '</a>';
  }
  function linkBtn(href, icon, label) {
    return '<a class="text-outline hover:text-blueprint-cyan transition-colors" href="' + escUrl(href) +
      '" target="_blank" rel="noopener" aria-label="' + esc(label) + '"><span class="material-symbols-outlined">' + icon + '</span></a>';
  }

  /* ----------------------------- ABOUT ---------------------------------- */
  function renderAbout() {
    var a = P.about || {}, root = el("about-body");
    if (!root) return;
    var interests = (a.interests || []).map(function (i) {
      return '<span class="border border-blueprint-cyan/40 px-3 py-1 text-label-sm text-label-sm text-blueprint-cyan">' + esc(i) + '</span>';
    }).join("");
    root.innerHTML = $(
      '<div class="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">' +
        '<div class="col-span-1 md:col-span-7 space-y-6">' +
          '<div><h3 class="font-label-caps text-label-caps text-blueprint-cyan mb-2">// BACKGROUND</h3>' +
            '<p class="font-body-lg text-body-lg text-on-surface-variant">' + esc(a.background || "") + '</p></div>' +
          '<div><h3 class="font-label-caps text-label-caps text-blueprint-cyan mb-2">// JOURNEY</h3>' +
            '<p class="font-body-lg text-body-lg text-on-surface-variant">' + esc(a.journey || "") + '</p></div>' +
          '<div><h3 class="font-label-caps text-label-caps text-blueprint-cyan mb-2">// INTERESTS</h3>' +
            '<div class="flex flex-wrap gap-2">' + interests + '</div></div>' +
        '</div>' +
        '<div class="col-span-1 md:col-span-5 bg-surface-container-lowest border border-blueprint-cyan/20 plate-corners p-6 relative">' +
          '<div class="corner-tl"></div><div class="corner-br"></div>' +
          '<div class="font-label-caps text-label-caps text-outline mb-4">CORE_DIRECTIVE</div>' +
          '<p class="font-headline-md text-headline-md text-on-surface leading-snug">"' + esc(a.philosophy || "") + '"</p>' +
        '</div>' +
      '</div>'
    );
  }

  /* ----------------------------- SKILLS --------------------------------- */
  function renderSkills() {
    var list = P.skills || [], root = el("skills-body");
    if (!root) return;
    var cards = list.map(function (cat, idx) {
      var chips = (cat.items || []).map(function (it) {
        return '<span class="border border-outline-variant px-3 py-2 text-label-sm text-label-sm text-on-surface-variant group-hover:border-blueprint-cyan/50 transition-colors">' + esc(it.name) + '</span>';
      }).join("");
      return (
        '<div class="bg-surface-container-lowest border border-blueprint-cyan/20 plate-corners p-6 relative group hover:border-blueprint-cyan/50 transition-colors">' +
          '<div class="corner-tl"></div><div class="corner-br"></div>' +
          '<div class="flex justify-between items-center mb-4">' +
            '<h3 class="font-label-caps text-label-caps text-on-surface">' + esc(cat.category) + '</h3>' +
            '<span class="font-label-sm text-label-sm text-outline">SET_0' + (idx + 1) + '</span>' +
          '</div>' +
          '<div class="flex flex-wrap gap-2">' + chips + '</div>' +
        '</div>'
      );
    }).join("");
    root.innerHTML = '<div class="grid grid-cols-1 md:grid-cols-2 gap-gutter">' + cards + '</div>';
  }

  /* ----------------------------- PROJECTS ------------------------------- */
  function renderProjects() {
    // Use dynamic data if available, otherwise fallback to static
    var list = dynamicProjects || P.projects || [];
    var root = el("projects-body");
    if (!root) return;
    
    if (!list.length) { 
      root.innerHTML = emptyState("TODO: ADD PROJECT — belum ada data project. Tambahkan via Admin Dashboard atau di assets/js/data.js (bagian projects)."); 
      return; 
    }

    var cards = list.map(function (pr) {
      var badgeClass = pr.status === "ARCHIVED"
        ? "bg-accent-yellow text-on-tertiary-fixed"
        : (pr.status === "PENDING" ? "bg-outline text-surface" : "bg-blueprint-cyan text-on-primary");
      var badge = '<div class="absolute top-0 right-0 ' + badgeClass + ' font-label-caps text-label-caps px-2 py-1 z-10">' + esc(pr.status || "ACTIVE") + '</div>';
      var tags = (pr.tags || []).map(function (t) {
        return '<span class="border border-blueprint-cyan/40 px-2 py-1 text-blueprint-cyan">' + esc(t) + '</span>';
      }).join(" ");
      var demo = (pr.demo && pr.demo !== "#" && pr.demo !== "")
        ? '<a class="border border-blueprint-cyan text-blueprint-cyan font-label-caps text-label-caps px-4 py-2 uppercase hover:bg-blueprint-cyan/10 transition-colors" href="' + escUrl(pr.demo) + '" target="_blank" rel="noopener">LIVE DEMO</a>'
        : "";
      var imgInner;
      if (!pr.image) {
        imgInner = '<div class="w-full h-full flex items-center justify-center bg-surface-container text-outline font-label-caps text-label-caps">NO PREVIEW // TODO: ADD IMAGE</div>';
      } else if (pr.mediaType === 'video') {
        imgInner = '<video class="w-full h-full object-cover opacity-80 transition-opacity duration-500" controls preload="metadata" src="' + escUrl(pr.image) + '"></video>';
      } else if (pr.mediaType === 'pdf') {
        imgInner = '<iframe class="w-full h-full bg-white" src="' + escUrl(pr.image) + '#toolbar=0&navpanes=0&view=FitH" title="' + esc(pr.name) + '"></iframe>';
      } else {
        imgInner = '<img class="w-full h-full object-cover opacity-80 transition-opacity duration-500 cursor-pointer" alt="' + esc(pr.name) + '" src="' + escUrl(pr.image) + '" data-media="' + escUrl(pr.image) + '" data-type="' + esc(pr.mediaType) + '" onerror="this.onerror=null;this.parentNode.innerHTML=\'<div class=&quot;w-full h-full flex items-center justify-center bg-surface-container text-outline font-label-caps text-label-caps&quot;>IMG UNAVAILABLE</div>\'">';
      }
      var viewLabel = !pr.image ? '' : (pr.mediaType === 'pdf' ? 'PDF' : pr.mediaType === 'video' ? 'VIDEO' : 'IMAGE');
      if (viewLabel) {
        imgInner = '<div class="media-card relative w-full h-full">' + imgInner +
          '<div class="media-overlay"><button type="button" class="media-view-btn" data-media="' + escUrl(pr.image) + '" data-type="' + esc(pr.mediaType) + '">VIEW ' + viewLabel + ' ↗</button></div>' +
          '</div>';
      }
      return (
        '<div class="border border-outline-variant bg-surface-container-lowest relative group">' +
          badge +
          '<div class="h-64 relative overflow-hidden border-b border-outline-variant p-2">' +
            '<div class="w-full h-full bg-surface-container relative">' +
              imgInner +
              '<div class="absolute inset-0 scanlines pointer-events-none"></div>' +
            '</div>' +
          '</div>' +
          '<div class="p-6">' +
            '<h3 class="font-headline-md text-[24px] text-on-surface mb-2 uppercase">' + esc(pr.name) + '</h3>' +
            '<p class="font-body-md text-body-md text-on-surface-variant mb-6">' + esc(pr.description) + '</p>' +
            '<div class="flex gap-2 flex-wrap font-label-sm text-label-sm mb-4">' + tags + '</div>' +
            '<div class="flex items-center gap-3">' +
              '<a class="border border-outline-variant text-on-surface-variant font-label-caps text-label-caps px-4 py-2 uppercase hover:border-blueprint-cyan hover:text-blueprint-cyan transition-colors" href="' + escUrl(pr.github || "#") + '" target="_blank" rel="noopener">SOURCE</a>' +
              demo +
            '</div>' +
          '</div>' +
        '</div>'
      );
    }).join("");
    root.innerHTML = '<div class="grid grid-cols-1 md:grid-cols-2 gap-gutter">' + cards + '</div>';
  }

  /* ---------------------------- EXPERIENCE ------------------------------ */
  function renderExperience() {
    var list = P.experience || [], root = el("experience-body");
    if (!root) return;
    if (!list.length) { root.innerHTML = emptyState("No experience logged yet."); return; }
    var items = list.map(function (e) {
      var resp = (e.responsibilities || []).map(function (r) {
        return '<li class="text-on-surface-variant">› ' + esc(r) + '</li>';
      }).join("");
      var tech = (e.tech || []).map(function (t) {
        return '<span class="border border-blueprint-cyan/40 px-2 py-1 text-blueprint-cyan">' + esc(t) + '</span>';
      }).join(" ");
      return (
        '<div class="relative pl-8 pb-8">' +
          '<div class="absolute -left-[5px] top-1 w-2 h-2 bg-blueprint-cyan rounded-none"></div>' +
          '<div class="font-label-sm text-label-sm text-blueprint-cyan mb-1">' + esc(e.start || "") + ' // ' + esc(e.end || "") + '  —  ' + esc(e.org || "") + '</div>' +
          '<h4 class="font-body-lg text-body-lg text-on-surface mb-1">' + esc(e.role || "") + '</h4>' +
          '<p class="font-label-sm text-label-sm text-on-surface-variant mb-2">' + esc(e.description || "") + '</p>' +
          (resp ? '<ul class="space-y-1 font-body-md text-body-md mb-3">' + resp + '</ul>' : '') +
          (tech ? '<div class="flex gap-2 flex-wrap font-label-sm text-label-sm">' + tech + '</div>' : '') +
        '</div>'
      );
    }).join("");
    root.innerHTML = '<div class="relative border-l border-blueprint-cyan/30 ml-4 space-y-2 pb-4">' + items + '</div>';
  }

  /* ----------------------------- EDUCATION ------------------------------ */
  function renderEducation() {
    var list = P.education || [], root = el("education-body");
    if (!root) return;
    if (!list.length) { root.innerHTML = emptyState("No education entries yet."); return; }
    var cards = list.map(function (ed) {
      var metaBits = [];
      if (ed.status) metaBits.push(esc(ed.status));
      if (ed.gpa) metaBits.push("GPA: " + esc(ed.gpa));
      var meta = metaBits.length
        ? '<div class="font-label-sm text-label-sm text-accent-yellow mb-2">' + metaBits.join("  ·  ") + '</div>'
        : '';
      return (
        '<div class="bg-surface-container-lowest border border-blueprint-cyan/20 plate-corners p-6 relative group hover:border-blueprint-cyan/50 transition-colors">' +
          '<div class="corner-tl"></div><div class="corner-br"></div>' +
          '<div class="font-label-sm text-label-sm text-blueprint-cyan mb-2">' + esc(ed.period || "") + '</div>' +
          meta +
          '<h3 class="font-headline-md text-headline-md text-on-surface mb-1">' + esc(ed.institution || "") + '</h3>' +
          '<p class="font-label-caps text-label-caps text-on-surface-variant mb-3">' + esc(ed.program || "") + '</p>' +
          '<p class="font-body-md text-body-md text-on-surface-variant">' + esc(ed.description || "") + '</p>' +
        '</div>'
      );
    }).join("");
    root.innerHTML = '<div class="grid grid-cols-1 md:grid-cols-2 gap-gutter">' + cards + '</div>';
  }

  /* ---------------------------- CERTIFICATES ---------------------------- */
  function renderCertificates() {
    // Use dynamic data if available, otherwise fallback to static
    var list = dynamicCertificates || P.certificates || [];
    var root = el("certificates-body");
    if (!root) return;
    
    if (!list.length) { 
      root.innerHTML = emptyState("TODO: ADD CERTIFICATE — belum ada sertifikat. Tambahkan via Admin Dashboard atau di assets/js/data.js (bagian certificates)."); 
      return; 
    }

    var cards = list.map(function (c) {
      var verify = (c.verifyUrl && c.verifyUrl !== "#")
        ? '<a class="text-blueprint-cyan font-label-caps text-label-caps uppercase hover:underline" href="' + escUrl(c.verifyUrl) + '" target="_blank" rel="noopener">Verify ↗</a>'
        : "";
      var certMedia;
      if (!c.image) {
        certMedia = '<div class="w-full h-full flex items-center justify-center bg-surface-container text-outline font-label-caps text-label-caps">NO IMAGE</div>';
      } else if (c.mediaType === 'video') {
        certMedia = '<video class="w-full h-full object-cover opacity-80 transition-opacity" controls preload="metadata" src="' + escUrl(c.image) + '"></video>';
      } else if (c.mediaType === 'pdf') {
        certMedia = '<iframe class="w-full h-full bg-white" src="' + escUrl(c.image) + '#toolbar=0&navpanes=0&view=FitH" title="' + esc(c.name) + '"></iframe>';
      } else {
        certMedia = '<img class="w-full h-full object-cover opacity-80 transition-opacity cursor-pointer" alt="' + esc(c.name) + '" src="' + escUrl(c.image) + '" data-media="' + escUrl(c.image) + '" data-type="' + esc(c.mediaType) + '" onerror="this.onerror=null;this.parentNode.innerHTML=\'<div class=&quot;w-full h-full flex items-center justify-center bg-surface-container text-outline font-label-caps text-label-caps&quot;>IMG UNAVAILABLE</div>\'">';
      }
      var certViewLabel = !c.image ? '' : (c.mediaType === 'pdf' ? 'PDF' : c.mediaType === 'video' ? 'VIDEO' : 'IMAGE');
      if (certViewLabel) {
        certMedia = '<div class="media-card relative w-full h-full">' + certMedia +
          '<div class="media-overlay"><button type="button" class="media-view-btn" data-media="' + escUrl(c.image) + '" data-type="' + esc(c.mediaType) + '">VIEW ' + certViewLabel + ' ↗</button></div>' +
          '</div>';
      }
      return (
        '<div class="border border-outline-variant bg-surface-container-lowest relative group">' +
          '<div class="h-40 relative overflow-hidden border-b border-outline-variant p-2">' +
            '<div class="w-full h-full bg-surface-container relative">' +
              certMedia +
            '</div>' +
          '</div>' +
          '<div class="p-5">' +
            '<h3 class="font-headline-md text-[20px] text-on-surface mb-1">' + esc(c.name) + '</h3>' +
            '<p class="font-label-caps text-label-caps text-on-surface-variant">' + esc(c.issuer || "") + '</p>' +
            '<p class="font-label-sm text-label-sm text-outline mt-1">' + esc(c.date || "") + (c.credentialId ? '  ·  ID: ' + esc(c.credentialId) : '') + '</p>' +
            (verify ? '<div class="mt-3">' + verify + '</div>' : '') +
          '</div>' +
        '</div>'
      );
    }).join("");
    root.innerHTML = '<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-gutter">' + cards + '</div>';
  }

  /* ---------------------------- ACHIEVEMENTS ---------------------------- */
  function renderAchievements() {
    var list = P.achievements || [], root = el("achievements-body");
    var section = root && root.closest("section");
    if (!root) return;
    if (!list.length) {
      if (section) section.style.display = "none";
      return;
    }
    if (section) section.style.display = "";
    var cards = list.map(function (a) {
      return (
        '<div class="bg-surface-container-lowest border border-blueprint-cyan/20 plate-corners p-6 relative group hover:border-blueprint-cyan/50 transition-colors">' +
          '<div class="corner-tl"></div><div class="corner-br"></div>' +
          '<span class="material-symbols-outlined text-accent-yellow mb-3 text-[32px]">emoji_events</span>' +
          '<div class="font-label-sm text-label-sm text-blueprint-cyan mb-1">' + esc(a.date || "") + '  —  ' + esc(a.org || "") + '</div>' +
          '<h3 class="font-headline-md text-[20px] text-on-surface mb-2">' + esc(a.name) + '</h3>' +
          '<p class="font-body-md text-body-md text-on-surface-variant">' + esc(a.description || "") + '</p>' +
        '</div>'
      );
    }).join("");
    root.innerHTML = '<div class="grid grid-cols-1 md:grid-cols-3 gap-gutter">' + cards + '</div>';
  }

  /* ------------------------------ CONTACT ------------------------------- */
  function renderContact() {
    var c = P.contact || {}, root = el("contact-body");
    if (!root) return;
    var items = [
      { icon: "code", label: "GITHUB", value: c.github, href: c.github, external: true },
      { icon: "work", label: "LINKEDIN", value: c.linkedin, href: c.linkedin, external: true },
      { icon: "instagram_svg", label: "INSTAGRAM", value: "@asc_nasibungkus", href: c.instagram, external: true },
      { icon: "facebook_svg", label: "FACEBOOK", value: "Facebook Profile", href: c.facebook, external: true },
      { icon: "forum", label: "DISCORD", value: c.discord, href: c.discord, external: true }
    ].filter(function (i) { return i.value && i.value !== "#"; }).map(function (i) {
      var targetAttr = i.external ? ' target="_blank" rel="noopener"' : '';
      return (
        '<a class="bg-surface-container-lowest border border-blueprint-cyan/20 plate-corners p-6 relative group hover:border-blueprint-cyan/50 transition-colors flex items-center gap-4" href="' + esc(i.href) + '"' + targetAttr + '>' +
          '<div class="corner-tl"></div><div class="corner-br"></div>' +
          '<span class="text-blueprint-cyan text-[32px] flex items-center">' + (i.icon === "instagram_svg" || i.icon === "facebook_svg" ? (i.icon === "instagram_svg" ? ICONS.instagram : ICONS.facebook).replace('width="24" height="24"', 'width="32" height="32"') : '<span class="material-symbols-outlined">' + i.icon + '</span>') + '</span>' +
          '<div><div class="font-label-caps text-label-caps text-outline">' + i.label + '</div>' +
          '<div class="font-body-md text-body-md text-on-surface truncate max-w-[200px]">' + esc(i.value) + '</div></div>' +
        '</a>'
      );
    }).join("");
    root.innerHTML = (
      '<p class="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-8">' + esc(c.note || "Let's build something together.") + '</p>' +
      '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">' + items + '</div>'
    );
  }

  function emptyState(msg) {
    return '<p class="font-label-caps text-label-caps text-outline opacity-70">' + esc(msg) + '</p>';
  }

  /* ------------------------------- NAV ---------------------------------- */
  function setupNav() {
    var toggle = el("nav-toggle"), menu = el("mobile-menu");
    if (toggle && menu) {
      toggle.addEventListener("click", function () {
        menu.classList.toggle("hidden");
      });
      menu.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () { menu.classList.add("hidden"); });
      });
    }
    var sections = document.querySelectorAll("main section[id]");
    var navLinks = document.querySelectorAll("[data-nav-link]");
    if ("IntersectionObserver" in window && sections.length) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var id = entry.target.getAttribute("id");
            navLinks.forEach(function (l) {
              var active = l.getAttribute("href") === "#" + id;
              l.classList.toggle("text-blueprint-cyan", active);
              l.classList.toggle("border-b-2", active);
              l.classList.toggle("border-blueprint-cyan", active);
              l.classList.toggle("font-bold", active);
              l.classList.toggle("text-on-surface-variant", !active);
            });
          }
        });
      }, { rootMargin: "-45% 0px -50% 0px" });
      sections.forEach(function (s) { obs.observe(s); });
    }
  }

  function setYear() {
    var y = el("year"); if (y) y.textContent = new Date().getFullYear();
    var t = el("doc-title"); if (t && P.profile) t.textContent = (P.profile.name || "Portfolio") + " — Developer Portfolio";
  }

  /* ------------------------------- INIT --------------------------------- */
  async function init() {
    console.log('🚀 Portfolio initializing...')
    
    // Fetch dynamic content from Supabase
    if (isSupabaseAvailable()) {
      console.log('📡 Fetching content from Supabase...')
      try {
        const [projects, certificates] = await Promise.all([
          fetchProjects(),
          fetchCertificates()
        ])
        
        if (projects) {
          dynamicProjects = projects
          console.log(`✅ Loaded ${projects.length} projects from Supabase`)
        }
        
        if (certificates) {
          dynamicCertificates = certificates
          console.log(`✅ Loaded ${certificates.length} certificates from Supabase`)
        }
      } catch (error) {
        console.error('❌ Error loading dynamic content:', error)
      }
    }

    // Render all sections
    renderHero();
    renderAbout();
    renderJourney();
    renderSkills();
    renderProjects();
    renderExperience();
    renderEducation();
    renderCertificates();
    renderAchievements();
    renderContact();
    setupNav();
    setYear();
    
    console.log('✅ Portfolio ready!')
  }

  /* ------------------------------ MEDIA MODAL (POP-OUT) ------------------ */
  function buildModal() {
    if (document.getElementById('media-modal')) return
    var m = document.createElement('div')
    m.id = 'media-modal'
    m.className = 'media-modal'
    m.innerHTML =
      '<div class="media-modal-box">' +
        '<button type="button" id="media-modal-close" class="media-modal-close">CLOSE ✕</button>' +
        '<div id="media-modal-body" class="media-modal-body"></div>' +
      '</div>'
    m.addEventListener('click', function (e) {
      if (e.target === m) closeMediaModal()
    })
    document.body.appendChild(m)
    document.getElementById('media-modal-close').addEventListener('click', closeMediaModal)
  }

  function openMediaModal(rawUrl, type) {
    // Validasi scheme: hanya http(s) yang boleh masuk modal (anti javascript:)
    var url = String(rawUrl == null ? "" : rawUrl).trim();
    if (!/^(https?:)?\/\//i.test(url)) return;
    buildModal()
    var m = document.getElementById('media-modal')
    var body = document.getElementById('media-modal-body')
    var inner = ''
    if (type === 'video') {
      inner = '<video controls autoplay src="' + esc(url) + '"></video>'
    } else if (type === 'pdf') {
      inner = '<iframe src="' + esc(url) + '#toolbar=0&navpanes=0&view=FitH" title="PDF"></iframe>'
    } else {
      inner = '<img alt="" src="' + esc(url) + '">'
    }
    body.innerHTML = inner
    m.classList.add('is-open')
    document.body.style.overflow = 'hidden'
  }

  function closeMediaModal() {
    var m = document.getElementById('media-modal')
    if (!m) return
    m.classList.remove('is-open')
    var body = document.getElementById('media-modal-body')
    if (body) body.innerHTML = '' // stop video playback
    document.body.style.overflow = ''
  }

  // Klik preview image ATAU tombol VIEW -> buka modal; ESC tutup
  document.addEventListener('click', function (e) {
    var trigger = e.target.closest && e.target.closest('[data-media]')
    if (trigger && trigger.dataset.media) { openMediaModal(trigger.dataset.media, trigger.dataset.type); return }
  })
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMediaModal()
  })

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
