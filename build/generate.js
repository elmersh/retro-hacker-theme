#!/usr/bin/env node
'use strict';
// Genera los temas Retro Hacker desde build/palettes/<variante>.js.
// Uso: node build/generate.js [variante|all] [--stdout]
//   all (default): genera todas las variantes que tengan paleta; las que no
//   la tienen se saltan (su JSON v1 queda intacto).
const fs = require('fs');
const path = require('path');
const { ROLES, FONT_STYLE_DEFAULTS } = require('./roles');
const { ROOT, VARIANTS, hasPalette, selectVariants, loadVariant } = require('./variants');
const template = require('./template');

const ind = (n) => ' '.repeat(n);
const js = (v) => JSON.stringify(v);
const RULE = '═'.repeat(72);

// Header comment documenting the palette, generated from build/roles.js.
function header(palette) {
  const L = [];
  L.push(RULE);
  L.push(` ${palette.title || palette.name.toUpperCase()}${palette.tagline ? ' · ' + palette.tagline : ''}`);
  L.push(` Archivo GENERADO por build/generate.js desde build/palettes/${palette.slug}.js: no editar a mano.`);
  L.push(RULE);
  L.push(' Paleta (rol → hex → significado). * = valor por defecto (fallback) del rol');
  for (const r of ROLES) {
    if (r.group) { L.push(` ── ${r.group} ${'─'.repeat(Math.max(3, 68 - r.group.length))}`); continue; }
    const hex = palette.colors[r.name] + (palette.explicit.has(r.name) ? '' : '*');
    L.push(` ${r.name.padEnd(22)} ${hex.padEnd(10)} ${r.desc}`);
  }
  const fsAll = { ...FONT_STYLE_DEFAULTS, ...(palette.fontStyle || {}) };
  L.push(` ── fontStyle ${'─'.repeat(59)}`);
  L.push(' ' + Object.entries(fsAll).map(([k, v]) => `${k}=${v || '(plain)'}`).join(' · '));
  if (palette.rules && palette.rules.length) {
    L.push(` ── Reglas de la casa ${'─'.repeat(51)}`);
    for (const r of palette.rules) L.push(` · ${r}`);
  }
  L.push(RULE);
  return L.map((l) => `${ind(4)}//${l}`).join('\n');
}

// Build the JSONC text for a resolved palette (same layout as the v2 file).
function render(palette) {
  const { sections, tokens, semantic } = template(palette);
  let out = '{\n' + header(palette) + '\n';
  out += `${ind(4)}"$schema": "vscode://schemas/color-theme",\n`;
  out += `${ind(4)}"name": ${js(palette.name)},\n`;
  out += `${ind(4)}"type": "dark",\n`;
  out += `${ind(4)}"semanticHighlighting": true,\n`;
  out += `${ind(4)}"colors": {\n`;
  const colorLines = [];
  const seen = new Set();
  sections.forEach((s) => {
    Object.entries(s.obj).forEach(([k, v], ei) => {
      if (seen.has(k)) throw new Error('duplicate color key ' + k);
      if (typeof v !== 'string') throw new Error(`color ${k} sin valor (rol inexistente?)`);
      seen.add(k);
      colorLines.push({ comment: ei === 0 ? s.title : null, text: `${ind(8)}${js(k)}: ${js(v.toUpperCase())}` });
    });
  });
  colorLines.forEach((l, i) => {
    if (l.comment) out += (i ? '\n' : '') + `${ind(8)}// ── ${l.comment}\n`;
    out += l.text + (i < colorLines.length - 1 ? ',' : '') + '\n';
  });
  out += `${ind(4)}},\n`;
  out += `${ind(4)}"tokenColors": [\n`;
  tokens.forEach((t, i) => {
    if (t.group) out += (i ? '\n' : '') + `${ind(8)}// ── ${t.group}\n`;
    const sc = t.scope.length === 1 ? js(t.scope[0]) : '[\n' + t.scope.map((s) => ind(16) + js(s)).join(',\n') + '\n' + ind(12) + ']';
    const st = Object.entries(t.settings).map(([k, v]) => `${ind(16)}${js(k)}: ${js(k === 'foreground' ? v.toUpperCase() : v)}`).join(',\n');
    out += `${ind(8)}{\n${ind(12)}"name": ${js(t.name)},\n${ind(12)}"scope": ${sc},\n${ind(12)}"settings": {\n${st}\n${ind(12)}}\n${ind(8)}}` + (i < tokens.length - 1 ? ',' : '') + '\n';
  });
  out += `${ind(4)}],\n`;
  out += `${ind(4)}"semanticTokenColors": {\n`;
  const semLines = [];
  const fmt = (v) => (typeof v === 'string' ? js(v.toUpperCase()) : '{ ' + Object.entries(v).map(([k, x]) => `${js(k)}: ${js(k === 'foreground' ? x.toUpperCase() : x)}`).join(', ') + ' }');
  semantic.forEach((s) => Object.entries(s.obj).forEach(([k, v], ei) => semLines.push({ comment: ei === 0 ? s.title : null, text: `${ind(8)}${js(k)}: ${fmt(v)}` })));
  semLines.forEach((l, i) => {
    if (l.comment) out += (i ? '\n' : '') + `${ind(8)}// ── ${l.comment}\n`;
    out += l.text + (i < semLines.length - 1 ? ',' : '') + '\n';
  });
  out += `${ind(4)}}\n}\n`;
  return { text: out, counts: { colors: seen.size, tokenColors: tokens.length, semantic: semLines.length } };
}

function main(argv) {
  const args = argv.filter((a) => !a.startsWith('--'));
  const toStdout = argv.includes('--stdout');
  const arg = args[0] || 'all';
  let slugs;
  try { slugs = selectVariants(arg); } catch (e) { console.error(e.message); return 2; }
  let failed = 0;
  for (const slug of slugs) {
    if (!hasPalette(slug)) {
      if (arg === 'all') { console.log(`- ${slug}: sin build/palettes/${slug}.js, se salta (${VARIANTS[slug].file} queda intacto)`); continue; }
      console.error(`x ${slug}: no existe build/palettes/${slug}.js`); failed++; continue;
    }
    const v = loadVariant(slug);
    if (v.errors.length) { console.error(`x ${slug}: paleta invalida\n  - ${v.errors.join('\n  - ')}`); failed++; continue; }
    let text, counts;
    try { ({ text, counts } = render(v.palette)); } catch (e) { console.error(`x ${slug}: ${e.message}`); failed++; continue; }
    if (toStdout) { process.stdout.write(text); continue; }
    fs.writeFileSync(path.join(ROOT, v.file), text);
    console.log(`✓ ${slug}: ${v.file} (${counts.colors} colors, ${counts.tokenColors} tokenColors, ${counts.semantic} semantic)`);
  }
  return failed ? 1 : 0;
}

module.exports = { render, header };
if (require.main === module) process.exit(main(process.argv.slice(2)));
