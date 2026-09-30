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
