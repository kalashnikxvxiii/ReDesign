# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed
- Color picker: setup now runs after DOM is stable (120ms delay in MutationObserver) so buttons, HSL/RGBA fields and context menu work on first open
- Color picker: removed duplicate global init so only one instance is created
- Color picker: previous-color swatch click now applies the previous color correctly
- Hue slider: gradient in `.colorpicker-body .hue-container` now covers full 0-360° HSL spectrum
- Editor scrollbar: hidden by default; shown when hovering near edge or while scrolling (`.scrollbar-visible`, `.is-scrolling`)

### Added
- `manifest.json` and `preview.png` for [Spicetify Marketplace](https://github.com/spicetify/marketplace/wiki/Publishing-to-Marketplace); build outputs `dist/extension.js` for marketplace distribution

### Changed
- Editor palette options are filtered by UI theme: 18 dark palettes for Dark theme, 18 light palettes for Light theme; switching UI theme validates/resets editor palette and reloads the iframe
- Settings: dropdown options can be a function of `getFieldValue` (see `src/lib/types/settings-field.ts` and `src/lib/settingsSection.tsx`)

## [1.0.0] - 2025-01-XX

### Added
- ✨ Initial release of ReDesign CSS Editor
- 🎨 Floating CSS editor with syntax highlighting
- 🎯 Live preview of CSS changes
- 🌈 Enhanced color picker with multi-format support (HEX, RGB, HSL, OKLCH)
- ♿ WCAG AA accessibility compliance
- 🌓 Dark/Light theme support
- ⌨️ Keyboard shortcuts and hotkey customization
- 💾 Auto-save functionality
- 🧪 Comprehensive test suite
- 📚 Complete documentation

### Features
- **Color Picker**: Multi-format color selection with live preview
- **Accessibility**: WCAG AA contrast checking and compliance
- **Themes**: Automatic dark/light mode switching
- **Performance**: Optimized bundle size (~37KB)
- **Keyboard Navigation**: Full keyboard support
- **Settings**: Customizable editor preferences

### Technical
- TypeScript for type safety
- React for UI components
- Ace editor for syntax highlighting
- esbuild for fast bundling
- Comprehensive test coverage

## Future Releases

### Planned Features
- [ ] Custom color picker component (React)
- [ ] Palette management system
- [ ] Color harmony suggestions
- [ ] Gradient editor
- [ ] AI-powered color suggestions
- [ ] Color blindness simulator
- [ ] Export/Import palettes
- [ ] Undo/Redo functionality
- [ ] CSS linting
- [ ] Theme marketplace

### Under Consideration
- [ ] Collaborative editing
- [ ] Version control integration
- [ ] Performance profiling
- [ ] Advanced debugging tools
- [ ] Plugin system

---

## Version History

### v1.0.0
- Initial stable release
- All core features implemented
- Full test coverage
- Production-ready

---

**For detailed information about changes, see [DEVELOPMENT.md](docs/DEVELOPMENT.md)**
