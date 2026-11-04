'use strict';
// Retro Hacker Green v2: fosforo CRT sobre negro, codigo en oro.
// Roles y su significado: build/roles.js (y build/README.md).

// Tonos base de la variante (aliases locales; un mismo tono cubre varios roles).
const phosphor = '#00FF00';
const punct = '#00CC00';
const mint = '#66FF66';
const lime = '#AAFF00';
const pale = '#B8F5B8';
const spring = '#00FA9A';
const sea = '#3CB371';
const olive = '#7A9E3A';
const gold = '#FFD700';
const amber = '#FF9F1C';
const ember = '#FF6F3C';
const cyan = '#00E5FF';
const teal = '#2EC4B6';
const red = '#FF3B3B';
const redBright = '#FF6B6B';

module.exports = {
  name: 'Retro Hacker Green', // = label en package.json (no cambiar)
  title: 'RETRO HACKER GREEN v2',
  tagline: 'fosforo CRT sobre negro, codigo en oro',
  rules: [
    'rojo solo para errores · azul/magenta solo en la paleta ANSI',
    'bold = keywords, tags y declaraciones; nunca expresiones completas (meta.*)',
    'seleccion oro, find ambar, word highlight verde (lectura) / cyan (escritura)',
  ],

  // fontStyle: se usan los defaults de build/roles.js (FONT_STYLE_DEFAULTS).
  fontStyle: {},

  colors: {
    // Fondos
    bg0: '#000100',
    bgDeep: '#000000',
    bg1: '#000A00',
    bg2: '#041104',
    bg3: '#0A1F0A',
    bg4: '#133713',
    bgPeek: '#04140A',
    bgHover: '#132E13',
    bgActive: '#003300',
    lineHighlight: '#132E137A',
    lineHighlightBorder: '#135E047C',
    bgSideHeader: '#010E01',
    bgActivityBar: '#08180A',
    bgTitleBar: '#061102',
    bgTitleBarInactive: '#001100',
    bgCommandCenter: '#051305',
    bgCommandCenterActive: '#002C00',
    bgStatusBar: '#001400',
    errorBg: '#2A0808',
    warningBg: '#2A1A04',
    infoBg: '#02262A',
    exceptionBg: '#1A0505',

    // Bordes
    border: '#00AA00',
    focus: punct,
    borderDim: '#15410D',

    // UI
    uiAccent: phosphor,
    uiAccentAlt: lime,
    uiAccentCool: cyan,
    uiAccentWarm: gold,
    onAccent: '#000000',
    onSignal: '#000000',
    cursor: phosphor,
    uiText: '#4FCC15',
    uiTitle: '#3FCF2A',
    uiTextBright: '#FFFFFF',
    uiTextSoft: '#E0FFE0',
    textNeutral: '#B8D8B8',
    textDim: '#3FA82F',
    tabUnfocusedText: '#2E7A2E',
    textGhost: '#5F8F5F',
    textDisabled: '#4F7F4F',
    ignored: '#4F8A4F',
    inactiveIcon: '#5F875F',
    lineNumber: '#3E9A2E',
    guide: '#1E4E1E',
    guideStrong: '#2E6B2E',
    terminalText: '#05D805',
    inlayHint: '#7FBF7F',
    inlayHintType: '#6FB8AE',

    // Estados
    error: red,
    errorSoft: redBright,
    warning: amber,
    warningHover: '#FFB54D',
    info: cyan,
    success: phosphor,
    attention: ember,
    attentionHover: '#FF8F66',
    debug: amber,

    // Diff / VCS
    inserted: mint,
    deleted: red,
    modified: gold,
    changed: amber,
    diffAdded: phosphor,
    mergeCurrent: phosphor,
    mergeIncoming: cyan,
    mergeBase: gold,

    // Highlights
    selection: gold,
    findMatch: amber,
    highlightRead: phosphor,
    highlightWrite: cyan,
    bracketMatch: lime,
    bracket1: phosphor,
    bracket2: cyan,
    bracket3: amber,

    // Sintaxis
    text: '#F2E6A0', // dorado suave: texto plano; los strings quedan en oro pleno
    keyword: mint,
    tag: mint,
    func: lime,
    type: cyan,
    namespace: teal,
    variable: pale,
    parameter: pale,
    property: spring,
    attribute: spring,
    string: gold,
    number: amber,
    constant: amber,
    regexp: ember,
    escape: ember,
    special: ember,
    comment: olive,
    operator: sea,
    punctuation: punct,
    selfVar: gold,
    link: cyan,
    linkActive: teal,
    markupHeading: phosphor,
    markupBold: mint,
    markupItalic: pale,
    markupCode: amber,

    // ANSI 16 (azul/magenta solo existen aqui)
    ansiBlack: '#0F1F0F',
    ansiRed: red,
    ansiGreen: mint,
    ansiYellow: gold,
    ansiBlue: '#2F8FFF',
    ansiMagenta: '#D633FF',
    ansiCyan: '#00B8D4',
    ansiWhite: '#B8D8B8',
    ansiBrightBlack: '#5F875F',
    ansiBrightRed: redBright,
    ansiBrightGreen: lime,
    ansiBrightYellow: '#FFFF5C',
    ansiBrightBlue: '#6CB8FF',
    ansiBrightMagenta: '#FF80FF',
    ansiBrightCyan: '#00F0FF',
    ansiBrightWhite: '#F2FFF2',
  },

  // Excepciones de contraste documentadas: rol -> superficies donde se acepta
  // quedar bajo el minimo. Ver build/README.md.
  contrastExceptions: {
    error: ['selection'],                // 3.97: el error va subrayado
    textGhost: ['selection', 'diffIns'], // texto desenfatizado a proposito
    comment: ['selection'],              // 4.16: comentario seleccionado, se lee bien
    textDim: ['selection'],              // 4.20: texto atenuado seleccionado
  },
  // Pares de roles de sintaxis que pueden parecerse (ΔE bajo) a proposito.
  distinctExceptions: [],
};
