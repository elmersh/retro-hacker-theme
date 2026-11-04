'use strict';
// Retro Hacker Amber v2: fosforo ambar CRT sobre casi-negro calido.
// Roles y su significado: build/roles.js (y build/README.md).
//
// Identidad (v1): ambar #FFB000 sobre #1A1006, todo en la familia ambar.
// v2 conserva el chrome y el texto plano en ambar y reparte los roles por
// luminosidad dentro de la familia calida (naranja, amarillo, albaricoque,
// melocoton, crema) mas tres acentos con proposito: aqua para tipos/info,
// chartreuse para literales y rosa para regex/escapes.
// El rojo de error se aleja del ambar (y del naranja de keywords) y el
// warning pasa a amarillo limon, para que ninguno se confunda con la identidad.

// Tonos base de la variante (aliases locales; un mismo tono cubre varios roles).
const amber = '#FFB000';     // identidad: chrome, texto plano, cursor
const amberLight = '#FFCB6B'; // this/self
const orange = '#FF8C1A';    // keywords, tags, acento calido
const yellow = '#FFE14D';    // funciones, acento alt, find, modificado
const lemon = '#FFFF55';     // warnings: limon puro, lejos del ambar (ΔE 25) y del amarillo de funciones (ΔE 9)
const apricot = '#FFD49C';   // variables
const peach = '#FFAD8C';     // propiedades
const cream = '#F2EDD6';     // strings (crema de la v1)
const tan = '#DDB088';       // operadores (caqui: lejos de puntuacion y variables)
const punct = '#D08E34';     // puntuacion
const brown = '#B39878';     // comentarios
const chartreuse = '#C8E05A'; // numeros, constantes
const pink = '#FF7AA2';      // regex, escapes, attention
const aqua = '#6FE0E0';      // tipos, info, acento frio
const teal = '#3FAE9C';      // namespaces, link activo
const green = '#7FE05A';     // agregado, success
const red = '#FF4040';       // SOLO errores / borrado
const redBright = '#FF7A7A';

module.exports = {
  name: 'Retro Hacker Amber', // = label en package.json (no cambiar)
  title: 'RETRO HACKER AMBER v2',
  tagline: 'fosforo ambar CRT sobre negro calido',
  rules: [
    'rojo solo para errores · warning en limon, nunca ambar · azul/magenta solo en la paleta ANSI',
    'bold = keywords, tags y declaraciones; nunca expresiones completas (meta.*)',
    'seleccion ambar, find cyan, word highlight amarillo (lectura) / rosa (escritura)',
  ],

  // fontStyle: se usan los defaults de build/roles.js (FONT_STYLE_DEFAULTS).
  fontStyle: {},

  colors: {
    // Fondos
    bg0: '#1A1006',
    bgDeep: '#110A03',
    bg1: '#150D05',
    bg2: '#1F140A',
    bg3: '#291B0C',
    bg4: '#3D2A12',
    bgPeek: '#20150A',
    bgHover: '#36240F',
    bgActive: '#3D2600',
    lineHighlight: '#2E1E0C7A',
    lineHighlightBorder: '#6A40107C',
    bgSideHeader: '#1A1007',
    bgActivityBar: '#1C1208',
    bgTitleBar: '#1C1107',
    bgTitleBarInactive: '#150D05',
    bgCommandCenter: '#22160A',
    bgCommandCenterActive: '#3A2400',
    bgStatusBar: '#1A1006',
    errorBg: '#3A0E0C',
    warningBg: '#33300A',
    infoBg: '#0E2A28',
    exceptionBg: '#2A0C08',

    // Bordes
    border: '#A87000',
    focus: '#E09A00',
    borderDim: '#4A3014',

    // UI
    uiAccent: amber,
    uiAccentAlt: yellow,
    uiAccentCool: aqua,
    uiAccentWarm: orange,
    onAccent: '#000000',
    onSignal: '#000000',
    cursor: amber,
    uiText: '#E0A030',
    uiTitle: '#F0AA20',
    uiTextBright: '#FFF6E6',
    uiTextSoft: '#FFE8C8',
    textNeutral: '#E0C8A8',
    textDim: '#CC9238',
    tabUnfocusedText: '#9A7030',
    textGhost: '#A89070',
    textDisabled: '#857050',
    ignored: '#937856',
    inactiveIcon: '#8E7656',
    lineNumber: '#C78021',
    guide: '#3F2A12',
    guideStrong: '#865E28',
    terminalText: '#F5A800',
    inlayHint: '#C8A878',
    inlayHintType: '#7FBFB8',

    // Estados
    error: red,
    errorSoft: redBright,
    warning: lemon,
    warningHover: '#FFFF99',
    info: aqua,
    success: green,
    attention: pink,
    attentionHover: '#FF9AB8',
    debug: orange,

    // Diff / VCS
    inserted: green,
    deleted: red,
    modified: yellow,
    changed: lemon,
    diffAdded: '#4CAF30', // verde mas oscuro para fondos de diff: el texto encima sigue legible
    mergeCurrent: '#4CAF30',
    mergeIncoming: aqua,
    mergeBase: '#D98500',

    // Highlights
    selection: '#E09400', // ambar brillante: se distingue de la scanline sin hundir comentarios
    findMatch: '#00A8A8', // cyan: el match resalta contra todo lo ambar
    highlightRead: yellow,
    highlightWrite: pink,
    bracketMatch: yellow,
    bracket1: orange,
    bracket2: aqua,
    bracket3: yellow,

    // Sintaxis
    text: amber, // texto plano en ambar (identidad v1); los strings quedan en crema
    keyword: orange,
    tag: orange,
    func: yellow,
    type: aqua,
    namespace: teal,
    variable: apricot,
    parameter: apricot,
    property: peach,
    attribute: peach,
    string: cream,
    number: '#D2D66A',
    constant: chartreuse,
    regexp: pink,
    escape: pink,
    special: pink,
    comment: brown,
    operator: tan,
    punctuation: punct,
    selfVar: amberLight,
    link: aqua,
    linkActive: teal,
    markupHeading: amber,
    markupBold: orange,
    markupItalic: apricot,
    markupCode: chartreuse,

    // ANSI 16 (azul/magenta solo existen aqui), tenidos hacia lo calido
    ansiBlack: '#2A1C0E',
    ansiRed: red,
    ansiGreen: '#8FD94A',
    ansiYellow: '#FFD54F', // oro: el ambar ya es el texto del terminal (ΔE 2 con terminalText)
    ansiBlue: '#5C9DFF',
    ansiMagenta: '#E070D8',
    ansiCyan: '#4FC8C8',
    ansiWhite: '#E8D4B0',
    ansiBrightBlack: '#9A7F5A',
    ansiBrightRed: redBright,
    ansiBrightGreen: '#B4F070',
    ansiBrightYellow: lemon,
    ansiBrightBlue: '#8CBFFF',
    ansiBrightMagenta: '#FF9AF0',
    ansiBrightCyan: '#7FF0F0',
    ansiBrightWhite: '#FFF6E6',
  },

  // Excepciones de contraste documentadas: rol -> superficies donde se acepta
  // quedar bajo el minimo. Ver build/README.md.
  contrastExceptions: {
    error: ['selection'],     // 3.79: el error va subrayado; sobre la seleccion ambar sigue rojo claro
    textGhost: ['selection'], // 4.31: texto desenfatizado a proposito
  },
  // Pares de roles de sintaxis que pueden parecerse (ΔE bajo) a proposito.
  distinctExceptions: [],
};
