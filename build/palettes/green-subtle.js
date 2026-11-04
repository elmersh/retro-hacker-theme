'use strict';
// Retro Hacker Green - Subtle v2: verde matrix sobre negro puro, en version calmada.
// Misma familia que Green, pero el texto es verde (no oro), los acentos van algo
// desaturados y hay menos negrita. Roles y su significado: build/roles.js.

// Tonos base de la variante (aliases locales).
const matrix = '#00FF41';  // identidad: fosforo matrix
const matrixDim = '#00E03A';
const soft = '#7CE896';    // texto plano: matrix suavizado
const pale = '#BCE8C4';
const lime = '#B4E05C';
const spring = '#2EDCBC';
const sea = '#94A40C'; // musgo: operadores, lejos de los verdes del texto
const punct = '#30B856';
const olive = '#7C9A72';
const gold = '#E6C450';
const amber = '#E8964A';
const ember = '#F0906E';
const aqua = '#62C9D9';
const teal = '#45AC92';
const red = '#FF4848';
const redSoft = '#FF7F7F';

module.exports = {
  name: 'Retro Hacker Green - Subtle', // = label en package.json (no cambiar)
  title: 'RETRO HACKER GREEN SUBTLE v2',
  tagline: 'verde matrix calmado sobre negro puro, strings en oro suave',
  rules: [
    'rojo solo para errores · azul/magenta solo en la paleta ANSI',
    'chrome callado: scanline casi invisible, bordes y numeros de linea tenues',
    'seleccion verde, find oro, word highlight lima (lectura) / aqua (escritura)',
  ],

  // fontStyle: defaults de build/roles.js (v1 Subtle tambien usaba bold en keywords).
  fontStyle: {},

  colors: {
    // Fondos (negro puro como en v1)
    bg0: '#000000',
    bgDeep: '#000000',
    bg1: '#000C03',
    bg2: '#030F06',
    bg3: '#08190D',
    bg4: '#103018',
    bgPeek: '#03130A',
    bgHover: '#0F2A16',
    bgActive: '#002A0C',
    lineHighlight: '#0F2A1680', // scanline mas tenue que Green
    lineHighlightBorder: '#1A4A2440',
    bgSideHeader: '#010F05',
    bgActivityBar: '#000C03',
    bgTitleBar: '#030F06',
    bgTitleBarInactive: '#000C03',
    bgCommandCenter: '#051208',
    bgCommandCenterActive: '#00260B',
    bgStatusBar: '#000F04',
    errorBg: '#260808',
    warningBg: '#261606',
    infoBg: '#04202A',
    exceptionBg: '#180505',

    // Bordes
    border: '#1F8A3A',
    focus: '#2FBF55',
    borderDim: '#123A1C',

    // UI
    uiAccent: matrix,
    uiAccentAlt: lime,
    uiAccentCool: aqua,
    uiAccentWarm: gold,
    onAccent: '#000000',
    onSignal: '#000000',
    cursor: matrix,
    uiText: '#45C463',
    uiTitle: '#3FCC60',
    uiTextBright: '#E8FFEC',
    uiTextSoft: '#CCEFD3',
    textNeutral: '#B0D4B8',
    textDim: '#40B05C',
    tabUnfocusedText: '#2F8545',
    textGhost: '#6E9E78',
    textDisabled: '#4D7A56',
    ignored: '#4F8A5A',
    inactiveIcon: '#5C8466',
    lineNumber: '#3A9A52',
    guide: '#163F20',
    guideStrong: '#2E7040',
    terminalText: '#2FE060',
    inlayHint: '#7DB88A',
    inlayHintType: '#6CB3B0',

    // Estados
    error: red,
    errorSoft: redSoft,
    warning: amber,
    warningHover: '#F2AE6E',
    info: aqua,
    success: matrix,
    attention: ember,
    attentionHover: '#EB907E',
    debug: amber,

    // Diff / VCS
    inserted: '#00FF41',
    deleted: red,
    modified: gold,
    changed: amber,
    diffAdded: matrix,
    mergeCurrent: matrix,
    mergeIncoming: aqua,
    mergeBase: gold,

    // Highlights
    selection: '#1FB84A', // verde calmado: con alpha 3A no apaga el texto
    findMatch: gold,
    highlightRead: lime,
    highlightWrite: aqua,
    bracketMatch: lime,
    bracket1: matrixDim,
    bracket2: aqua,
    bracket3: amber,

    // Sintaxis
    text: soft,
    keyword: matrix,
    tag: matrixDim,
    func: lime,
    type: aqua,
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
    operator: '#A9BC2E', // musgo mas limpio
    punctuation: punct,
    selfVar: gold,
    link: aqua,
    linkActive: teal,
    markupHeading: matrix,
    markupBold: matrix,
    markupItalic: pale,
    markupCode: amber,

    // ANSI 16 (azul/magenta solo aqui, algo apagados)
    ansiBlack: '#0C1A10',
    ansiRed: red,
    ansiGreen: matrixDim,
    ansiYellow: gold,
    ansiBlue: '#4C95F0',
    ansiMagenta: '#C076F0',
    ansiCyan: '#3FB8C4',
    ansiWhite: '#B0D4B8',
    ansiBrightBlack: '#5C8466',
    ansiBrightRed: redSoft,
    ansiBrightGreen: '#7CFF9A',
    ansiBrightYellow: '#FFE07A',
    ansiBrightBlue: '#85B5FF',
    ansiBrightMagenta: '#E0A0FF',
    ansiBrightCyan: '#7FE6EE',
    ansiBrightWhite: '#EAF7EC',
  },

  contrastExceptions: {},
  distinctExceptions: [],
};
