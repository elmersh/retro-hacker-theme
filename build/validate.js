#!/usr/bin/env node
'use strict';
// Validador estricto de los temas Retro Hacker.
// Uso: node build/validate.js [variante|all] [--verbose]
// Sale con codigo != 0 si algo falla. Con `all` se validan solo las variantes
// que ya tienen build/palettes/<variante>.js (las v1 se reportan y se saltan).
const fs = require('fs');
const path = require('path');
const assert = require('assert');
const C = require('./lib/color');
const { ROOT, VARIANTS, hasPalette, selectVariants, loadVariant } = require('./variants');
const { render } = require('./generate');

const VALID_KEYS = new Set(JSON.parse(fs.readFileSync(path.join(__dirname, 'vscode-color-keys.json'), 'utf8')));

// Roles de sintaxis que deben distinguirse entre si (CIEDE2000).
const DISTINCT_ROLES = ['keyword', 'func', 'type', 'namespace', 'variable', 'property', 'string', 'number', 'regexp', 'comment', 'operator', 'punctuation'];
const MIN_DELTA_E2000 = 8;

// Superficies del editor sobre las que se mide el texto de los tokens.
// text: minimo 4.5 (lectura normal); transient: minimo 3 (find/diff/word highlight).
const TOKEN_SURFACES = [
  ['editor', [], 4.5],
  ['lineHL', ['editor.lineHighlightBackground'], 4.5],
  ['selection', ['editor.selectionBackground'], 4.5],
  ['findMatch', ['editor.findMatchBackground'], 3],
  ['findHL', ['editor.findMatchHighlightBackground'], 3],
  ['wordHL', ['editor.wordHighlightBackground'], 3],
  ['wordStrong', ['editor.wordHighlightStrongBackground'], 3],
  ['diffIns', ['diffEditor.insertedLineBackground', 'diffEditor.insertedTextBackground'], 3],
  ['diffDel', ['diffEditor.removedLineBackground', 'diffEditor.removedTextBackground'], 3],
];

// Pares de UI: [foreground, fondo(s) de abajo hacia arriba, minimo].
// 4.5 = texto; 3 = glifos/iconos/guias (WCAG 1.4.11).
const UI_PAIRS = [
  ['editorLineNumber.foreground', 'editor.background', 4.5], ['editorCodeLens.foreground', 'editor.background', 4.5],
  ['editorGhostText.foreground', 'editor.background', 4.5], ['editorInlayHint.foreground', ['editor.background', 'editorInlayHint.background'], 4.5],
  ['editorInlayHint.typeForeground', ['editor.background', 'editorInlayHint.typeBackground'], 4.5],
  ['editorWhitespace.foreground', 'editor.background', 3], ['editorIndentGuide.activeBackground1', 'editor.background', 3],
  ['editorCursor.foreground', 'editor.background', 3],
  ['editorBracketHighlight.foreground1', 'editor.background', 3], ['editorBracketHighlight.foreground2', 'editor.background', 3],
  ['editorBracketHighlight.foreground3', 'editor.background', 3],
  ['editorError.foreground', 'editor.background', 3], ['editorWarning.foreground', 'editor.background', 3], ['editorInfo.foreground', 'editor.background', 3],
  ['tab.activeForeground', ['editor.background', 'editorGroupHeader.tabsBackground', 'tab.activeBackground'], 4.5],
  ['tab.inactiveForeground', ['editor.background', 'editorGroupHeader.tabsBackground'], 4.5],
  ['tab.unfocusedActiveForeground', ['editor.background', 'editorGroupHeader.tabsBackground', 'tab.activeBackground'], 4.5],
  ['sideBarTitle.foreground', 'sideBar.background', 4.5], ['sideBar.foreground', 'sideBar.background', 4.5],
  ['sideBarSectionHeader.foreground', 'sideBarSectionHeader.background', 4.5],
  ['descriptionForeground', 'editorWidget.background', 4.5], ['gitDecoration.ignoredResourceForeground', 'sideBar.background', 3],
  ['gitDecoration.modifiedResourceForeground', 'sideBar.background', 4.5], ['gitDecoration.deletedResourceForeground', 'sideBar.background', 4.5],
  ['gitDecoration.addedResourceForeground', 'sideBar.background', 4.5], ['gitDecoration.submoduleResourceForeground', 'sideBar.background', 4.5],
  ['list.activeSelectionForeground', ['sideBar.background', 'list.activeSelectionBackground'], 4.5],
  ['list.hoverForeground', ['sideBar.background', 'list.hoverBackground'], 4.5],
  ['list.inactiveSelectionForeground', ['sideBar.background', 'list.inactiveSelectionBackground'], 4.5],
  ['list.highlightForeground', 'sideBar.background', 4.5],
  ['titleBar.activeForeground', 'titleBar.activeBackground', 4.5],
  ['titleBar.inactiveForeground', 'titleBar.inactiveBackground', 4.5], ['input.placeholderForeground', 'input.background', 4.5],
  ['input.foreground', 'input.background', 4.5], ['quickInput.foreground', 'quickInput.background', 4.5],
  ['quickInputList.focusForeground', ['quickInput.background', 'quickInputList.focusBackground'], 4.5],
  ['menu.foreground', 'menu.background', 4.5], ['menu.selectionForeground', ['menu.background', 'menu.selectionBackground'], 4.5],
  ['notifications.foreground', 'notifications.background', 4.5],
  ['errorForeground', 'sideBar.background', 4.5], ['activityBar.foreground', 'activityBar.background', 3],
  ['activityBar.inactiveForeground', 'activityBar.background', 3],
  ['activityBarBadge.foreground', 'activityBarBadge.background', 4.5],
  ['statusBar.foreground', 'statusBar.background', 4.5],
  ['panelTitle.activeForeground', 'panel.background', 4.5], ['panelTitle.inactiveForeground', 'panel.background', 4.5],
  ['panelSectionHeader.foreground', 'panelSectionHeader.background', 4.5],
  ['badge.foreground', 'badge.background', 4.5], ['button.foreground', 'button.background', 4.5],
  ['button.secondaryForeground', ['panel.background', 'button.secondaryBackground'], 4.5],
  ['extensionButton.prominentForeground', 'extensionButton.prominentBackground', 4.5],
  ['statusBar.debuggingForeground', 'statusBar.debuggingBackground', 4.5], ['statusBar.noFolderForeground', 'statusBar.noFolderBackground', 4.5],
  ['statusBarItem.warningForeground', 'statusBarItem.warningBackground', 4.5], ['statusBarItem.errorForeground', 'statusBarItem.errorBackground', 4.5],
  ['statusBarItem.remoteForeground', 'statusBarItem.remoteBackground', 4.5], ['statusBarItem.offlineForeground', 'statusBarItem.offlineBackground', 4.5],
  ['statusBarItem.errorHoverForeground', 'statusBarItem.errorHoverBackground', 4.5],
  ['statusBarItem.warningHoverForeground', 'statusBarItem.warningHoverBackground', 4.5],
  ['statusBarItem.offlineHoverForeground', 'statusBarItem.offlineHoverBackground', 4.5],
  ['activityErrorBadge.foreground', 'activityErrorBadge.background', 4.5], ['activityWarningBadge.foreground', 'activityWarningBadge.background', 4.5],
  ['keybindingLabel.foreground', 'keybindingLabel.background', 4.5], ['textLink.foreground', 'sideBar.background', 4.5],
  ['textLink.foreground', 'editor.background', 4.5],
  ['textLink.activeForeground', 'editorHoverWidget.background', 4.5], ['textPreformat.foreground', ['editorHoverWidget.background', 'textPreformat.background'], 4.5],
  ['peekViewResult.lineForeground', 'peekViewResult.background', 4.5], ['peekViewResult.fileForeground', 'peekViewResult.background', 4.5],
  ['peekViewTitleDescription.foreground', 'peekViewTitle.background', 4.5],
  ['peekViewTitleLabel.foreground', 'peekViewTitle.background', 4.5],
  ['editorWidget.foreground', 'editorWidget.background', 4.5], ['editorHoverWidget.foreground', 'editorHoverWidget.background', 4.5],
  ['editorSuggestWidget.foreground', 'editorSuggestWidget.background', 4.5],
  ['editorSuggestWidget.focusHighlightForeground', ['editorSuggestWidget.background', 'editorSuggestWidget.selectedBackground'], 4.5],
  ['editorSuggestWidget.selectedForeground', ['editorSuggestWidget.background', 'editorSuggestWidget.selectedBackground'], 4.5],
  ['editorSuggestWidgetStatus.foreground', 'editorSuggestWidget.background', 4.5],
  ['quickInputList.focusHighlightForeground', ['quickInput.background', 'quickInputList.focusBackground'], 4.5],
  ['list.focusHighlightForeground', ['sideBar.background', 'list.activeSelectionBackground'], 3],
  ['list.deemphasizedForeground', 'sideBar.background', 4.5], ['disabledForeground', 'sideBar.background', 4.0],
  ['terminal.foreground', 'terminal.background', 4.5], ['terminal.foreground', ['terminal.background', 'terminal.selectionBackground'], 4.5],
  ['inputValidation.errorForeground', 'inputValidation.errorBackground', 4.5], ['inputValidation.warningForeground', 'inputValidation.warningBackground', 4.5],
  ['inputValidation.infoForeground', 'inputValidation.infoBackground', 4.5], ['banner.foreground', 'banner.background', 4.5],
  ['debugView.exceptionLabelForeground', 'debugView.exceptionLabelBackground', 4.5], ['editor.foldPlaceholderForeground', 'editor.background', 4.5],
  ['git.blame.editorDecorationForeground', 'editor.background', 4.5], ['breadcrumb.foreground', 'editor.background', 4.5],
  ['breadcrumb.focusForeground', 'editor.background', 4.5],
  ['tree.indentGuidesStroke', 'sideBar.background', 3],
  ...['Red', 'Green', 'Yellow', 'Blue', 'Magenta', 'Cyan', 'White'].flatMap((c) => [
    [`terminal.ansi${c}`, 'terminal.background', 4.5], [`terminal.ansiBright${c}`, 'terminal.background', 4.5],
  ]),
  ['terminal.ansiBrightBlack', 'terminal.background', 4.5],
];

// The template must not contain raw hex (besides the universal black/white).
function checkTemplatePurity() {
  const src = fs.readFileSync(path.join(__dirname, 'template.js'), 'utf8');
  const hits = [];
  src.split('\n').forEach((line, i) => {
    for (const m of line.matchAll(/#[0-9A-Fa-f]{3,8}\b/g)) if (!/^#(000000|FFFFFF)$/i.test(m[0])) hits.push(`template.js:${i + 1} ${m[0]}`);
  });
  return hits;
}

function validate(slug, verbose) {
  const fails = [];
  const warns = [];
  const fail = (m) => fails.push(m);
  const log = (m) => { if (verbose) console.log('    ' + m); };

  const v = loadVariant(slug);
  v.errors.forEach((e) => fail(`paleta: ${e}`));
  if (v.errors.length) return { fails, warns };
  const pal = v.palette;
  const file = path.join(ROOT, v.file);

  // 1. Parseo estricto: solo se quitan comentarios; JSON.parse rechaza comas finales.
  let t;
  try { t = JSON.parse(C.stripComments(fs.readFileSync(file, 'utf8'))); } catch (e) { fail(`parseo estricto: ${e.message}`); return { fails, warns }; }

  // 2. El archivo coincide con lo que genera la paleta (no editado a mano / no viejo).
  try { assert.deepStrictEqual(t, JSON.parse(C.stripComments(render(pal).text))); } catch { fail(`${v.file} no coincide con build/palettes/${slug}.js: corre "node build/generate.js ${slug}"`); }

  // 3. Cabecera.
  if (t.$schema !== 'vscode://schemas/color-theme') fail('falta $schema');
  if (t.name !== v.label) fail(`name "${t.name}" != label de package.json "${v.label}"`);
  if (t.type !== 'dark') fail(`type "${t.type}" (se espera dark)`);

  // 4. Keys oficiales y hex validos.
  const badKeys = Object.keys(t.colors).filter((k) => !VALID_KEYS.has(k));
  if (badKeys.length) fail(`keys de colors fuera de la lista oficial: ${badKeys.join(', ')}`);
  const badHex = Object.entries(t.colors).filter(([, x]) => !C.isHex(x)).map(([k, x]) => `${k}=${x}`);
  for (const r of t.tokenColors) if (r.settings.foreground && !C.isHex(r.settings.foreground)) badHex.push(`${r.name}=${r.settings.foreground}`);
  for (const [k, x] of Object.entries(t.semanticTokenColors)) { const f = typeof x === 'string' ? x : x.foreground; if (f && !C.isHex(f)) badHex.push(`${k}=${f}`); }
  if (badHex.length) fail(`hex invalidos: ${badHex.join(', ')}`);

  // 5. Selectores duplicados y meta.* de expresion completa.
  const seenSel = {};
  for (const r of t.tokenColors) for (const sel of [].concat(r.scope)) (seenSel[sel] = seenSel[sel] || []).push(r.name);
  const dups = Object.entries(seenSel).filter(([, x]) => x.length > 1);
  if (dups.length) fail(`selectores duplicados: ${dups.map(([k, x]) => `${k} (${x.join(' | ')})`).join('; ')}`);
  const metaWhole = Object.keys(seenSel).filter((s) => /^meta\.(function-call|method-call|function\.parameters|tag|import|require|method\.java|return-type)(\.[a-z]+)?$/.test(s) && !/generic/.test(s));
  if (metaWhole.length) fail(`selectores meta.* prohibidos: ${metaWhole.join(', ')}`);

  // 6. Contraste de tokens (por rol) sobre las superficies del editor.
  const ex = pal.contrastExceptions || {};
  const exRoles = Object.keys(ex).filter((k) => !VALID_KEYS.has(k));
  for (const r of exRoles) if (!(r in pal.colors)) fail(`contrastExceptions: rol desconocido ${r}`);
  const col = (k) => t.colors[k];
  const base = (layers) => C.stack(col('editor.background'), ...layers.map(col));
  const rolesByHex = {};
  for (const [role, hex] of Object.entries(pal.colors)) (rolesByHex[hex.toUpperCase()] = rolesByHex[hex.toUpperCase()] || []).push(role);
  const tokenFg = new Map(); // hex -> Set(roles)
  const { tokens } = require('./template')(pal);
  for (const tk of tokens) if (tk.role) { const h = pal.colors[tk.role]; if (!tokenFg.has(h)) tokenFg.set(h, new Set()); tokenFg.get(h).add(tk.role); }
  for (const x of Object.values(t.semanticTokenColors)) {
    const f = (typeof x === 'string' ? x : x.foreground);
    if (f && !tokenFg.has(f.toUpperCase())) tokenFg.set(f.toUpperCase(), new Set(rolesByHex[f.toUpperCase()] || ['(semantic)']));
  }
  let tokenLow = 0;
  for (const [hex, roles] of tokenFg) {
    const row = TOKEN_SURFACES.map(([n, layers, min]) => [n, C.contrast(hex, base(layers)), min]);
    const low = row.filter(([n, r, min]) => r < min);
    const allowed = low.filter(([n]) => [...roles].some((ro) => (ex[ro] || []).includes(n)));
    const bad = low.filter((l) => !allowed.includes(l));
    log(`${hex.padEnd(10)} ${[...roles].join('/').padEnd(28)} ${row.map(([n, r]) => `${n}:${r.toFixed(2)}`).join(' ')}${allowed.length ? '  (excepcion: ' + allowed.map((x) => x[0]).join(',') + ')' : ''}`);
    for (const [n, r, min] of bad) { tokenLow++; fail(`contraste token ${[...roles].join('/')} ${hex} sobre ${n}: ${r.toFixed(2)} < ${min}`); }
  }

  // 7. Contraste de UI.
  for (const [fk, bks, min] of UI_PAIRS) {
    const layers = [].concat(bks).map(col);
    if (!col(fk) || layers.some((x) => !x)) { warns.push(`par sin colores: ${fk} / ${[].concat(bks).join('+')}`); continue; }
    const first = C.parse(layers[0]);
    const b = first.a < 1 ? C.stack(col('editor.background'), ...layers) : C.stack(...layers);
    const r = C.contrast(col(fk), b);
    const allowed = (ex[fk] || []).length > 0 || ex[fk] === true;
    log(`${r < min ? (allowed ? 'EXC' : 'LOW') : 'ok '} ${r.toFixed(2).padStart(6)} (min ${min}) ${fk} / ${[].concat(bks).join('+')}`);
    if (r < min && !allowed) fail(`contraste UI ${fk} sobre ${[].concat(bks).join('+')}: ${r.toFixed(2)} < ${min}`);
  }

  // 8. Distincion entre roles de sintaxis (CIEDE2000).
  const dEx = (pal.distinctExceptions || []).map((pr) => pr.slice().sort().join('|'));
  for (let i = 0; i < DISTINCT_ROLES.length; i++) for (let j = i + 1; j < DISTINCT_ROLES.length; j++) {
    const ra = DISTINCT_ROLES[i], rb = DISTINCT_ROLES[j];
    const de = C.deltaE2000(pal.colors[ra], pal.colors[rb]);
    if (de < MIN_DELTA_E2000) {
      if (dEx.includes([ra, rb].sort().join('|'))) log(`ΔE00 ${ra}/${rb} ${de.toFixed(1)} (excepcion)`);
      else fail(`roles ${ra} (${pal.colors[ra]}) y ${rb} (${pal.colors[rb]}) casi iguales: ΔE2000 ${de.toFixed(1)} < ${MIN_DELTA_E2000}`);
    } else if (de < MIN_DELTA_E2000 + 4) log(`ΔE00 ${ra}/${rb} ${de.toFixed(1)} (cerca del minimo)`);
  }

  return { fails, warns, counts: { colors: Object.keys(t.colors).length, tokenColors: t.tokenColors.length, semantic: Object.keys(t.semanticTokenColors).length } };
}

function main(argv) {
  const verbose = argv.includes('--verbose') || argv.includes('-v');
  const arg = argv.filter((a) => !a.startsWith('-'))[0] || 'all';
  let slugs;
  try { slugs = selectVariants(arg); } catch (e) { console.error(e.message); return 2; }
  let failed = 0;
  const purity = checkTemplatePurity();
  if (purity.length) { failed++; console.error(`x template.js tiene hex crudos (usa roles de la paleta):\n  - ${purity.join('\n  - ')}`); }
  for (const slug of slugs) {
    if (!hasPalette(slug)) {
      if (arg === 'all') { console.log(`- ${slug}: sin paleta (v1 hecho a mano), se salta`); continue; }
      console.error(`x ${slug}: no existe build/palettes/${slug}.js`); failed++; continue;
    }
    console.log(`· ${slug} (${VARIANTS[slug].file})`);
    const { fails, warns, counts } = validate(slug, verbose);
    warns.forEach((w) => console.log(`  ! ${w}`));
    if (fails.length) { failed++; console.error(`x ${slug}: ${fails.length} fallo(s)\n  - ${fails.join('\n  - ')}`); }
    else console.log(`✓ ${slug}: ok (${counts.colors} colors, ${counts.tokenColors} tokenColors, ${counts.semantic} semantic)`);
  }
  return failed ? 1 : 0;
}

if (require.main === module) process.exit(main(process.argv.slice(2)));
