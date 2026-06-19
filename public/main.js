'use strict';

const GITHUB_USER = 'katlong0709';

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

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildRepoCard(repo) {
  const card = document.createElement('a');
  card.className = 'repo-card';
  card.href = repo.html_url;
  card.target = '_blank';
  card.rel = 'noopener noreferrer';
  card.setAttribute('aria-label', repo.name + ' on GitHub');

  const color = LANG_COLORS[repo.language] || '#7b7d92';
  const desc = repo.description ? escapeHtml(repo.description) : '<em>No description.</em>';
  const lang = repo.language ? escapeHtml(repo.language) : '';
  const stars = repo.stargazers_count;

  const langHtml = lang
    ? `<span class="repo-lang">
         <span class="lang-dot" style="background:${color}" aria-hidden="true"></span>
         ${lang}
       </span>`
    : '';

  const starIcon = `<svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/>
  </svg>`;

  card.innerHTML = `
    <div class="repo-name">${escapeHtml(repo.name)}</div>
    <div class="repo-desc">${desc}</div>
    <div class="repo-footer">
      ${langHtml}
      <span class="repo-stars">${starIcon} ${stars}</span>
    </div>
  `;

  return card;
}

async function loadRepos() {
  const grid = document.getElementById('repos-grid');
  if (!grid) return;

  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=12`
    );
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
    grid.innerHTML = `<p class="repos-error">Couldn't reach the GitHub API right now. <a href="https://github.com/${GITHUB_USER}" target="_blank" rel="noopener noreferrer">Browse repos on GitHub →</a></p>`;
  }
}

// Sticky nav border on scroll
(function initNav() {
  const nav = document.getElementById('site-nav');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// Mobile nav toggle
(function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.getElementById('nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    links.classList.toggle('open', !isOpen);
    document.body.style.overflow = isOpen ? '' : 'hidden';
  });

  // Close on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.setAttribute('aria-expanded', 'false');
      links.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && links.classList.contains('open')) {
      toggle.setAttribute('aria-expanded', 'false');
      links.classList.remove('open');
      document.body.style.overflow = '';
      toggle.focus();
    }
  });
})();

// Load repos on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadRepos);
} else {
  loadRepos();
}
