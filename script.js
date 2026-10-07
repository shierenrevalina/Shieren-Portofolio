// ===== Tahun otomatis =====
document.getElementById("year").textContent = new Date().getFullYear();

const root = document.documentElement;

// ===== Sidebar mobile =====
const sidebar = document.getElementById("sidebar");
const menuFab = document.getElementById("menuFab");
const overlay = document.getElementById("sidebarOverlay");

function openSidebar() {
  sidebar.classList.add("open");
  overlay.classList.add("show");
}
function closeSidebar() {
  sidebar.classList.remove("open");
  overlay.classList.remove("show");
}
menuFab.addEventListener("click", openSidebar);
overlay.addEventListener("click", closeSidebar);

// ===== Navigasi: highlight aktif + tutup sidebar saat klik =====
const sideNav = document.getElementById("sideNav");
const navAnchors = sideNav.querySelectorAll("a");
const sections = document.querySelectorAll("section[id]");

navAnchors.forEach((a) => a.addEventListener("click", closeSidebar));

const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navAnchors.forEach((a) => {
          a.classList.toggle("active", a.getAttribute("href") === "#" + id);
        });
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
sections.forEach((s) => spy.observe(s));

// ===== Back to top =====
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  backToTop.classList.toggle("show", window.scrollY > 400);
});

// ===== Filter portfolio =====
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    projectCards.forEach((card) => {
      const match = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hide", !match);
    });
  });
});

// ===== Skill bar animasi =====
const skillBars = document.querySelectorAll(".skill-bar i");
const skillObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.width = (entry.target.dataset.level || 0) + "%";
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);
skillBars.forEach((bar) => skillObserver.observe(bar));

// ===== Reveal on scroll =====
const revealTargets = document.querySelectorAll(
  ".block-head, .about-p, .fact, .skill, .project-card, .contact-card, .contact-lead, .hero"
);
revealTargets.forEach((el) => el.classList.add("reveal"));
const revealObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealTargets.forEach((el) => revealObserver.observe(el));

// ===== Tema: light default, dark opsional =====
const themeToggle = document.getElementById("themeToggle");
applyTheme(localStorage.getItem("theme") || "light");

themeToggle.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  applyTheme(next);
  localStorage.setItem("theme", next);
});

function applyTheme(theme) {
  if (theme === "dark") {
    root.setAttribute("data-theme", "dark");
    themeToggle.textContent = "☀️";
  } else {
    root.removeAttribute("data-theme");
    themeToggle.textContent = "🌙";
  }
}

// ===== Bahasa: ID / EN =====
const langToggle = document.getElementById("langToggle");
const i18nEls = document.querySelectorAll("[data-id][data-en]");

applyLang(localStorage.getItem("lang") || "id");

langToggle.addEventListener("click", () => {
  const next = (localStorage.getItem("lang") || "id") === "id" ? "en" : "id";
  applyLang(next);
  localStorage.setItem("lang", next);
});

function applyLang(lang) {
  i18nEls.forEach((el) => {
    const text = lang === "en" ? el.dataset.en : el.dataset.id;
    if (text != null) el.textContent = text;
  });
  // Tombol menampilkan bahasa yang akan dituju berikutnya
  langToggle.textContent = lang === "id" ? "EN" : "ID";
  document.documentElement.lang = lang;
}

// =========================================================
// ANIMASI INTERAKTIF
// =========================================================

// ===== Stagger index untuk reveal (grup per container) =====
function assignStagger(selector) {
  document.querySelectorAll(selector).forEach((parent) => {
    parent
      .querySelectorAll(":scope > .reveal")
      .forEach((el, i) => el.style.setProperty("--i", i));
  });
}
assignStagger(".facts");
assignStagger(".project-grid");
assignStagger(".cert-grid");
assignStagger(".contact-grid");

// ===== Count-up angka pada facts =====
function animateCount(el) {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || "";
  const duration = 1100;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
    el.textContent = Math.round(eased * target) + suffix;
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = target + suffix;
  }
  requestAnimationFrame(tick);
}

const countEls = document.querySelectorAll(".fact strong[data-count]");
const countObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);
countEls.forEach((el) => countObserver.observe(el));

// ===== Pop berurutan untuk skill chip =====
const skillGroups = document.querySelectorAll(".skill-group");
const chipObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target
          .querySelectorAll(".skill-chip")
          .forEach((chip, i) => {
            setTimeout(() => chip.classList.add("pop"), i * 60);
          });
        obs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);
skillGroups.forEach((g) => chipObserver.observe(g));

// ===== Tilt 3D mengikuti kursor =====
const prefersReduced = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (!prefersReduced && window.matchMedia("(hover: hover)").matches) {
  const tiltCards = document.querySelectorAll(
    ".project-card, .cert-card, .contact-card, .fact"
  );
  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform =
        "perspective(700px) rotateX(" +
        (-py * 6).toFixed(2) +
        "deg) rotateY(" +
        (px * 6).toFixed(2) +
        "deg) translateY(-4px)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

// ===== Ripple pada tombol =====
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const r = btn.getBoundingClientRect();
    const size = Math.max(r.width, r.height);
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = e.clientX - r.left - size / 2 + "px";
    ripple.style.top = e.clientY - r.top - size / 2 + "px";
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// ===== Efek mengetik pada tagline (sesuai bahasa aktif) =====
const tagline = document.querySelector(".hero-tagline");
let typeTimer = null;

function typeTagline() {
  if (!tagline || prefersReduced) return;
  const lang = localStorage.getItem("lang") || "id";
  const full = (lang === "en" ? tagline.dataset.en : tagline.dataset.id) || "";
  clearTimeout(typeTimer);
  tagline.textContent = "";
  tagline.classList.add("typing");
  let i = 0;
  (function step() {
    tagline.textContent = full.slice(0, i);
    if (i < full.length) {
      i++;
      typeTimer = setTimeout(step, 45);
    } else {
      tagline.classList.remove("typing");
    }
  })();
}

// Jalankan saat halaman siap, dan ulangi tiap kali bahasa diganti
typeTagline();
if (typeof langToggle !== "undefined" && langToggle) {
  langToggle.addEventListener("click", () => {
    // applyLang sudah mengganti textContent; ketik ulang setelahnya
    setTimeout(typeTagline, 0);
  });
}

// =========================================================
// PERPINDAHAN SECTION YANG HALUS (smooth easing scroll)
// =========================================================
const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// Matikan smooth-scroll bawaan CSS supaya kita kendalikan sendiri
document.documentElement.style.scrollBehavior = "auto";

// easeInOutCubic — mulai pelan, cepat di tengah, melambat di akhir
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

let scrollAnim = null;

function smoothScrollTo(targetY, duration) {
  if (scrollAnim) cancelAnimationFrame(scrollAnim);
  const startY = window.scrollY;
  const diff = targetY - startY;
  if (Math.abs(diff) < 2) return Promise.resolve();

  // durasi menyesuaikan jarak: dekat = cepat, jauh = sedikit lebih lama
  const dist = Math.abs(diff);
  const dur =
    duration || Math.min(1100, Math.max(500, 400 + dist * 0.35));

  return new Promise((resolve) => {
    const start = performance.now();
    function step(now) {
      const p = Math.min((now - start) / dur, 1);
      window.scrollTo(0, startY + diff * easeInOutCubic(p));
      if (p < 1) {
        scrollAnim = requestAnimationFrame(step);
      } else {
        scrollAnim = null;
        resolve();
      }
    }
    scrollAnim = requestAnimationFrame(step);
  });
}

const SCROLL_PAD = 24; // selaras dengan scroll-padding-top

const inPageLinks = document.querySelectorAll('a[href^="#"]');

inPageLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    const id = link.getAttribute("href").slice(1);
    const target = id ? document.getElementById(id) : null;
    if (!target) return;

    e.preventDefault();
    history.replaceState(null, "", "#" + id);

    const targetY =
      target.getBoundingClientRect().top + window.scrollY - SCROLL_PAD;

    if (reducedMotion) {
      window.scrollTo(0, targetY);
      return;
    }

    // Sentuhan halus pada section tujuan tanpa menutupi layar
    target.classList.remove("section-focus");
    void target.offsetWidth;
    target.classList.add("section-focus");
    target.addEventListener(
      "animationend",
      () => target.classList.remove("section-focus"),
      { once: true }
    );

    smoothScrollTo(targetY);
  });
});

// =========================================================
// INTERAKTIF: reaksi ke kursor & scroll
// =========================================================
const canInteract = !reducedMotion;

// ===== Progress scroll =====
const scrollProgress = document.getElementById("scrollProgress");
function updateProgress() {
  const h = document.documentElement;
  const max = h.scrollHeight - h.clientHeight;
  const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
  if (scrollProgress) scrollProgress.style.width = pct + "%";
}
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

// ===== Spotlight glow mengikuti kursor pada kartu =====
if (window.matchMedia("(hover: hover)").matches) {
  document.querySelectorAll(".project-card, .cert-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
      card.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
    });
  });
}

// ===== Tombol magnetik =====
if (canInteract && window.matchMedia("(hover: hover)").matches) {
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const r = btn.getBoundingClientRect();
      const mx = e.clientX - r.left - r.width / 2;
      const my = e.clientY - r.top - r.height / 2;
      btn.style.transform =
        "translate(" + mx * 0.3 + "px," + my * 0.4 + "px)";
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
  });

  // ===== Hero title parallax mengikuti mouse =====
  const heroTitle = document.getElementById("heroTitle");
  const hero = document.getElementById("beranda");
  if (heroTitle && hero) {
    hero.addEventListener("mousemove", (e) => {
      const r = hero.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      heroTitle.style.transform =
        "perspective(800px) rotateX(" +
        (-py * 8).toFixed(2) +
        "deg) rotateY(" +
        (px * 10).toFixed(2) +
        "deg)";
    });
    hero.addEventListener("mouseleave", () => {
      heroTitle.style.transform = "";
    });
  }
}

// ===== Canvas partikel interaktif (full page) =====
(function bgParticles() {
  const canvas = document.getElementById("bgParticles");
  if (!canvas || reducedMotion) return;

  const ctx = canvas.getContext("2d");
  let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
  let particles = [];
  let stars = [];      // bintang berkelap-kelip
  let bursts = [];      // ledakan bintang saat klik
  const mouse = { x: -9999, y: -9999 };

  // Warna partikel: shocking pink (fix, tidak ikut tema)
  let color = "#fc0fc0";
  const COLOR_RGB = [252, 15, 192];      // pink partikel & burst
  const STAR_RGB = [255, 215, 240];      // bintang (dark): pink keputihan
  const SUN_RGB = [255, 196, 70];        // kilau matahari (light): keemasan

  // Tema aktif → menentukan bintang (dark) atau kilau matahari (light)
  function isDark() {
    return document.documentElement.getAttribute("data-theme") === "dark";
  }
  let darkMode = isDark();

  function resize() {
    w = window.innerWidth; h = window.innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    canvas.style.width = w + "px"; canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // kepadatan menyesuaikan luas layar, dibatasi agar tetap ringan
    const count = Math.min(120, Math.round((w * h) / 16000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.8 + 1,
    }));

    // bintang: lebih banyak, kecil, berkelap-kelip
    const starCount = Math.min(90, Math.round((w * h) / 22000));
    stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.3 + 0.6,
      base: Math.random() * 0.5 + 0.3,       // kecerahan dasar
      phase: Math.random() * Math.PI * 2,    // offset kedip
      speed: Math.random() * 0.03 + 0.01,    // kecepatan kedip
    }));
  }

  // Gambar bintang 4 titik (sparkle) di (x,y)
  function drawStar(x, y, size, alpha, rgb) {
    ctx.save();
    ctx.translate(x, y);
    ctx.globalAlpha = alpha;
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 2.2);
    grad.addColorStop(0, "rgba(" + rgb.join(",") + ",1)");
    grad.addColorStop(1, "rgba(" + rgb.join(",") + ",0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 0, size * 2.2, 0, Math.PI * 2);
    ctx.fill();
    // kilau 4 arah
    ctx.strokeStyle = "rgba(" + rgb.join(",") + "," + alpha + ")";
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(-size * 3, 0); ctx.lineTo(size * 3, 0);
    ctx.moveTo(0, -size * 3); ctx.lineTo(0, size * 3);
    ctx.stroke();
    ctx.restore();
  }

  // Klik di mana saja = ledakan bintang kecil
  window.addEventListener("click", (e) => {
    const n = 14;
    for (let i = 0; i < n; i++) {
      const ang = (Math.PI * 2 * i) / n + Math.random() * 0.4;
      const sp = Math.random() * 4 + 2;
      bursts.push({
        x: e.clientX,
        y: e.clientY,
        vx: Math.cos(ang) * sp,
        vy: Math.sin(ang) * sp,
        life: 1,
        size: Math.random() * 1.4 + 0.8,
      });
    }
    if (bursts.length > 300) bursts = bursts.slice(-300);
  });

  // canvas fixed = koordinat viewport, jadi pakai clientX/clientY langsung
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });
  window.addEventListener("mouseout", (e) => {
    if (!e.relatedTarget) { mouse.x = mouse.y = -9999; }
  });

  function hexToRgb(hex) {
    const m = hex.replace("#", "");
    const n = m.length === 3
      ? m.split("").map((c) => c + c).join("")
      : m;
    const int = parseInt(n, 16);
    return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const [cr, cg, cb] = hexToRgb(color.startsWith("#") ? color : "#2563eb");

    // ===== Bintang (dark) / kilau emas (light) berkelap-kelip + reaksi kursor =====
    const twinkleRGB = darkMode ? STAR_RGB : SUN_RGB;
    for (const s of stars) {
      s.phase += s.speed;
      let twinkle = s.base + Math.sin(s.phase) * 0.3;
      // di light mode kilauan dibuat lebih tegas agar terbaca di latar terang
      if (!darkMode) twinkle = Math.min(1, twinkle + 0.2);

      // dekat kursor jadi lebih terang & besar
      const dx = s.x - mouse.x;
      const dy = s.y - mouse.y;
      const dist = Math.hypot(dx, dy);
      let size = s.r;
      if (dist < 140) {
        const boost = (140 - dist) / 140;
        twinkle = Math.min(1, twinkle + boost * 0.6);
        size = s.r * (1 + boost * 1.6);
      }
      drawStar(s.x, s.y, size, Math.max(0, Math.min(1, twinkle)), twinkleRGB);
    }

    // ===== Ledakan bintang saat klik =====
    for (let i = bursts.length - 1; i >= 0; i--) {
      const b = bursts[i];
      b.x += b.vx;
      b.y += b.vy;
      b.vx *= 0.92;
      b.vy *= 0.92;
      b.life -= 0.02;
      if (b.life <= 0) { bursts.splice(i, 1); continue; }
      drawStar(b.x, b.y, b.size * b.life + 0.3, b.life, COLOR_RGB);
    }

    for (const p of particles) {
      // dorongan menjauh dari kursor
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 120) {
        const force = (120 - dist) / 120;
        p.vx += (dx / dist) * force * 0.6;
        p.vy += (dy / dist) * force * 0.6;
      }

      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.96; // gesekan agar melambat
      p.vy *= 0.96;

      // pantul di tepi
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      p.x = Math.max(0, Math.min(w, p.x));
      p.y = Math.max(0, Math.min(h, p.y));

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(" + cr + "," + cg + "," + cb + ",0.7)";
      ctx.fill();
    }

    // garis penghubung antar partikel yang berdekatan
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 110) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle =
            "rgba(" + cr + "," + cg + "," + cb + "," + (1 - d / 110) * 0.35 + ")";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);

  // Perbarui mode saat tema diganti (bintang <-> kilau matahari)
  const themeBtn = document.getElementById("themeToggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      setTimeout(() => { darkMode = isDark(); }, 50);
    });
  }

  resize();
  requestAnimationFrame(draw);
})();
