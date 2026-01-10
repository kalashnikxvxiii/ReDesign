# ReDesign - Spicetify CSS Editor

A powerful Spicetify extension that provides a floating CSS editor with advanced editing features, live preview, and seamless integration with Spotify's interface.

## Features

✨ **Live CSS Editing**
- Edit your Spotify theme CSS in real-time with instant preview
- Floating, draggable, and resizable editor window
- Minimize/maximize functionality that follows window resizing

🎨 **Advanced Editor**
- Syntax highlighting powered by Ace Editor
- Auto-completion and intelligent code suggestions
- Customizable font size and tab spacing
- Line numbers and code folding
- Multiple color themes for the editor

⚙️ **Smart Features**
- Auto-save option to persist changes automatically
- Word wrap for better readability
- Configurable hotkey to quickly open/close the editor
- Position memory - remembers where you placed it

🎯 **Seamless Integration**
- Native Spotify settings integration
- Follows Spotify's design language
- Properly aligned controls and spacing

## Installation

### Via Spicetify Marketplace (Recommended)
1. Install [Spicetify](https://spicetify.app/)
2. Install [Spicetify Marketplace](https://github.com/spicetify/spicetify-marketplace)
3. Search for "ReDesign" in the Extensions tab
4. Click Install

### Manual Installation
1. Download the latest release from the [Releases](https://github.com/kalashnikxvxiii/spicetify-redesign/releases) page
2. Copy `redesign.js` to your Spicetify extensions folder:
   - Windows: `%APPDATA%\spicetify\Extensions`
   - Linux/macOS: `~/.config/spicetify/Extensions`
3. Run the following commands:
   ```bash
   spicetify config extensions redesign.js
   spicetify apply
   ```

### Build from Source
1. Clone this repository:
   ```bash
   git clone https://github.com/kalashnikxvxiii/spicetify-redesign
   cd spicetify-redesign
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the extension:
   ```bash
   npm run build
   ```
4. The compiled extension will be automatically placed in your Spicetify extensions folder
5. Apply the extension:
   ```bash
   spicetify apply
   ```

## Usage

1. **Open the Editor**: Use your configured hotkey (default: `Ctrl+Shift+E`) or access it from Spotify's settings
2. **Edit CSS**: Type your CSS code in the editor
3. **See Changes Live**: Changes are applied immediately as you type
4. **Save**: Enable auto-save in settings, or your changes persist automatically
5. **Customize**: Access settings in Spotify's settings page under "ReDesign" section

## Configuration

Access settings in Spotify Settings > ReDesign:

- **Hotkey to open/close editor**: Customize the keyboard shortcut
- **Editor font size**: Adjust font size for better readability
- **Tab size**: Set the number of spaces for tabs
- **Enable Auto-save**: Automatically save changes
- **Show Line Numbers**: Toggle line numbers visibility
- **Enable word wrap**: Wrap long lines for better viewing
- **Editor color theme**: Choose from multiple color schemes
- **Save editor position**: Remember editor position between sessions
- **Restore default CSS**: Reset to original Spotify CSS

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+E` | Toggle editor (customizable) |
| `Ctrl+S` | Save CSS (when auto-save is disabled) |
| `Ctrl+F` | Find in editor |
| `Ctrl+H` | Find and replace |
| `Ctrl+/` | Toggle comment |
| `Ctrl+Z` | Undo |
| `Ctrl+Y` | Redo |

## Development

### Project Structure
```
spicetify-redesign/
├── src/
│   ├── css-editor-iframe.tsx    # Main extension component
│   ├── lib/
│   │   ├── settingsSection.tsx   # Modified settings library
│   │   ├── settings.module.css   # Settings styles
│   │   └── types/                # TypeScript type definitions
│   └── types/
│       └── ace.d.ts              # Ace Editor types
├── build.mjs                     # Build script
├── package.json                  # Project metadata
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # This file
```

### Build Scripts

- `npm run build` - Build the extension once
- `npm run watch` - Build and watch for changes

### Technologies Used

- **React** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Ace Editor** - Code editor component
- **esbuild** - Fast bundler
- **react-rnd** - Draggable and resizable components

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Credits

- Original project forked from [Spotify CSS Editor](https://github.com/CharlieS1103/spicetify-css-editor)
- Heavily modified and enhanced by me :)
- Built with [Spicetify](https://spicetify.app/)
- Uses [spcr-settings](https://github.com/FlafyDev/spicetify-creator-plugins/tree/main/packages/spcr-settings) for settings UI

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

If you encounter any issues or have suggestions, please [open an issue](https://github.com/kalashnikxvxiii/spicetify-redesign/issues) on GitHub.

---

Made with ❤️ for the Spicetify community