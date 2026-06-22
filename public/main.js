'use strict';

// GitHub language colors
const LANG_COLORS = {
  'C++':        '#f34b7d',
  'C':          '#555555',
  'JavaScript': '#f1e05a',
  'TypeScript': '#3178c6',
  'Python':     '#3572A5',
  'Rust':       '#dea584',
  'Go':         '#00ADD8',
  'Java':       '#b07219',
  'C#':         '#178600',
  'GLSL':       '#5686a5',
  'HLSL':       '#aace60',
  'GDScript':   '#355570',
  'CMake':      '#DA3434',
  'Assembly':   '#6E4C13',
  'Shell':      '#89e051',
};

const ICONS = {
  email:    `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
  github:   `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.741 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>`,
  linkedin: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`,
  extArrow: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg>`,
  star:     `<svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/></svg>`,
};

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ── Section renderers ────────────────────────────────────────

function renderHero(hero) {
  const el = document.querySelector('#hero .hero-content');
  if (!el) return;
  el.innerHTML = `
    <p class="hero-eyebrow">${escapeHtml(hero.eyebrow)}</p>
    <h1 class="hero-name">${escapeHtml(hero.name)}<span class="cursor" aria-hidden="true">_</span></h1>
    <p class="hero-tagline">${escapeHtml(hero.tagline)}</p>
    <div class="hero-links">
      <a class="btn btn-primary" href="mailto:${escapeHtml(hero.email)}">
        ${ICONS.email} Email
      </a>
      <a class="btn btn-secondary" href="${escapeHtml(hero.github)}" target="_blank" rel="noopener noreferrer">
        ${ICONS.github} GitHub
      </a>
      <a class="btn btn-secondary" href="${escapeHtml(hero.linkedin)}" target="_blank" rel="noopener noreferrer">
        ${ICONS.linkedin} LinkedIn
      </a>
    </div>
  `;
}

function renderAbout(about) {
  const el = document.querySelector('#about .container');
  if (!el) return;
  const paras = about.paragraphs
    .map((p, i) => `<p class="about-text"${i > 0 ? ' style="margin-top:1.25rem;"' : ''}>${p}</p>`)
    .join('');
  el.innerHTML = `
    <span class="section-label">${escapeHtml(about.label)}</span>
    <h2 class="section-title">${escapeHtml(about.title)}</h2>
    ${paras}
  `;
}

function renderProjects(projects) {
  const el = document.querySelector('#projects .container');
  if (!el) return;
  const cards = projects.items.map(p => `
    <article class="project-card">
      <div class="project-meta">
        <span class="project-period">${escapeHtml(p.period)}</span>
        <span class="project-team">${escapeHtml(p.team)}</span>
      </div>
      <h3 class="project-title">${escapeHtml(p.title)}</h3>
      <p class="project-desc">${p.desc}</p>
      <div class="project-tags">
        ${p.tags.map(t => `<span class="project-tag">${escapeHtml(t)}</span>`).join('')}
      </div>
      <a class="project-link" href="${escapeHtml(p.link)}" target="_blank" rel="noopener noreferrer">
        View on GitHub ${ICONS.extArrow}
      </a>
    </article>
  `).join('');
  el.innerHTML = `
    <span class="section-label">${escapeHtml(projects.label)}</span>
    <h2 class="section-title">${escapeHtml(projects.title)}</h2>
    <div class="projects-grid">${cards}</div>
  `;
}

function renderSkills(skills) {
  const el = document.querySelector('#skills .container');
  if (!el) return;
  const groups = skills.groups.map(g => `
    <div class="skill-group">
      <p class="skill-group-title">${escapeHtml(g.name)}</p>
      <div class="skill-tags">
        ${g.tags.map(t => `<span class="skill-tag">${escapeHtml(t)}</span>`).join('')}
      </div>
    </div>
  `).join('');
  el.innerHTML = `
    <span class="section-label">${escapeHtml(skills.label)}</span>
    <h2 class="section-title">${escapeHtml(skills.title)}</h2>
    <div class="skills-grid">${groups}</div>
  `;
}

function renderExperience(experience) {
  const el = document.querySelector('#experience .container');
  if (!el) return;
  const items = experience.items.map(item => {
    const panel = `
      <div class="tl-panel">
        <p class="tl-period">${escapeHtml(item.period)}</p>
        <h3 class="tl-title">${escapeHtml(item.title)}</h3>
        <p class="tl-org">${escapeHtml(item.org)}</p>
        <p class="tl-desc">${item.desc}</p>
      </div>`;
    const cardSide  = `<div class="tl-side tl-side--card">${panel}</div>`;
    const emptySide = `<div class="tl-side tl-side--empty"></div>`;
    const mid       = `<div class="tl-mid"><div class="tl-dot"></div></div>`;
    return i % 2 === 0
      ? `<div class="tl-item tl-item--left">${cardSide}${mid}${emptySide}</div>`
      : `<div class="tl-item tl-item--right">${emptySide}${mid}${cardSide}</div>`;
  }).join('');
  el.innerHTML = `
    <span class="section-label">${escapeHtml(experience.label)}</span>
    <h2 class="section-title">${escapeHtml(experience.title)}</h2>
    <div class="timeline-wrap">${items}</div>
  `;
}

function renderRepos(repos) {
  const el = document.querySelector('#repos .container');
  if (!el) return;
  el.innerHTML = `
    <span class="section-label">${escapeHtml(repos.label)}</span>
    <h2 class="section-title">${escapeHtml(repos.title)}</h2>
    <div class="repos-grid" id="repos-grid">
      <p class="repos-loading">Loading repositories…</p>
    </div>
  `;
}

function renderContact(contact) {
  const el = document.querySelector('#contact .contact-inner');
  if (!el) return;
  const githubDisplay = escapeHtml(contact.github.replace('https://', ''));
  el.innerHTML = `
    <span class="section-label">${escapeHtml(contact.label)}</span>
    <h2 class="section-title">${escapeHtml(contact.title)}</h2>
    <p class="contact-text">${escapeHtml(contact.text)}</p>
    <div class="contact-links">
      <a class="btn btn-primary" href="mailto:${escapeHtml(contact.email)}">
        ${ICONS.email} ${escapeHtml(contact.email)}
      </a>
      <a class="btn btn-secondary" href="${escapeHtml(contact.github)}" target="_blank" rel="noopener noreferrer">
        ${ICONS.github} ${githubDisplay}
      </a>
      <a class="btn btn-secondary" href="${escapeHtml(contact.linkedin)}" target="_blank" rel="noopener noreferrer">
        ${ICONS.linkedin} LinkedIn
      </a>
    </div>
  `;
}

function renderFooter(text) {
  const el = document.querySelector('footer');
  if (!el) return;
  el.innerHTML = `<p>${escapeHtml(text)}</p>`;
}

// ── GitHub repos ─────────────────────────────────────────────

function buildRepoCard(repo) {
  const card = document.createElement('a');
  card.className = 'repo-card';
  card.href = repo.html_url;
  card.target = '_blank';
  card.rel = 'noopener noreferrer';
  card.setAttribute('aria-label', repo.name + ' on GitHub');

  const color = LANG_COLORS[repo.language] || '#7b7d92';
  const desc  = repo.description ? escapeHtml(repo.description) : '<em>No description.</em>';
  const lang  = repo.language ? escapeHtml(repo.language) : '';

  const langHtml = lang
    ? `<span class="repo-lang"><span class="lang-dot" style="background:${color}" aria-hidden="true"></span>${lang}</span>`
    : '';

  card.innerHTML = `
    <div class="repo-name">${escapeHtml(repo.name)}</div>
    <div class="repo-desc">${desc}</div>
    <div class="repo-footer">
      ${langHtml}
      <span class="repo-stars">${ICONS.star} ${repo.stargazers_count}</span>
    </div>
  `;
  return card;
}

async function loadRepos(githubUser) {
  const grid = document.getElementById('repos-grid');
  if (!grid) return;

  try {
    const res = await fetch(`https://api.github.com/users/${githubUser}/repos?sort=updated&per_page=12`);
    if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
    const repos = await res.json();

    if (!Array.isArray(repos) || repos.length === 0) {
      grid.innerHTML = '<p class="repos-empty">No public repositories yet — check back soon.</p>';
      return;
    }

    const fragment = document.createDocumentFragment();
    repos.forEach(repo => fragment.appendChild(buildRepoCard(repo)));
    grid.innerHTML = '';
    grid.appendChild(fragment);
  } catch (_err) {
    grid.innerHTML = `<p class="repos-error">Couldn't reach the GitHub API right now. <a href="https://github.com/${githubUser}" target="_blank" rel="noopener noreferrer">Browse repos on GitHub →</a></p>`;
  }
}

// ── UI init (runs against static HTML immediately) ───────────

(function initNav() {
  const nav = document.getElementById('site-nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

(function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.getElementById('nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    links.classList.toggle('open', !isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      links.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && links.classList.contains('open')) {
      toggle.setAttribute('aria-expanded', 'false');
      links.classList.remove('open');
      document.body.style.overflow = '';
      toggle.focus();
    }
  });
})();

(function initThemePicker() {
  const btn  = document.getElementById('theme-btn');
  const menu = document.getElementById('theme-menu');
  if (!btn || !menu) return;

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    menu.querySelectorAll('.theme-opt').forEach(opt => {
      opt.setAttribute('aria-checked', opt.dataset.theme === theme ? 'true' : 'false');
    });
  }

  applyTheme(document.documentElement.getAttribute('data-theme') || 'dark');

  function openMenu()  { menu.hidden = false; btn.setAttribute('aria-expanded', 'true');  menu.querySelector('[aria-checked="true"]')?.focus(); }
  function closeMenu() { menu.hidden = true;  btn.setAttribute('aria-expanded', 'false'); }

  btn.addEventListener('click', e => { e.stopPropagation(); menu.hidden ? openMenu() : closeMenu(); });
  menu.querySelectorAll('.theme-opt').forEach(opt => {
    opt.addEventListener('click', () => { applyTheme(opt.dataset.theme); closeMenu(); btn.focus(); });
  });
  document.addEventListener('click', e => { if (!e.target.closest('#theme-picker')) closeMenu(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !menu.hidden) { closeMenu(); btn.focus(); } });
})();

// ── Bootstrap ────────────────────────────────────────────────

async function init() {
  const res  = await fetch('data.json');
  const data = await res.json();

  renderHero(data.hero);
  renderAbout(data.about);
  renderProjects(data.projects);
  renderSkills(data.skills);
  renderExperience(data.experience);
  renderRepos(data.repos);
  renderContact(data.contact);
  renderFooter(data.footer);

  loadRepos(data.hero.githubUser);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
