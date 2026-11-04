'use strict';
// Retro Hacker Blue v2: fosforo azul frio sobre azul-negro (terminal IBM / cyberdeck).
// Roles y su significado: build/roles.js (y build/README.md).
// Identidad v1: chrome #5EAFFF / #4C9EEB sobre #010111, numeros oro, tipos violeta,
// comentarios periwinkle. En v2 el codigo usa verde 3270 para strings y aqua-teal
// para info/links/propiedades, para que no se pierdan dentro del azul.

// Tonos base de la variante (aliases locales; un mismo tono cubre varios roles).
const phosphor = '#5EAFFF'; // azul fosforo: identidad
const beam = '#4C9EEB';     // azul haz: bordes de foco, puntuacion
const sky = '#8CCBFF';
const ice = '#C8DCFF';
const aqua = '#7FE9FF';
const teal = '#3FE0C5';
const violet = '#B98CFF';
const orchid = '#D8B0FF';
const green3270 = '#8EF0A0'; // verde de campo editable IBM 3270
const gold = '#FFD24A';
const amber = '#FFA94D';
const rose = '#FF85C8';
const steel = '#8790B8';
const red = '#FF5050';
const redBright = '#FF7878';

module.exports = {
  name: 'Retro Hacker Blue', // = label en package.json (no cambiar)
  title: 'RETRO HACKER BLUE v2',
  tagline: 'fosforo azul frio sobre azul-negro, terminal IBM',
  rules: [
    'rojo solo para errores · magenta solo en la paleta ANSI',
    'bold = keywords, tags y declaraciones; nunca expresiones completas (meta.*)',
    'seleccion azul haz, find ambar, word highlight azul (lectura) / teal (escritura)',
  ],

  fontStyle: {},

  colors: {
    // Fondos
    bg0: '#010111',
    bgDeep: '#00000A',
    bg1: '#010216',
    bg2: '#030A26',
    bg3: '#081636',
    bg4: '#11285A',
    bgPeek: '#040E2E',
    bgHover: '#0F2350',
    bgActive: '#0A2A5C',
    lineHighlight: '#0C2B5E7A',
    lineHighlightBorder: '#12397E7C',
    bgSideHeader: '#020624',
    bgActivityBar: '#001534',
    bgTitleBar: '#001538',
    bgTitleBarInactive: '#010B22',
    bgCommandCenter: '#041A42',
    bgCommandCenterActive: '#0A2A5C',
    bgStatusBar: '#00163E',
    errorBg: '#2A0712',
    warningBg: '#2A2008',
    infoBg: '#032A2C',
    exceptionBg: '#1A0510',

    // Bordes
    border: '#316CBD',
    focus: beam,
    borderDim: '#15306A',

    // UI
    uiAccent: phosphor,
    uiAccentAlt: aqua,
    uiAccentCool: teal,
    uiAccentWarm: gold,
    onAccent: '#000010',
    onSignal: '#000000',
    cursor: '#7CBEFF',
    uiText: '#6FA6E8',
    uiTitle: '#7CB4F5',
    uiTextBright: '#FFFFFF',
    uiTextSoft: '#DDF0FF',
    textNeutral: '#B4C8E8',
    textDim: '#6296DA',
    tabUnfocusedText: '#4876B0',
    textGhost: '#7488B6',
    textDisabled: '#5C70A0',
    ignored: '#5A72A8',
    inactiveIcon: '#647AAA',
    lineNumber: '#4F86C8',
    guide: '#13306A',
    guideStrong: '#2C5AA0',
    terminalText: '#A0CCFF', // hielo: separado de ansiBrightBlue (fosforo) y de ansiWhite
    inlayHint: '#7FA4D8',
    inlayHintType: '#62B8B0',

    // Estados
    error: red,
    errorSoft: redBright,
    warning: gold,
    warningHover: '#FFE07A',
    info: teal,
    success: green3270,
    attention: amber,
    attentionHover: '#FFC07A',
    debug: amber,

    // Diff / VCS
    inserted: green3270,
    deleted: red,
    modified: gold,
    changed: amber,
    diffAdded: '#3FD080',
    mergeCurrent: '#3FD080',
    mergeIncoming: teal,
    mergeBase: violet,

    // Highlights
    selection: beam,
    findMatch: amber,
    highlightRead: phosphor,
    highlightWrite: teal,
    bracketMatch: aqua,
    bracket1: phosphor,
    bracket2: violet,
    bracket3: gold,

    // Sintaxis
    text: '#E4ECFF', // blanco frio: texto plano; los strings van en verde 3270
    keyword: phosphor,
    tag: phosphor,
    func: aqua,
    type: violet,
    namespace: orchid,
    variable: ice,
    parameter: ice,
    property: teal,
    attribute: teal,
    string: green3270,
    number: gold,
    constant: gold,
    regexp: rose,
    escape: rose,
    special: rose,
    comment: steel,
    operator: '#4FC0E0',
    punctuation: '#5A8CDA',
    selfVar: amber,
    link: teal,
    linkActive: aqua,
    markupHeading: phosphor,
    markupBold: sky,
    markupItalic: ice,
    markupCode: gold,

    // ANSI 16 (tenidas hacia el azul frio; magenta solo existe aqui)
    ansiBlack: '#0A1430',
    ansiRed: red,
    ansiGreen: '#4FD88A',
    ansiYellow: gold,
    ansiBlue: '#3B85E8',
    ansiMagenta: '#B86CFF',
    ansiCyan: '#00C8D8',
    ansiWhite: '#9AA8C4',
    ansiBrightBlack: '#64789E',
    ansiBrightRed: redBright,
    ansiBrightGreen: green3270,
    ansiBrightYellow: '#FFEF7A',
    ansiBrightBlue: phosphor,
    ansiBrightMagenta: '#E0A0FF',
    ansiBrightCyan: '#5FF5FF',
    ansiBrightWhite: '#F0F6FF',
  },

  // Excepciones de contraste documentadas. Ver build/README.md.
  contrastExceptions: {
    textGhost: ['selection'], // 4.35: ghost text/blame desenfatizado a proposito
  },
  distinctExceptions: [],
};
