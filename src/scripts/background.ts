/**
 * The original animated circuit background, with fixes: it redraws on
 * resize, renders sharply on high-DPI screens, pauses while the tab is
 * hidden, and draws a single still frame when reduced motion is on.
 */
interface CNode {
  bx: number;
  by: number;
  x: number;
  y: number;
  r: number;
  amp: number;
  phase: number;
  speed: number;
  opacity: number;
}
interface Edge {
  a: CNode;
  b: CNode;
}
interface Pulse {
  edge: Edge;
  t: number;
  speed: number;
}

const ACCENT = 'rgba(14,165,233,';
const GRID = 95;
const MAX_DIST = GRID * 1.7;

export const initBackground = (container: HTMLElement, still: boolean): void => {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;';
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let W = 0;
  let H = 0;
  let nodes: CNode[] = [];
  let edges: Edge[] = [];
  const pulses: Pulse[] = [];

  const build = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    nodes = [];
    const cols = Math.ceil(W / GRID) + 1;
    const rows = Math.ceil(H / GRID) + 1;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (Math.random() > 0.48) {
          const bx = i * GRID + (Math.random() - 0.5) * GRID * 0.55;
          const by = j * GRID + (Math.random() - 0.5) * GRID * 0.55;
          nodes.push({
            bx,
            by,
            x: bx,
            y: by,
            r: 0.8 + Math.random() * 1.1,
            amp: 4 + Math.random() * 8,
            phase: Math.random() * Math.PI * 2,
            speed: 0.0025 + Math.random() * 0.005,
            opacity: 0.15 + Math.random() * 0.25,
          });
        }
      }
    }
    edges = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const d = Math.hypot(nodes[i].bx - nodes[j].bx, nodes[i].by - nodes[j].by);
        if (d < MAX_DIST && Math.random() > 0.72) edges.push({ a: nodes[i], b: nodes[j] });
      }
    }
    pulses.length = 0;
    for (let k = 0; k < 12 && edges.length; k++) {
      pulses.push({ edge: edges[Math.floor(Math.random() * edges.length)], t: Math.random(), speed: 0.004 + Math.random() * 0.006 });
    }
  };

  const drawStatic = (t: number) => {
    ctx.clearRect(0, 0, W, H);
    for (const n of nodes) {
      n.x = n.bx + Math.sin(t * n.speed * 6.28 + n.phase) * n.amp;
      n.y = n.by + Math.cos(t * n.speed * 6.28 * 0.71 + n.phase) * n.amp * 0.6;
    }
    ctx.lineWidth = 0.7;
    for (const e of edges) {
      const dist = Math.hypot(e.a.x - e.b.x, e.a.y - e.b.y);
      const alpha = Math.max(0, 0.08 * (1 - dist / (MAX_DIST * 1.1)));
      if (alpha <= 0) continue;
      ctx.strokeStyle = `${ACCENT}${alpha})`;
      ctx.beginPath();
      ctx.moveTo(e.a.x, e.a.y);
      ctx.lineTo(e.b.x, e.b.y);
      ctx.stroke();
    }
    for (const n of nodes) {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = `${ACCENT}${n.opacity})`;
      ctx.fill();
    }
  };

  build();

  if (still) {
    drawStatic(0);
    let timer = 0;
    window.addEventListener('resize', () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        build();
        drawStatic(0);
      }, 200);
    });
    return;
  }

  let time = 0;
  let lastTs = 0;
  let lastSpawn = 0;
  let raf = 0;

  const frame = (ts: number) => {
    const dt = Math.min(ts - lastTs, 32);
    lastTs = ts;
    time += dt;
    drawStatic(time * 0.001);

    if (ts - lastSpawn > 280 && edges.length) {
      pulses.push({ edge: edges[Math.floor(Math.random() * edges.length)], t: 0, speed: 0.004 + Math.random() * 0.007 });
      lastSpawn = ts;
    }
    for (let i = pulses.length - 1; i >= 0; i--) {
      const p = pulses[i];
      p.t += p.speed * (dt / 16.67);
      if (p.t >= 1) {
        pulses.splice(i, 1);
        continue;
      }
      const px = p.edge.a.x + (p.edge.b.x - p.edge.a.x) * p.t;
      const py = p.edge.a.y + (p.edge.b.y - p.edge.a.y) * p.t;
      const fade = p.t < 0.2 ? p.t / 0.2 : p.t > 0.8 ? (1 - p.t) / 0.2 : 1;
      const grd = ctx.createRadialGradient(px, py, 0, px, py, 8);
      grd.addColorStop(0, `${ACCENT}${0.45 * fade})`);
      grd.addColorStop(0.4, `${ACCENT}${0.15 * fade})`);
      grd.addColorStop(1, `${ACCENT}0)`);
      ctx.beginPath();
      ctx.arc(px, py, 8, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(px, py, 1.6, 0, Math.PI * 2);
      ctx.fillStyle = `${ACCENT}${0.6 * fade})`;
      ctx.fill();
    }
    raf = requestAnimationFrame(frame);
  };

  const start = () => {
    cancelAnimationFrame(raf);
    lastTs = performance.now();
    raf = requestAnimationFrame(frame);
  };
  start();

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(raf);
    else start();
  });

  let timer = 0;
  let lastW = W;
  window.addEventListener('resize', () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      // Ignore height-only changes from mobile browser toolbars.
      if (Math.abs(window.innerWidth - lastW) < 2 && Math.abs(window.innerHeight - H) < 150) return;
      lastW = window.innerWidth;
      build();
    }, 200);
  });
};
