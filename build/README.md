# build/: generador de las variantes Retro Hacker

Cada tema en `themes/` se **genera** desde una paleta de roles. No edités los JSON a mano: el validador falla si el archivo no coincide con su paleta.

```
build/
  generate.js            node build/generate.js [variante|all]   → escribe themes/<archivo>.json
  validate.js            node build/validate.js [variante|all] [-v] → exit ≠ 0 si algo falla
  template.js            estructura del tema (colors, tokenColors, semanticTokenColors) en función de la paleta
  roles.js               lista de roles: significado, cuáles son requeridos, fallbacks, fontStyle por defecto
  variants.js            variante → archivo de tema (fijo por package.json)
  palettes/<variante>.js una paleta por variante (lo único que se toca para diseñar una variante)
  lib/color.js           alpha/mix, contraste WCAG, ΔE76 y CIEDE2000
  vscode-color-keys.json keys oficiales de colors (VS Code 1.145)
```

## Comandos

```sh
npm run build                     # = node build/generate.js all
npm run validate                  # = node build/validate.js all
node build/generate.js amber      # una sola variante
node build/validate.js amber -v   # con la tabla de contrastes y ΔE
```

Con `all` se saltan las variantes que todavía no tienen paleta (su JSON v1 queda intacto). Si pedís una variante sin paleta, sale con error.

## Variantes

| Variante | Paleta | Archivo (no cambiar) | `name` (= label en package.json) |
|---|---|---|---|
| `green` | `palettes/green.js` | `retro-hacker-default-color-theme.json` | Retro Hacker Green |
| `green-subtle` | `palettes/green-subtle.js` | `retro-hacker-green-subtle-theme.json` | Retro Hacker Green - Subtle |
| `pink` | `palettes/pink.js` | `retro-hacker-pinkish-color-theme.json` | Retro Hacker Pink |
| `amber` | `palettes/amber.js` | `retro-hacker-amber-theme.json` | Retro Hacker Amber |
| `blue` | `palettes/blue.js` | `retro-hacker-blue-theme.json` | Retro Hacker Blue |

## Cómo crear o editar una paleta

1. Copiá `palettes/green.js` a `palettes/<variante>.js` y cambiá `name`, `title`, `tagline`, `rules` y los hex.
2. Llená **todos los roles requeridos** (tabla de abajo). Los opcionales podés omitirlos y toman su fallback. El header del tema los marca con `*`.
3. Los hex van en `#RRGGBB`. Solo `lineHighlight` y `lineHighlightBorder` aceptan `#RRGGBBAA`, porque el template les aplica alpha a los demás.
4. Opcional, `fontStyle`: sobreescribe los estilos por defecto (`roles.js` → `FONT_STYLE_DEFAULTS`). Knobs: `comment`, `keyword`, `tag`, `declaration`, `parameter`, `selfVar`, `decorator`, `attribute`, `heading`. Valores: `''`, `'bold'`, `'italic'`, `'bold italic'`, `'underline'`, `'strikethrough'`. Ejemplo: `fontStyle: { keyword: '', comment: '' }`.
5. Corré `node build/generate.js <variante> && node build/validate.js <variante> -v` y repetí hasta que pase.
6. Si un contraste bajo es intencional, documentalo en `contrastExceptions`: `{ rol: ['selection', 'diffIns'] }` para tokens (superficies: `editor`, `lineHL`, `selection`, `findMatch`, `findHL`, `wordHL`, `wordStrong`, `diffIns`, `diffDel`), o `{ 'clave.de.color': true }` para un par de UI. Para dos roles de sintaxis parecidos a propósito, usá `distinctExceptions: [['rolA', 'rolB']]`.

Qué valida `validate.js`:
- parseo estricto, sin comas finales
- que el archivo coincida con su paleta (deep-equal)
- que `name` sea igual al label de package.json
- que todas las keys de `colors` estén en la lista oficial
- hex válidos
- selectores duplicados y selectores `meta.*` de expresión completa
- contraste WCAG: tokens ≥ 4.5 sobre editor, línea activa y selección, y ≥ 3 sobre find, word highlight y diff; texto de UI ≥ 4.5; glifos ≥ 3
- ΔE2000 ≥ 8 entre `keyword func type namespace variable property string number regexp comment operator punctuation`
- que `template.js` no tenga hex crudos

## Roles

Requerido = sin fallback. *Si se omite* = valor que toma el rol cuando la paleta no lo define.

**Fondos**

| Rol | Req. | Significado | Si se omite |
|---|---|---|---|
| `bg0` | sí | fondo del editor, gutter, sticky scroll |  |
| `bgDeep` | sí | fondo mas profundo: terminal, tab activa |  |
| `bg1` | sí | sidebar, region sin cambios del diff |  |
| `bg2` | sí | panel, output, sticky del terminal |  |
| `bg3` | sí | widgets: find, suggest, hover, inputs, menus, quick input |  |
| `bg4` | sí | headers elevados: peek title, keybinding label, banner |  |
| `bgPeek` |  | editor del peek view | `bg2` |
| `bgHover` |  | hover del sticky scroll (editor y terminal) | `bg4` |
| `bgActive` |  | base del hover de tabs (se usa con alpha) | `mix(uiAccent, bg0, 0.2)` |
| `lineHighlight` | sí | linea activa (scanline), admite alpha |  |
| `lineHighlightBorder` |  | borde de la linea activa, admite alpha | `lineHighlight` |
| `bgSideHeader` |  | headers de seccion del sidebar | `bg1` |
| `bgActivityBar` |  | activity bar | `bg1` |
| `bgTitleBar` |  | title bar activa | `bg2` |
| `bgTitleBarInactive` |  | title bar sin foco | `bg1` |
| `bgCommandCenter` |  | command center | `bg2` |
| `bgCommandCenterActive` |  | command center activo | `bgActive` |
| `bgStatusBar` |  | status bar | `bg2` |
| `errorBg` |  | fondo opaco de validacion: error | `mix(error, bg0, 0.16)` |
| `warningBg` |  | fondo opaco de validacion: warning | `mix(warning, bg0, 0.16)` |
| `infoBg` |  | fondo opaco de validacion: info | `mix(info, bg0, 0.16)` |
| `exceptionBg` |  | widget de excepcion del debugger | `mix(error, bg0, 0.1)` |

**Bordes**

| Rol | Req. | Significado | Si se omite |
|---|---|---|---|
| `border` | sí | bordes estructurales (sidebar, panel, tabs, widgets) |  |
| `focus` | sí | focusBorder, inputs, widgets activos, badge |  |
| `borderDim` | sí | separadores suaves, overview ruler |  |

**UI: acentos y texto**

| Rol | Req. | Significado | Si se omite |
|---|---|---|---|
| `uiAccent` | sí | IDENTIDAD: acento UI, foreground general, botones, iconos |  |
| `uiAccentAlt` | sí | acento secundario: highlight con foco en listas/suggest, headers del sidebar |  |
| `uiAccentCool` | sí | acento frio: cursores secundarios, renamed, pasos del debugger, chat |  |
| `uiAccentWarm` | sí | acento calido: lightbulb, estrellas, pickerGroup, sin carpeta |  |
| `onAccent` | sí | texto sobre rellenos de uiAccent (botones, badges, remoto) |  |
| `onSignal` |  | texto sobre rellenos de error/warning/debug/offline | `onAccent` |
| `cursor` |  | cursor del editor y del terminal | `uiAccent` |
| `uiText` | sí | texto de sidebar, descripciones |  |
| `uiTitle` |  | titulo del sidebar | `uiText` |
| `uiTextBright` | sí | texto de items seleccionados / en hover |  |
| `uiTextSoft` |  | texto de seleccion inactiva en listas | `uiTextBright` |
| `textNeutral` |  | texto de lineas en el resultado del peek | `uiTextSoft` |
| `textDim` | sí | texto secundario: tabs inactivas, codelens, puntuacion de markup |  |
| `tabUnfocusedText` |  | tabs inactivas de un grupo sin foco | `textDim` |
| `textGhost` | sí | ghost text, blame, placeholders, tachado |  |
| `textDisabled` | sí | elementos deshabilitados |  |
| `ignored` |  | archivos ignorados por git | `textDisabled` |
| `inactiveIcon` |  | iconos inactivos (breakpoint deshabilitado, test sin correr) | `textGhost` |
| `lineNumber` | sí | numeros de linea, guia de indent activa |  |
| `guide` | sí | guias de indentacion |  |
| `guideStrong` | sí | whitespace, guias del arbol, numeros de linea atenuados |  |
| `terminalText` | sí | texto del terminal |  |
| `inlayHint` |  | inlay hints (parametros) | `textDim` |
| `inlayHintType` |  | inlay hints de tipo | `inlayHint` |

**Estados**

| Rol | Req. | Significado | Si se omite |
|---|---|---|---|
| `error` | sí | SOLO errores, invalid, breakpoints |  |
| `errorSoft` | sí | errores en listas, hover de error, referencias sin resolver |  |
| `warning` | sí | warnings, deprecated |  |
| `warningHover` |  | hover del item warning de la status bar | `warning` |
| `info` | sí | info, consola de debug, alertas note |  |
| `success` | sí | tests pasados, comando exitoso, start del debugger |  |
| `attention` | sí | conflictos git, offline, alertas important, sponsor |  |
| `attentionHover` |  | hover del item offline | `attention` |
| `debug` |  | status bar en debug, stack frame en pausa | `warning` |

**Diff y control de versiones**

| Rol | Req. | Significado | Si se omite |
|---|---|---|---|
| `inserted` | sí | texto agregado: markup.inserted, archivos agregados, lineas + |  |
| `deleted` | sí | texto/gutter borrado |  |
| `modified` | sí | gutter y archivos modificados, tab modificada |  |
| `changed` |  | markup.changed en diffs | `warning` |
| `diffAdded` |  | gutter agregado y fondos de diff agregado (con alpha) | `success` |
| `mergeCurrent` |  | merge: current | `diffAdded` |
| `mergeIncoming` |  | merge: incoming | `uiAccentCool` |
| `mergeBase` |  | merge: base comun | `selection` |

**Highlights**

| Rol | Req. | Significado | Si se omite |
|---|---|---|---|
| `selection` | sí | seleccion y sus ocurrencias (con alpha) |  |
| `findMatch` | sí | resultados de busqueda (con alpha) |  |
| `highlightRead` |  | word highlight de lectura (con alpha) | `uiAccent` |
| `highlightWrite` |  | word highlight de escritura, linked editing (con alpha) | `uiAccentCool` |
| `bracketMatch` |  | bracket match | `uiAccentAlt` |
| `bracket1` | sí | ciclo de brackets: nivel 1/4 |  |
| `bracket2` | sí | ciclo de brackets: nivel 2/5 |  |
| `bracket3` | sí | ciclo de brackets: nivel 3/6 |  |

**Sintaxis**

| Rol | Req. | Significado | Si se omite |
|---|---|---|---|
| `text` | sí | IDENTIDAD: editor.foreground, texto JSX, codigo embebido |  |
| `keyword` | sí | keywords, storage, imports, directivas |  |
| `tag` |  | tags HTML/XML, selectores de tag CSS | `keyword` |
| `func` | sí | funciones, metodos, decorators, selectores de clase CSS |  |
| `type` | sí | tipos, clases, interfaces, componentes |  |
| `namespace` | sí | namespaces, modulos, type params, lifetimes, fechas de log |  |
| `variable` | sí | variables |  |
| `parameter` |  | parametros | `variable` |
| `property` | sí | propiedades, keys JSON/YAML/CSS/ini |  |
| `attribute` |  | atributos de markup | `property` |
| `string` | sí | strings, valores CSS/dotenv |  |
| `number` | sí | numeros, booleans, null, constantes del lenguaje |  |
| `constant` |  | constantes UPPER_CASE/readonly, enum members, labels | `number` |
| `regexp` | sí | expresiones regulares |  |
| `escape` |  | escapes, placeholders, delimitadores ${ }, entidades | `regexp` |
| `special` |  | macros, !important, eventos | `regexp` |
| `comment` | sí | comentarios, citas Markdown |  |
| `operator` | sí | operadores, separadores |  |
| `punctuation` | sí | puntuacion y brackets (sin colorizar) |  |
| `selfVar` | sí | this / self / super / cls |  |
| `link` |  | links (UI y URLs de Markdown) | `info` |
| `linkActive` |  | link activo, texto de links Markdown | `link` |
| `markupHeading` |  | headings Markdown, secciones INI | `uiAccent` |
| `markupBold` |  | Markdown bold | `keyword` |
| `markupItalic` |  | Markdown italic | `variable` |
| `markupCode` |  | codigo inline (Markdown, hovers) | `number` |


**Terminal: paleta ANSI 16** (todos requeridos): `ansiBlack ansiRed ansiGreen ansiYellow ansiBlue ansiMagenta ansiCyan ansiWhite` y sus `ansiBright*`.

Notas de diseño:
- Varios roles pueden compartir el mismo hex (en Green, `text` = `string` = `selection` = `modified` = oro). Separarlos en roles es lo que permite que otra variante los diferencie.
- Charts, confetti y el grafo SCM reutilizan roles de estado: `error`, `info`, `modified`, `warning`, `inserted`, `namespace`, `uiAccent` y `uiAccentCool`.
