# Change Log

## [2.0.0] - 2026-11-04

Rediseño completo de las cinco variantes. Cada una conserva su identidad (verde fósforo, verde matrix, magenta neón, ámbar CRT y azul IBM), pero ahora todas comparten la misma estructura, cobertura y reglas de legibilidad.

### Añadido

- **Sistema de build** en `build/`: cada variante es una paleta de roles (`build/palettes/<variante>.js`) que se genera con un template común.
  - `npm run build` genera los 5 temas.
  - `npm run validate` revisa:
    - que todas las claves de color estén en la lista oficial de VS Code;
    - el contraste WCAG (texto ≥ 4.5:1 y glifos ≥ 3:1, con unas pocas excepciones documentadas en cada paleta);
    - que los roles de sintaxis se distingan entre sí (ΔE2000);
    - que no haya selectores duplicados.
- **Cobertura total del workbench:** cerca de 690 colores por variante (antes unos 220). Incluye autocompletado, peek view, editores de diff y merge, inline chat, testing, gráfico de SCM, notebooks, debug, sticky scroll, inlay hints, ghost text, badges, dropdowns, checkboxes y keybinding labels. Ya no se cuelan los grises ni los azules por defecto de VS Code.
- **Semantic highlighting con modificadores:**
  - declaraciones en negrita;
  - `readonly` y constantes;
  - librería estándar;
  - `deprecated` tachado;
  - `self`/`this`;
  - parámetros de tipo;
  - tokens de Pylance y rust-analyzer.
- **Paleta ANSI de 16 colores** con 8 tonos distinguibles, para que `ls --color`, git y las TUIs se vean bien.
- **Colores para logs:** `ERROR` en rojo, `WARN` en ámbar, `INFO` en cian, y también `DEBUG` y fechas.
- **Markdown completo:** encabezados, negrita, itálica, links, código inline, citas y listas.
- **Carpeta `samples/`** con código de ejemplo en más de 40 lenguajes. Con `F5` se abre en el Extension Development Host para ver los cambios en vivo.
- Captura de **Green - Subtle**: ahora el README muestra las 5 variantes.

### Cambiado

- **Retro Hacker Green:** la paleta se consolidó en roles con nombre. Antes había unos 10 verdes casi idénticos.
  - texto plano en oro suave `#F2E6A0`, strings en oro `#FFD700`
  - keywords en menta, funciones en lima, variables en verde pálido, propiedades en spring green
  - números y constantes en ámbar `#FF9F1C`
  - regex y escapes en brasa `#FF6F3C`
  - tipos y links en cian `#00E5FF`, namespaces en turquesa `#2EC4B6`
  - el rojo `#FF3B3B` se usa solo para errores, líneas borradas y código inválido
- **Green - Subtle, Pink, Amber y Blue:** se regeneraron con la misma estructura que Green. Cada una tiene su paleta de roles, y el rojo de error se ajustó para que no se confunda con el acento de la variante.
- **Diff:** las líneas agregadas, borradas y modificadas tienen cada una su propio color. Antes las tres eran verdes.
- **Selección, búsqueda y resaltados:** la selección, los resultados de búsqueda, el resaltado de palabra y el multi-cursor se distinguen entre sí sin hundir la legibilidad del texto.
- **Contraste:** las pestañas inactivas, los números de línea, el breadcrumb, CodeLens, el título del sidebar y los placeholders pasan a ≥ 4.5:1.
- **Brackets:** el ciclo de colores es fósforo, cian y ámbar. Ya no usa el color del texto.

### Corregido

- Las reglas `meta.*` pintaban en negrita llamadas completas a funciones, con todos sus argumentos (Python, Java, PHP), y cuerpos enteros de métodos.
- Había reglas de sintaxis duplicadas o en conflicto: tags, atributos, puntuación y `storage.type`.
- Los tipos se veían con el color de keyword en Java, Go, C# y PHP.
- `self`/`cls` de Python no tenían color.
- Valores sin efecto: `tab.activeBorder` negro sobre negro y el borde de bracket match con alpha 00.
- `tab.unfocusedActiveBorder` usaba rojo aunque no hubiera ningún error.
- El archivo del tema tenía una coma final que rompía los parsers JSON estrictos.

## [1.3.0] - 2026-03-03

### Añadido

- Nueva variante de tema: **Retro Hacker Green - Subtle**
  - Versión más suave del tema verde clásico
  - Menor contraste para sesiones de código prolongadas
  - Mantiene la estética retro terminal
- Configuración completa de botones para todos los temas:
  - Estilos primarios y secundarios
  - Estados hover con retroalimentación visual
  - Bordes personalizados con colores del tema

### Cambiado

- **Retro Hacker Pink** renombrado a **Retro Hacker Magenta**
  - Refactorización completa de la paleta de colores
  - Mejora en la consistencia del tema magenta CRT
  - Optimización de colores para terminal clásico magenta
  - Mejor diferenciación entre elementos de UI

### Mejorado

- Controles de interfaz con mejor retroalimentación visual
- Consistencia en estilos de botones en todos los temas
- Estados hover más visibles y coherentes
- Experiencia de usuario mejorada en controles interactivos

## [1.2.0] - 2025-11-25

### Added

- Bracket pair colorization with alternating colors (green/gold/chartreuse)
- Bracket pair guides for visual nesting indication
- New token colors for better differentiation:
  - Operators: `#3CB371` (sea green)
  - Object properties: `#7FFF00` (chartreuse)
  - Imports/namespaces: `#00FA9A` (spring green)

### Changed

- Replaced cyan/blue colors with green tones for better theme consistency
- Softened UI borders from `#00ff00` to `#00AA00`/`#00CC00` for less eye strain
- Updated comments color to `#6B8E23` (olive) for better visibility
- Improved hover and selection backgrounds for better visibility
- Terminal ANSI colors now use green palette instead of default blues/magentas

### Improved

- Token differentiation between variables, properties, and operators
- Unified semantic highlighting with token colors
- Overall color consistency across the theme

## [1.1.2] - 2025-04-21

### Improved

- Updated token colors for better visibility and consistency on the default theme

# [1.1.1] - 18-03-25

### Added

- Improvements
  - Enhanced syntax highlighting across multiple languages
  - Standardized color schemes for each theme variant
  - Improved consistency in token colors
  - Better distinction between different code elements



# [1.1.0] - 20-02-25

### Added

- New theme variants:
  - Retro Hacker Amber: Classic amber monochrome aesthetic
  - Retro Hacker Blue: IBM-inspired blue terminal theme
  - Retro Hacker Pink: Neon cyberpunk pink style
  - All new themes maintain the high contrast

### Improved

- Enhanced syntax highlighting across multiple languages:
  - Standardized color schemes for each theme variant
  - Improved consistency in token colors
  - Better distinction between different code elements
  - Optimized contrast for all new color palettes

### Changed

- Optimized color token definitions for all variants
- Standardized semantic highlighting across themes

# [1.0.9] - 19-02-25

### Improved

- Enhance color theme for improved aesthetics
- Adjusted json colors for better readability
- Updated instructions on how to customize the theme

# [1.0.8] - 18-02-25

### Improved

- Code highlighting for better readability
  - Updated syntax colors for improved contrast
  - Adjusted green tones for some languages

# [1.0.7] - 17-02-25

### Changed

- Updated README with new theme variant information
- Fixed package.json metadata
- Better color contrast for improved readability

# [1.0.6] - 17-02-25

### Added

- New Pink Retro theme variant
  - Complete color scheme transformation from neon green to hot pink
  - Maintained high contrast and readability of the original theme
  - All UI elements updated to match the pink aesthetic

### Changed

- Enhanced original Retro Hacker theme
  - Improved panel customization with deeper green tones
  - Enhanced context menu styling and visibility
  - Better distinction between active and inactive UI elements
  - Refined borders and highlights for improved visual hierarchy
  - Updated tooltip appearances to match theme style
  - Improved hover states and selection indicators

### Improved

- Interface consistency across all theme elements
  - Standardized color usage in menus and panels
  - Enhanced visual feedback for interactive elements
  - Better contrast in dropdown menus and context windows
  - Refined terminal and panel aesthetics

## [1.0.5] - 06-12-24

### Changed

- Some color updates for better readability
  - Improved contrast for better visibility

## [1.0.4] - 06-12-24

### Changed

- Tooltip appearance to match theme style
  - Updated background color to theme's dark green
  - Added neon green borders
  - Adjusted text colors for better visibility

## [1.0.3] - 06-12-24

### Added

- Enhanced terminal panel customization
  - Custom colors for panel sections (Problems, Output, Debug Console)
  - Distinct border colors for panel headers
  - Improved ANSI color scheme for better readability
  - Terminal cursor and selection highlighting
- Command palette improvements
  - Background and border colors following the hacker theme
  - Enhanced contrast for better visibility
  - Hover state effects for command items
  - Selection highlighting in theme colors

### Changed

- Terminal panel appearance
  - Added borders to panel headers
  - Updated section headers to be more visible
  - Improved distinction between active and inactive tabs
  - Enhanced visual hierarchy in panel elements
- Refined color values for better contrast and readability
  - Adjusted green tones for less eye strain
  - Enhanced border visibility
  - Improved text contrast in all terminal states

### Fixed

- Missing borders in terminal panel headers
- Inconsistent text colors in terminal interface
- Panel section contrast issues

## [1.0.2] - 06-12-24

### Changed

- Fixed package.json metadata

## [1.0.1] - 06-12-24

### Changed

- Updated README with more detailed information

## [1.0.0] - 06-12-24

### Added

- Initial release
- High contrast retro hacker theme with neon green accents
- Support for HTML, CSS, JavaScript, TypeScript, Python, Java, C#, and SQL
- Custom syntax highlighting optimized for long coding sessions
- Special emphasis on readability with carefully selected colors
- Terminal customization with retro-style colors
- Git decoration colors
- Semantic highlighting support
