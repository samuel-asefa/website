/**
 * GitHub Activity section (homepage), in the original card layout.
 *
 * Data: the public GitHub REST API (60 unauthenticated requests per hour
 * per visitor IP) and a third-party contributions API
 * (github-contributions-api.jogruber.de). Responses are cached for 30 minutes
 * in sessionStorage. On failure or rate limiting the cards say so and link
 * to GitHub; numbers are never estimated.
 */
interface User {
  login: string;
  name: string | null;
  bio: string | null;
  location: string | null;
  avatar_url: string;
  public_repos: number;
  followers: number;
  created_at: string;
}
interface Repo {
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
}
interface Day {
  date: string;
  count: number;
  level: number;
}
interface Contributions {
  total?: { lastYear?: number };
  contributions: Day[];
}

const TTL = 30 * 60 * 1000;
const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6', JavaScript: '#f1e05a', Python: '#3572A5', HTML: '#e34c26', CSS: '#563d7c',
  'C++': '#f34b7d', Java: '#b07219', 'C#': '#178600', Swift: '#F05138', Go: '#00ADD8', Svelte: '#ff3e00',
  Astro: '#ff5a03', C: '#555555', Rust: '#dea584', Kotlin: '#A97BFF', Dart: '#00B4AB', Shell: '#89e051',
};

class LimitError extends Error {}

const cached = async <T>(key: string, url: string): Promise<T> => {
  try {
    const raw = sessionStorage.getItem(key);
    if (raw) {
      const { t, v } = JSON.parse(raw) as { t: number; v: T };
      if (Date.now() - t < TTL) return v;
    }
  } catch {
    /* storage unavailable */
  }
  const res = await fetch(url);
  if (res.status === 403 || res.status === 429) throw new LimitError('rate limited');
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const v = (await res.json()) as T;
  try {
    sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), v }));
  } catch {
    /* ignore */
  }
  return v;
};

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
const fmt = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n));

const statsCards = (user: User, repos: Repo[], profile: string): string => {
  const own = repos.filter((r) => !r.fork);
  const stars = own.reduce((s, r) => s + (r.stargazers_count || 0), 0);
  const forks = own.reduce((s, r) => s + (r.forks_count || 0), 0);
  const counts = new Map<string, number>();
  own.forEach((r) => r.language && counts.set(r.language, (counts.get(r.language) ?? 0) + 1));
  const top = [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
  const total = top.reduce((s, [, c]) => s + c, 0) || 1;
  const since = new Date(user.created_at).getFullYear();
  const years = new Date().getFullYear() - since + 1;
  return `
<a href="${profile}" target="_blank" rel="noopener" class="gh-stat-card">
  <div class="gh-card-header"><i class="fab fa-github gh-icon" aria-hidden="true"></i><span class="gh-card-title">GitHub Stats</span></div>
  <div class="gh-metrics">
    <div class="gh-metric"><span class="gh-metric-val">${fmt(user.public_repos)}</span><span class="gh-metric-label">Repos</span></div>
    <div class="gh-metric"><span class="gh-metric-val">${fmt(stars)}</span><span class="gh-metric-label">Stars</span></div>
    <div class="gh-metric"><span class="gh-metric-val">${fmt(user.followers)}</span><span class="gh-metric-label">Followers</span></div>
    <div class="gh-metric"><span class="gh-metric-val">${fmt(forks)}</span><span class="gh-metric-label">Forks</span></div>
  </div>
  <div class="gh-since">Member since ${since} &middot; ${years} year${years !== 1 ? 's' : ''} coding</div>
</a>
<a href="${profile}?tab=repositories" target="_blank" rel="noopener" class="gh-stat-card">
  <div class="gh-card-header"><i class="fas fa-code gh-icon" aria-hidden="true"></i><span class="gh-card-title">Top Languages <small>(by repository)</small></span></div>
  <div class="gh-langs">
    ${top
      .map(([lang, n]) => {
        const pct = Math.round((n / total) * 100);
        const color = LANG_COLORS[lang] ?? '#64748b';
        return `<div class="gh-lang-row">
      <span class="gh-lang-dot" style="background:${color}"></span>
      <span class="gh-lang-name">${esc(lang)}</span>
      <div class="gh-lang-track"><div class="gh-lang-fill" style="width:${pct}%;background:${color}"></div></div>
      <span class="gh-lang-pct">${pct}%</span>
    </div>`;
      })
      .join('')}
  </div>
</a>
<a href="${profile}" target="_blank" rel="noopener" class="gh-stat-card gh-profile-card">
  <div class="gh-card-header"><i class="fas fa-user gh-icon" aria-hidden="true"></i><span class="gh-card-title">Profile</span></div>
  <img src="${esc(user.avatar_url)}&s=160" alt="" width="80" height="80" class="gh-avatar" loading="lazy">
  <div class="gh-profile-name">${esc(user.name || user.login)}</div>
  <div class="gh-profile-bio">${esc(user.bio || 'Developer & Engineer')}</div>
  <div class="gh-profile-meta">
    ${user.location ? `<span><i class="fas fa-map-marker-alt" aria-hidden="true"></i> ${esc(user.location)}</span>` : ''}
    <span><i class="fas fa-users" aria-hidden="true"></i> ${fmt(user.followers)} followers</span>
  </div>
</a>`;
};

const calendar = (data: Contributions, profile: string): string => {
  const days = data.contributions;
  const total = data.total?.lastYear ?? days.reduce((s, d) => s + d.count, 0);
  let longest = 0;
  let run = 0;
  for (const d of days) {
    run = d.count > 0 ? run + 1 : 0;
    longest = Math.max(longest, run);
  }
  let current = 0;
  let k = days.length - 1;
  if (k > 0 && days[k].count === 0) k--; // today may not have started yet
  while (k >= 0 && days[k].count > 0) {
    current++;
    k--;
  }

  const first = new Date(`${days[0].date}T00:00:00`).getDay();
  const step = 14;
  const ox = 30;
  const oy = 24;
  const weeks = Math.ceil((days.length + first) / 7);
  const W = ox + weeks * step + 10;
  const H = oy + 7 * step + 4;
  const colors = ['rgba(255, 255, 255, 0.05)', '#075985', '#0284c7', '#0ea5e9', '#38bdf8'];
  const months: string[] = [];
  let lastMonth = -1;
  let lastCol = -3;
  const rects = days
    .map((d, i) => {
      const slot = i + first;
      const col = Math.floor(slot / 7);
      const row = slot % 7;
      const date = new Date(`${d.date}T00:00:00`);
      if (date.getMonth() !== lastMonth) {
        lastMonth = date.getMonth();
        if (col - lastCol >= 2) {
          months.push(`<text x="${ox + col * step}" y="14" fill="#94a3b8" font-size="10" font-family="Outfit, sans-serif">${date.toLocaleString('en-US', { month: 'short' })}</text>`);
          lastCol = col;
        }
      }
      const label = `${d.count === 0 ? 'No' : d.count} contribution${d.count === 1 ? '' : 's'} on ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
      return `<rect class="gh-cell" x="${ox + col * step}" y="${oy + row * step}" width="10" height="10" rx="2" fill="${colors[Math.min(d.level, 4)]}"><title>${label}</title></rect>`;
    })
    .join('');
  const dayLabels = ['Mon', 'Wed', 'Fri']
    .map((t, i) => `<text x="0" y="${oy + (1 + i * 2) * step + 8}" fill="#64748b" font-size="9" font-family="Outfit, sans-serif">${t}</text>`)
    .join('');

  return `
<div class="gh-graph-header">
  <div class="gh-graph-header-left">
    <i class="fas fa-chart-line gh-icon" aria-hidden="true"></i>
    <span class="gh-card-title">Contribution Activity</span>
    <span class="gh-graph-badge">${total.toLocaleString()} contributions in the last year</span>
  </div>
  <div class="gh-streak-badge"><i class="fas fa-fire" aria-hidden="true"></i><span><strong>${current}</strong> day streak</span></div>
</div>
<div class="gh-calendar-wrapper">
  <svg class="gh-calendar-svg" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Contribution calendar: ${total.toLocaleString()} contributions in the last year. Hover or long-press a day for its count.">
    ${months.join('')}${dayLabels}${rects}
  </svg>
</div>
<div class="gh-graph-footer">
  <div class="gh-graph-footer-stats"><span>Longest Streak: <strong>${longest} days</strong></span></div>
  <div class="gh-legend"><span>Less</span>${colors.map((_, i) => `<span class="gh-legend-cell level-${i}"></span>`).join('')}<span>More</span></div>
</div>
<p class="gh-note">Calendar data from github-contributions-api.jogruber.de · <a href="${profile}" target="_blank" rel="noopener">View on GitHub</a></p>`;
};

export const initGitHub = async (root: HTMLElement): Promise<void> => {
  const user = root.dataset.github ?? 'samuel-asefa';
  const profile = `https://github.com/${user}`;
  const grid = root.querySelector<HTMLElement>('#github-stats-grid');
  const graph = root.querySelector<HTMLElement>('#github-graph');
  root.setAttribute('aria-busy', 'true');

  const [u, r, c] = await Promise.allSettled([
    cached<User>(`gh:user:${user}`, `https://api.github.com/users/${user}`),
    cached<Repo[]>(`gh:repos:${user}`, `https://api.github.com/users/${user}/repos?per_page=100&sort=pushed`),
    cached<Contributions>(`gh:contrib:${user}`, `https://github-contributions-api.jogruber.de/v4/${user}?y=last`),
  ]);

  if (grid) {
    if (u.status === 'fulfilled' && r.status === 'fulfilled') {
      grid.innerHTML = statsCards(u.value, r.value, profile);
    } else {
      const limited = [u, r].some((x) => x.status === 'rejected' && x.reason instanceof LimitError);
      grid.innerHTML = `<div class="gh-stat-card gh-error-card" style="grid-column: 1 / -1">
  <i class="fab fa-github" style="font-size:2rem;margin-bottom:0.75rem;opacity:0.5" aria-hidden="true"></i>
  <p style="color:var(--text-muted);margin-bottom:1rem">${
    limited
      ? 'GitHub’s hourly limit for live stats has been reached on your network. Try again later.'
      : 'GitHub stats couldn’t be loaded right now.'
  }</p>
  <a href="${profile}" target="_blank" rel="noopener" class="btn primary-btn">View on GitHub</a>
</div>`;
    }
  }

  if (graph) {
    if (c.status === 'fulfilled' && c.value.contributions?.length) {
      graph.innerHTML = calendar(c.value, profile);
    } else {
      graph.innerHTML = `<div class="gh-graph-header"><div class="gh-graph-header-left"><i class="fas fa-chart-line gh-icon" aria-hidden="true"></i><span class="gh-card-title">Contribution Activity</span></div>
  <a href="${profile}" target="_blank" rel="noopener" class="gh-streak-badge"><i class="fab fa-github" aria-hidden="true"></i><span>View on GitHub</span></a></div>
  <p style="color:var(--text-muted)">The contribution calendar couldn’t be loaded right now.</p>`;
    }
  }
  root.removeAttribute('aria-busy');
};
