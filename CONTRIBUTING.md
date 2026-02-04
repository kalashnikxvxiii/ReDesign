# Contributing to ReDesign CSS Editor

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on the code, not the person
- Help others learn and grow

## Getting Started

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/YOUR_USERNAME/spicetify-redesign.git`
3. **Create** a feature branch: `git checkout -b feature/my-feature`
4. **Install** dependencies: `npm install`
5. **Make** your changes
6. **Test** your changes: `npm test`
7. **Commit** with clear messages
8. **Push** to your fork
9. **Create** a Pull Request

## Development Setup

See [DEVELOPMENT.md](docs/DEVELOPMENT.md) for detailed setup instructions.

## Commit Messages

Use conventional commits format:

```
type(scope): subject

body

footer
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Adding or updating tests
- `chore`: Build, dependencies, etc.

**Examples:**
```
feat(color-picker): add OKLCH format support
fix(accessibility): correct contrast calculation
docs: update README with examples
test(converter): add round-trip conversion tests
```

## Pull Request Process

1. **Update** documentation if needed
2. **Add** tests for new features
3. **Run** test suite: `npm test`
4. **Ensure** no console errors
5. **Check** bundle size impact
6. **Write** clear PR description
7. **Reference** related issues

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issues
Fixes #123

## Testing
How to test these changes

## Checklist
- [ ] Tests pass
- [ ] No console errors
- [ ] Documentation updated
- [ ] No breaking changes
```

## Testing

### Running Tests

```bash
npm test
```

### Writing Tests

Add tests to `scripts/test.js`:

```javascript
runner.test('should convert HEX to RGB', () => {
  const result = ColorConverter.hexToRgb('#FF5733');
  runner.assertEqual(result.r, 255);
});
```

### Test Coverage

Aim for:
- ✅ All public functions tested
- ✅ Edge cases covered
- ✅ Error handling verified
- ✅ Performance acceptable

## Code Style

### TypeScript

```typescript
// Use explicit types
function convertColor(color: string): RGB {
  // Implementation
}

// Use interfaces for objects
interface ColorValue {
  hex: string;
  rgb: string;
  hsl: string;
}

// Document public APIs
/**
 * Convert HEX color to RGB
 * @param hex - HEX color string (e.g., '#FF5733')
 * @returns RGB object or null if invalid
 */
export function hexToRgb(hex: string): RGB | null {
  // Implementation
}
```

### CSS

```css
/* Use CSS Custom Properties */
:root {
  --cp-bg-primary: #1e1e1e;
  --cp-text-primary: #d4d4d4;
}

/* Use semantic class names */
.colorpicker-body {
  background: var(--cp-bg-primary);
}

/* Include accessibility features */
.button:focus-visible {
  outline: 2px solid var(--cp-border-focus);
}
```

### Naming Conventions

- **Classes**: `PascalCase` (e.g., `ColorConverter`)
- **Functions**: `camelCase` (e.g., `getContrastRatio`)
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `MAX_ITERATIONS`)
- **CSS Classes**: `kebab-case` (e.g., `.color-picker-body`)
- **CSS Variables**: `--cp-*` prefix (e.g., `--cp-bg-primary`)

## Performance Guidelines

- Keep bundle size < 50KB
- Color conversions < 10ms
- Contrast calculations < 1ms
- Minimize DOM updates
- Use efficient algorithms

## Accessibility

All changes must maintain WCAG AA compliance:

- ✅ Keyboard navigation
- ✅ Focus indicators
- ✅ Color contrast (4.5:1 minimum)
- ✅ Screen reader support
- ✅ Reduced motion support

## Documentation

Update documentation for:
- New features
- API changes
- Configuration options
- Breaking changes

## Reporting Issues

### Bug Reports

Include:
- Clear description
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots/videos if applicable
- Environment (OS, Spotify version, etc.)

### Feature Requests

Include:
- Clear description
- Use case/motivation
- Proposed solution
- Alternative approaches

## Questions?

- Check existing issues/discussions
- Read [DEVELOPMENT.md](docs/DEVELOPMENT.md)
- Ask in GitHub Discussions
- Join Spicetify Discord

## Recognition

Contributors will be recognized in:
- README.md
- GitHub contributors page
- Release notes

Thank you for contributing! 🎉
