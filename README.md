# Retro Hacker Theme for VS Code

[![Version](https://img.shields.io/visual-studio-marketplace/v/devxi.retro-hacker-theme)](https://marketplace.visualstudio.com/items?itemName=devxi.retro-hacker-theme)
[![Downloads](https://img.shields.io/visual-studio-marketplace/d/devxi.retro-hacker-theme)](https://marketplace.visualstudio.com/items?itemName=devxi.retro-hacker-theme)
[![Rating](https://img.shields.io/visual-studio-marketplace/r/devxi.retro-hacker-theme)](https://marketplace.visualstudio.com/items?itemName=devxi.retro-hacker-theme)

A high-contrast dark theme inspired by classic hacker movies and retro computing. Features neon accents and carefully selected colors for optimal readability.

## Theme Variants

| Variant | Description |
|---------|-------------|
| **Retro Hacker Green** | Classic neon green terminal aesthetic |
| **Retro Hacker Pink** | Cyberpunk neon pink style |
| **Retro Hacker Amber** | Classic amber monochrome |
| **Retro Hacker Blue** | IBM-inspired blue terminal |

## Screenshots

### Retro Hacker Green
![Green Theme](images/retro-hacker-theme-green.png)

### Retro Hacker Pink
![Pink Theme](images/retro-hacker-theme-pink.png)

## Installation

1. Open VS Code Extensions (`Ctrl+Shift+X` / `Cmd+Shift+X`)
2. Search for "Retro Hacker Theme"
3. Click Install
4. Select theme: `Ctrl+K Ctrl+T` (`Cmd+K Cmd+T` on macOS)

Or install from [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=devxi.retro-hacker-theme)

## Customization

Override colors in your `settings.json`:

### UI Colors

```json
{
  "workbench.colorCustomizations": {
    "[Retro Hacker Green]": {
      "editor.background": "#000000",
      "sideBar.background": "#000a00",
      "terminal.foreground": "#00ff00",
      "editorBracketHighlight.foreground1": "#00FF00",
      "editorBracketHighlight.foreground2": "#FFD700"
    }
  }
}
```

### Syntax Colors (Token Customization)

```json
{
  "editor.tokenColorCustomizations": {
    "[Retro Hacker Green]": {
      "comments": "#6B8E23",
      "strings": "#FFCC00",
      "keywords": "#66FF66",
      "functions": "#AEEE00",
      "variables": "#5aff31",
      "textMateRules": [
        {
          "scope": "entity.name.function",
          "settings": {
            "foreground": "#AEEE00",
            "fontStyle": "bold"
          }
        }
      ]
    }
  }
}
```

### Semantic Token Colors

```json
{
  "editor.semanticTokenColorCustomizations": {
    "[Retro Hacker Green]": {
      "rules": {
        "function": "#AEEE00",
        "variable": "#5aff31",
        "property": "#7FFF00",
        "namespace": "#00FA9A"
      }
    }
  }
}
```

## Color Palette (Green Variant)

| Element | Color | Hex |
|---------|-------|-----|
| Keywords | Green bright | `#66FF66` |
| Functions | Lime | `#AEEE00` |
| Variables | Neon green | `#5aff31` |
| Strings | Gold | `#FFCC00` |
| Numbers | Yellow | `#FFD700` |
| Comments | Olive | `#6B8E23` |
| Operators | Sea green | `#3CB371` |
| Properties | Chartreuse | `#7FFF00` |

## Recommended Settings

```json
{
  "editor.fontFamily": "'Fira Code', 'Cascadia Code', monospace",
  "editor.fontLigatures": true,
  "editor.cursorBlinking": "phase",
  "terminal.integrated.cursorStyle": "line"
}
```

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

MIT License - see [LICENSE](LICENSE) for details.

## Author

Created by [Elmer S.](https://github.com/elmersh)

---

**Enjoy coding like a classic hacker!**
