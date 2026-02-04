# 🔧 Development Guide

This guide covers development setup, architecture, and contribution guidelines for ReDesign CSS Editor.

## Development Setup

### Prerequisites

- Node.js 14+ 
- npm or yarn
- Spicetify CLI installed
- Git

### Installation

```bash
git clone https://github.com/kalashnikxvxiii/spicetify-redesign.git
cd Extension/css-editor
npm install
```

### Development Workflow

```bash
# Watch mode - rebuilds on file changes
npm run watch

# Run tests
npm test

# Deploy to Spicetify
npm run deploy

# Quick deploy (skip tests)
npm run deploy:quick

# Verify deployment
npm run verify
```

## Architecture

### Core Components

#### `color-converter.ts`
Handles all color format conversions and accessibility calculations.

**Key Functions:**
- `parse(color)` - Parse any color string to RGB
- `convert(color, format)` - Convert between formats
- `getContrastRatio(fg, bg)` - Calculate WCAG contrast
- `isAccessible(fg, bg, largeText)` - Check WCAG compliance

**Supported Formats:**
- HEX: `#RRGGBB`, `#RRGGBBAA`
- RGB: `rgb(r, g, b)`, `rgba(r, g, b, a)`
- HSL: `hsl(h, s%, l%)`, `hsla(h, s%, l%, a)`
- OKLCH: `oklch(l c h)`, `oklch(l c h / a)`

#### `colorpicker-manager.ts`
State management for the color picker with event-driven architecture.

**Key Features:**
- State machine (CLOSED → OPENING → OPEN → CLOSING)
- Event subscriptions (onStateChange, onColorChange)
- Persistent picker behavior
- Format switching
- Accessibility info injection

**Configuration Options:**
```typescript
{
  defaultFormat: 'hex',           // Initial format
  showOKLCH: true,                // Show OKLCH option
  persistOnInteraction: true,     // Keep open during interaction
  closeOnEscape: true,            // Close on ESC key
  closeOnClickOutside: true,      // Close on outside click
  showAccessibilityInfo: true     // Show contrast info
}
```

#### `css-editor-iframe.tsx`
Main editor component with iframe isolation and state management.

**Key Features:**
- Draggable, resizable window
- Syntax highlighting (Ace editor)
- Live CSS preview
- Settings integration
- Hotkey handling

#### `colorpicker-enhanced.css`
Modern, accessible color picker styling.

**Features:**
- CSS Custom Properties for theming
- Smooth animations
- Dark/Light mode support
- Reduced motion support
- High contrast mode support
- WCAG AAA compliant

### Settings and dynamic options

Settings are defined in `css-editor-iframe.tsx`. The **UI theme** (Dark/Light) is registered before **Editor palette** so the palette dropdown can depend on it. Editor palette options are dynamic: 18 dark palettes when UI theme is Dark, 18 light palettes when Light. Types in `src/lib/types/settings-field.ts` allow dropdown `options` to be either `string[]` or a function `(getFieldValue: (id: string) => any) => string[]`; `settingsSection.tsx` evaluates the function and resets the dropdown value if the current selection becomes invalid (e.g. after switching UI theme). Build script lives in `scripts/build.mjs`.

### Color picker implementation

The editor uses **ace-colorpicker** (`lib/ace-colorpicker.min.js`) with styles from `colorpicker-enhanced.css`. To avoid a broken initial state (non-functional buttons, unsynced fields), **runColorPickerSetup** is invoked only after the picker DOM is stable: a `MutationObserver` schedules it with a 120ms timeout so AceColorPicker has finished rendering. Only one picker instance is created (no duplicate global init). The **previous color** swatch is wired so that clicking it applies that color via `colorPickerInstance.initColor()`. The hue slider uses a full 0-360° HSL gradient in `.colorpicker-body .hue-container`. The picker body scrollbar is hidden by default and shown when the user hovers near the edge or scrolls (classes `scrollbar-visible` / `is-scrolling`).

### Data Flow

```
User Input
    ↓
css-editor-iframe.tsx (UI)
    ↓
colorpicker-manager.ts (State)
    ↓
color-converter.ts (Logic)
    ↓
CSS Output / Spicetify UI
```

## File Organization

### Source Files

```
src/
├── app.tsx                      # Entry point
├── css-editor-iframe.tsx        # Main editor component
└── lib/
    ├── color-converter.ts       # Color utilities
    ├── colorpicker-manager.ts   # State management
    ├── colorpicker-enhanced.css # Styles
    ├── settingsSection.tsx      # Settings UI
    ├── settings.module.css      # Settings styles
    ├── ace-colorpicker.min.js   # External library
    └── types/
        ├── css-modules.d.ts     # CSS module types
        ├── settings-field.ts    # Settings types
        └── spicetify.d.ts       # Spicetify types
```

### Build & Deploy

```
scripts/
├── build.mjs                    # esbuild configuration
├── deploy.js                    # Deployment pipeline
├── test.js                      # Test runner
└── verify.js                    # Verification checks
```

## Code Style

### TypeScript

- Use strict mode
- Explicit type annotations
- Avoid `any` type
- Use interfaces for objects
- Document public APIs with JSDoc

### CSS

- Use CSS Custom Properties for theming
- Mobile-first responsive design
- Prefer CSS Grid/Flexbox
- Use semantic class names
- Include accessibility features

### Naming Conventions

- **Classes**: PascalCase (e.g., `ColorConverter`)
- **Functions**: camelCase (e.g., `getContrastRatio`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_ITERATIONS`)
- **CSS Classes**: kebab-case (e.g., `.color-picker-body`)
- **CSS Variables**: `--cp-*` prefix (e.g., `--cp-bg-primary`)

## Testing

### Test Structure

Tests are organized by category:

1. **File Structure Tests** - Verify all files exist
2. **Color Conversion Tests** - Test color format conversions
3. **Accessibility Tests** - Verify WCAG compliance
4. **CSS Validation Tests** - Check CSS structure
5. **TypeScript Validation Tests** - Verify type definitions
6. **Performance Tests** - Benchmark critical functions
7. **Integration Tests** - End-to-end verification

### Running Tests

```bash
# Run all tests
npm test

# Run specific test suite (modify test.js)
node scripts/test.js
```

### Writing Tests

Add tests to `scripts/test.js`:

```javascript
runner.suite('My Test Suite');

runner.test('should do something', () => {
  runner.assert(condition, 'Error message');
});

runner.test('should convert colors', () => {
  const result = ColorConverter.hexToRgb('#FF5733');
  runner.assertEqual(result.r, 255, 'Red should be 255');
});
```

## Performance Optimization

### Key Metrics

- **Bundle Size**: Target < 50KB
- **Load Time**: Target < 200ms
- **Color Conversion**: Target < 10ms
- **Contrast Calculation**: Target < 1ms

### Optimization Techniques

1. **Tree Shaking**: Remove unused code
2. **Minification**: Compress output
3. **Lazy Loading**: Load color picker on demand
4. **Memoization**: Cache conversion results
5. **Efficient Algorithms**: Use optimized math

## Debugging

### Browser DevTools

1. Open Spotify DevTools: `Ctrl+Shift+I`
2. Check Console for errors
3. Inspect color picker DOM
4. Monitor network requests

### Logging

Use console with prefixes:

```typescript
console.log('[ReDesign] Message');
console.warn('[ReDesign] Warning');
console.error('[ReDesign] Error');
```

### Common Issues

**Color picker not appearing or broken on first open:**
- Check if ace-colorpicker library loaded
- Verify `runColorPickerSetup` runs after picker DOM is ready (120ms delay after mutation)
- Verify CSS is applied and no duplicate picker init
- Check z-index conflicts

**CSS not applying:**
- Check selector specificity
- Verify CSS syntax
- Try `!important` flag
- Check for conflicting styles

**Performance issues:**
- Profile with DevTools
- Check for memory leaks
- Optimize color conversions
- Reduce DOM updates

## Deployment

### Build Process

1. **Compile TypeScript** → JavaScript
2. **Bundle** → Single file with dependencies
3. **Minify** → Reduce size
4. **Deploy** → Copy to Spicetify folder
5. **Verify** → Check installation

### Deployment Checklist

- [ ] All tests pass
- [ ] No console errors
- [ ] Bundle size acceptable
- [ ] CSS applies correctly
- [ ] Color picker works
- [ ] Settings save/load
- [ ] Hotkey functions
- [ ] No memory leaks

## Contributing

### Before Starting

1. Check existing issues/PRs
2. Create issue for new features
3. Discuss approach with maintainers
4. Fork repository

### Development Process

1. Create feature branch: `git checkout -b feature/my-feature`
2. Make changes with tests
3. Run test suite: `npm test`
4. Commit with clear messages
5. Push to fork
6. Create Pull Request

### Commit Messages

Use conventional commits:

```
feat: add OKLCH color support
fix: correct contrast calculation
docs: update README
test: add color conversion tests
refactor: simplify color parser
```

### Pull Request Guidelines

- Clear description of changes
- Reference related issues
- Include test coverage
- Update documentation
- No breaking changes (unless major version)

## Release Process

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Create git tag: `git tag v1.0.0`
4. Push tag: `git push origin v1.0.0`
5. Create GitHub release
6. Deploy to Spicetify

## Resources

### Documentation

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)
- [Ace Editor API](https://ace.c9.io/api/)
- [Spicetify API](https://spicetify.app/docs/)

### Tools

- [VS Code](https://code.visualstudio.com/) - Recommended editor
- [DevTools](https://developer.chrome.com/docs/devtools/) - Debugging
- [OKLCH Picker](https://oklch.com/) - Color reference
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

## Support

- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions
- **Community**: Spicetify Discord

---

**Happy coding! 🚀**
