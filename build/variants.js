'use strict';
// Variant registry: slug -> palette file + output theme file. The theme file
// names and labels are fixed by package.json (users' settings reference the
// label), so they must never change.
const fs = require('fs');
const path = require('path');
const { roleList, resolveColors, FONT_STYLE_DEFAULTS } = require('./roles');
const { isHex } = require('./lib/color');

const ROOT = path.resolve(__dirname, '..');

const VARIANTS = {
  'green': { file: 'themes/retro-hacker-default-color-theme.json' },
  'green-subtle': { file: 'themes/retro-hacker-green-subtle-theme.json' },
  'pink': { file: 'themes/retro-hacker-pinkish-color-theme.json' },
  'amber': { file: 'themes/retro-hacker-amber-theme.json' },
  'blue': { file: 'themes/retro-hacker-blue-theme.json' },
};

const paletteFile = (slug) => path.join(__dirname, 'palettes', `${slug}.js`);
const hasPalette = (slug) => fs.existsSync(paletteFile(slug));

// Label of a theme file in package.json contributes.themes.
function packageLabel(file) {
  const pkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
  const t = (pkg.contributes.themes || []).find((x) => path.normalize(x.path) === path.normalize('./' + file) || path.normalize(x.path) === path.normalize(file));
  return t ? t.label : null;
}

// Expand a CLI argument ('all' | slug) into slugs. Throws on unknown slugs.
function selectVariants(arg) {
  if (!arg || arg === 'all') return Object.keys(VARIANTS);
  if (!VARIANTS[arg]) throw new Error(`variante desconocida "${arg}". Opciones: all, ${Object.keys(VARIANTS).join(', ')}`);
  return [arg];
}

// Load + resolve a palette. Returns { slug, file, label, palette, errors }.
function loadVariant(slug) {
  const v = VARIANTS[slug];
  const file = v.file;
  const label = packageLabel(file);
  const errors = [];
  delete require.cache[require.resolve(paletteFile(slug))];
  const raw = require(paletteFile(slug));
  if (!label) errors.push(`${file} no aparece en package.json contributes.themes`);
  if (raw.name !== label) errors.push(`palette.name "${raw.name}" debe ser igual al label de package.json "${label}"`);
  for (const k of Object.keys(raw.fontStyle || {})) {
    if (!(k in FONT_STYLE_DEFAULTS)) errors.push(`fontStyle.${k} no existe (opciones: ${Object.keys(FONT_STYLE_DEFAULTS).join(', ')})`);
    else if (!/^((bold|italic|underline|strikethrough)( (bold|italic|underline|strikethrough))*)?$/.test(raw.fontStyle[k])) errors.push(`fontStyle.${k} invalido: ${JSON.stringify(raw.fontStyle[k])}`);
  }
  const { colors, errors: colorErrors } = resolveColors(raw.colors || {}, { isHex });
  errors.push(...colorErrors);
  const explicit = new Set(Object.keys(raw.colors || {}));
  const palette = { ...raw, slug, colors, explicit };
  return { slug, file, label, palette, errors, roles: roleList };
}

module.exports = { ROOT, VARIANTS, paletteFile, hasPalette, selectVariants, loadVariant, packageLabel };
