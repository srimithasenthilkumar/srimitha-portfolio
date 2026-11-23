/* GitHub data for the Projects and Open Source pages (public API, no token). */
const GH_USER = "srimithasenthilkumar";
const GH_API = "https://api.github.com";
const CACHE_TTL = 10 * 60 * 1000;

const LANG_COLORS = {
  Java: "#b07219", JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5", Dart: "#00B4AB",
  HTML: "#e34c26", CSS: "#663399", "Jupyter Notebook": "#DA5B0B", Kotlin: "#A97BFF",
};

async function ghFetch(key, url) {
  try {
    const raw = sessionStorage.getItem(key);
    if (raw) {
      const { at, data } = JSON.parse(raw);
      if (Date.now() - at < CACHE_TTL) return data;
    }
  } catch (_) { /* storage unavailable */ }
  const res = await fetch(url, { headers: { Accept: "application/vnd.github+json" } });
  if (res.status === 403 || res.status === 429) throw new Error("GitHub's public API rate limit was reached. Please try again in a little while.");
  if (!res.ok) throw new Error(`GitHub request failed (${res.status}).`);
  const data = await res.json();
  try { sessionStorage.setItem(key, JSON.stringify({ at: Date.now(), data })); } catch (_) {}
  return data;
}

const fetchUser = () => ghFetch("gh-user", `${GH_API}/users/${GH_USER}`);
const fetchRepos = () => ghFetch("gh-repos", `${GH_API}/users/${GH_USER}/repos?sort=updated&per_page=100`);
const ownRepos = (repos) => repos.filter((r) => !r.fork && r.name.toLowerCase() !== GH_USER);
const prettyName = (n) => n.replace(/[-_]+/g, " ").trim();
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

function timeAgo(dateStr) {
  const s = (Date.now() - new Date(dateStr)) / 1000;
  const units = [["year", 31536000], ["month", 2592000], ["day", 86400], ["hour", 3600], ["minute", 60]];
  for (const [u, sec] of units) {
    const v = Math.floor(s / sec);
    if (v >= 1) return `${v} ${u}${v > 1 ? "s" : ""} ago`;
  }
  return "just now";
}

const LANG_WEIGHT = { Java: 6, TypeScript: 5, JavaScript: 5, Dart: 5, Python: 4, Kotlin: 4, "Jupyter Notebook": 3, HTML: 1, CSS: 1 };
const STRONG = ["system", "management", "application", "app", "chat", "spring", "react", "flutter", "mobile", "api", "backend", "full", "stack", "health", "order", "detection"];
const WEAK = ["task", "landing", "internship", "test", "demo"];

function relevance(r) {
  const n = `${r.name} ${(r.topics || []).join(" ")}`.toLowerCase();
  let s = LANG_WEIGHT[r.language] || 0;
  STRONG.forEach((k) => { if (n.includes(k)) s += 2; });
  WEAK.forEach((k) => { if (n.includes(k)) s -= 3; });
  if (r.description) s += 2;
  if (r.homepage) s += 2;
  if (!r.size) s -= 8;
  return s + r.stargazers_count * 2 + r.forks_count;
}

function errorHTML(message) {
  return `<div class="surface error-box">
    <div style="display:flex;gap:16px;align-items:flex-start">
      <span class="icon-sm" style="color:#fcd34d;background:rgba(252,211,77,.1)">${icon("alert")}</span>
      <div><b>Couldn't load live GitHub data</b><p>${esc(message)} You can still browse everything directly on GitHub.</p></div>
    </div>
    <div style="display:flex;gap:12px">
      <button class="btn btn-outline btn-sm" type="button" onclick="location.reload()">Retry</button>
      <a class="btn btn-primary btn-sm" href="${PROFILE.github}" target="_blank" rel="noopener noreferrer">${icon("github")} Open GitHub</a>
    </div>
  </div>`;
}

function skeletons(n, h = 220) {
  return `<div class="grid-3">${Array.from({ length: n }, () => `<div class="skeleton" style="height:${h}px"></div>`).join("")}</div>`;
}

/* ---------------- Projects page ---------------- */
function projectCard(r) {
  const badges = [...new Set([r.language, ...(r.topics || [])].filter(Boolean))];
  const tags = badges.map((b) => `<span class="tag">${b === r.language ? `<i class="lang-dot" style="background:${LANG_COLORS[b] || "#a1a1aa"}"></i>` : ""}${esc(b)}</span>`).join("");
  const demo = r.homepage ? `<a class="btn btn-primary btn-sm" href="${esc(r.homepage)}" target="_blank" rel="noopener noreferrer">${icon("external")} Live Demo</a>` : "";
  return `<article class="surface project reveal">
    <div class="top">
      <span class="gh">${icon("github")}</span>
      <div class="stats"><span title="Stars">${icon("star")} ${r.stargazers_count}</span><span title="Forks">${icon("fork")} ${r.forks_count}</span></div>
    </div>
    <h3>${esc(prettyName(r.name))}</h3>
    <p class="desc${r.description ? "" : " none"}">${r.description ? esc(r.description) : "No description added on GitHub yet."}</p>
    ${tags ? `<div class="tags">${tags}</div>` : ""}
    <div class="bottom">
      <p class="updated">${icon("clock")} Updated ${timeAgo(r.pushed_at || r.updated_at)}</p>
      <div class="btns">
        <a class="btn btn-outline btn-sm" href="${esc(r.html_url)}" target="_blank" rel="noopener noreferrer">${icon("github")} View on GitHub</a>
        ${demo}
      </div>
    </div>
  </article>`;
}

async function initProjects() {
  const root = document.getElementById("projects-root");
  root.innerHTML = skeletons(6);
  try {
    const repos = ownRepos(await fetchRepos()).sort((a, b) => relevance(b) - relevance(a) || new Date(b.pushed_at) - new Date(a.pushed_at));
    root.innerHTML = repos.length ? `<div class="grid-3">${repos.map(projectCard).join("")}</div>` : errorHTML("No public repositories were found.");
    observeReveals(root);
  } catch (e) {
    root.innerHTML = errorHTML(e.message);
  }
}

/* ---------------- Open Source page ---------------- */
function statCard(ic, label, value) {
  return `<div class="surface stat hover-lift">${icon(ic)}<p class="num">${value}</p><p>${label}</p></div>`;
}

function languagesHTML(repos) {
  const map = {};
  repos.forEach((r) => { if (r.language) map[r.language] = (map[r.language] || 0) + 1; });
  const langs = Object.entries(map).sort((a, b) => b[1] - a[1]);
  const total = langs.reduce((s, [, c]) => s + c, 0);
  if (!total) return `<p class="hint">No language data available.</p>`;
  const bar = langs.map(([n, c]) => `<span title="${esc(n)}" style="width:${(c / total) * 100}%;background:${LANG_COLORS[n] || "#a1a1aa"}"></span>`).join("");
  const list = langs.map(([n, c]) => `<li><span><i class="lang-dot" style="width:10px;height:10px;background:${LANG_COLORS[n] || "#a1a1aa"}"></i>${esc(n)}</span><span>${c} ${c === 1 ? "repo" : "repos"} · ${Math.round((c / total) * 100)}%</span></li>`).join("");
  return `<div class="lang-bar">${bar}</div><ul class="lang-list" style="margin-top:12px">${list}</ul>`;
}

function recentHTML(repos) {
  return [...repos].sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at)).slice(0, 5).map((r) =>
    `<li><a href="${esc(r.html_url)}" target="_blank" rel="noopener noreferrer"><span style="min-width:0"><span class="nm">${esc(prettyName(r.name))}</span><small>${esc(r.language || "—")}</small></span><small style="flex-shrink:0">${timeAgo(r.pushed_at)}</small></a></li>`
  ).join("");
}

async function loadContributions() {
  const box = document.getElementById("contrib-body");
  const totalEl = document.getElementById("contrib-total");
  try {
    const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${GH_USER}?y=last`);
    if (!res.ok) throw new Error();
    const data = await res.json();
    const days = data.contributions || [];
    const cells = [...Array(new Date(days[0].date).getDay()).fill(null), ...days];
    let html = "";
    for (let i = 0; i < cells.length; i += 7) {
      html += `<div class="wk">${cells.slice(i, i + 7).map((d) => d ? `<span class="l${d.level}" title="${d.count} contribution${d.count === 1 ? "" : "s"} on ${d.date}"></span>` : `<span></span>`).join("")}</div>`;
    }
    totalEl.innerHTML = `<b>${data.total?.lastYear ?? 0}</b> contributions in the last year`;
    box.innerHTML = `<div class="heat-wrap"><div class="heat">${html}</div>
      <div class="legend">Less <span class="l0"></span><span class="l1"></span><span class="l2"></span><span class="l3"></span><span class="l4"></span> More</div></div>`;
  } catch (_) {
    box.innerHTML = `<p class="hint" style="margin-top:24px;color:var(--muted)">Contribution activity is unavailable right now. See it on the GitHub profile.</p>`;
  }
}

async function initOpenSource() {
  const root = document.getElementById("opensource-root");
  root.innerHTML = skeletons(4, 160);
  try {
    const [user, all] = await Promise.all([fetchUser(), fetchRepos()]);
    const repos = ownRepos(all);
    const stars = repos.reduce((s, r) => s + r.stargazers_count, 0);
    const forks = repos.reduce((s, r) => s + r.forks_count, 0);
    root.innerHTML = `<div class="stack">
      <div class="surface profile-strip reveal">
        <div class="who"><img src="${esc(user.avatar_url)}" alt="GitHub avatar of Srimitha Senthilkumar" loading="lazy">
          <div><p style="font:700 18px var(--display)">${esc(user.name || user.login)}</p><p style="font-size:14px;color:var(--muted)">@${esc(user.login)}</p></div></div>
        <div class="btns">
          <a class="star-cta" href="${PROFILE.github}" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8L12 2.5z"/></svg>Star me on GitHub</a>
          <a class="btn btn-primary btn-sm" href="${PROFILE.github}" target="_blank" rel="noopener noreferrer">${icon("github")} GitHub Profile ${icon("arrowUpRight")}</a>
        </div>
      </div>
      <div class="stats-4 reveal">
        ${statCard("book", "Public repositories", user.public_repos)}
        ${statCard("star", "Total stars (own repos)", stars)}
        ${statCard("fork", "Total forks (own repos)", forks)}
        ${statCard("users", "Followers", user.followers)}
      </div>
      <div class="surface panel reveal">
        <div class="contrib-head"><div><h2>Contribution activity</h2><p class="hint">Public contributions over the last 12 months</p></div><p class="total" id="contrib-total"></p></div>
        <div id="contrib-body"><div class="skeleton" style="height:110px;margin-top:24px"></div></div>
      </div>
      <div class="grid-2">
        <div class="surface panel reveal"><h2>Languages used</h2><p class="hint">Share of public repositories by primary language</p>${languagesHTML(repos)}</div>
        <div class="surface panel reveal"><h2>Recently updated</h2><p class="hint">Latest pushes to public repositories</p><ul class="recent" style="margin-top:12px">${recentHTML(repos)}</ul></div>
      </div>
    </div>`;
    observeReveals(root);
    loadContributions();
  } catch (e) {
    root.innerHTML = errorHTML(e.message);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("projects-root")) initProjects();
  if (document.getElementById("opensource-root")) initOpenSource();
});
