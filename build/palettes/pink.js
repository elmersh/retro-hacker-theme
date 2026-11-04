'use strict';
// Retro Hacker Pink v2: neon magenta sobre negro, synthwave/cyber hacker.
// Roles y su significado: build/roles.js (y build/README.md).

// Tonos base de la variante (aliases locales; un mismo tono cubre varios roles).
const neon = '#FF00FF';
const punct = '#D070D0';
const magenta = '#FF55FF';
const hot = '#FF79C6';
const pinkUi = '#FF69B4';
const violet = '#C88CFF';
const selViolet = '#A878FF';
const pale = '#FFB8EC';
const mauve = '#B084B0';
const deep = '#FF2AA0'; // deep pink de la v1 (#FF1493), aclarado
const gold = '#FFD700';
const amber = '#FF9F1C';
const ember = '#FF6F3C';
const aqua = '#40FFD0';
const cyan = '#00E5FF';
const periwinkle = '#8FA0FF';
const mint = '#5CFF9D';
const red = '#FF3C3C'; // rojo puro algo aclarado: ΔE >= 24 contra todos los rosas
const redBright = '#FF7070';

module.exports = {
  name: 'Retro Hacker Pink', // = label en package.json (no cambiar)
  title: 'RETRO HACKER PINK v2',
  tagline: 'neon magenta sobre negro, synthwave hacker',
  rules: [
    'rojo solo para errores · verde solo para insertado/exito y ANSI',
    'bold = keywords, tags y declaraciones; nunca expresiones completas (meta.*)',
    'seleccion violeta, find ambar, word highlight magenta (lectura) / cyan (escritura)',
  ],

  fontStyle: {},

  colors: {
    // Fondos
    bg0: '#010001',
    bgDeep: '#000000',
    bg1: '#0A000A',
    bg2: '#110411',
    bg3: '#1F0A1F',
    bg4: '#371337',
    bgPeek: '#140414',
    bgHover: '#2E132E',
    bgActive: '#330033',
    lineHighlight: '#2E132E7A',
    lineHighlightBorder: '#5E135E7C',
    bgSideHeader: '#0E010E',
    bgActivityBar: '#180818',
    bgTitleBar: '#110611',
    bgTitleBarInactive: '#110011',
    bgCommandCenter: '#130513',
    bgCommandCenterActive: '#2C002C',
    bgStatusBar: '#140014',
    errorBg: '#2A0808',
    warningBg: '#2A1A04',
    infoBg: '#02262A',
    exceptionBg: '#1A0505',

    // Bordes
    border: '#AA00AA',
    focus: '#E000E0',
    borderDim: '#411541',

    // UI
    uiAccent: neon,
    uiAccentAlt: pinkUi,
    uiAccentCool: cyan,
    uiAccentWarm: gold,
    onAccent: '#000000',
    onSignal: '#000000',
    cursor: neon,
    uiText: '#E04FE0',
    uiTitle: '#E85AE8',
    uiTextBright: '#FFFFFF',
    uiTextSoft: '#FFE0FF',
    textNeutral: '#D8B8D8',
    textDim: '#D062D0',
    tabUnfocusedText: '#A040A0',
    textGhost: '#A878A8',
    textDisabled: '#8A608A',
    ignored: '#9A6A9A',
    inactiveIcon: '#9A709A',
    lineNumber: '#C050C0',
    guide: '#4E1E4E',
    guideStrong: '#8A458A',
    terminalText: '#F040F0',
    inlayHint: '#C890C8',
    inlayHintType: '#8FBFD8',

    // Estados
    error: red,
    errorSoft: redBright,
    warning: amber,
    warningHover: '#FFB54D',
    info: cyan,
    success: mint,
    attention: ember,
    attentionHover: '#FF8F66',
    debug: amber,

    // Diff / VCS
    inserted: mint,
    deleted: red,
    modified: gold,
    changed: amber,
    diffAdded: '#00D070', // verde mas oscuro: solo fondos de diff y gutter
    mergeCurrent: mint,
    mergeIncoming: cyan,
    mergeBase: gold,

    // Highlights
    selection: '#B480FF',
    findMatch: amber,
    highlightRead: neon,
    highlightWrite: cyan,
    bracketMatch: pinkUi,
    bracket1: neon,
    bracket2: cyan,
    bracket3: amber,

    // Sintaxis
    text: '#F4DCEF',
    keyword: magenta,
    tag: magenta,
    func: violet,
    type: cyan,
    namespace: periwinkle,
    variable: pale,
    parameter: pale,
    property: hot,
    attribute: hot,
    string: gold,
    number: amber,
    constant: amber,
    regexp: aqua,
    escape: aqua,
    special: aqua,
    comment: mauve,
    operator: deep,
    punctuation: punct,
    selfVar: gold,
    link: cyan,
    linkActive: periwinkle,
    markupHeading: neon,
    markupBold: magenta,
    markupItalic: pale,
    markupCode: amber,

    // ANSI 16
    ansiBlack: '#1F0F1F',
    ansiRed: red,
    ansiGreen: mint,
    ansiYellow: gold,
    ansiBlue: '#5C8FFF',
    ansiMagenta: '#B44DFF', // violeta: el magenta puro ya es el texto del terminal
    ansiCyan: '#00C8E0',
    ansiWhite: '#D8B8D8',
    ansiBrightBlack: '#8A6A8A',
    ansiBrightRed: redBright,
    ansiBrightGreen: '#9DFFC4',
    ansiBrightYellow: '#FFFF5C',
    ansiBrightBlue: '#8FB8FF',
    ansiBrightMagenta: '#D69BFF',
    ansiBrightCyan: '#5CF5FF',
    ansiBrightWhite: '#FFF2FF',
  },

  // Excepciones de contraste documentadas. Las 4 de UI vienen del template:
  // derivan alpha(uiAccent, ~0x90-0x9C) y el magenta #FF00FF tiene ~40% de la
  // luminancia del verde, asi que ningun magenta neon llega a 4.5 con ese
  // alpha (haria falta un rosa pastel ~#FFA8FF, que mata la identidad).
  // Fix propuesto en template.js: que lean textDim/textGhost/inactiveIcon.
  contrastExceptions: {
    error: ['selection'],     // 4.46: el error va subrayado (igual que Green)
    textGhost: ['selection'], // 4.43: texto desenfatizado a proposito
  },
  distinctExceptions: [],
};
