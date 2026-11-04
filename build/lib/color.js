'use strict';
// Color helpers shared by the template (alpha/mix) and the validator
// (WCAG contrast, CIELAB, ΔE76 and CIEDE2000). Plain Node, no dependencies.

const HEX_RE = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{4}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/;
const HEX6_RE = /^#[0-9A-Fa-f]{6}$/;

const isHex = (v) => typeof v === 'string' && HEX_RE.test(v);

function parse(h) {
  if (typeof h !== 'string') return h; // already an {r,g,b,a} object
  let s = h.replace('#', '');
  if (s.length === 3 || s.length === 4) s = s.split('').map((c) => c + c).join('');
  return {
    r: parseInt(s.slice(0, 2), 16),
    g: parseInt(s.slice(2, 4), 16),
    b: parseInt(s.slice(4, 6), 16),
    a: s.length >= 8 ? parseInt(s.slice(6, 8), 16) / 255 : 1,
  };
}

const toHex = (c) => '#' + [c.r, c.g, c.b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('').toUpperCase();

// Append a 2-digit alpha to an opaque #RRGGBB color.
function alpha(hex, aa) {
  if (!HEX6_RE.test(hex)) throw new Error(`alpha(): expected #RRGGBB, got ${JSON.stringify(hex)}`);
  if (!/^[0-9A-Fa-f]{2}$/.test(aa)) throw new Error(`alpha(): expected 2 hex digits, got ${JSON.stringify(aa)}`);
  return hex + aa;
}

// Opaque mix: `amount` of fg over bg (0..1). Used for fallback roles.
function mix(fg, bg, amount) {
  const f = parse(fg), b = parse(bg);
  return toHex({ r: f.r * amount + b.r * (1 - amount), g: f.g * amount + b.g * (1 - amount), b: f.b * amount + b.b * (1 - amount) });
}

// Composite fg (may carry alpha) over an opaque bg.
function over(fg, bg) {
  const f = parse(fg), b = parse(bg);
  return { r: f.r * f.a + b.r * (1 - f.a), g: f.g * f.a + b.g * (1 - f.a), b: f.b * f.a + b.b * (1 - f.a), a: 1 };
}

// Composite a stack of layers bottom -> top (first must be opaque).
const stack = (...layers) => layers.filter(Boolean).slice(1).reduce((acc, l) => over(l, acc), parse(layers[0]));

function luminance(c) {
  const t = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
  return 0.2126 * t(c.r) + 0.7152 * t(c.g) + 0.0722 * t(c.b);
}

// WCAG contrast of fg (composited over bg) against bg.
function contrast(fg, bg) {
  const B = parse(bg);
  const F = over(fg, B);
  const l1 = luminance(F), l2 = luminance(B);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

function lab(c) {
  c = parse(c);
  const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
  const r = f(c.r), g = f(c.g), b = f(c.b);
  const x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
  const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
  const z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;
  const h = (v) => (v > 0.008856 ? Math.cbrt(v) : 7.787 * v + 16 / 116);
  return [116 * h(y) - 16, 500 * (h(x) - h(y)), 200 * (h(y) - h(z))];
}

const deltaE76 = (a, b) => { const A = lab(a), B = lab(b); return Math.hypot(A[0] - B[0], A[1] - B[1], A[2] - B[2]); };

// CIEDE2000 (Sharma et al. 2005), kL = kC = kH = 1.
function deltaE2000(c1, c2) {
  const [L1, a1, b1] = lab(c1), [L2, a2, b2] = lab(c2);
  const rad = Math.PI / 180, deg = 180 / Math.PI;
  const C1 = Math.hypot(a1, b1), C2 = Math.hypot(a2, b2);
  const Cb = (C1 + C2) / 2;
  const G = 0.5 * (1 - Math.sqrt(Math.pow(Cb, 7) / (Math.pow(Cb, 7) + Math.pow(25, 7))));
  const a1p = (1 + G) * a1, a2p = (1 + G) * a2;
  const C1p = Math.hypot(a1p, b1), C2p = Math.hypot(a2p, b2);
  const hp = (a, b) => { if (a === 0 && b === 0) return 0; const h = Math.atan2(b, a) * deg; return h >= 0 ? h : h + 360; };
  const h1p = hp(a1p, b1), h2p = hp(a2p, b2);
  const dLp = L2 - L1, dCp = C2p - C1p;
  let dhp = 0;
  if (C1p * C2p !== 0) { dhp = h2p - h1p; if (dhp > 180) dhp -= 360; else if (dhp < -180) dhp += 360; }
  const dHp = 2 * Math.sqrt(C1p * C2p) * Math.sin((dhp / 2) * rad);
  const Lbp = (L1 + L2) / 2, Cbp = (C1p + C2p) / 2;
  let hbp = h1p + h2p;
  if (C1p * C2p !== 0) { if (Math.abs(h1p - h2p) > 180) hbp += h1p + h2p < 360 ? 360 : -360; hbp /= 2; }
  const T = 1 - 0.17 * Math.cos((hbp - 30) * rad) + 0.24 * Math.cos(2 * hbp * rad) + 0.32 * Math.cos((3 * hbp + 6) * rad) - 0.2 * Math.cos((4 * hbp - 63) * rad);
  const dTheta = 30 * Math.exp(-Math.pow((hbp - 275) / 25, 2));
  const Rc = 2 * Math.sqrt(Math.pow(Cbp, 7) / (Math.pow(Cbp, 7) + Math.pow(25, 7)));
  const Sl = 1 + (0.015 * Math.pow(Lbp - 50, 2)) / Math.sqrt(20 + Math.pow(Lbp - 50, 2));
  const Sc = 1 + 0.045 * Cbp, Sh = 1 + 0.015 * Cbp * T;
  const Rt = -Math.sin(2 * dTheta * rad) * Rc;
  return Math.sqrt(Math.pow(dLp / Sl, 2) + Math.pow(dCp / Sc, 2) + Math.pow(dHp / Sh, 2) + Rt * (dCp / Sc) * (dHp / Sh));
}

// Strip // and /* */ comments outside strings. Does NOT remove trailing
// commas, so JSON.parse stays strict.
function stripComments(s) {
  let o = '', i = 0, inS = false;
  while (i < s.length) {
    const c = s[i];
    if (inS) { o += c; if (c === '\\') { o += s[i + 1]; i += 2; continue; } if (c === '"') inS = false; i++; continue; }
    if (c === '"') { inS = true; o += c; i++; continue; }
    if (c === '/' && s[i + 1] === '/') { while (i < s.length && s[i] !== '\n') i++; continue; }
    if (c === '/' && s[i + 1] === '*') { i = s.indexOf('*/', i) + 2; continue; }
    o += c; i++;
  }
  return o;
}

module.exports = { HEX_RE, isHex, parse, toHex, alpha, mix, over, stack, luminance, contrast, lab, deltaE76, deltaE2000, stripComments };
