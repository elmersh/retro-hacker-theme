'use strict';
// Schema of palette roles shared by every Retro Hacker variant.
// - The meaning of a role is the same in all variants; only the hex changes.
// - `fallback` (optional role): function of the already-resolved palette, used
//   when a palette omits that role. Roles without fallback are REQUIRED.
// - `desc` (Spanish) feeds the generated header of each theme and the README.
const { mix } = require('./lib/color');

const ROLES = [
  // ── Fondos ──
  { group: 'Fondos' },
  { name: 'bg0', desc: 'fondo del editor, gutter, sticky scroll' },
  { name: 'bgDeep', desc: 'fondo mas profundo: terminal, tab activa' },
  { name: 'bg1', desc: 'sidebar, region sin cambios del diff' },
  { name: 'bg2', desc: 'panel, output, sticky del terminal' },
  { name: 'bg3', desc: 'widgets: find, suggest, hover, inputs, menus, quick input' },
  { name: 'bg4', desc: 'headers elevados: peek title, keybinding label, banner' },
  { name: 'bgPeek', desc: 'editor del peek view', fallback: (p) => p.bg2 },
  { name: 'bgHover', desc: 'hover del sticky scroll (editor y terminal)', fallback: (p) => p.bg4 },
  { name: 'bgActive', desc: 'base del hover de tabs (se usa con alpha)', fallback: (p) => mix(p.uiAccent, p.bg0, 0.2) },
  { name: 'lineHighlight', desc: 'linea activa (scanline), admite alpha' },
  { name: 'lineHighlightBorder', desc: 'borde de la linea activa, admite alpha', fallback: (p) => p.lineHighlight },
  { name: 'bgSideHeader', desc: 'headers de seccion del sidebar', fallback: (p) => p.bg1 },
  { name: 'bgActivityBar', desc: 'activity bar', fallback: (p) => p.bg1 },
  { name: 'bgTitleBar', desc: 'title bar activa', fallback: (p) => p.bg2 },
  { name: 'bgTitleBarInactive', desc: 'title bar sin foco', fallback: (p) => p.bg1 },
  { name: 'bgCommandCenter', desc: 'command center', fallback: (p) => p.bg2 },
  { name: 'bgCommandCenterActive', desc: 'command center activo', fallback: (p) => p.bgActive },
  { name: 'bgStatusBar', desc: 'status bar', fallback: (p) => p.bg2 },
  { name: 'errorBg', desc: 'fondo opaco de validacion: error', fallback: (p) => mix(p.error, p.bg0, 0.16) },
  { name: 'warningBg', desc: 'fondo opaco de validacion: warning', fallback: (p) => mix(p.warning, p.bg0, 0.16) },
  { name: 'infoBg', desc: 'fondo opaco de validacion: info', fallback: (p) => mix(p.info, p.bg0, 0.16) },
  { name: 'exceptionBg', desc: 'widget de excepcion del debugger', fallback: (p) => mix(p.error, p.bg0, 0.1) },

  // ── Bordes ──
  { group: 'Bordes' },
  { name: 'border', desc: 'bordes estructurales (sidebar, panel, tabs, widgets)' },
  { name: 'focus', desc: 'focusBorder, inputs, widgets activos, badge' },
  { name: 'borderDim', desc: 'separadores suaves, overview ruler' },

  // ── UI ──
  { group: 'UI: acentos y texto' },
  { name: 'uiAccent', desc: 'IDENTIDAD: acento UI, foreground general, botones, iconos' },
  { name: 'uiAccentAlt', desc: 'acento secundario: highlight con foco en listas/suggest, headers del sidebar' },
  { name: 'uiAccentCool', desc: 'acento frio: cursores secundarios, renamed, pasos del debugger, chat' },
  { name: 'uiAccentWarm', desc: 'acento calido: lightbulb, estrellas, pickerGroup, sin carpeta' },
  { name: 'onAccent', desc: 'texto sobre rellenos de uiAccent (botones, badges, remoto)' },
  { name: 'onSignal', desc: 'texto sobre rellenos de error/warning/debug/offline', fallback: (p) => p.onAccent },
  { name: 'cursor', desc: 'cursor del editor y del terminal', fallback: (p) => p.uiAccent },
  { name: 'uiText', desc: 'texto de sidebar, descripciones' },
  { name: 'uiTitle', desc: 'titulo del sidebar', fallback: (p) => p.uiText },
  { name: 'uiTextBright', desc: 'texto de items seleccionados / en hover' },
  { name: 'uiTextSoft', desc: 'texto de seleccion inactiva en listas', fallback: (p) => p.uiTextBright },
  { name: 'textNeutral', desc: 'texto de lineas en el resultado del peek', fallback: (p) => p.uiTextSoft },
  { name: 'textDim', desc: 'texto secundario: tabs inactivas, codelens, puntuacion de markup' },
  { name: 'tabUnfocusedText', desc: 'tabs inactivas de un grupo sin foco', fallback: (p) => p.textDim },
  { name: 'textGhost', desc: 'ghost text, blame, placeholders, tachado' },
  { name: 'textDisabled', desc: 'elementos deshabilitados' },
  { name: 'ignored', desc: 'archivos ignorados por git', fallback: (p) => p.textDisabled },
  { name: 'inactiveIcon', desc: 'iconos inactivos (breakpoint deshabilitado, test sin correr)', fallback: (p) => p.textGhost },
  { name: 'lineNumber', desc: 'numeros de linea, guia de indent activa' },
  { name: 'guide', desc: 'guias de indentacion' },
  { name: 'guideStrong', desc: 'whitespace, guias del arbol, numeros de linea atenuados' },
  { name: 'terminalText', desc: 'texto del terminal' },
  { name: 'inlayHint', desc: 'inlay hints (parametros)', fallback: (p) => p.textDim },
  { name: 'inlayHintType', desc: 'inlay hints de tipo', fallback: (p) => p.inlayHint },

  // ── Estados ──
  { group: 'Estados' },
  { name: 'error', desc: 'SOLO errores, invalid, breakpoints' },
  { name: 'errorSoft', desc: 'errores en listas, hover de error, referencias sin resolver' },
  { name: 'warning', desc: 'warnings, deprecated' },
  { name: 'warningHover', desc: 'hover del item warning de la status bar', fallback: (p) => p.warning },
  { name: 'info', desc: 'info, consola de debug, alertas note' },
  { name: 'success', desc: 'tests pasados, comando exitoso, start del debugger' },
  { name: 'attention', desc: 'conflictos git, offline, alertas important, sponsor' },
  { name: 'attentionHover', desc: 'hover del item offline', fallback: (p) => p.attention },
  { name: 'debug', desc: 'status bar en debug, stack frame en pausa', fallback: (p) => p.warning },

  // ── Diff / VCS ──
  { group: 'Diff y control de versiones' },
  { name: 'inserted', desc: 'texto agregado: markup.inserted, archivos agregados, lineas +' },
  { name: 'deleted', desc: 'texto/gutter borrado' },
  { name: 'modified', desc: 'gutter y archivos modificados, tab modificada' },
  { name: 'changed', desc: 'markup.changed en diffs', fallback: (p) => p.warning },
  { name: 'diffAdded', desc: 'gutter agregado y fondos de diff agregado (con alpha)', fallback: (p) => p.success },
  { name: 'mergeCurrent', desc: 'merge: current', fallback: (p) => p.diffAdded },
  { name: 'mergeIncoming', desc: 'merge: incoming', fallback: (p) => p.uiAccentCool },
  { name: 'mergeBase', desc: 'merge: base comun', fallback: (p) => p.selection },

  // ── Highlights ──
  { group: 'Highlights' },
  { name: 'selection', desc: 'seleccion y sus ocurrencias (con alpha)' },
  { name: 'findMatch', desc: 'resultados de busqueda (con alpha)' },
  { name: 'highlightRead', desc: 'word highlight de lectura (con alpha)', fallback: (p) => p.uiAccent },
  { name: 'highlightWrite', desc: 'word highlight de escritura, linked editing (con alpha)', fallback: (p) => p.uiAccentCool },
  { name: 'bracketMatch', desc: 'bracket match', fallback: (p) => p.uiAccentAlt },
  { name: 'bracket1', desc: 'ciclo de brackets: nivel 1/4' },
  { name: 'bracket2', desc: 'ciclo de brackets: nivel 2/5' },
  { name: 'bracket3', desc: 'ciclo de brackets: nivel 3/6' },

  // ── Sintaxis ──
  { group: 'Sintaxis' },
  { name: 'text', desc: 'IDENTIDAD: editor.foreground, texto JSX, codigo embebido' },
  { name: 'keyword', desc: 'keywords, storage, imports, directivas' },
  { name: 'tag', desc: 'tags HTML/XML, selectores de tag CSS', fallback: (p) => p.keyword },
  { name: 'func', desc: 'funciones, metodos, decorators, selectores de clase CSS' },
  { name: 'type', desc: 'tipos, clases, interfaces, componentes' },
  { name: 'namespace', desc: 'namespaces, modulos, type params, lifetimes, fechas de log' },
  { name: 'variable', desc: 'variables' },
  { name: 'parameter', desc: 'parametros', fallback: (p) => p.variable },
  { name: 'property', desc: 'propiedades, keys JSON/YAML/CSS/ini' },
  { name: 'attribute', desc: 'atributos de markup', fallback: (p) => p.property },
  { name: 'string', desc: 'strings, valores CSS/dotenv' },
  { name: 'number', desc: 'numeros, booleans, null, constantes del lenguaje' },
  { name: 'constant', desc: 'constantes UPPER_CASE/readonly, enum members, labels', fallback: (p) => p.number },
  { name: 'regexp', desc: 'expresiones regulares' },
  { name: 'escape', desc: 'escapes, placeholders, delimitadores ${ }, entidades', fallback: (p) => p.regexp },
  { name: 'special', desc: 'macros, !important, eventos', fallback: (p) => p.regexp },
  { name: 'comment', desc: 'comentarios, citas Markdown' },
  { name: 'operator', desc: 'operadores, separadores' },
  { name: 'punctuation', desc: 'puntuacion y brackets (sin colorizar)' },
  { name: 'selfVar', desc: 'this / self / super / cls' },
  { name: 'link', desc: 'links (UI y URLs de Markdown)', fallback: (p) => p.info },
  { name: 'linkActive', desc: 'link activo, texto de links Markdown', fallback: (p) => p.link },
  { name: 'markupHeading', desc: 'headings Markdown, secciones INI', fallback: (p) => p.uiAccent },
  { name: 'markupBold', desc: 'Markdown bold', fallback: (p) => p.keyword },
  { name: 'markupItalic', desc: 'Markdown italic', fallback: (p) => p.variable },
  { name: 'markupCode', desc: 'codigo inline (Markdown, hovers)', fallback: (p) => p.number },

  // ── ANSI ──
  { group: 'Terminal: paleta ANSI 16' },
  ...['Black', 'Red', 'Green', 'Yellow', 'Blue', 'Magenta', 'Cyan', 'White'].flatMap((c) => [
    { name: `ansi${c}`, desc: `terminal.ansi${c}` },
    { name: `ansiBright${c}`, desc: `terminal.ansiBright${c}` },
  ]).sort((x, y) => (x.name.startsWith('ansiBright') ? 1 : 0) - (y.name.startsWith('ansiBright') ? 1 : 0)),
];

// Default fontStyle per stylistic knob; a palette may override any of them
// in `fontStyle`. Values are TextMate fontStyle strings ('' = plain).
const FONT_STYLE_DEFAULTS = {
  comment: 'italic',       // comentarios y citas Markdown
  keyword: 'bold',         // keywords, imports, directivas, at-rules, macros
  tag: 'bold',             // tags HTML/XML/JSX, selectores de tag CSS
  declaration: 'bold',     // declaraciones de funcion/tipo (TextMate y semantic *.declaration)
  parameter: 'italic',     // parametros
  selfVar: 'bold italic',  // this / self / super / cls
  decorator: 'italic',     // decorators, annotations, atributos de Rust/Swift
  attribute: 'italic',     // atributos de markup
  heading: 'bold',         // headings Markdown y secciones INI
};

const roleList = ROLES.filter((r) => r.name);
const roleNames = roleList.map((r) => r.name);

// Resolve a palette's `colors` into a complete, validated role -> hex map.
function resolveColors(colors, { isHex }) {
  const errors = [];
  const unknown = Object.keys(colors).filter((k) => !roleNames.includes(k));
  if (unknown.length) errors.push(`roles desconocidos: ${unknown.join(', ')}`);
  const out = {};
  const resolving = new Set();
  const proxy = new Proxy(out, { get: (_, k) => get(k) });
  function get(name) {
    if (name in out) return out[name];
    const role = roleList.find((r) => r.name === name);
    if (!role) throw new Error(`rol inexistente referenciado: ${String(name)}`);
    if (resolving.has(name)) throw new Error(`fallback circular en ${name}`);
    resolving.add(name);
    let v = colors[name];
    if (v === undefined) {
      if (!role.fallback) { errors.push(`falta el rol requerido: ${name}`); v = '#FF00FF'; }
      else v = role.fallback(proxy);
    }
    if (!isHex(v)) errors.push(`hex invalido en ${name}: ${JSON.stringify(v)}`);
    resolving.delete(name);
    out[name] = typeof v === 'string' ? v.toUpperCase() : v;
    return out[name];
  }
  roleNames.forEach(get);
  return { colors: out, errors };
}

module.exports = { ROLES, roleList, roleNames, FONT_STYLE_DEFAULTS, resolveColors };
