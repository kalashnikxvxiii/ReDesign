import React from "react";
import { SettingsSection } from "./lib/settingsSection";

interface ICSSEditorProps {}

interface ICSSEditorStates {
  code: string;
  fontSize: string;
  visible: boolean;
  minimized: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  minimizedX: number;
  minimizedY: number;
  isDragging: boolean;
  isResizing: boolean;
  resizeDirection: string | null;
  dragStartX: number;
  dragStartY: number;
  iframeKey: number; // Used to force iframe re-render
}

class CSSEditorIframe extends React.Component<ICSSEditorProps, ICSSEditorStates> {
  settings = new SettingsSection("ReDesign", "redesign-editor");
  openHotkey: string;
  keydownHandler: (e: KeyboardEvent) => void;
  messageHandler: (e: MessageEvent) => void;
  styleElement: HTMLStyleElement | null = null;
  iframeRef: React.RefObject<HTMLIFrameElement>;
  settingsPollingInterval: number | null = null;
  lastThemeSettings = {
    palette: "Default",
    uiTheme: "Dark"
  };

  constructor(props: ICSSEditorProps) {
    super(props);

    this.iframeRef = React.createRef();

    // Initialize settings
    this.settings.addHidden("css", "/* Write your CSS here :D */\n\n");

    // General Settings
    this.settings.addButton(
      "button-1",
      "Open ReDesign editor",
      "Open ReDesign Editor",
      () => this.toggle()
    );

    this.settings.addInput(
      "open-hotkey",
      "Hotkey to open/close editor",
      "F12",
      () => {
        this.openHotkey = this.settings.getFieldValue<string>("open-hotkey");
      }
    );

    // Editor Settings
    this.settings.addInput(
      "font-size",
      "Editor font size (px)",
      "14px",
      () => {
        this.setState({
          fontSize: this.settings.getFieldValue<string>("font-size"),
        });
        this.sendCSSToIframe();
      }
    );

    // Unified palette selector with all themes organized by category
    this.settings.addDropDown(
      "editor-palette",
      "Editor palette",
      [
        "Default",
        "Monokai",
        "Dracula",
        "GitHub Dark",
        "Tomorrow Night",
        "Twilight",
        "Nord Dark",
        "One Dark",
        "Gruvbox",
        "Base16: Ocean",
        "Base16: Tomorrow Night",
        "Base16: Monokai",
        "Base16: Solarized Dark",
        "Base16: Dracula",
        "Base16: Nord",
        "Base16: Gruvbox Dark",
        "Catppuccin: Mocha",
        "Catppuccin: Macchiato",
        "Catppuccin: Frappe",
        "Catppuccin: Latte"
      ],
      0,
      () => {
        this.reloadIframe();
      }
    );

    // Editor Preferences
    this.settings.addToggle(
      "auto-save",
      "Enable auto-save",
      true,
      () => {
        this.sendCSSToIframe();
      }
    );

    this.settings.addToggle(
      "line-numbers",
      "Show line numbers",
      true,
      () => {
        this.sendCSSToIframe();
      }
    );

    this.settings.addToggle(
      "word-wrap",
      "Enable word wrap",
      false,
      () => {
        this.sendCSSToIframe();
      }
    );

    this.settings.addInput(
      "tab-size",
      "Tab size (spaces)",
      "2",
      () => {
        this.sendCSSToIframe();
      }
    );

    // UI Theme
    this.settings.addDropDown(
      "ui-theme",
      "Editor UI theme",
      ["Dark (Default)", "Light"],
      0,
      () => {
        this.reloadIframe();
      }
    );

    console.log("[ReDesign] About to register settings...");

    // Add CSS styles BEFORE pushing settings so they're ready when DOM is created
    this.addSettingsContainerStyles();
    console.log("[ReDesign] ✅ CSS styles added to <head>");

    this.settings.pushSettings();
    console.log("[ReDesign] Settings registered successfully");
    console.log("[ReDesign] Settings section name:", this.settings.name);

    // Add x-settings-section class to the container to match native Spotify settings
    setTimeout(() => {
      const container = document.getElementById('redesign-editor');
      if (container) {
        container.classList.add('x-settings-section');
        console.log("[ReDesign] ✅ Added x-settings-section class to container");
      }
    }, 100);

    this.openHotkey = this.settings.getFieldValue<string>("open-hotkey");

    // Hotkey handler
    this.keydownHandler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' ||
                      target.tagName === 'TEXTAREA' ||
                      target.isContentEditable;

      if (!isInput && e.key === this.openHotkey) {
        e.preventDefault();
        e.stopPropagation();
        this.toggle();
      }
    };

    document.addEventListener("keydown", this.keydownHandler, { capture: true });

    // Message handler for iframe communication
    this.messageHandler = (event: MessageEvent) => {
      if (event.data && event.data.type === 'UPDATE_CSS') {
        this.updateCSS(event.data.css);
      } else if (event.data && event.data.type === 'REQUEST_CSS') {
        this.sendCSSToIframe();
      } else if (event.data && event.data.type === 'CLOSE_EDITOR') {
        this.setState({ visible: false });
      } else if (event.data && event.data.type === 'OPEN_SETTINGS') {
        // Minimize editor and navigate to Spotify settings
        console.log("[ReDesign] Minimizing editor and opening Spotify settings...");
        this.setState({ minimized: true });

        // Navigate to settings page
        setTimeout(() => {
          Spicetify.Platform.History?.push('/preferences');
        }, 100);
      }
    };

    window.addEventListener('message', this.messageHandler);

    this.state = {
      code: this.settings.getFieldValue<string>("css"),
      fontSize: this.settings.getFieldValue<string>("font-size"),
      visible: false,
      minimized: false,
      x: 100,
      y: 50,
      width: 1000,
      height: 700,
      minimizedX: Math.max(0, window.innerWidth - 200),
      minimizedY: Math.max(0, window.innerHeight - 70),
      isDragging: false,
      isResizing: false,
      resizeDirection: null,
      dragStartX: 0,
      dragStartY: 0,
      iframeKey: 0,
    };

    // Apply initial CSS
    this.applyCSS(this.state.code);
  }

  applyCSS(css: string) {
    if (!this.styleElement) {
      this.styleElement = document.createElement('style');
      this.styleElement.id = 'redesign-custom-styles';
      document.head.appendChild(this.styleElement);
    }
    this.styleElement.textContent = css;
  }

  updateCSS(css: string) {
    this.setState({ code: css });
    this.settings.setFieldValue("css", css);
    this.applyCSS(css);
  }

  toggle() {
    this.setState({ visible: !this.state.visible }, () => {
      if (this.state.visible) {
        setTimeout(() => this.sendCSSToIframe(), 100);
      }
    });
  }

  sendCSSToIframe() {
    if (this.iframeRef.current && this.iframeRef.current.contentWindow) {
      this.iframeRef.current.contentWindow.postMessage({
        type: 'SET_CSS',
        css: this.state.code
      }, '*');
    }
  }

  reloadIframe() {
    // Force iframe reload by updating state, which triggers re-render
    this.setState({ visible: this.state.visible }, () => {
      setTimeout(() => this.sendCSSToIframe(), 100);
    });
  }

  forceReloadIframe() {
    // Force iframe to completely re-render by changing its key
    this.setState({ iframeKey: this.state.iframeKey + 1 }, () => {
      setTimeout(() => this.sendCSSToIframe(), 100);
    });
  }

  handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent text selection during drag
    if (this.state.minimized) {
      this.setState({
        isDragging: true,
        dragStartX: e.clientX - this.state.minimizedX,
        dragStartY: e.clientY - this.state.minimizedY,
      });
    } else {
      this.setState({
        isDragging: true,
        dragStartX: e.clientX - this.state.x,
        dragStartY: e.clientY - this.state.y,
      });
    }
    // Capture pointer for smooth dragging
    try {
      const nativeEvent = e.nativeEvent as any;
      if (nativeEvent.pointerId !== undefined) {
        (e.target as HTMLElement).setPointerCapture?.(nativeEvent.pointerId);
      }
    } catch (err) {
      // Ignore setPointerCapture errors
    }
  };

  handleResizeMouseDown = (e: React.MouseEvent, direction: string) => {
    e.stopPropagation();
    this.setState({
      isResizing: true,
      resizeDirection: direction,
      dragStartX: e.clientX,
      dragStartY: e.clientY,
    });
  };

  handleMouseMove = (e: MouseEvent) => {
    // Use requestAnimationFrame for smooth performance
    if (!this._rafId) {
      this._rafId = requestAnimationFrame(() => {
        if (this.state.isDragging) {
          if (this.state.minimized) {
            this.setState({
              minimizedX: e.clientX - this.state.dragStartX,
              minimizedY: e.clientY - this.state.dragStartY,
            });
          } else {
            this.setState({
              x: e.clientX - this.state.dragStartX,
              y: e.clientY - this.state.dragStartY,
            });
          }
        } else if (this.state.isResizing && this.state.resizeDirection) {
          const deltaX = e.clientX - this.state.dragStartX;
          const deltaY = e.clientY - this.state.dragStartY;
          const direction = this.state.resizeDirection;

          this.setState((prevState) => {
            let newState: any = { dragStartX: e.clientX, dragStartY: e.clientY };

            if (direction.includes('e')) {
              newState.width = Math.max(400, prevState.width + deltaX);
            }
            if (direction.includes('s')) {
              newState.height = Math.max(300, prevState.height + deltaY);
            }
            if (direction.includes('w')) {
              const newWidth = Math.max(400, prevState.width - deltaX);
              if (newWidth >= 400) {
                newState.width = newWidth;
                newState.x = prevState.x + deltaX;
              }
            }
            if (direction.includes('n')) {
              const newHeight = Math.max(300, prevState.height - deltaY);
              if (newHeight >= 300) {
                newState.height = newHeight;
                newState.y = prevState.y + deltaY;
              }
            }

            return newState;
          });
        }
        this._rafId = null;
      });
    }
  };

  private _rafId: number | null = null;

  handleMouseUp = () => {
    if (this.state.isDragging) {
      this.setState({ isDragging: false });
    }
    if (this.state.isResizing) {
      this.setState({ isResizing: false, resizeDirection: null });
    }
  };

  handleMinimize = () => {
    this.setState({ minimized: true });
  };

  handleMaximize = () => {
    this.setState({ minimized: false });
  };

  checkThemeSettingsChanged = () => {
    const currentPalette = this.settings.getFieldValue<string>("editor-palette") || "Default";
    const currentUiTheme = this.settings.getFieldValue<string>("ui-theme") || "Dark";

    if (
      currentPalette !== this.lastThemeSettings.palette ||
      currentUiTheme !== this.lastThemeSettings.uiTheme
    ) {
      console.log("[ReDesign] ⚠️ Theme settings changed, reloading iframe...");
      console.log("[ReDesign] Old:", this.lastThemeSettings);
      console.log("[ReDesign] New:", { palette: currentPalette, uiTheme: currentUiTheme });

      this.lastThemeSettings.palette = currentPalette;
      this.lastThemeSettings.uiTheme = currentUiTheme;

      this.forceReloadIframe();
    }
  };

  handleWindowResize = () => {
    // Keep editor within viewport bounds when window resizes (both when expanded and minimized)
    console.log("[ReDesign] Window resized:", {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      editorWidth: this.state.width,
      editorHeight: this.state.height,
      currentX: this.state.x,
      currentY: this.state.y,
      minimized: this.state.minimized,
      minimizedX: this.state.minimizedX,
      minimizedY: this.state.minimizedY
    });

    // Calculate new positions for expanded editor
    const maxX = window.innerWidth - this.state.width;
    const maxY = window.innerHeight - this.state.height;
    const newX = Math.min(this.state.x, Math.max(0, maxX));
    const newY = Math.min(this.state.y, Math.max(0, maxY));

    // Calculate new positions for minimized editor (180px width, 50px height)
    const minimizedWidth = 180;
    const minimizedHeight = 50;
    const maxMinX = window.innerWidth - minimizedWidth;
    const maxMinY = window.innerHeight - minimizedHeight;
    const newMinX = Math.min(this.state.minimizedX, Math.max(0, maxMinX));
    const newMinY = Math.min(this.state.minimizedY, Math.max(0, maxMinY));

    console.log("[ReDesign] Calculated new positions:", {
      expanded: { newX, newY, maxX, maxY },
      minimized: { newMinX, newMinY, maxMinX, maxMinY },
      willUpdate: newX !== this.state.x || newY !== this.state.y || newMinX !== this.state.minimizedX || newMinY !== this.state.minimizedY
    });

    this.setState({
      x: newX,
      y: newY,
      minimizedX: newMinX,
      minimizedY: newMinY,
    });
  };

  componentDidMount() {
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
    window.addEventListener('resize', this.handleWindowResize);

    // Initialize lastThemeSettings with current values
    this.lastThemeSettings.palette = this.settings.getFieldValue<string>("editor-palette") || "Default";
    this.lastThemeSettings.uiTheme = this.settings.getFieldValue<string>("ui-theme") || "Dark";

    console.log("[ReDesign] Initial theme settings:", this.lastThemeSettings);

    // Start polling for settings changes
    this.settingsPollingInterval = window.setInterval(() => {
      this.checkThemeSettingsChanged();
    }, 500); // Check every 500ms
  }

  addSettingsContainerStyles() {
    // Add styles to make the settings container match Spotify's native settings perfectly
    const settingsStyle = document.createElement('style');
    settingsStyle.id = 'redesign-settings-styles';
    settingsStyle.textContent = `
      /* CRITICAL FIX: Remove dropdown arrow from text inputs */
      #redesign-editor input.main-dropDown-dropDown[type="text"] {
        -webkit-appearance: none !important;
        -moz-appearance: none !important;
        appearance: none !important;
        background-image: none !important;
        background-color: rgba(var(--spice-rgb-selected-row, 40, 40, 40), 0.3) !important;
        border: 1px solid transparent !important;
        border-radius: 4px !important;
        padding: 8px 12px !important;
        color: var(--spice-text, #fff) !important;
        font-size: 14px !important;
        min-width: 200px !important;
      }

      #redesign-editor input.main-dropDown-dropDown[type="text"]:hover {
        background-color: rgba(var(--spice-rgb-selected-row, 40, 40, 40), 0.5) !important;
      }

      #redesign-editor input.main-dropDown-dropDown[type="text"]:focus {
        outline: 2px solid var(--spice-button, #1db954) !important;
        outline-offset: -1px !important;
        background-color: rgba(var(--spice-rgb-selected-row, 40, 40, 40), 0.6) !important;
      }

      /* Fix dropdown select styling */
      #redesign-editor select.main-dropDown-dropDown {
        background-color: rgba(var(--spice-rgb-selected-row, 40, 40, 40), 0.3) !important;
        border: 1px solid transparent !important;
        border-radius: 4px !important;
        padding: 8px 32px 8px 12px !important;
        color: var(--spice-text, #fff) !important;
        font-size: 14px !important;
        min-width: 200px !important;
      }

      #redesign-editor select.main-dropDown-dropDown:hover {
        background-color: rgba(var(--spice-rgb-selected-row, 40, 40, 40), 0.5) !important;
      }

      #redesign-editor select.main-dropDown-dropDown:focus {
        outline: 2px solid var(--spice-button, #1db954) !important;
        outline-offset: -1px !important;
      }

      /* Fix dropdown menu options styling */
      #redesign-editor select.main-dropDown-dropDown option {
        background-color: var(--spice-background-elevated, #282828) !important;
        color: var(--spice-text, #fff) !important;
        padding: 8px 12px !important;
      }

      #redesign-editor select.main-dropDown-dropDown option:hover {
        background-color: var(--spice-background-highlight, rgba(255, 255, 255, 0.1)) !important;
      }

      #redesign-editor select.main-dropDown-dropDown option:checked {
        background-color: var(--spice-button, #1db954) !important;
        color: var(--spice-button-text, #000) !important;
      }

      /* Fix button styling */
      #redesign-editor button {
        background-color: var(--spice-button, #1db954) !important;
        color: var(--spice-button-text, #000) !important;
        border: none !important;
        border-radius: 500px !important;
        padding: 8px 32px !important;
        font-size: 14px !important;
        font-weight: 700 !important;
        cursor: pointer !important;
        transition: transform 0.1s ease !important;
      }

      #redesign-editor button:hover {
        transform: scale(1.04) !important;
        background-color: var(--spice-button-active, #1ed760) !important;
      }

      #redesign-editor button:active {
        transform: scale(0.96) !important;
      }
    `;
    document.head.appendChild(settingsStyle);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.keydownHandler, { capture: true });
    window.removeEventListener('message', this.messageHandler);
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
    window.removeEventListener('resize', this.handleWindowResize);

    // Stop polling
    if (this.settingsPollingInterval) {
      clearInterval(this.settingsPollingInterval);
      this.settingsPollingInterval = null;
    }

    // Cancel pending RAF
    if (this._rafId) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }

    if (this.styleElement) {
      this.styleElement.remove();
    }
  }

  getEditorHTML(): string {
    // Get the unified palette value
    const paletteValue = this.settings.getFieldValue<string>("editor-palette") || "Default";

    // Map palette names to Ace themes
    const paletteToTheme: { [key: string]: string } = {
      "Default": "ace/theme/monokai",
      "Monokai": "ace/theme/monokai",
      "Dracula": "ace/theme/dracula",
      "GitHub Dark": "ace/theme/github_dark",
      "Tomorrow Night": "ace/theme/tomorrow_night",
      "Twilight": "ace/theme/twilight",
      "Nord Dark": "ace/theme/nord_dark",
      "One Dark": "ace/theme/one_dark",
      "Gruvbox": "ace/theme/gruvbox",
      "Base16: Ocean": "ace/theme/nord_dark",
      "Base16: Tomorrow Night": "ace/theme/tomorrow_night",
      "Base16: Monokai": "ace/theme/monokai",
      "Base16: Solarized Dark": "ace/theme/twilight",
      "Base16: Dracula": "ace/theme/dracula",
      "Base16: Nord": "ace/theme/nord_dark",
      "Base16: Gruvbox Dark": "ace/theme/gruvbox",
      "Catppuccin: Mocha": "ace/theme/monokai",
      "Catppuccin: Macchiato": "ace/theme/nord_dark",
      "Catppuccin: Frappe": "ace/theme/tomorrow_night",
      "Catppuccin: Latte": "ace/theme/chrome"
    };

    const editorTheme = paletteToTheme[paletteValue] || "ace/theme/monokai";
    console.log("[ReDesign] Selected palette:", paletteValue, "-> Theme:", editorTheme);

    const lineNumbers = this.settings.getFieldValue<boolean>("line-numbers") !== false;
    const wordWrap = this.settings.getFieldValue<boolean>("word-wrap") || false;
    const tabSize = parseInt(this.settings.getFieldValue<string>("tab-size") || "2");
    const autoSave = this.settings.getFieldValue<boolean>("auto-save") !== false;

    const uiThemeValue = this.settings.getFieldValue<string>("ui-theme") || "Dark";
    const uiTheme = uiThemeValue.toLowerCase();

    // Determine UI colors and Ace theme based on UI theme
    let bgColor, bgColorSecondary, textColor, borderColor, btnBg, btnHover, btnIconBg, btnIconHover, statusColor, infoBg, aceTheme;

    if (uiTheme === "light") {
      bgColor = "#ffffff";
      bgColorSecondary = "#f3f3f3";
      textColor = "#1e1e1e";
      borderColor = "#e0e0e0";
      btnBg = "#0e639c";
      btnHover = "#1177bb";
      btnIconBg = "transparent";
      btnIconHover = "#e0e0e0";
      statusColor = "#16825d";
      infoBg = "#0e639c";
      aceTheme = "ace/theme/chrome"; // Light theme for Ace
    } else {
      // dark (default)
      bgColor = "#1e1e1e";
      bgColorSecondary = "#252526";
      textColor = "#d4d4d4";
      borderColor = "#3e3e42";
      btnBg = "#0e639c";
      btnHover = "#1177bb";
      btnIconBg = "transparent";
      btnIconHover = "#3e3e42";
      statusColor = "#4ec9b0";
      infoBg = "#007acc";
      aceTheme = editorTheme; // Use selected theme
    }

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ReDesign Editor</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: ${bgColor};
      color: ${textColor};
      overflow: hidden;
      height: 100vh;
      display: flex;
      flex-direction: column;
    }
    .header {
      background: ${bgColorSecondary};
      border-bottom: 1px solid ${borderColor};
      padding: 8px 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-shrink: 0;
      -webkit-app-region: drag;
    }
    .header-left { display: flex; gap: 6px; align-items: center; -webkit-app-region: no-drag; }
    .header-right { display: flex; gap: 4px; align-items: center; }
    .status { font-size: 12px; color: ${statusColor}; display: flex; align-items: center; gap: 4px; }
    .status::before { content: ''; width: 6px; height: 6px; background: ${statusColor}; border-radius: 50%; animation: pulse 2s infinite; }
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
    .btn { background: ${btnBg}; border: none; color: white; padding: 4px 8px; border-radius: 3px; cursor: pointer; font-size: 11px; transition: background 0.2s; }
    .btn:hover { background: ${btnHover}; }
    .btn-icon { background: ${btnIconBg}; border: 1px solid ${borderColor}; color: ${textColor}; padding: 4px 8px; }
    .btn-icon:hover { background: ${btnIconHover}; border-color: ${borderColor}; }
    #editor { flex: 1; width: 100%; font-size: ${this.state.fontSize}; }
    .info-bar { background: ${infoBg}; color: white; padding: 4px 8px; font-size: 11px; text-align: center; flex-shrink: 0; }
  </style>
</head>
<body>
  <div class="header">
    <div class="header-left">
      <button class="btn btn-icon" onclick="showHelp()" title="Help & Shortcuts">?</button>
      <button class="btn btn-icon" onclick="showAbout()" title="About ReDesign">ℹ</button>
      <button class="btn" onclick="openSettings()" title="Settings">⚙ Settings</button>
    </div>
    <div class="header-right">
      <div class="status">${autoSave ? 'Auto-saving' : 'Manual save'}</div>
    </div>
  </div>
  <div id="editor">/* Loading editor... */</div>
  <div class="info-bar">Changes apply automatically • Ctrl+S to save • Ctrl+F to find</div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.14/ace.js"></script>
  <script>
    const editor = ace.edit("editor");
    const theme = "${aceTheme}";
    console.log("[ReDesign] Setting Ace theme:", theme);
    editor.setTheme(theme);
    editor.session.setMode("ace/mode/css");
    editor.setOptions({
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true,
      enableSnippets: true,
      fontSize: "${this.state.fontSize}",
      showPrintMargin: false,
      highlightActiveLine: true,
      showGutter: ${lineNumbers},
      tabSize: ${tabSize},
      useSoftTabs: true,
      wrap: ${wordWrap}
    });

    let currentCSS = '';
    let saveTimeout = null;

    // Request initial CSS
    window.parent.postMessage({ type: 'REQUEST_CSS' }, '*');

    // Listen for CSS from parent
    window.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'SET_CSS') {
        currentCSS = event.data.css;
        if (editor.getValue() !== currentCSS) {
          const cursorPosition = editor.getCursorPosition();
          editor.setValue(currentCSS, -1);
          editor.moveCursorToPosition(cursorPosition);
        }
      }
    });

    // Auto-save on change (only if enabled)
    const autoSaveEnabled = ${autoSave};
    editor.session.on('change', () => {
      if (autoSaveEnabled) {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(() => {
          const css = editor.getValue();
          if (css !== currentCSS) {
            currentCSS = css;
            window.parent.postMessage({ type: 'UPDATE_CSS', css: css }, '*');
          }
        }, 300);
      }
    });

    // Ctrl+S to save
    editor.commands.addCommand({
      name: 'save',
      bindKey: { win: 'Ctrl-S', mac: 'Cmd-S' },
      exec: function(editor) {
        const css = editor.getValue();
        window.parent.postMessage({ type: 'UPDATE_CSS', css: css }, '*');
        const infoBar = document.querySelector('.info-bar');
        const originalText = infoBar.textContent;
        infoBar.textContent = '✓ Saved!';
        infoBar.style.background = '#4ec9b0';
        setTimeout(() => {
          infoBar.textContent = originalText;
          infoBar.style.background = '#007acc';
        }, 1500);
      }
    });

    function showHelp() {
      const helpDiv = document.createElement('div');
      helpDiv.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:' + '${bgColorSecondary}' + ';border:1px solid ' + '${borderColor}' + ';border-radius:8px;padding:24px;box-shadow:0 8px 32px rgba(0,0,0,0.8);z-index:10000;min-width:420px;max-width:500px;color:' + '${textColor}' + ';font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;';
      helpDiv.innerHTML = '<div style="text-align:center;margin-bottom:20px;"><h2 style="color:' + '${statusColor}' + ';margin:0 0 8px 0;">Keyboard Shortcuts</h2><p style="color:#858585;font-size:12px;margin:0;">ReDesign Editor Hotkeys</p></div><div style="margin-bottom:20px;"><table style="width:100%;border-collapse:collapse;"><tr style="border-bottom:1px solid ' + '${borderColor}' + ';"><td style="padding:8px 0;color:' + '${textColor}' + ';font-size:13px;font-family:monospace;"><strong>Ctrl+S</strong> / <strong>Cmd+S</strong></td><td style="padding:8px 0;color:#858585;font-size:12px;text-align:right;">Save CSS</td></tr><tr style="border-bottom:1px solid ' + '${borderColor}' + ';"><td style="padding:8px 0;color:' + '${textColor}' + ';font-size:13px;font-family:monospace;"><strong>Ctrl+F</strong> / <strong>Cmd+F</strong></td><td style="padding:8px 0;color:#858585;font-size:12px;text-align:right;">Find</td></tr><tr style="border-bottom:1px solid ' + '${borderColor}' + ';"><td style="padding:8px 0;color:' + '${textColor}' + ';font-size:13px;font-family:monospace;"><strong>Ctrl+H</strong> / <strong>Cmd+H</strong></td><td style="padding:8px 0;color:#858585;font-size:12px;text-align:right;">Find & Replace</td></tr><tr style="border-bottom:1px solid ' + '${borderColor}' + ';"><td style="padding:8px 0;color:' + '${textColor}' + ';font-size:13px;font-family:monospace;"><strong>Ctrl+/</strong></td><td style="padding:8px 0;color:#858585;font-size:12px;text-align:right;">Toggle Comment</td></tr><tr style="border-bottom:1px solid ' + '${borderColor}' + ';"><td style="padding:8px 0;color:' + '${textColor}' + ';font-size:13px;font-family:monospace;"><strong>Ctrl+Z</strong></td><td style="padding:8px 0;color:#858585;font-size:12px;text-align:right;">Undo</td></tr><tr style="border-bottom:1px solid ' + '${borderColor}' + ';"><td style="padding:8px 0;color:' + '${textColor}' + ';font-size:13px;font-family:monospace;"><strong>Ctrl+Y</strong></td><td style="padding:8px 0;color:#858585;font-size:12px;text-align:right;">Redo</td></tr><tr style="border-bottom:1px solid ' + '${borderColor}' + ';"><td style="padding:8px 0;color:' + '${textColor}' + ';font-size:13px;font-family:monospace;"><strong>Ctrl+A</strong></td><td style="padding:8px 0;color:#858585;font-size:12px;text-align:right;">Select All</td></tr><tr><td style="padding:8px 0;color:' + '${textColor}' + ';font-size:13px;font-family:monospace;"><strong>Alt+Up/Down</strong></td><td style="padding:8px 0;color:#858585;font-size:12px;text-align:right;">Move Line</td></tr></table></div><button onclick="this.parentElement.remove();" style="width:100%;padding:10px;background:' + '${btnBg}' + ';color:white;border:none;border-radius:4px;cursor:pointer;font-size:12px;font-weight:600;transition:background 0.2s;">Close</button>';
      document.body.appendChild(helpDiv);
    }

    function showAbout() {
      const aboutDiv = document.createElement('div');
      aboutDiv.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:' + '${bgColorSecondary}' + ';border:1px solid ' + '${borderColor}' + ';border-radius:8px;padding:24px;box-shadow:0 8px 32px rgba(0,0,0,0.8);z-index:10000;min-width:400px;color:' + '${textColor}' + ';font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;';
      aboutDiv.innerHTML = '<div style="text-align:center;margin-bottom:20px;"><h2 style="color:' + '${statusColor}' + ';margin:0 0 8px 0;">ReDesign</h2><p style="color:#858585;font-size:12px;margin:0;">Spotify CSS Editor v2.0</p></div><div style="margin-bottom:20px;line-height:1.6;font-size:13px;"><p style="margin-bottom:12px;">A modern, feature-rich CSS editor for Spicetify</p><p style="color:#858585;font-size:12px;margin-bottom:8px;">Features:</p><ul style="color:' + '${textColor}' + ';font-size:12px;padding-left:20px;margin:0;"><li>Live CSS editing</li><li>Multiple editor themes</li><li>Base16 & Catppuccin color schemes</li><li>Dark/Light/System UI themes</li><li>Auto-save & customization</li><li>Draggable & Resizable window</li><li>Syntax highlighting & auto-completion</li></ul></div><div style="margin-bottom:20px;padding-top:16px;border-top:1px solid ' + '${borderColor}' + ';"><p style="color:#858585;font-size:11px;margin:0 0 8px 0;">Based on spotify-css-editor by FlafyDev</p><p style="color:#858585;font-size:11px;margin:0 0 8px 0;">Enhanced by:</p><a href="https://github.com/kalashnikxvxiii" target="_blank" style="display:inline-flex;align-items:center;gap:6px;color:' + '${statusColor}' + ';text-decoration:none;font-size:12px;padding:6px 12px;background:' + '${bgColor}' + ';border-radius:4px;border:1px solid ' + '${borderColor}' + ';transition:all 0.2s;"><svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>kalashnikxvxiii</a></div><button onclick="this.parentElement.remove();" style="width:100%;padding:8px;background:' + '${btnBg}' + ';color:white;border:none;border-radius:4px;cursor:pointer;font-size:12px;transition:background 0.2s;">Close</button>';
      document.body.appendChild(aboutDiv);
    }

    function openSettings() {
      window.parent.postMessage({ type: 'OPEN_SETTINGS' }, '*');
    }

    // Focus editor on load
    window.addEventListener('load', () => {
      editor.focus();
    });
  </script>
</body>
</html>`;
  }

  render() {
    if (!this.state.visible) {
      return null;
    }

    // Minimized state
    if (this.state.minimized) {
      return (
        <div style={{
          position: 'fixed',
          top: `${this.state.minimizedY}px`,
          left: `${this.state.minimizedX}px`,
          width: '180px',
          height: '40px',
          background: '#252526',
          borderRadius: '6px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.6)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 12px',
          cursor: this.state.isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
        }}
        onMouseDown={this.handleMouseDown}
        >
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#cccccc' }}>
            ReDesign
          </span>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              onClick={this.handleMaximize}
              style={{
                background: '#0e639c',
                color: 'white',
                border: 'none',
                padding: '4px 8px',
                borderRadius: '3px',
                cursor: 'pointer',
                fontSize: '11px',
              }}
            >
              ▢
            </button>
            <button
              onClick={() => this.toggle()}
              style={{
                background: '#c5c5c5',
                color: '#1e1e1e',
                border: 'none',
                padding: '4px 8px',
                borderRadius: '3px',
                cursor: 'pointer',
                fontSize: '11px',
              }}
            >
              ✕
            </button>
          </div>
        </div>
      );
    }

    // Resize handle style
    const resizeHandleStyle = (direction: string) => ({
      position: 'absolute' as const,
      background: 'transparent',
      zIndex: 10,
      ...(direction.includes('n') && { top: 0, height: '8px', cursor: 'ns-resize' }),
      ...(direction.includes('s') && { bottom: 0, height: '8px', cursor: 'ns-resize' }),
      ...(direction.includes('w') && { left: 0, width: '8px', cursor: 'ew-resize' }),
      ...(direction.includes('e') && { right: 0, width: '8px', cursor: 'ew-resize' }),
      ...(direction === 'nw' && { top: 0, left: 0, width: '16px', height: '16px', cursor: 'nwse-resize' }),
      ...(direction === 'ne' && { top: 0, right: 0, width: '16px', height: '16px', cursor: 'nesw-resize' }),
      ...(direction === 'sw' && { bottom: 0, left: 0, width: '16px', height: '16px', cursor: 'nesw-resize' }),
      ...(direction === 'se' && { bottom: 0, right: 0, width: '16px', height: '16px', cursor: 'nwse-resize' }),
      ...(direction === 'n' && { left: 0, right: 0 }),
      ...(direction === 's' && { left: 0, right: 0 }),
      ...(direction === 'w' && { top: 0, bottom: 0 }),
      ...(direction === 'e' && { top: 0, bottom: 0 }),
    });

    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        background: 'rgba(0, 0, 0, 0.3)', // Lighter backdrop
        pointerEvents: 'none', // Don't block clicks on Spotify
      }}>
        <div style={{
          position: 'absolute',
          top: `${this.state.y}px`,
          left: `${this.state.x}px`,
          width: `${this.state.width}px`,
          height: `${this.state.height}px`,
          background: '#1e1e1e',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
          display: 'flex',
          flexDirection: 'column',
          pointerEvents: 'auto', // Re-enable clicks on editor itself
        }}>
          {/* Resize handles */}
          <div style={resizeHandleStyle('n')} onMouseDown={(e) => this.handleResizeMouseDown(e, 'n')} />
          <div style={resizeHandleStyle('s')} onMouseDown={(e) => this.handleResizeMouseDown(e, 's')} />
          <div style={resizeHandleStyle('w')} onMouseDown={(e) => this.handleResizeMouseDown(e, 'w')} />
          <div style={resizeHandleStyle('e')} onMouseDown={(e) => this.handleResizeMouseDown(e, 'e')} />
          <div style={resizeHandleStyle('nw')} onMouseDown={(e) => this.handleResizeMouseDown(e, 'nw')} />
          <div style={resizeHandleStyle('ne')} onMouseDown={(e) => this.handleResizeMouseDown(e, 'ne')} />
          <div style={resizeHandleStyle('sw')} onMouseDown={(e) => this.handleResizeMouseDown(e, 'sw')} />
          <div style={resizeHandleStyle('se')} onMouseDown={(e) => this.handleResizeMouseDown(e, 'se')} />

          <div
            onMouseDown={this.handleMouseDown}
            style={{
              background: '#252526',
              borderBottom: '1px solid #3e3e42',
              padding: '8px 16px',
              cursor: this.state.isDragging ? 'grabbing' : 'grab',
              userSelect: 'none',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#cccccc' }}>
              ReDesign
            </span>
            <div style={{ display: 'flex', gap: '4px' }}>
              <button
                onClick={this.handleMinimize}
                style={{
                  background: 'transparent',
                  border: '1px solid #3e3e42',
                  color: '#cccccc',
                  padding: '4px 8px',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '11px',
                }}
              >
                −
              </button>
              <button
                onClick={() => this.toggle()}
                style={{
                  background: '#c5c5c5',
                  color: '#1e1e1e',
                  border: 'none',
                  padding: '4px 8px',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '12px',
                }}
              >
                ✕
              </button>
            </div>
          </div>
          <iframe
            key={this.state.iframeKey}
            ref={this.iframeRef}
            srcDoc={this.getEditorHTML()}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              flex: 1,
              pointerEvents: (this.state.isDragging || this.state.isResizing) ? 'none' : 'auto',
            }}
            title="ReDesign Editor"
          />
        </div>
      </div>
    );
  }
}

export default CSSEditorIframe;
