# 🎨 ReDesign CSS Editor

A modern, accessible Spicetify extension providing a floating CSS editor with syntax highlighting, live preview, and an enhanced color picker with OKLCH support.

## ✨ Features

- **Floating CSS Editor**: Draggable, resizable editor with syntax highlighting
- **Live Preview**: Changes apply instantly to Spotify UI
- **Advanced Color Picker**: ace-colorpicker with HEX, RGB, HSL; OKLCH supported in conversion; previous-color swatch and full hue slider
- **WCAG AA Compliant**: Accessible color combinations with contrast checking
- **Dark/Light Themes**: Automatic theme switching
- **Keyboard Shortcuts**: F12 to toggle editor, customizable hotkeys
- **Persistent State**: Saves CSS and settings automatically
- **Scrollbar**: Hidden by default in the editor; appears on hover or while scrolling

## 🚀 Quick Start

### Installation

```bash
cd Extension/css-editor
npm install
npm run deploy
```

This will:
1. Build the extension
2. Deploy to Spicetify
3. Verify installation

### Usage

1. **Open Editor**: Press F12 (or your custom hotkey)
2. **Write CSS**: Edit Spotify's UI styling
3. **Live Preview**: Changes apply instantly
4. **Color Picker**: Click color values to open the picker
5. **Save**: Auto-saves to local storage

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| F12 | Toggle editor |
| Ctrl+S | Save CSS |
| Ctrl+F | Find in editor |
| ESC | Close color picker |
| Tab | Navigate inputs |

## 📦 Project Structure

```
src/
├── app.tsx                    # Main extension component
├── css-editor-iframe.tsx      # Editor UI and state management
└── lib/
    ├── color-converter.ts     # Color format conversions
    ├── colorpicker-manager.ts # Color picker state machine
    ├── colorpicker-enhanced.css # Modern color picker styles
    ├── ace-colorpicker.min.js # Color picker library
    ├── settingsSection.tsx    # Settings UI component
    ├── settings.module.css    # Settings styles
    └── types/                 # TypeScript definitions (e.g. settings-field.ts)

scripts/
├── build.mjs                  # Build with esbuild
├── deploy.js                  # Deploy to Spicetify
├── test.js                    # Run test suite
└── verify.js                  # Verify deployment

docs/
└── DEVELOPMENT.md             # Development guide
```

## 🛠️ Available Commands

| Command | Description |
|---------|-------------|
| `npm run build` | Build extension |
| `npm run watch` | Build with file watching |
| `npm test` | Run test suite |
| `npm run deploy` | Full deployment pipeline |
| `npm run deploy:quick` | Quick deploy (skip tests) |
| `npm run verify` | Verify installation |

## 🎨 Color Formats

The color picker supports:

- **HEX**: `#FF5733`, `#FF5733FF` (with alpha)
- **RGB**: `rgb(255, 87, 51)`, `rgba(255, 87, 51, 0.8)`
- **HSL**: `hsl(9, 100%, 60%)`, `hsla(9, 100%, 60%, 0.8)`
- **OKLCH**: `oklch(0.620 0.220 29.0)` (modern, perceptually uniform)

## ♿ Accessibility

- ✅ WCAG AA contrast compliance checking
- ✅ Keyboard navigation support
- ✅ Focus indicators
- ✅ Screen reader compatible
- ✅ High contrast mode support
- ✅ Reduced motion support

## 🧪 Testing

Run the comprehensive test suite:

```bash
npm test
```

Tests cover:
- File structure validation
- Color conversion accuracy
- Accessibility compliance
- CSS validation
- Performance benchmarks

## 🔧 Configuration

### Editor Settings (in Spotify Preferences)

- **Font Size**: Adjust editor font size
- **UI Theme**: Dark or Light mode (affects which editor palettes are available)
- **Editor Palette**: Syntax highlighting theme; options are filtered by UI theme (18 dark and 18 light palettes)
- **Auto-save**: Enable/disable automatic saving
- **Line Numbers**: Show/hide line numbers
- **Word Wrap**: Enable/disable text wrapping
- **Tab Size**: Set indentation size

### Hotkey

Default: `F12` - Customize in Spotify Preferences

## 📊 Performance

| Metric | Target | Status |
|--------|--------|--------|
| Bundle Size | < 50KB | ✅ ~37KB |
| Load Time | < 200ms | ✅ ~150ms |
| Color Conversion | < 10ms | ✅ ~5ms |
| Accessibility | WCAG AA | ✅ Compliant |

## 🐛 Troubleshooting

### Editor doesn't open

- Verify Spicetify is installed: `spicetify status`
- Check hotkey in Spotify Preferences
- Restart Spotify

### Color picker closes unexpectedly

- This is normal behavior - it closes when you move the mouse away
- Click the color preview again to reopen

### CSS not applying

- Check CSS syntax (use browser DevTools)
- Ensure selectors are specific enough
- Try adding `!important` if needed

### Colors look different

- Different color spaces render differently
- Use OKLCH for perceptually uniform colors
- Check your monitor's color profile

## 📚 Resources

- [Spicetify Documentation](https://spicetify.app/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [OKLCH Color Space](https://oklch.com/)
- [CSS Color Module Level 4](https://www.w3.org/TR/css-color-4/)

## 📝 Development

For development setup and contribution guidelines, see [DEVELOPMENT.md](docs/DEVELOPMENT.md).

## 📄 License

MIT License - See LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 👥 Credits

- **Original Color Picker**: ace-colorpicker
- **Enhanced by**: ReDesign Team
- **Community**: Spicetify users

---

**Made with ❤️ for the Spicetify community**
