/**
 * Interactive route sketch. Drag waypoints (mouse, pen, or touch), move a
 * focused waypoint with the arrow keys (Shift = 6 in), or type coordinates
 * in the table. Geometry lives in route-geometry.ts and is shared with the
 * build-time render, so the static and live versions always agree.
 */
import {
  DEFAULT_POINTS,
  FIELD,
  MAX_POINTS,
  clamp,
  codeLines,
  fmtLen,
  fmtTurn,
  plan,
  type Pt,
} from './route-geometry';

const SVG_NS = 'http://www.w3.org/2000/svg';

export const initRouteSketch = (root: HTMLElement): void => {
  const svg = root.querySelector<SVGSVGElement>('.rs-field');
  const layer = root.querySelector<SVGGElement>('.rs-points');
  const pathEl = root.querySelector<SVGPolylineElement>('.rs-path');
  const rows = root.querySelector<HTMLElement>('[data-rs-rows]');
  const total = root.querySelector<HTMLElement>('[data-rs-total]');
  const code = root.querySelector<HTMLElement>('[data-rs-code]');
  const status = root.querySelector<HTMLElement>('[data-rs-status]');
  const controls = root.querySelector<HTMLElement>('[data-rs-controls]');
  const desc = root.querySelector<SVGDescElement>('desc');
  if (!svg || !layer || !pathEl || !rows || !total || !code || !status || !controls) return;

  let pts: Pt[] = (() => {
    try {
      return (JSON.parse(root.dataset.points ?? '') as Pt[]).map((p) => ({ x: p.x, y: p.y }));
    } catch {
      return DEFAULT_POINTS.map((p) => ({ ...p }));
    }
  })();

  const addBtn = controls.querySelector<HTMLButtonElement>('[data-rs-add]')!;
  const removeBtn = controls.querySelector<HTMLButtonElement>('[data-rs-remove]')!;
  const resetBtn = controls.querySelector<HTMLButtonElement>('[data-rs-reset]')!;

  const say = (msg: string) => {
    status.textContent = msg;
  };

  /* ── Rendering ─────────────────────────────────────────── */
  const buildHandles = () => {
    layer.replaceChildren();
    pts.forEach((_, i) => {
      const g = document.createElementNS(SVG_NS, 'g');
      g.setAttribute('class', 'rs-point');
      g.setAttribute('tabindex', '0');
      g.setAttribute('role', 'button');
      g.dataset.index = String(i);
      g.innerHTML = `<line class="rs-heading" x1="0" y1="0" x2="0" y2="0"></line><circle class="rs-hit" r="7"></circle><circle class="rs-dot" r="3.6"></circle><text class="rs-num" y="1.3">${i + 1}</text>`;
      layer.append(g);
    });
  };

  const buildRows = () => {
    rows.innerHTML = pts
      .map(
        (_, i) => `<tr>
  <th scope="row">${i + 1}</th>
  <td><input type="number" inputmode="numeric" min="${FIELD.min}" max="${FIELD.max}" step="1" data-i="${i}" data-axis="x" aria-label="Waypoint ${i + 1} x, inches"></td>
  <td><input type="number" inputmode="numeric" min="${FIELD.min}" max="${FIELD.max}" step="1" data-i="${i}" data-axis="y" aria-label="Waypoint ${i + 1} y, inches"></td>
  <td class="num" data-cell="heading"></td>
  <td class="num" data-cell="segment"></td>
  <td class="num" data-cell="turn"></td>
</tr>`,
      )
      .join('');
  };

  const update = (skipInput?: HTMLInputElement) => {
    const p = plan(pts);
    pathEl.setAttribute('points', pts.map((q) => `${q.x},${-q.y}`).join(' '));
    layer.querySelectorAll<SVGGElement>('.rs-point').forEach((g, i) => {
      const q = pts[i];
      const h = (p.headings[i] * Math.PI) / 180;
      g.setAttribute('transform', `translate(${q.x} ${-q.y})`);
      const line = g.querySelector('line')!;
      line.setAttribute('x2', (Math.sin(h) * 9).toFixed(2));
      line.setAttribute('y2', (-Math.cos(h) * 9).toFixed(2));
      g.setAttribute(
        'aria-label',
        `Waypoint ${i + 1}: x ${q.x}, y ${q.y} inches, heading ${p.headings[i].toFixed(0)} degrees. Arrow keys move it one inch; hold Shift for six.`,
      );
    });
    rows.querySelectorAll('tr').forEach((tr, i) => {
      tr.querySelectorAll<HTMLInputElement>('input').forEach((input) => {
        if (input === skipInput) return;
        input.value = String(pts[i][input.dataset.axis as 'x' | 'y']);
      });
      (tr.querySelector('[data-cell="heading"]') as HTMLElement).textContent = `${p.headings[i].toFixed(1)}°`;
      (tr.querySelector('[data-cell="segment"]') as HTMLElement).textContent = i === 0 ? '—' : fmtLen(p.legs[i - 1].length);
      (tr.querySelector('[data-cell="turn"]') as HTMLElement).textContent = fmtTurn(p.turns[i]);
    });
    total.textContent = fmtLen(p.total);
    code.textContent = codeLines(pts, p).join('\n');
    if (desc) {
      desc.textContent = `${pts.length} waypoints joined by straight segments, total ${p.total.toFixed(1)} inches. Coordinates are listed in the table that follows.`;
    }
    addBtn.disabled = pts.length >= MAX_POINTS;
    removeBtn.disabled = pts.length <= 2;
  };

  const rebuild = () => {
    buildHandles();
    buildRows();
    update();
  };

  const summary = (i: number) => {
    const p = plan(pts);
    const seg = i > 0 ? `, ${fmtLen(p.legs[i - 1].length)} from waypoint ${i}` : '';
    return `Waypoint ${i + 1} at x ${pts[i].x}, y ${pts[i].y}${seg}. Path ${fmtLen(p.total)}.`;
  };

  /* ── Pointer dragging ─────────────────────────────────── */
  const toField = (e: PointerEvent): Pt => {
    const ctm = svg.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    const pt = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
    return { x: clamp(pt.x), y: clamp(-pt.y) };
  };

  let dragging: { i: number; g: SVGGElement; id: number } | null = null;

  layer.addEventListener('pointerdown', (e) => {
    const g = (e.target as Element).closest<SVGGElement>('.rs-point');
    if (!g || e.button > 0) return;
    e.preventDefault();
    const i = Number(g.dataset.index);
    dragging = { i, g, id: e.pointerId };
    g.setPointerCapture(e.pointerId);
    g.classList.add('is-dragging', 'is-active');
    g.focus({ preventScroll: true });
  });

  layer.addEventListener('pointermove', (e) => {
    if (!dragging || e.pointerId !== dragging.id) return;
    const next = toField(e);
    const cur = pts[dragging.i];
    if (next.x === cur.x && next.y === cur.y) return;
    pts[dragging.i] = next;
    update();
  });

  const endDrag = (e: PointerEvent) => {
    if (!dragging || e.pointerId !== dragging.id) return;
    dragging.g.classList.remove('is-dragging', 'is-active');
    say(summary(dragging.i));
    dragging = null;
  };
  layer.addEventListener('pointerup', endDrag);
  layer.addEventListener('pointercancel', endDrag);

  /* ── Keyboard ─────────────────────────────────────────── */
  layer.addEventListener('keydown', (e) => {
    const g = (e.target as Element).closest<SVGGElement>('.rs-point');
    if (!g) return;
    const i = Number(g.dataset.index);
    const step = e.shiftKey ? 6 : 1;
    const moves: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, step],
      ArrowDown: [0, -step],
    };
    const d = moves[e.key];
    if (!d) return;
    e.preventDefault();
    pts[i] = { x: clamp(pts[i].x + d[0]), y: clamp(pts[i].y + d[1]) };
    update();
    say(summary(i));
  });

  /* ── Table inputs ─────────────────────────────────────── */
  rows.addEventListener('input', (e) => {
    const input = e.target as HTMLInputElement;
    if (input.tagName !== 'INPUT') return;
    const v = Number(input.value);
    if (input.value === '' || !Number.isFinite(v)) return;
    const i = Number(input.dataset.i);
    const axis = input.dataset.axis as 'x' | 'y';
    pts[i] = { ...pts[i], [axis]: clamp(v) };
    update(input);
  });

  rows.addEventListener('change', (e) => {
    const input = e.target as HTMLInputElement;
    if (input.tagName !== 'INPUT') return;
    const i = Number(input.dataset.i);
    input.value = String(pts[i][input.dataset.axis as 'x' | 'y']);
    say(summary(i));
  });

  /* ── Buttons ──────────────────────────────────────────── */
  addBtn.addEventListener('click', () => {
    if (pts.length >= MAX_POINTS) return;
    const last = pts[pts.length - 1];
    const prev = pts[pts.length - 2] ?? { x: last.x - 12, y: last.y - 12 };
    // Continue in the same direction, folding back inside the field if needed.
    let nx = last.x + (last.x - prev.x) * 0.6;
    let ny = last.y + (last.y - prev.y) * 0.6;
    if (Math.abs(nx) > 66 || Math.abs(ny) > 66) {
      nx = last.x - (last.x - prev.x) * 0.6;
      ny = last.y + 18 * (ny > 0 ? -1 : 1);
    }
    pts.push({ x: clamp(nx), y: clamp(ny) });
    rebuild();
    say(`Added waypoint ${pts.length}. ${summary(pts.length - 1)}`);
  });

  removeBtn.addEventListener('click', () => {
    if (pts.length <= 2) return;
    pts.pop();
    rebuild();
    say(`Removed the last waypoint. ${pts.length} remain.`);
  });

  resetBtn.addEventListener('click', () => {
    pts = DEFAULT_POINTS.map((p) => ({ ...p }));
    rebuild();
    say('Route reset to the starting example.');
  });

  controls.hidden = false;
  root.classList.add('is-interactive');
  rebuild();
};
