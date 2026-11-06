/**
 * Geometry for the RoboRoute sketch. Pure functions shared by the build-time
 * render (static SVG) and the browser (interactive version).
 *
 * Coordinates follow RoboRoute: inches on a 144 in square field, origin at
 * the center, +y toward the far wall. Headings are degrees clockwise from +y.
 */
export interface Pt {
  x: number;
  y: number;
}

export const FIELD = { min: -72, max: 72, tile: 24 } as const;

export const DEFAULT_POINTS: Pt[] = [
  { x: -48, y: -54 },
  { x: -18, y: -30 },
  { x: 6, y: 18 },
  { x: 42, y: 30 },
];

export const MAX_POINTS = 6;
export const MOVE_TIMEOUT_MS = 1000;

export const clamp = (v: number): number => Math.max(FIELD.min, Math.min(FIELD.max, Math.round(v)));

/** Heading of travel from a to b, degrees clockwise from +y, in [0, 360). */
export const bearing = (a: Pt, b: Pt): number => {
  const deg = (Math.atan2(b.x - a.x, b.y - a.y) * 180) / Math.PI;
  return (deg + 360) % 360;
};

/** Signed turn from heading h1 to h2 in (−180, 180]; positive is clockwise (right). */
export const turn = (h1: number, h2: number): number => {
  let d = (h2 - h1) % 360;
  if (d <= -180) d += 360;
  if (d > 180) d -= 360;
  return d;
};

export interface Leg {
  from: number;
  to: number;
  length: number;
  heading: number;
}

export interface Plan {
  legs: Leg[];
  /** Heading assigned to each waypoint: direction of travel arriving there (start: first leg). */
  headings: number[];
  /** Turn made at each interior waypoint (index-aligned; null at the ends). */
  turns: (number | null)[];
  total: number;
}

export const plan = (pts: Pt[]): Plan => {
  const legs: Leg[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const a = pts[i];
    const b = pts[i + 1];
    legs.push({ from: i, to: i + 1, length: Math.hypot(b.x - a.x, b.y - a.y), heading: bearing(a, b) });
  }
  const headings = pts.map((_, i) => (i === 0 ? (legs[0]?.heading ?? 0) : legs[i - 1].heading));
  const turns = pts.map((_, i) => (i > 0 && i < pts.length - 1 ? turn(legs[i - 1].heading, legs[i].heading) : null));
  return { legs, headings, turns, total: legs.reduce((s, l) => s + l.length, 0) };
};

const f2 = (n: number) => n.toFixed(2);
const f1 = (n: number) => n.toFixed(1);

/** The same command format RoboRoute exports for LemLib. */
export const codeLines = (pts: Pt[], p: Plan = plan(pts)): string[] => {
  if (!pts.length) return [];
  const lines = [`chassis.setPose(${f2(pts[0].x)}, ${f2(pts[0].y)}, ${f1(p.headings[0])});`];
  for (let i = 1; i < pts.length; i++) {
    lines.push(`chassis.moveToPose(${f2(pts[i].x)}, ${f2(pts[i].y)}, ${f1(p.headings[i])}, ${MOVE_TIMEOUT_MS});`);
  }
  return lines;
};

export const fmtTurn = (t: number | null): string => {
  if (t === null) return '—';
  const r = Math.round(t);
  if (r === 0) return '0°';
  return `${Math.abs(r)}° ${r > 0 ? 'right' : 'left'}`;
};

export const fmtLen = (n: number): string => `${n.toFixed(1)} in`;
export const fmtSigned = (n: number): string => (n < 0 ? `−${Math.abs(n)}` : `${n}`);
