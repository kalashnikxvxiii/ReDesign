# Project Structure

## Root Directory

```
.
├── .editorconfig              # Editor configuration (formatting standards)
├── .gitattributes             # Git attributes
├── .gitignore                 # Git ignore rules
├── .npmrc                      # NPM configuration
├── .prettierrc                 # Code formatter configuration
├── .prettierignore            # Prettier ignore rules
├── CHANGELOG.md               # Version history and changes
├── CONTRIBUTING.md            # Contribution guidelines
├── LICENSE                    # MIT License
├── README.md                  # Project overview and quick start
├── manifest.json              # Spicetify Marketplace manifest
├── preview.png                # Marketplace preview image
├── package.json               # NPM dependencies and scripts
├── package-lock.json          # Locked dependency versions
├── tsconfig.json              # TypeScript configuration
│
├── .github/                   # GitHub configuration
│   ├── ISSUE_TEMPLATE/        # Issue templates
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   ├── workflows/             # GitHub Actions CI/CD
│   │   └── ci.yml
│   └── pull_request_template.md
│
├── docs/                      # Documentation
│   └── DEVELOPMENT.md         # Development guide and architecture
│
├── scripts/                   # Build and deployment scripts
│   ├── build.mjs              # esbuild configuration
│   ├── deploy.js              # Deployment pipeline
│   ├── test.js                # Test runner
│   └── verify.js              # Verification checks
│
├── src/                       # Source code
│   ├── app.tsx                # Entry point
│   ├── css-editor-iframe.tsx  # Main editor component
│   └── lib/                   # Library code
│       ├── ace-colorpicker.min.js      # External library
│       ├── color-converter.ts          # Color utilities
│       ├── colorpicker-enhanced.css    # Color picker styles
│       ├── colorpicker-manager.ts      # State management
│       ├── settingsSection.tsx         # Settings UI
│       ├── settings.module.css         # Settings styles
│       └── types/                      # TypeScript definitions
│           ├── css-modules.d.ts
���│           ├── settings-field.ts
│           └── spicetify.d.ts
│
└── node_modules/              # Dependencies (generated)
```

## Key Directories

### `.github/`
GitHub-specific configuration:
- **ISSUE_TEMPLATE/**: Templates for bug reports and feature requests
- **workflows/**: GitHub Actions CI/CD pipeline
- **pull_request_template.md**: PR template

### `docs/`
Project documentation:
- **DEVELOPMENT.md**: Development setup, architecture, and contribution guidelines

### `scripts/`
Build and deployment automation:
- **build.mjs**: esbuild configuration for bundling
- **deploy.js**: Deployment pipeline to Spicetify
- **test.js**: Automated test suite
- **verify.js**: Post-deployment verification

### `src/`
Source code:
- **app.tsx**: Main entry point
- **css-editor-iframe.tsx**: Editor UI and state management
- **lib/**: Reusable components and utilities
  - **color-converter.ts**: Color format conversions
  - **colorpicker-manager.ts**: Color picker state machine
  - **colorpicker-enhanced.css**: Modern color picker styling
  - **settingsSection.tsx**: Settings UI component
  - **types/**: TypeScript type definitions

## Configuration Files

| File | Purpose |
|------|---------|
| `.editorconfig` | Editor formatting standards |
| `.gitignore` | Git ignore rules |
| `.npmrc` | NPM configuration |
| `.prettierrc` | Code formatter settings |
| `tsconfig.json` | TypeScript compiler options |
| `package.json` | Dependencies and scripts |

## Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Project overview and quick start |
| `DOCUMENTATION_INDEX.md` | Documentation index and quick links |
| `CONTRIBUTING.md` | Contribution guidelines |
| `CHANGELOG.md` | Version history |
| `docs/README.md` | Documentation directory index |
| `docs/DEVELOPMENT.md` | Development guide |
| `docs/PROJECT_STRUCTURE.md` | Project structure (this file) |

## Build Output

The build process generates:
- `dist/extension.js` - Bundled extension (deployed to Spicetify)
- `dist/extension.js.map` - Source map for debugging

## NPM Scripts

```bash
npm run build          # Build extension
npm run watch         # Build with file watching
npm test              # Run test suite
npm run deploy        # Full deployment pipeline
npm run deploy:quick  # Quick deploy (skip tests)
npm run verify        # Verify installation
```

## File Organization Principles

1. **Separation of Concerns**: Each file has a single responsibility
2. **Logical Grouping**: Related files are grouped in directories
3. **Clear Naming**: File names clearly indicate their purpose
4. **Minimal Root**: Root directory contains only essential files
5. **Documentation**: Each directory has clear purpose and structure

## Adding New Files

When adding new files:

1. **Source Code**: Place in `src/` or `src/lib/`
2. **Tests**: Add to `scripts/test.js`
3. **Documentation**: Add to `docs/` or update existing docs
4. **Scripts**: Place in `scripts/`
5. **Configuration**: Place in root with dot prefix (`.filename`)

## Maintenance

- Keep `scripts/` clean and organized
- Update `CHANGELOG.md` with changes
- Maintain documentation in `docs/`
- Use `.gitignore` to exclude unnecessary files
- Follow `.editorconfig` standards

---

For more information, see:
- [README.md](../README.md) - Project overview
- [CONTRIBUTING.md](../CONTRIBUTING.md) - Contribution guidelines
- [docs/DEVELOPMENT.md](../docs/DEVELOPMENT.md) - Development guide
