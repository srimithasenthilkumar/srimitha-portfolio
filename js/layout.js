/* Shared layout: navbar, footer, icons, reveal animations. Loaded on every page. */
const PROFILE = {
  name: "Srimitha Senthilkumar",
  email: "srimithasenthilkumar222@gmail.com",
  github: "https://github.com/srimithasenthilkumar",
  linkedin: "https://www.linkedin.com/in/srimitha-s-5b470832b/",
};

const NAV = [
  ["Home", "home.html", "home"],
  ["Education", "education.html", "education"],
  ["Experience", "experience.html", "experience"],
  ["Projects", "projects.html", "projects"],
  ["Open Source", "opensource.html", "opensource"],
  ["Contact Me", "contact.html", "contact"],
];

/* Lucide-style icons (inline SVG paths) */
const ICON_PATHS = {
  github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
  linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
  mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
  menu: '<line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  arrowUp: '<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>',
  arrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  arrowUpRight: '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
  heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
  star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  fork: '<circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9"/><path d="M12 12v3"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  external: '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
  alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  book: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  code: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
  layout: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>',
  server: '<rect width="20" height="8" x="2" y="2" rx="2"/><rect width="20" height="8" x="2" y="14" rx="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/>',
  database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/>',
  phone: '<rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 18h.01"/>',
  wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  cloud: '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>',
  api: '<path d="M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2"/><path d="m6 17 3.13-5.78c.53-.97.1-2.18-.5-3.1a4 4 0 1 1 6.89-4.06"/><path d="m12 6 3.13 5.73C15.66 12.7 16.9 13 18 13a4 4 0 0 1 0 8"/>',
  grad: '<path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/>',
  briefcase: '<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/><rect width="20" height="14" x="2" y="6" rx="2"/>',
  calendar: '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>',
  award: '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>',
  pin: '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  sparkles: '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>',
  folder: '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/><circle cx="12" cy="13" r="2"/>',
  branch: '<line x1="6" x2="6" y1="3" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>',
};

function icon(name, cls = "i") {
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON_PATHS[name]}</svg>`;
}

function socialsHTML(extra = "") {
  return `<div class="socials ${extra}">
    <a class="social" href="${PROFILE.github}" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub">${icon("github")}</a>
    <a class="social" href="${PROFILE.linkedin}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">${icon("linkedin")}</a>
    <a class="social" href="mailto:${PROFILE.email}" aria-label="Email" title="Email">${icon("mail")}</a>
  </div>`;
}

function renderNav(active) {
  const links = NAV.map(([label, href, id]) =>
    `<a class="nav-link${id === "contact" ? " contact" : ""}${id === active ? " active" : ""}" href="${href}"${id === active ? ' aria-current="page"' : ""}>${label}</a>`
  ).join("");
  const mobile = NAV.map(([label, href, id], i) =>
    `<li><a class="${id === active ? "active" : ""}" href="${href}">${label}<small>0${i + 1}</small></a></li>`
  ).join("");
  return `<header class="nav">
    <div class="container nav-inner">
      <a class="logo" href="home.html"><span class="logo-mark">SS</span><span class="logo-name">Srimitha</span></a>
      <nav class="nav-links" aria-label="Primary">${links}</nav>
      <button class="menu-btn" type="button" aria-label="Open menu" aria-expanded="false">${icon("menu")}</button>
    </div>
    <div class="mobile-menu"><div><ul>${mobile}</ul></div></div>
  </header>`;
}

function renderFooter() {
  const links = NAV.map(([label, href]) => `<a href="${href}">${label}</a>`).join("");
  return `<footer class="footer"><div class="container">
    <div class="footer-top">
      <div>
        <p class="name">${PROFILE.name}</p>
        <p class="tag-line">Full Stack Developer · B.Tech IT at SKCET · Tamil Nadu, India</p>
        ${socialsHTML("sm")}
      </div>
      <nav aria-label="Footer">${links}</nav>
    </div>
    <div class="footer-bottom">
      <div>
        <p class="made">Made with ${icon("heart")} by ${PROFILE.name}</p>
        <p class="copyright">© ${new Date().getFullYear()} ${PROFILE.name}. All rights reserved.</p>
      </div>
      <button class="top-btn" type="button" id="back-to-top">Back to top ${icon("arrowUp")}</button>
    </div>
  </div></footer>`;
}

function initLayout() {
  const page = document.body.dataset.page;
  document.getElementById("nav-root").outerHTML = renderNav(page);
  document.getElementById("footer-root").outerHTML = renderFooter();

  const btn = document.querySelector(".menu-btn");
  const menu = document.querySelector(".mobile-menu");
  btn.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    btn.innerHTML = icon(open ? "x" : "menu");
  });
  document.getElementById("back-to-top").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  document.querySelectorAll("[data-socials]").forEach((el) => (el.outerHTML = socialsHTML(el.dataset.socials)));
  document.querySelectorAll("[data-icon]").forEach((el) => (el.outerHTML = icon(el.dataset.icon, el.dataset.cls || "i")));
  observeReveals();
}

const revealObserver = "IntersectionObserver" in window
  ? new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); revealObserver.unobserve(e.target); }
    }), { rootMargin: "0px 0px -60px 0px" })
  : null;

function observeReveals(root = document) {
  root.querySelectorAll(".reveal:not(.in)").forEach((el, i) => {
    if (el.dataset.delay) el.style.transitionDelay = el.dataset.delay + "s";
    if (revealObserver) revealObserver.observe(el); else el.classList.add("in");
  });
}

document.addEventListener("DOMContentLoaded", initLayout);
