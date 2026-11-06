import { DEFAULT_POINTS, FIELD, codeLines, fmtLen, fmtSigned, fmtTurn, plan, type Pt } from '../scripts/route-geometry';
import { esc } from './html';

/**
 * Static markup for the route sketch. Without JavaScript it is a correct,
 * readable diagram with its numbers; site.ts lazy-loads the interactive
 * version (src/scripts/route-sketch.ts) when it scrolls near.
 */
export const fieldSvg = (pts: Pt[]): string => {
  const p = plan(pts);
  const tiles: string[] = [];
  for (let v = FIELD.min + FIELD.tile; v < FIELD.max; v += FIELD.tile) {
    tiles.push(`<line x1="${v}" y1="${FIELD.min}" x2="${v}" y2="${FIELD.max}"/>`, `<line x1="${FIELD.min}" y1="${v}" x2="${FIELD.max}" y2="${v}"/>`);
  }
  const path = pts.map((q) => `${q.x},${-q.y}`).join(' ');
  const handles = pts
    .map((q, i) => {
      const h = (p.headings[i] * Math.PI) / 180;
      const tx = q.x + Math.sin(h) * 9;
      const ty = -(q.y + Math.cos(h) * 9);
      return `<g class="rs-point" data-index="${i}" transform="translate(${q.x} ${-q.y})">
  <line class="rs-heading" x1="0" y1="0" x2="${(tx - q.x).toFixed(2)}" y2="${(ty + q.y).toFixed(2)}"/>
  <circle class="rs-hit" r="7"/>
  <circle class="rs-dot" r="3.6"/>
  <text class="rs-num" y="1.3">${i + 1}</text>
</g>`;
    })
    .join('');
  return `<svg class="rs-field" viewBox="${FIELD.min - 2} ${FIELD.min - 2} ${FIELD.max - FIELD.min + 4} ${FIELD.max - FIELD.min + 4}" role="img" aria-labelledby="rs-svg-title rs-svg-desc">
  <title id="rs-svg-title">Route sketch on a 144-inch VEX field</title>
  <desc id="rs-svg-desc">${esc(
    `${pts.length} waypoints joined by straight segments, total ${p.total.toFixed(1)} inches. Coordinates are listed in the table that follows.`,
  )}</desc>
  <rect class="rs-floor" x="${FIELD.min}" y="${FIELD.min}" width="${FIELD.max - FIELD.min}" height="${FIELD.max - FIELD.min}"/>
  <g class="rs-tiles">${tiles.join('')}</g>
  <g class="rs-axes"><line x1="${FIELD.min}" y1="0" x2="${FIELD.max}" y2="0"/><line x1="0" y1="${FIELD.min}" x2="0" y2="${FIELD.max}"/></g>
  <polyline class="rs-path" points="${path}"/>
  <g class="rs-points">${handles}</g>
</svg>`;
};

export const tableRows = (pts: Pt[]): string => {
  const p = plan(pts);
  return pts
    .map(
      (q, i) => `<tr>
  <th scope="row">${i + 1}</th>
  <td class="num" data-axis="x">${fmtSigned(q.x)}</td>
  <td class="num" data-axis="y">${fmtSigned(q.y)}</td>
  <td class="num">${p.headings[i].toFixed(1)}°</td>
  <td class="num">${i === 0 ? '—' : fmtLen(p.legs[i - 1].length)}</td>
  <td class="num">${fmtTurn(p.turns[i])}</td>
</tr>`,
    )
    .join('');
};

export const routeSketch = (): string => {
  const pts = DEFAULT_POINTS;
  const p = plan(pts);
  return `<div class="route-sketch" data-route-sketch data-points='${esc(JSON.stringify(pts))}'>
  <div class="rs-board">
    ${fieldSvg(pts)}
    <p class="rs-hint" data-rs-hint>Drag a numbered waypoint, or edit the coordinates in the table.</p>
  </div>
  <div class="rs-readout">
    <table class="rs-table">
      <caption class="visually-hidden">Waypoints, headings, segment lengths, and turns</caption>
      <thead><tr><th scope="col">#</th><th scope="col">x (in)</th><th scope="col">y (in)</th><th scope="col">Heading</th><th scope="col">Segment</th><th scope="col">Turn</th></tr></thead>
      <tbody data-rs-rows>${tableRows(pts)}</tbody>
    </table>
    <p class="rs-total">Path length <strong data-rs-total>${fmtLen(p.total)}</strong></p>
    <div class="rs-controls" data-rs-controls hidden>
      <button type="button" class="button button--small" data-rs-add>Add waypoint</button>
      <button type="button" class="button button--small" data-rs-remove>Remove last</button>
      <button type="button" class="button button--small button--quiet" data-rs-reset>Reset</button>
    </div>
    <p class="rs-code-label">Same command format RoboRoute exports for LemLib</p>
    <pre class="rs-code"><code data-rs-code>${esc(codeLines(pts, p).join('\n'))}</code></pre>
    <p class="rs-status visually-hidden" role="status" aria-live="polite" data-rs-status></p>
  </div>
</div>`;
};
