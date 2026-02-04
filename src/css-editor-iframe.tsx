import React from "react";
import { SettingsSection } from "./lib/settingsSection";

declare const __ACE_COLORPICKER_INLINE__: string | undefined;

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
  editorContainerRef: React.RefObject<HTMLDivElement>;
  settingsPollingInterval: number | null = null;
  lastThemeSettings = {
    palette: "Default",
    uiTheme: "Dark"
  };
  cachedEditorHTML: string | null = null;
  cacheVersion: string = "v72"; // FIX: Set CSS mode INSIDE initializeColorPicker() for proper timing
  cachedVersion: string = "";
  cachedPalette: string = "";
  cachedUiTheme: string = "";

  constructor(props: ICSSEditorProps) {
    super(props);

    this.iframeRef = React.createRef();
    this.editorContainerRef = React.createRef();

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

    // UI Theme (registered before editor-palette so palette options can depend on it)
    this.settings.addDropDown(
      "ui-theme",
      "Editor UI theme",
      ["Dark (Default)", "Light"],
      0,
      () => {
        const uiTheme = this.settings.getFieldValue<string>("ui-theme") || "Dark (Default)";
        const isLight = uiTheme.toLowerCase().includes("light");
        const palettes = isLight
          ? [
              "Chrome",
              "Clouds",
              "Crimson Editor",
              "Dawn",
              "Dreamweaver",
              "Eclipse",
              "GitHub",
              "IPlastic",
              "Katzenmilch",
              "Kuroir",
              "Solarized Light",
              "SQL Server",
              "Textmate",
              "Tomorrow",
              "Xcode",
              "Cloud Editor",
              "Goole",
              "IPython",
            ]
          : [
              "Monokai",
              "Dracula",
              "Ambiance",
              "Tomorrow Night",
              "Tomorrow Night Blue",
              "Tomorrow Night Eighties",
              "Nord Dark",
              "Gruvbox",
              "Clouds Midnight",
              "Cobalt",
              "Terminal",
              "Pastel on Dark",
              "Idle Fingers",
              "Chaos",
              "Merbivore",
              "Merbivore Soft",
              "KR Theme",
              "Twilight",
            ];
        const currentPalette = this.settings.getFieldValue<string>("editor-palette");
        if (currentPalette && !palettes.includes(currentPalette)) {
          this.settings.setFieldValue("editor-palette", palettes[0]);
        }
        this.settings.rerender();
        this.reloadIframe();
      }
    );

    const getEditorPaletteOptions = (getFieldValue: (id: string) => any) => {
      const uiTheme = (getFieldValue("ui-theme") as string) || "Dark (Default)";
      return uiTheme.toLowerCase().includes("light")
        ? [
            "Chrome",
            "Clouds",
            "Crimson Editor",
            "Dawn",
            "Dreamweaver",
            "Eclipse",
            "GitHub",
            "IPlastic",
            "Katzenmilch",
            "Kuroir",
            "Solarized Light",
            "SQL Server",
            "Textmate",
            "Tomorrow",
            "Xcode",
            "Cloud Editor",
            "Goole",
            "IPython",
          ]
        : [
            "Monokai",
            "Dracula",
            "Ambiance",
            "Tomorrow Night",
            "Tomorrow Night Blue",
            "Tomorrow Night Eighties",
            "Nord Dark",
            "Gruvbox",
            "Clouds Midnight",
            "Cobalt",
            "Terminal",
            "Pastel on Dark",
            "Idle Fingers",
            "Chaos",
            "Merbivore",
            "Merbivore Soft",
            "KR Theme",
            "Twilight",
          ];
    };

    // Editor palette: options filtered by Editor UI theme (dark vs light)
    this.settings.addDropDown(
      "editor-palette",
      "Editor palette",
      getEditorPaletteOptions,
      "Monokai",
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

    // Hotkey handler - using both window and document listeners for better coverage
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

    // Register on both window and document with capture to catch events early
    window.addEventListener("keydown", this.keydownHandler, { capture: true });
    document.addEventListener("keydown", this.keydownHandler, { capture: true });
    console.log(`[ReDesign] Registered hotkey: ${this.openHotkey} on window and document`);

    // Message handler for iframe communication
    this.messageHandler = (event: MessageEvent) => {
      if (event.data && event.data.type === 'UPDATE_CSS') {
        this.updateCSS(event.data.css);
      } else if (event.data && event.data.type === 'REQUEST_CSS') {
        this.sendCSSToIframe();
      } else if (event.data && event.data.type === 'CLOSE_EDITOR') {
        console.log("[ReDesign] CLOSE_EDITOR message received from iframe");
        this.toggle();
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
    const newVisible = !this.state.visible;
    console.log(`[ReDesign] Toggle editor: ${this.state.visible} -> ${newVisible}`);
    this.setState({ visible: newVisible }, () => {
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
    // Remove keydown listeners from both window and document
    if (this.keydownHandler) {
      window.removeEventListener("keydown", this.keydownHandler, { capture: true });
      document.removeEventListener("keydown", this.keydownHandler, { capture: true });
    }

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
    const uiThemeValue = this.settings.getFieldValue<string>("ui-theme") || "Dark";

    console.log('[ReDesign] Cache check:', {
      hasCachedHTML: !!this.cachedEditorHTML,
      cachedVersion: this.cachedVersion,
      currentVersion: this.cacheVersion,
      versionMatch: this.cachedVersion === this.cacheVersion,
      paletteMatch: this.cachedPalette === paletteValue,
      uiThemeMatch: this.cachedUiTheme === uiThemeValue
    });

    // Return cached HTML if version, palette and uiTheme haven't changed
    if (this.cachedEditorHTML &&
        this.cachedVersion === this.cacheVersion &&
        this.cachedPalette === paletteValue &&
        this.cachedUiTheme === uiThemeValue) {
      console.log('[ReDesign] ⚡ Using cached HTML');
      return this.cachedEditorHTML;
    }

    console.log('[ReDesign] 🔄 Regenerating HTML (cache miss)');

    // Map palette names to Ace themes (dark + light)
    const paletteToTheme: { [key: string]: string } = {
      "Monokai": "ace/theme/monokai",
      "Dracula": "ace/theme/dracula",
      "Ambiance": "ace/theme/ambiance",
      "Tomorrow Night": "ace/theme/tomorrow_night",
      "Tomorrow Night Blue": "ace/theme/tomorrow_night_blue",
      "Tomorrow Night Eighties": "ace/theme/tomorrow_night_eighties",
      "Nord Dark": "ace/theme/nord_dark",
      "Gruvbox": "ace/theme/gruvbox",
      "Clouds Midnight": "ace/theme/clouds_midnight",
      "Cobalt": "ace/theme/cobalt",
      "Terminal": "ace/theme/terminal",
      "Pastel on Dark": "ace/theme/pastel_on_dark",
      "Idle Fingers": "ace/theme/idle_fingers",
      "Chaos": "ace/theme/chaos",
      "Merbivore": "ace/theme/merbivore",
      "Merbivore Soft": "ace/theme/merbivore_soft",
      "KR Theme": "ace/theme/kr_theme",
      "Twilight": "ace/theme/twilight",
      "Chrome": "ace/theme/chrome",
      "Clouds": "ace/theme/clouds",
      "Crimson Editor": "ace/theme/crimson_editor",
      "Dawn": "ace/theme/dawn",
      "Dreamweaver": "ace/theme/dreamweaver",
      "Eclipse": "ace/theme/eclipse",
      "GitHub": "ace/theme/github",
      "IPlastic": "ace/theme/iplastic",
      "Katzenmilch": "ace/theme/katzenmilch",
      "Kuroir": "ace/theme/kuroir",
      "Solarized Light": "ace/theme/solarized_light",
      "SQL Server": "ace/theme/sqlserver",
      "Textmate": "ace/theme/textmate",
      "Tomorrow": "ace/theme/tomorrow",
      "Xcode": "ace/theme/xcode",
      "Cloud Editor": "ace/theme/cloud_editor",
      "Goole": "ace/theme/goole",
      "IPython": "ace/theme/ipython",
    };

    const editorTheme = paletteToTheme[paletteValue] || "ace/theme/monokai";
    console.log("[ReDesign] Selected palette:", paletteValue, "-> Theme:", editorTheme);

    const lineNumbers = this.settings.getFieldValue<boolean>("line-numbers") !== false;
    const wordWrap = this.settings.getFieldValue<boolean>("word-wrap") || false;
    const tabSize = parseInt(this.settings.getFieldValue<string>("tab-size") || "2");
    const autoSave = this.settings.getFieldValue<boolean>("auto-save") !== false;

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
      aceTheme = editorTheme; // Use selected light palette
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

    const html = `<!DOCTYPE html>
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
    .status-bar {
      background: ${bgColorSecondary};
      border-top: 1px solid ${borderColor};
      color: ${textColor};
      padding: 0 12px;
      font-size: 11px;
      height: 22px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
      font-family: 'SF Mono', Monaco, 'Consolas', 'Courier New', monospace;
      user-select: none;
    }
    .status-bar-left, .status-bar-right { display: flex; align-items: center; gap: 0; }
    .status-bar-item {
      padding: 0 8px;
      height: 100%;
      display: flex;
      align-items: center;
      border-right: 1px solid ${borderColor};
      color: ${textColor}cc;
    }
    .status-bar-item:last-child { border-right: none; }
    .status-bar-item.status-message { color: ${statusColor}; font-weight: 600; }
    .status-bar-item.status-message.saved { color: ${statusColor}; }

    /* ═══════════════════════════════════════════════════════════════
       PROFESSIONAL COLOR PICKER - VS Code / Figma / Linear Inspired
       Modern, Elegant, Production-Ready Design
       ═══════════════════════════════════════════════════════════════ */
    
    /* Main Container - Height adapts to content; scroll when > 85vh */
    .colorpicker-body {
      position: relative !important;
      background: linear-gradient(135deg, ${bgColorSecondary}b0 0%, ${bgColorSecondary}bd 100%) !important;
      border: 1px solid ${borderColor}80 !important;
      border-radius: 12px !important;
      box-shadow: 
        0 0 0 1px rgba(255, 255, 255, 0.03),
        0 20px 60px -10px rgba(0, 0, 0, 0.85),
        0 8px 24px -8px rgba(0, 0, 0, 0.6),
        0 0 1px rgba(0, 0, 0, 0.8) !important;
      padding: 0 !important;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', 'Helvetica Neue', Arial, sans-serif !important;
      color: ${textColor} !important;
      min-width: 300px !important;
      max-width: 300px !important;
      height: auto !important;
      min-height: 0 !important;
      max-height: 85vh !important;
      overflow-x: hidden !important;
      overflow-y: auto !important;
      pointer-events: auto !important;
      user-select: none !important;
      -webkit-user-select: none !important;
      display: flex !important;
      flex-direction: column !important;
      flex-wrap: nowrap !important;
      backdrop-filter: blur(3px) saturate(180%) !important;
      -webkit-backdrop-filter: blur(32px) saturate(180%) !important;
      animation: colorpicker-fadein 0.25s cubic-bezier(0.16, 1, 0.3, 1) !important;
      will-change: transform, opacity !important;
    }
    
    @keyframes colorpicker-fadein {
      from {
        opacity: 0;
        transform: translateY(-16px) scale(0.92);
        filter: blur(4px);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
        filter: blur(0);
      }
    }
    
    .colorpicker-body * {
      box-sizing: border-box !important;
    }
    
    /* Scrollbar: no space when hidden (width 0); visible only in scrollbar zone or while scrolling */
    .colorpicker-body::-webkit-scrollbar,
    .colorpicker-body *::-webkit-scrollbar {
      width: 0 !important;
      height: 0 !important;
      background: transparent !important;
      transition: width 0.15s ease, height 0.15s ease !important;
    }
    .colorpicker-body.scrollbar-visible::-webkit-scrollbar,
    .colorpicker-body.is-scrolling::-webkit-scrollbar,
    .colorpicker-body.scrollbar-visible *::-webkit-scrollbar,
    .colorpicker-body.is-scrolling *::-webkit-scrollbar {
      width: 6px !important;
      height: 6px !important;
    }
    .colorpicker-body::-webkit-scrollbar-track,
    .colorpicker-body *::-webkit-scrollbar-track {
      background: transparent !important;
      border-radius: 3px !important;
    }
    .colorpicker-body::-webkit-scrollbar-thumb,
    .colorpicker-body *::-webkit-scrollbar-thumb {
      background: transparent !important;
      border-radius: 3px !important;
      transition: background 0.15s ease !important;
    }
    .colorpicker-body.scrollbar-visible::-webkit-scrollbar-thumb,
    .colorpicker-body.scrollbar-visible *::-webkit-scrollbar-thumb,
    .colorpicker-body.is-scrolling::-webkit-scrollbar-thumb,
    .colorpicker-body.is-scrolling *::-webkit-scrollbar-thumb {
      background: ${textColor}40 !important;
    }
    .colorpicker-body.scrollbar-visible::-webkit-scrollbar-track,
    .colorpicker-body.is-scrolling::-webkit-scrollbar-track,
    .colorpicker-body.scrollbar-visible *::-webkit-scrollbar-track,
    .colorpicker-body.is-scrolling *::-webkit-scrollbar-track {
      background: ${textColor}12 !important;
    }
    .colorpicker-body.scrollbar-visible::-webkit-scrollbar-thumb:hover,
    .colorpicker-body.scrollbar-visible *::-webkit-scrollbar-thumb:hover,
    .colorpicker-body.is-scrolling::-webkit-scrollbar-thumb:hover,
    .colorpicker-body.is-scrolling *::-webkit-scrollbar-thumb:hover {
      background: ${textColor}60 !important;
    }
    /* Firefox: no space when hidden; visible only with class */
    .colorpicker-body,
    .colorpicker-body * {
      scrollbar-width: none !important;
      scrollbar-color: transparent transparent !important;
    }
    .colorpicker-body.scrollbar-visible,
    .colorpicker-body.scrollbar-visible *,
    .colorpicker-body.is-scrolling,
    .colorpicker-body.is-scrolling * {
      scrollbar-width: thin !important;
      scrollbar-color: ${textColor}40 transparent !important;
    }
    
    /* Arrow Pointer - Hidden */
    .colorpicker-body + .arrow,
    .arrow {
      display: none !important;
    }
    
    /* Color Preview Area - Main palette (saturation/value square) - compact, crosshair only here. NOT .color-chooser (dropdown) */
    .colorpicker-body > .color,
    .colorpicker-body .saturation,
    .colorpicker-body .value {
      height: 180px !important;
      max-height: 180px !important;
      width: 100% !important;
      border-radius: 12px 12px 0 0 !important;
      border: none !important;
      margin: 0 !important;
      position: relative !important;
      cursor: crosshair !important;
      flex-shrink: 0 !important;
      order: 0 !important;
      z-index: 1 !important;
    }
    
    /* Main color container - MUST allow dynamic background-color from JS */
    .colorpicker-body > .color {
      overflow: hidden !important;
      /* NO background here - let ace-colorpicker set it dynamically */
      /* NO border-bottom - would show the hue color bleeding through */
    }
    
    /* Separator line as pseudo-element (after all color layers) */
    .colorpicker-body > .color::after {
      content: '' !important;
      position: absolute !important;
      bottom: 0 !important;
      left: 0 !important;
      right: 0 !important;
      height: 1px !important;
      background: ${borderColor}60 !important;
      z-index: 100 !important;
      pointer-events: none !important;
    }
    
    /* Checkerboard pattern as pseudo-element (behind everything) - VERY subtle */
    .colorpicker-body > .color::before {
      content: '' !important;
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      bottom: 0 !important;
      background: 
        linear-gradient(45deg, ${bgColorSecondary}08 25%, transparent 25%, transparent 75%, ${bgColorSecondary}08 75%, ${bgColorSecondary}08),
        linear-gradient(45deg, ${bgColorSecondary}08 25%, transparent 25%, transparent 75%, ${bgColorSecondary}08 75%, ${bgColorSecondary}08) !important;
      background-size: 8px 8px !important;
      background-position: 0 0, 4px 4px !important;
      z-index: 0 !important;
      pointer-events: none !important;
      opacity: 0.3 !important;
    }
    
    /* Saturation gradient overlay (white to transparent, left to right) */
    .colorpicker-body .saturation {
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      background: linear-gradient(to right, #fff, rgba(255, 255, 255, 0)) !important;
      z-index: 1 !important;
      pointer-events: none !important;
    }
    
    /* Value/Brightness gradient overlay (transparent to black, top to bottom) */
    .colorpicker-body .value {
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      background: linear-gradient(to bottom, rgba(0, 0, 0, 0), #000) !important;
      z-index: 2 !important;
      pointer-events: none !important;
    }
    
    /* Drag Pointer - Multiple selectors for robustness */
    .colorpicker-body .drag-pointer,
    .colorpicker-body .saturation .drag-pointer,
    .colorpicker-body .value .drag-pointer,
    .colorpicker-body > .color .drag-pointer {
      position: absolute !important;
      width: 16px !important;
      height: 16px !important;
      border: 2.5px solid white !important;
      border-radius: 50% !important;
      box-shadow: 
        0 0 0 1.5px rgba(0, 0, 0, 0.4),
        0 3px 10px rgba(0, 0, 0, 0.5),
        inset 0 0 0 1px rgba(255, 255, 255, 0.2) !important;
      margin: -8px 0 0 -8px !important;
      pointer-events: none !important;
      transition: transform 0.12s cubic-bezier(0.4, 0, 0.2, 1) !important;
      will-change: transform !important;
      z-index: 10 !important;
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
    }
    
    /* Scale effect ONLY when dragging in color picker area (not on button clicks) */
    .colorpicker-body > .color:active .drag-pointer {
      transform: scale(1.12) !important;
    }
    
    /* Control Section - Sliders left, Color previews right - compact */
    .colorpicker-body .control {
      padding: 8px 10px !important;
      margin: 0 !important;
      background: ${bgColor}40 !important;
      border-bottom: 1px solid ${borderColor}50 !important;
      display: grid !important;
      grid-template-columns: 1fr 42px 42px !important;
      grid-template-rows: 1fr 1fr !important;
      gap: 4px 8px !important;
      align-items: center !important;
      min-height: 52px !important;
      flex-shrink: 0 !important;
      order: 1 !important;
    }
    
    /* Hue slider - spans first row, first column */
    .colorpicker-body .control .hue,
    .colorpicker-body .control .hue-control {
      grid-column: 1 !important;
      grid-row: 1 !important;
      align-self: center !important;
    }
    
    /* Opacity slider - spans second row, first column */
    .colorpicker-body .control .opacity,
    .colorpicker-body .control .opacity-control {
      grid-column: 1 !important;
      grid-row: 2 !important;
      align-self: center !important;
    }
    
    /* Previous color - perfect square, second column, spans both rows */
    /* Ultra-specific selectors with nth-child for maximum priority */
    .colorpicker-body .control > .color:first-of-type,
    .colorpicker-body .control > .empty:first-of-type,
    .colorpicker-body .control > .color:nth-child(3),
    .colorpicker-body .control > .empty:nth-child(3),
    .colorpicker-body .control .color:first-of-type,
    .colorpicker-body .control .empty:first-of-type {
      display: block !important;
      position: relative !important;
      grid-column: 2 !important;
      grid-row: 1 / 3 !important;
      width: 42px !important;
      height: 42px !important;
      min-width: 42px !important;
      min-height: 42px !important;
      max-width: 42px !important;
      max-height: 42px !important;
      aspect-ratio: 1 / 1 !important;
      align-self: center !important;
      justify-self: center !important;
      flex-shrink: 0 !important;
      flex-grow: 0 !important;
      overflow: hidden !important;
      box-sizing: border-box !important;
    }
    
    /* Current color - perfect square, third column, spans both rows */
    /* Ultra-specific selectors with nth-child for maximum priority */
    .colorpicker-body .control > .color:last-of-type,
    .colorpicker-body .control > .empty:last-of-type,
    .colorpicker-body .control > .color:nth-child(4),
    .colorpicker-body .control > .empty:nth-child(4),
    .colorpicker-body .control .color:last-of-type,
    .colorpicker-body .control .empty:last-of-type {
      display: block !important;
      position: relative !important;
      grid-column: 3 !important;
      grid-row: 1 / 3 !important;
      width: 42px !important;
      height: 42px !important;
      min-width: 42px !important;
      min-height: 42px !important;
      max-width: 42px !important;
      max-height: 42px !important;
      aspect-ratio: 1 / 1 !important;
      align-self: center !important;
      justify-self: center !important;
      flex-shrink: 0 !important;
      flex-grow: 0 !important;
      overflow: hidden !important;
      box-sizing: border-box !important;
    }
    
    /* Hue Slider - Multiple selectors for robustness */
    .colorpicker-body .hue,
    .colorpicker-body .hue-control,
    .colorpicker-body .control .hue {
      height: 12px !important;
      border-radius: 6px !important;
      position: relative !important;
      cursor: pointer !important;
      box-shadow: 
        inset 0 1px 3px rgba(0, 0, 0, 0.35),
        0 0 0 1px rgba(0, 0, 0, 0.1) !important;
      transition: box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
      overflow: hidden !important;
      border: 1px solid ${borderColor}80 !important;
    }
    
    /* Hue gradient - full HSL circle 0–360° (red → yellow → green → cyan → blue → magenta → red) */
    .colorpicker-body .hue-container,
    .colorpicker-body .hue .hue-container {
      width: 100% !important;
      height: 100% !important;
      position: relative !important;
      background: linear-gradient(to right,
        #ff0000 0%,
        #ffff00 16.67%,
        #00ff00 33.33%,
        #00ffff 50%,
        #0000ff 66.67%,
        #ff00ff 83.33%,
        #ff0000 100%) !important;
    }
    
    /* Opacity Slider */
    .colorpicker-body .opacity,
    .colorpicker-body .opacity-control,
    .colorpicker-body .control .opacity {
      height: 12px !important;
      border-radius: 6px !important;
      position: relative !important;
      cursor: pointer !important;
      box-shadow: 
        inset 0 1px 3px rgba(0, 0, 0, 0.35),
        0 0 0 1px rgba(0, 0, 0, 0.1) !important;
      transition: box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
      overflow: hidden !important;
      border: 1px solid ${borderColor}80 !important;
    }
    
    /* Opacity checkerboard background */
    .colorpicker-body .opacity-container,
    .colorpicker-body .opacity .opacity-container {
      width: 100% !important;
      height: 100% !important;
      position: relative !important;
      background:
        linear-gradient(45deg, ${bgColorSecondary} 25%, transparent 25%, transparent 75%, ${bgColorSecondary} 75%, ${bgColorSecondary}),
        linear-gradient(45deg, ${bgColorSecondary} 25%, transparent 25%, transparent 75%, ${bgColorSecondary} 75%, ${bgColorSecondary}),
        ${bgColor} !important;
      background-size: 8px 8px !important;
      background-position: 0 0, 4px 4px !important;
    }
    
    /* Color bar overlay for opacity */
    .colorpicker-body .color-bar,
    .colorpicker-body .opacity .color-bar {
      position: absolute !important;
      top: 0 !important;
      left: 0 !important;
      width: 100% !important;
      height: 100% !important;
      pointer-events: none !important;
    }
    
    /* Hover states for sliders */
    .colorpicker-body .hue:hover,
    .colorpicker-body .opacity:hover {
      box-shadow: 
        inset 0 1px 4px rgba(0, 0, 0, 0.35),
        0 0 0 2px ${statusColor}40 !important;
    }
    
    /* Drag Bar - Multiple selectors for all slider types */
    .colorpicker-body .drag-bar,
    .colorpicker-body .hue .drag-bar,
    .colorpicker-body .opacity .drag-bar,
    .colorpicker-body .hue-control .drag-bar,
    .colorpicker-body .opacity-control .drag-bar {
      position: absolute !important;
      top: 50% !important;
      width: 4px !important;
      height: 18px !important;
      background: linear-gradient(180deg, #ffffff 0%, #f0f0f0 100%) !important;
      border-radius: 2px !important;
      box-shadow: 
        0 2px 5px rgba(0, 0, 0, 0.45),
        0 0 0 1.5px rgba(0, 0, 0, 0.25),
        inset 0 1px 0 rgba(255, 255, 255, 0.4) !important;
      transform: translateX(-50%) translateY(-50%) !important;
      cursor: grab !important;
      transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1) !important;
      will-change: transform !important;
      z-index: 10 !important;
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
    }
    
    .colorpicker-body .drag-bar:hover {
      transform: translateX(-50%) translateY(-50%) scale(1.15) !important;
      box-shadow: 
        0 3px 8px rgba(0, 0, 0, 0.5),
        0 0 0 2px ${statusColor}60,
        inset 0 1px 0 rgba(255, 255, 255, 0.5) !important;
    }
    
    .colorpicker-body .drag-bar:active {
      cursor: grabbing !important;
      transform: translateX(-50%) translateY(-50%) scale(1.08) !important;
    }
    
    /* Color preview squares in control section - Perfect squares 50x50 */
    .colorpicker-body .control .empty,
    .colorpicker-body .control > .color {
      border-radius: 8px !important;
      border: 1.5px solid ${borderColor}80 !important;
      cursor: pointer !important;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
      box-shadow: 
        0 1px 3px rgba(0, 0, 0, 0.12),
        inset 0 1px 0 rgba(255, 255, 255, 0.05) !important;
      flex-shrink: 0 !important;
    }
    
    /* Prev only: checkerboard as base (::before); curr gets color from library, no ::before to avoid hover glitch */
    .colorpicker-body .control .empty::before {
      content: '' !important;
      position: absolute !important;
      inset: 0 !important;
      border-radius: inherit !important;
      background:
        linear-gradient(45deg, ${bgColorSecondary} 25%, transparent 25%, transparent 75%, ${bgColorSecondary} 75%, ${bgColorSecondary}),
        linear-gradient(45deg, ${bgColorSecondary} 25%, transparent 25%, transparent 75%, ${bgColorSecondary} 75%, ${bgColorSecondary});
      background-size: 8px 8px !important;
      background-position: 0 0, 4px 4px !important;
      z-index: -1 !important;
      pointer-events: none !important;
    }
    
    .colorpicker-body .control > .color:hover {
      transform: scale(1.05) !important;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2) !important;
    }
    
    /* Information Section - Compact */
    .colorpicker-body .information {
      padding: 8px 10px !important;
      background: ${bgColor}60 !important;
      border-bottom: 1px solid ${borderColor}50 !important;
      display: grid !important;
      grid-template-columns: auto 1fr !important;
      grid-template-rows: auto auto auto !important;
      gap: 6px 6px !important;
      align-items: start !important;
      flex-shrink: 0 !important;
      order: 2 !important;
    }
    
    /* Format Switcher Button - First column, first row */
    .colorpicker-body .information-change {
      grid-column: 1 !important;
      grid-row: 1 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: flex-start !important;
      margin: 0 !important;
      padding: 0 !important;
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
    }
    
    /* HEX Input Section - Second column, first row (SEMPRE VISIBILE) */
    .colorpicker-body .information-item.hex {
      grid-column: 2 !important;
      grid-row: 1 !important;
      display: grid !important;
      grid-template-columns: 1fr !important;
      margin: 0 !important;
    }
    
    /* RGB Input Section - Span both columns, second row */
    .colorpicker-body .information-item.rgb {
      grid-column: 1 / 3 !important;
      grid-row: 2 !important;
      display: grid !important;
      grid-template-columns: repeat(4, 1fr) !important;
      gap: 8px !important;
      margin: 0 !important;
    }
    
    /* HSL Input Section - Span both columns, third row */
    .colorpicker-body .information-item.hsl {
      grid-column: 1 / 3 !important;
      grid-row: 3 !important;
      display: grid !important;
      grid-template-columns: repeat(4, 1fr) !important;
      gap: 8px !important;
      margin: 0 !important;
    }
    
    /* Hidden state - controlled by JavaScript via class */
    .colorpicker-body .information-item.rgb.format-hidden,
    .colorpicker-body .information-item.hsl.format-hidden {
      display: none !important;
    }
    
    /* Arrow Buttons - Format switcher with LARGER clickable area */
    .colorpicker-body .arrow-button,
    .colorpicker-body .format-change-button {
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      width: auto !important;
      height: auto !important;
      min-width: 30px !important;
      min-height: 30px !important;
      padding: 5px 8px !important;
      background: ${bgColorSecondary}cc !important;
      border: 1px solid ${borderColor}70 !important;
      border-radius: 6px !important;
      cursor: pointer !important;
      transition: all 0.18s cubic-bezier(0.4, 0, 0.2, 1) !important;
      position: relative !important;
      flex-shrink: 0 !important;
      pointer-events: auto !important;
      z-index: 100 !important;
      font-family: 'SF Mono', 'Monaco', 'Menlo', 'Consolas', 'Courier New', monospace !important;
      font-size: 10px !important;
      font-weight: 700 !important;
      color: ${textColor}80 !important;
      text-transform: uppercase !important;
      letter-spacing: 0.3px !important;
      line-height: 1 !important;
      gap: 4px !important;
    }
    
    /* Palette Toggle Button - Full width, toggle visibility of palette section */
    .colorpicker-body .color-sets-choose-btn {
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      width: 100% !important;
      height: auto !important;
      min-height: 32px !important;
      padding: 8px 12px !important;
      background: ${bgColorSecondary}cc !important;
      border: 1px solid ${borderColor}70 !important;
      border-radius: 6px !important;
      cursor: pointer !important;
      transition: all 0.18s cubic-bezier(0.4, 0, 0.2, 1) !important;
      position: relative !important;
      pointer-events: auto !important;
      z-index: 100 !important;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
      font-size: 11px !important;
      font-weight: 600 !important;
      color: ${textColor} !important;
      text-transform: uppercase !important;
      letter-spacing: 0.5px !important;
      line-height: 1 !important;
      gap: 6px !important;
    }
    .colorpicker-body .color-sets-choose-btn:hover {
      background: ${borderColor}50 !important;
      border-color: ${borderColor} !important;
    }
    .colorpicker-body .colorsets .menu {
      width: 100% !important;
      margin-bottom: 8px !important;
    }
    
    /* Format Change Button - Down arrow icon (pointer-events NONE to allow clicks) */
    .colorpicker-body .format-change-button::after {
      content: '▼' !important;
      margin-left: 0 !important;
      font-size: 14px !important;
      color: ${textColor}80 !important;
      line-height: 1 !important;
      pointer-events: none !important;
      display: inline-block !important;
      vertical-align: middle !important;
      font-family: monospace !important;
      transform: translateY(0px) !important;
      font-weight: 700 !important;
    }
    
    /* Color Sets Button - Text + chevron icon */
    .colorpicker-body .color-sets-choose-btn::before {
      content: 'Palette' !important;
      font-size: 11px !important;
      font-weight: 600 !important;
    }
    .colorpicker-body .color-sets-choose-btn::after {
      content: '▼' !important;
      font-size: 10px !important;
      color: ${textColor}80 !important;
      line-height: 1 !important;
      transition: transform 0.2s ease !important;
    }
    .colorpicker-body .colorsets.palette-collapsed .color-sets-choose-btn::after {
      transform: rotate(-90deg) !important;
    }
    
    .colorpicker-body .arrow-button:hover {
      background: ${borderColor}60 !important;
      border-color: ${textColor}50 !important;
      transform: translateY(-1px) !important;
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2) !important;
    }
    
    .colorpicker-body .arrow-button:hover::after {
      color: ${textColor} !important;
    }
    
    .colorpicker-body .arrow-button:active {
      transform: translateY(0) !important;
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2) !important;
    }
    
    /* Input Fields - Already handled by .information grid layout above */
    /* HEX input is positioned via grid-column: 2 */
    /* RGB/HSL inputs span both columns via grid-column: 1 / 3 */
    
    .colorpicker-body .input-field {
      position: relative !important;
      display: flex !important;
      flex-direction: column !important;
    }
    
    /* Input Label - Optimized size for better readability */
    .colorpicker-body .input-field .title {
      position: static !important;
      transform: none !important;
      font-size: 9px !important;
      color: ${textColor}70 !important;
      font-weight: 700 !important;
      text-transform: uppercase !important;
      letter-spacing: 0.6px !important;
      margin-bottom: 4px !important;
      pointer-events: none !important;
    }
    
    /* Input Field - Optimized padding for better proportions */
    .colorpicker-body .input-field .input {
      width: 100% !important;
      padding: 8px 6px !important;
      background: ${bgColorSecondary}cc !important;
      border: 1px solid ${borderColor}70 !important;
      border-radius: 6px !important;
      color: ${textColor} !important;
      font-size: 12px !important;
      font-weight: 600 !important;
      text-align: center !important;
      font-family: 'SF Mono', 'Monaco', 'Menlo', 'Consolas', 'Courier New', monospace !important;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
      -webkit-user-select: text !important;
      user-select: text !important;
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.08) !important;
      min-height: 32px !important;
    }
    
    .colorpicker-body .input-field .input:hover {
      border-color: ${textColor}50 !important;
      background: ${bgColorSecondary}e6 !important;
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.08), 0 0 0 1px ${borderColor}30 !important;
    }
    
    .colorpicker-body .input-field .input:focus {
      outline: none !important;
      border-color: ${statusColor} !important;
      background: ${bgColor}f0 !important;
      box-shadow: 
        inset 0 1px 2px rgba(0, 0, 0, 0.08),
        0 0 0 3px ${statusColor}25,
        0 1px 3px rgba(0, 0, 0, 0.1) !important;
      transform: translateY(-1px) !important;
    }
    
    /* Input Postfix - Optimized position */
    .colorpicker-body .input-field .postfix {
      position: absolute !important;
      right: 8px !important;
      bottom: 9px !important;
      font-size: 9px !important;
      color: ${textColor}50 !important;
      pointer-events: none !important;
      font-weight: 600 !important;
    }
    
    /* Color Presets - Layout per ace-colorpicker + colorpicker-enhanced.css (lib structure: .color-item > .empty + .color-view; + only when Custom) */
    .colorpicker-body .colorsets {
      padding: 6px 12px 10px !important;
      background: ${bgColor}80 !important;
      flex-shrink: 0 !important;
      order: 3 !important;
      min-width: 0 !important;
      width: 100% !important;
      position: relative !important;
      z-index: 10 !important;
      overflow: visible !important;
      box-sizing: border-box !important;
    }
    
    /* color-list: flex wrap (enhanced). current-color-sets: display contents so .color-item / .add-color-item are direct flex children */
    .colorpicker-body .colorsets .color-list {
      display: flex !important;
      flex-wrap: wrap !important;
      justify-content: center !important;
      align-items: flex-start !important;
      gap: 8px !important;
      padding: 8px 0 !important;
      min-width: 0 !important;
      width: 100% !important;
      overflow: visible !important;
      box-sizing: border-box !important;
    }
    .colorpicker-body .colorsets .current-color-sets {
      display: contents !important;
    }
    
    /* add-color-item: + button (Custom only). Enhanced has no rule; match .color-item size, always visible */
    .colorpicker-body .colorsets .add-color-item {
      flex: 0 0 28px !important;
      flex-shrink: 0 !important;
      width: 28px !important;
      height: 28px !important;
      min-width: 28px !important;
      min-height: 28px !important;
      border-radius: 4px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      border: 1px dashed ${borderColor} !important;
      background: ${bgColorSecondary}ee !important;
      cursor: pointer !important;
      color: ${textColor} !important;
      font-size: 18px !important;
      font-weight: 600 !important;
      line-height: 1 !important;
      visibility: visible !important;
      opacity: 1 !important;
      z-index: 1 !important;
      transition: transform 0.15s ease, background 0.15s ease !important;
    }
    .colorpicker-body .colorsets .add-color-item:hover {
      transform: scale(1.1) !important;
      background: ${borderColor}40 !important;
    }
    
    /* color-item: enhanced base. Overlay .empty + .color-view via absolute so checkerboard shows through transparent */
    .colorpicker-body .colorsets .color-item {
      flex: 0 0 28px !important;
      width: 28px !important;
      height: 28px !important;
      min-width: 28px !important;
      min-height: 28px !important;
      position: relative !important;
      cursor: pointer !important;
      border-radius: 4px !important;
      overflow: hidden !important;
      box-sizing: border-box !important;
      transition: transform 0.15s ease !important;
    }
    .colorpicker-body .colorsets .color-item:hover {
      transform: scale(1.15) !important;
    }
    .colorpicker-body .colorsets .color-item:active {
      transform: scale(1.05) !important;
    }
    
    /* .empty: checkerboard (enhanced). Base layer; transparent .color-view shows it */
    .colorpicker-body .colorsets .color-item .empty {
      position: absolute !important;
      inset: 0 !important;
      width: 100% !important;
      height: 100% !important;
      border-radius: inherit !important;
      box-sizing: border-box !important;
      border: 1px solid ${borderColor} !important;
      background: linear-gradient(45deg, ${bgColorSecondary} 25%, transparent 25%, transparent 75%, ${bgColorSecondary} 75%, ${bgColorSecondary}),
        linear-gradient(45deg, ${bgColorSecondary} 25%, transparent 25%, transparent 75%, ${bgColorSecondary} 75%, ${bgColorSecondary}),
        ${bgColor} !important;
      background-size: 6px 6px !important;
      background-position: 0 0, 3px 3px !important;
    }
    
    /* .color-view: color layer (enhanced). library sets style="background-color: ..."; transparent = see .empty */
    .colorpicker-body .colorsets .color-item .color-view {
      position: absolute !important;
      inset: 0 !important;
      width: 100% !important;
      height: 100% !important;
      border-radius: inherit !important;
      box-sizing: border-box !important;
      border: 1px solid ${borderColor} !important;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
      transition: box-shadow 0.15s ease !important;
    }
    .colorpicker-body .colorsets .color-item:hover .color-view {
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2) !important;
    }
    
    /* Inline color token - ace-colorpicker highlights color values with .ace_color */
    .ace_color {
      padding: 0 2px !important;
      border-radius: 2px !important;
      min-width: 0.6em !important;
      display: inline-block !important;
    }
    /* Inline Color Preview (in editor) - Optimized size */
    .ace-colorview {
      position: absolute !important;
      width: 14px !important;
      height: 14px !important;
      border-radius: 3px !important;
      margin-left: 6px !important;
      cursor: pointer !important;
      border: 2px solid ${borderColor}cc !important;
      background: 
        linear-gradient(45deg, #70707020 25%, transparent 25%, transparent 75%, #70707020 75%, #70707020),
        linear-gradient(45deg, #70707020 25%, transparent 25%, transparent 75%, #70707020 75%, #70707020) !important;
      background-size: 4px 4px !important;
      background-position: 0 0, 2px 2px !important;
      transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1) !important;
      box-shadow: 
        0 2px 4px rgba(0, 0, 0, 0.25),
        inset 0 1px 0 rgba(255, 255, 255, 0.08) !important;
    }
    
    .ace-colorview:hover {
      transform: scale(1.3) translateY(-1px) !important;
      box-shadow: 
        0 5px 14px rgba(0, 0, 0, 0.45),
        0 2px 6px rgba(0, 0, 0, 0.3),
        0 0 0 2px ${statusColor}50 !important;
      border-color: ${statusColor} !important;
      z-index: 100 !important;
    }
    
    /* Context Menu - positioned relative to picker (containing block from backdrop-filter) */
    .colorpicker-body .colorsets-contextmenu:not(.show) {
      display: none !important;
      visibility: hidden !important;
      opacity: 0 !important;
      pointer-events: none !important;
    }
    .colorpicker-body .colorsets-contextmenu.show {
      display: block !important;
      visibility: visible !important;
      pointer-events: auto !important;
    }
    .colorpicker-body .colorsets-contextmenu.show:not(.repositioned) {
      opacity: 0 !important;
    }
    .colorpicker-body .colorsets-contextmenu.show.repositioned {
      opacity: 1 !important;
    }
    .colorpicker-body .colorsets-contextmenu {
      position: absolute !important;
      width: auto !important;
      min-width: max-content !important;
      max-width: 200px !important;
      box-sizing: border-box !important;
      margin: 0 !important;
      padding: 4px !important;
      background: ${bgColorSecondary}fa !important;
      border: 1px solid ${borderColor}90 !important;
      border-radius: 6px !important;
      box-shadow: 
        0 8px 24px rgba(0, 0, 0, 0.5),
        0 2px 8px rgba(0, 0, 0, 0.3),
        0 0 0 1px rgba(255, 255, 255, 0.05) !important;
      list-style: none !important;
      z-index: 100000 !important;
      backdrop-filter: blur(12px) !important;
      -webkit-backdrop-filter: blur(12px) !important;
    }
    
    .colorpicker-body .colorsets-contextmenu li {
      padding: 6px 12px !important;
      border-radius: 4px !important;
      cursor: pointer !important;
      font-size: 11px !important;
      font-weight: 500 !important;
      color: ${textColor} !important;
      white-space: nowrap !important;
      transition: background 0.12s ease !important;
    }
    
    .colorpicker-body .colorsets-contextmenu li:hover {
      background: ${borderColor}50 !important;
      color: ${textColor} !important;
    }
    
    .colorpicker-body .colorsets-contextmenu li:active {
      background: ${borderColor}70 !important;
    }
    
    /* Color Chooser (Material / Color Scale / Custom dropdown) - always visible inside .colorsets when section is expanded */
    .colorpicker-body .color-chooser {
      display: block !important;
      visibility: visible !important;
      position: relative !important;
      height: auto !important;
      max-height: 35vh !important;
      overflow-y: auto !important;
      width: 100% !important;
      margin: 0 0 8px 0 !important;
      padding: 10px !important;
      background: ${bgColorSecondary}ee !important;
      border: 1px solid ${borderColor}60 !important;
      border-radius: 6px !important;
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1) !important;
      pointer-events: auto !important;
      cursor: default !important;
      box-sizing: border-box !important;
    }
    
    /* Hide dropdown + swatches when palette section is fully collapsed */
    .colorpicker-body .colorsets.palette-collapsed .color-chooser,
    .colorpicker-body .colorsets.palette-collapsed .color-list {
      display: none !important;
      visibility: hidden !important;
      height: 0 !important;
      overflow: hidden !important;
      pointer-events: none !important;
      margin: 0 !important;
      padding: 0 !important;
    }
    
    /* X button: hide only the list (Material/Custom/Color Scale), keep header (Color Palettes + X) visible */
    .colorpicker-body .colorsets.chooser-collapsed .color-chooser .colorsets-list {
      display: none !important;
      visibility: hidden !important;
      height: 0 !important;
      overflow: hidden !important;
      pointer-events: none !important;
      margin: 0 !important;
      padding: 0 !important;
    }
    
    /* Chooser inner: header (Color Palettes + X button) - side by side, compact */
    .colorpicker-body .color-chooser-container {
      display: block !important;
      visibility: visible !important;
    }
    .colorpicker-body .colorsets-item-header {
      display: flex !important;
      flex-direction: row !important;
      justify-content: space-between !important;
      align-items: center !important;
      margin-bottom: 8px !important;
      padding: 0 0 6px 0 !important;
      border-bottom: 1px solid ${borderColor}60 !important;
      gap: 8px !important;
    }
    .colorpicker-body .colorsets-item-header .title,
    .colorpicker-body .colorsets-item-header h1 {
      font-size: 10px !important;
      font-weight: 700 !important;
      color: ${textColor}90 !important;
      text-transform: uppercase !important;
      letter-spacing: 0.5px !important;
      margin: 0 !important;
      flex: 1 !important;
      white-space: nowrap !important;
    }
    .colorpicker-body .colorsets-item-header .items,
    .colorpicker-body .colorsets-item-header span {
      font-size: 14px !important;
      cursor: pointer !important;
      color: ${textColor}60 !important;
      padding: 2px 6px !important;
      border-radius: 4px !important;
      transition: all 0.15s ease !important;
      line-height: 1 !important;
      flex-shrink: 0 !important;
    }
    .colorpicker-body .colorsets-item-header .items:hover,
    .colorpicker-body .colorsets-item-header span:hover {
      background: ${borderColor}50 !important;
      color: ${textColor} !important;
    }
    
    /* Palette sections list (Material, Custom, Color Scale) - wrap layout */
    .colorpicker-body .colorsets-list {
      display: flex !important;
      flex-direction: row !important;
      flex-wrap: wrap !important;
      gap: 6px !important;
      visibility: visible !important;
      max-height: none !important;
      overflow: visible !important;
    }
    /* First child wrapper: display contents so children flow directly */
    .colorpicker-body .colorsets-list > div:first-child {
      display: contents !important;
    }
    
    /* Each palette section base style */
    .colorpicker-body .colorsets-item {
      display: flex !important;
      flex-wrap: wrap !important;
      visibility: visible !important;
      padding: 6px 8px !important;
      border-radius: 5px !important;
      cursor: pointer !important;
      border: 1px solid ${borderColor}30 !important;
      background: ${bgColor}30 !important;
      transition: background 0.15s ease, border-color 0.15s ease !important;
    }
    .colorpicker-body .colorsets-item:hover {
      background: ${borderColor}25 !important;
      border-color: ${borderColor}60 !important;
    }
    
    /* Material and Color Scale: side by side (each ~50%) */
    .colorpicker-body .colorsets-item[data-colorsets-index="0"],
    .colorpicker-body .colorsets-item[data-colorsets-index="2"] {
      flex: 1 1 calc(50% - 3px) !important;
    }
    
    /* Custom: full width below */
    .colorpicker-body .colorsets-item[data-colorsets-index="1"] {
      flex: 1 1 100% !important;
      min-width: 100% !important;
      max-width: 100% !important;
      order: 3 !important;
      justify-content: space-between !important;
    }
    
    /* Palette section title (MATERIAL, CUSTOM, COLOR SCALE) */
    .colorpicker-body .colorsets-item .title,
    .colorpicker-body .colorsets-item h1 {
      display: block !important;
      visibility: visible !important;
      font-size: 10px !important;
      font-weight: 700 !important;
      color: ${textColor}70 !important;
      text-transform: uppercase !important;
      letter-spacing: 0.5px !important;
      margin: 0 0 4px 0 !important;
      white-space: nowrap !important;
    }
    
    /* Color previews inside each palette section - horizontal row */
    .colorpicker-body .colorsets-item .items {
      display: flex !important;
      flex-direction: row !important;
      flex-wrap: wrap !important;
      gap: 3px !important;
      visibility: visible !important;
    }
    .colorpicker-body .colorsets-item .items > div {
      display: flex !important;
      flex-direction: row !important;
      flex-wrap: wrap !important;
      gap: 2px !important;
    }
    .colorpicker-body .colorsets-item .items .color-item {
      flex: 0 0 14px !important;
      width: 14px !important;
      height: 14px !important;
      min-width: 14px !important;
      min-height: 14px !important;
      border-radius: 2px !important;
    }
    .colorpicker-body .colorsets-item .items .color-item .color-view {
      width: 100% !important;
      height: 100% !important;
      border-radius: inherit !important;
    }
    
    /* Accessibility - WCAG AAA Compliant */
    .colorpicker-body *:focus-visible {
      outline: 3px solid ${statusColor} !important;
      outline-offset: 3px !important;
      border-radius: 4px !important;
    }
    
    /* Keyboard Navigation Indicators */
    .colorpicker-body button:focus-visible,
    .colorpicker-body .color-item:focus-visible {
      outline: 3px solid ${statusColor} !important;
      outline-offset: 2px !important;
      box-shadow: 0 0 0 5px ${statusColor}20 !important;
    }
    
    /* Reduced Motion Support */
    @media (prefers-reduced-motion: reduce) {
      .colorpicker-body,
      .colorpicker-body *,
      .colorpicker-body *::before,
      .colorpicker-body *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }
    
    /* High Contrast Mode */
    @media (prefers-contrast: high) {
      .colorpicker-body {
        border-width: 3px !important;
        border-color: ${textColor} !important;
      }
      .colorpicker-body .input-field .input:focus {
        outline: 4px solid ${statusColor} !important;
        outline-offset: 3px !important;
      }
      .colorpicker-body button:hover {
        outline: 2px solid ${textColor} !important;
      }
    }
    
    /* Dark Mode Enhancements */
    @media (prefers-color-scheme: dark) {
      .colorpicker-body {
        box-shadow: 
          0 0 0 1px rgba(255, 255, 255, 0.05),
          0 24px 72px -12px rgba(0, 0, 0, 0.95),
          0 12px 32px -8px rgba(0, 0, 0, 0.7) !important;
      }
    }
    
    /* Light Mode Enhancements */
    @media (prefers-color-scheme: light) {
      .colorpicker-body {
        box-shadow: 
          0 0 0 1px rgba(0, 0, 0, 0.08),
          0 20px 60px -10px rgba(0, 0, 0, 0.25),
          0 8px 24px -8px rgba(0, 0, 0, 0.15) !important;
      }
    }
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
  <div class="status-bar">
    <div class="status-bar-left">
      <span class="status-bar-item" id="status-position">Ln 1, Col 1</span>
      <span class="status-bar-item" id="status-selection" style="display:none"></span>
      <span class="status-bar-item">CSS</span>
      <span class="status-bar-item">UTF-8</span>
      <span class="status-bar-item">Tab ${tabSize}</span>
    </div>
    <div class="status-bar-right">
      <span class="status-bar-item status-message" id="status-message">Ctrl+S save • Ctrl+F find</span>
    </div>
  </div>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.14/ace.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.14/ext-language_tools.js"></script>
  <script>
    // Load ace-colorpicker: inline first (no livereload), then CDN fallback
    (function() {
      var inline = typeof __ACE_COLORPICKER_INLINE__ !== 'undefined' && __ACE_COLORPICKER_INLINE__;
      if (inline) {
        var el = document.createElement('script');
        el.textContent = inline;
        document.head.appendChild(el);
        console.log('[ReDesign] ✓ Loaded ace-colorpicker (inline, no livereload)');
        return;
      }
      var cdnSources = [
        'https://cdn.jsdelivr.net/npm/ace-colorpicker@0.0.12/addon/ace-colorpicker.min.js',
        'https://unpkg.com/ace-colorpicker@0.0.12/addon/ace-colorpicker.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/ace-colorpicker/0.0.12/ace-colorpicker.min.js'
      ];
      var idx = 0;
      function load(url) {
        return new Promise(function(resolve, reject) {
          var s = document.createElement('script');
          s.src = url;
          s.onload = function() { console.log('[ReDesign] ✓ Loaded ace-colorpicker from:', url); resolve(); };
          s.onerror = reject;
          document.head.appendChild(s);
        });
      }
      function next() {
        if (idx >= cdnSources.length) {
          console.error('[ReDesign] ✗ All CDN sources failed');
          return;
        }
        load(cdnSources[idx]).catch(function() { idx++; next(); });
      }
      next();
    })();
  </script>
  <script>
    const CLOSE_HOTKEY = ${JSON.stringify(this.openHotkey)};
    let editor;
    function initEditor() {
      if (typeof ace === 'undefined') {
        setTimeout(initEditor, 50);
        return;
      }
      try {
        editor = ace.edit("editor");
      } catch (e) {
        document.getElementById("editor").innerHTML = '<span style="color:#e74c3c;font-size:12px;">Failed to load editor. Check console.</span>';
        console.error('[ReDesign] Editor init error:', e);
        return;
      }
      const theme = ${JSON.stringify(aceTheme)};
      console.log("[ReDesign] Setting Ace theme:", theme);
      editor.setTheme(theme);
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
      console.log('[ReDesign] ✓ Editor initialized and ready');
      function updateStatusBar() {
        try {
          var pos = editor.getSelection().getCursor();
          var line = pos.row + 1, col = pos.column + 1;
          var posEl = document.getElementById('status-position');
          if (posEl) posEl.textContent = 'Ln ' + line + ', Col ' + col;
          var range = editor.getSelection().getRange();
          var selEl = document.getElementById('status-selection');
          if (selEl) {
            if (range.isEmpty()) {
              selEl.textContent = '';
              selEl.style.display = 'none';
            } else {
              var start = range.start, end = range.end;
              selEl.textContent = start.row === end.row ? (end.column - start.column) + ' selected' : (end.row - start.row + 1) + ' lines selected';
              selEl.style.display = '';
            }
          }
        } catch (e) {}
      }
      editor.on('changeCursor', updateStatusBar);
      editor.on('changeSelection', updateStatusBar);
      updateStatusBar();
      tryInitColorPicker();
      setTimeout(runPostEditorInit, 150);
    }
    function tryInitColorPicker(maxAttempts) {
      maxAttempts = maxAttempts || 50;
        let attempts = 0;
        const checkInterval = setInterval(function() {
          attempts++;
          if (typeof AceColorPicker !== 'undefined') {
            console.log('[ReDesign] ✓ AceColorPicker loaded after', attempts, 'attempts');
            clearInterval(checkInterval);
            initializeColorPicker();
          } else if (attempts >= maxAttempts) {
            console.warn('[ReDesign] ⚠️ AceColorPicker not loaded after', maxAttempts, 'attempts - editor works without it');
            clearInterval(checkInterval);
          }
        }, 100);
      }
    function runPostEditorInit() {
    var currentCSS = '';
    var saveTimeout = null;
    window.parent.postMessage({ type: 'REQUEST_CSS' }, '*');
    window.addEventListener('message', function(event) {
      if (event.data && event.data.type === 'SET_CSS') {
        currentCSS = event.data.css;
        if (editor && editor.getValue() !== currentCSS) {
          var cursorPosition = editor.getCursorPosition();
          editor.setValue(currentCSS, -1);
          editor.moveCursorToPosition(cursorPosition);
        }
      }
    });
    var autoSaveEnabled = ${autoSave};
    if (editor && editor.session) editor.session.on('change', function() {
      if (autoSaveEnabled) {
        clearTimeout(saveTimeout);
        saveTimeout = setTimeout(function() {
          var css = editor.getValue();
          if (css !== currentCSS) {
            currentCSS = css;
            window.parent.postMessage({ type: 'UPDATE_CSS', css: css }, '*');
          }
        }, 300);
      }
    });
    editor.commands.addCommand({
      name: 'save',
      bindKey: { win: 'Ctrl-S', mac: 'Cmd-S' },
      exec: function(ed) {
        var css = ed.getValue();
        window.parent.postMessage({ type: 'UPDATE_CSS', css: css }, '*');
        var msgEl = document.getElementById('status-message');
        if (msgEl) {
          var originalText = msgEl.textContent;
          msgEl.textContent = 'Saved';
          msgEl.classList.add('saved');
          setTimeout(function() {
            msgEl.textContent = originalText;
            msgEl.classList.remove('saved');
          }, 1500);
        }
      }
    });
    editor.commands.addCommand({
      name: 'toggleEditor',
      bindKey: { win: CLOSE_HOTKEY, mac: CLOSE_HOTKEY },
      exec: function() {
        window.parent.postMessage({ type: 'CLOSE_EDITOR' }, '*');
      }
    });
    window.addEventListener('load', function() {
      if (editor) editor.focus();
    });
    }
      function initializeColorPicker() {
        // Initialize ace-colorpicker for color preview and picker
        console.log('[ReDesign] Initializing color picker...');
        console.log('[ReDesign] AceColorPicker available:', typeof AceColorPicker !== 'undefined');

        if (typeof AceColorPicker !== 'undefined') {
        try {
          var lastXY = { x: 0, y: 0 };
          var lastPrevColor = null;
          var colorPickerInstance = null;
          var cpSetupCallCount = 0;
          var cpObserverEventCount = 0;
          var cpInitTimestamp = Date.now();
          console.log('[ReDesign][CP] init context', {
            initAt: cpInitTimestamp,
            editorReady: !!editor,
            aceAvailable: typeof ace !== 'undefined'
          });
          // CRITICAL: Set CSS mode and init color picker ONLY after mode is loaded.
          // AceColorPicker injects highlight rules into the current mode; if we call load()
          // before the CSS mode is active, rules are injected into the wrong mode and colors
          // in the editor are not highlighted (no .ace_color tokens).
          // We also run our own rule injection so color highlighting works even if the addon's fails (e.g. CDN build structure).
          var colorPickerLoaded = false;
          var COLOR_REGEX = '#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{3}(?:[0-9a-fA-F]{3})?)|rgb\\((?:\\s*\\d{1,3},\\s*){2}\\d{1,3}\\s*\\)|rgba\\((?:\\s*\\d{1,3},\\s*){3}\\d*\\.?\\d+\\s*\\)|hsl\\(\\s*\\d{1,3}(?:,\\s*\\d{1,3}%){2}\\s*\\)|hsla\\(\\s*\\d{1,3}(?:,\\s*\\d{1,3}%){2},\\s*\\d*\\.?\\d+\\s*\\)';
          function injectColorHighlightRules() {
            try {
              var session = editor.session;
              var mode = session.$mode;
              if (!mode) return;
              var rules = (mode.$highlightRules && mode.$highlightRules.getRules && mode.$highlightRules.getRules()) || mode.$rules;
              if (!rules || typeof rules !== 'object') return;
              var colorRule = { token: 'color', regex: COLOR_REGEX };
              for (var stateName in rules) {
                if (Object.prototype.hasOwnProperty.call(rules, stateName) && Array.isArray(rules[stateName])) {
                  rules[stateName].unshift(colorRule);
                }
              }
              mode.$tokenizer = null;
              if (session.bgTokenizer && session.bgTokenizer.setTokenizer && mode.getTokenizer) {
                session.bgTokenizer.setTokenizer(mode.getTokenizer());
                session.bgTokenizer.start(0);
              }
              editor.renderer.updateFull(true);
              console.log('[ReDesign] ✓ Color highlight rules injected');
            } catch (e) {
              console.warn('[ReDesign] Color rule injection failed:', e);
            }
          }
          function doLoadColorPicker() {
            if (colorPickerLoaded) return;
            colorPickerLoaded = true;
            console.log('[ReDesign] ✓ CSS mode active, loading AceColorPicker (doLoadColorPicker)');
            var colorView = AceColorPicker.load(ace, editor, {
              showDelay: 300,
              hideDelay: 1000
            });
            console.log('[ReDesign][CP] AceColorPicker.load result', {
              hasColorView: !!colorView,
              hasColorpicker: !!(colorView && colorView.colorpicker)
            });
            // Library closes picker when mousemove target changes (e.g. leaving token). Don't close if cursor is over the picker.
            document.addEventListener('mousemove', function(e) { lastXY.x = e.clientX; lastXY.y = e.clientY; }, true);
            var originalClose = colorView.close_color_picker && colorView.close_color_picker.bind(colorView);
            if (originalClose) {
              colorView.close_color_picker = function() {
                var picker = document.querySelector('.colorpicker-body');
                if (picker) {
                  var control = picker.querySelector('.control');
                  if (control) {
                    var swatches = Array.from(control.children).filter(function(c) { return c.classList && (c.classList.contains('color') || c.classList.contains('empty')); });
                    var currEl = swatches[1];
                    if (currEl) {
                      var bg = window.getComputedStyle(currEl).backgroundColor;
                      if (bg) lastPrevColor = bg;
                    }
                  }
                }
                requestAnimationFrame(function() {
                  var el = document.elementFromPoint(lastXY.x, lastXY.y);
                  if (el && (el.closest('.ace-colorpicker') || el.closest('.colorpicker-body'))) return;
                  originalClose();
                });
              };
            }
            var cp = colorView.colorpicker;
            colorPickerInstance = cp;
            console.log('[ReDesign][CP] colorPickerInstance set', {
              hasInstance: !!cp,
              keys: cp ? Object.keys(cp) : null
            });
            if (cp && cp.hide) {
              var originalHide = cp.hide.bind(cp);
              cp.hide = function() {
                var picker = document.querySelector('.colorpicker-body');
                if (picker) {
                  var control = picker.querySelector('.control');
                  if (control) {
                    var swatches = Array.from(control.children).filter(function(c) { return c.classList && (c.classList.contains('color') || c.classList.contains('empty')); });
                    var currEl = swatches[1];
                    if (currEl) {
                      var bg = window.getComputedStyle(currEl).backgroundColor;
                      if (bg) lastPrevColor = bg;
                    }
                  }
                }
                var el = document.elementFromPoint(lastXY.x, lastXY.y);
                if (el && (el.closest('.ace-colorpicker') || el.closest('.colorpicker-body'))) return;
                originalHide();
              };
            }
            injectColorHighlightRules();
            console.log('[ReDesign] ✓ Color picker initialized successfully');
            setTimeout(function() {
              var pb = document.querySelector('.colorpicker-body');
              if (pb && typeof runColorPickerSetup === 'function') runColorPickerSetup(pb);
            }, 100);
          }

          editor.session.setMode("ace/mode/css", function() {
            console.log('[ReDesign][CP] editor.session.setMode callback fired, loading color picker');
            doLoadColorPicker();
          });
          // Fallback: if setMode does not invoke callback (e.g. mode already set), init after short delay
          setTimeout(function() {
            if (!colorPickerLoaded) {
              try {
                var m = editor.session.getMode && editor.session.getMode();
                console.log('[ReDesign][CP] fallback setMode timeout fired', {
                  hasMode: !!m,
                  modeId: m && m.$id
                });
                if (m && m.$id === 'ace/mode/css') {
                  doLoadColorPicker();
                }
              } catch (e) {
                console.warn('[ReDesign][CP] fallback setMode error', e);
              }
            }
          }, 100);

          function runColorPickerSetup(pickerBody) {
            cpSetupCallCount++;
            if (!pickerBody) {
              console.warn('[ReDesign][CPSetup] called with null pickerBody, call #', cpSetupCallCount);
              return;
            }
            var existingId = pickerBody.getAttribute('data-redesign-id') || null;
            if (!existingId) {
              existingId = String(Date.now()) + '-' + String(cpSetupCallCount);
              pickerBody.setAttribute('data-redesign-id', existingId);
            }
            console.log('[ReDesign][CPSetup] start', {
              call: cpSetupCallCount,
              pickerId: existingId,
              hasSetupDone: pickerBody.hasAttribute('data-redesign-setup-done')
            });
            if (pickerBody.hasAttribute('data-redesign-setup-done')) {
              console.log('[ReDesign][CPSetup] abort: setup already done for pickerId', existingId);
              return;
            }
            pickerBody.setAttribute('data-redesign-setup-done', '1');

            var colorsets = pickerBody.querySelector('.colorsets');
            var rgbSection = pickerBody.querySelector('.information-item.rgb');
            var hslSection = pickerBody.querySelector('.information-item.hsl');
            var hexSection = pickerBody.querySelector('.information-item.hex');
            console.log('[ReDesign][CPSetup] sections presence', {
              hasColorsets: !!colorsets,
              hasRgb: !!rgbSection,
              hasHsl: !!hslSection,
              hasHex: !!hexSection
            });
            if (!hexSection || !rgbSection || !hslSection) {
              console.warn('[ReDesign][CPSetup] abort: sections missing, removing setup flag', {
                pickerId: existingId
              });
              pickerBody.removeAttribute('data-redesign-setup-done');
              return;
            }
            rgbSection.classList.add('format-hidden');
            hslSection.classList.add('format-hidden');

            var currentFormat = 'hex';
            var isToggling = false;
            var toggleTimeout = null;
            function toggleFormat() {
              if (isToggling) return;
              isToggling = true;
              if (toggleTimeout) clearTimeout(toggleTimeout);
              if (currentFormat === 'hex') {
                currentFormat = 'expanded';
                rgbSection.classList.remove('format-hidden');
                hslSection.classList.remove('format-hidden');
              } else {
                currentFormat = 'hex';
                rgbSection.classList.add('format-hidden');
                hslSection.classList.add('format-hidden');
              }
              toggleTimeout = setTimeout(function() { isToggling = false; }, 200);
            }

            var syncing = false;
            function rgbToHsl(r, g, b, a) {
              r /= 255; g /= 255; b /= 255;
              var max = Math.max(r,g,b), min = Math.min(r,g,b), d = max - min;
              var h = 0, s = 0, l = (max + min) / 2;
              if (d) {
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
                else if (max === g) h = ((b - r) / d + 2) / 6;
                else h = ((r - g) / d + 4) / 6;
              }
              return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100), a: a };
            }
            function hslToRgb(h, s, l, a) {
              h /= 360; s /= 100; l /= 100;
              var r, g, b;
              if (s === 0) r = g = b = l;
              else {
                var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                var p = 2 * l - q;
                var hue2rgb = function(p, q, t) {
                  if (t < 0) t += 1; if (t > 1) t -= 1;
                  if (t < 1/6) return p + (q - p) * 6 * t;
                  if (t < 1/2) return q;
                  if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                  return p;
                };
                r = hue2rgb(p, q, h + 1/3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1/3);
              }
              return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255), a: a };
            }
            function parseNum(v, def) { var n = parseFloat(String(v).replace(/[^0-9.-]/g, '')); return isNaN(n) ? def : n; }

            pickerBody.addEventListener('click', function(e) {
              var t = e.target;
              if (!t || !t.closest) return;
              console.log('[ReDesign][CPSetup:click]', {
                pickerId: pickerBody.getAttribute('data-redesign-id'),
                targetTag: t.tagName,
                targetClass: t.className
              });
              var control = pickerBody.querySelector('.control');
              if (control) {
                var swatches = Array.from(control.children).filter(function(c) { return c.classList && (c.classList.contains('color') || c.classList.contains('empty')); });
                var prevEl = swatches[0];
                if (prevEl && (t === prevEl || prevEl.contains(t))) {
                  e.preventDefault();
                  e.stopPropagation();
                  var bg = window.getComputedStyle(prevEl).backgroundColor;
                  if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
                    try {
                      if (colorPickerInstance && colorPickerInstance.initColor) colorPickerInstance.initColor(bg);
                    } catch (err) {}
                  }
                  return;
                }
              }
              if (t.closest('.format-change-button') || (t.closest('.information-change') && t.closest('button'))) {
                console.log('[ReDesign][CPSetup:click] format toggle button hit');
                e.preventDefault();
                e.stopPropagation();
                toggleFormat();
                return;
              }
              if (colorsets && t.closest('.color-sets-choose-btn')) {
                console.log('[ReDesign][CPSetup:click] palette toggle button hit');
                e.preventDefault();
                e.stopPropagation();
                colorsets.classList.toggle('palette-collapsed');
                if (!colorsets.classList.contains('palette-collapsed')) colorsets.classList.remove('chooser-collapsed');
                return;
              }
              var chooserHeader = colorsets ? colorsets.querySelector('.colorsets-item-header .items') : null;
              if (chooserHeader && (t === chooserHeader || chooserHeader.contains(t))) {
                console.log('[ReDesign][CPSetup:click] chooser header toggle hit');
                e.preventDefault();
                e.stopPropagation();
                colorsets.classList.toggle('chooser-collapsed');
                chooserHeader.textContent = colorsets.classList.contains('chooser-collapsed') ? '+' : '\u00D7';
                return;
              }
            }, true);

            pickerBody.addEventListener('input', function(e) {
              var inp = e.target;
              if (!inp || !rgbSection || !hslSection || syncing) return;
              var rgbInputs = Array.from(rgbSection.querySelectorAll('.input-field .input, .input-field input'));
              var hslInputs = Array.from(hslSection.querySelectorAll('.input-field .input, .input-field input'));
              console.log('[ReDesign][CPSetup:input]', {
                pickerId: pickerBody.getAttribute('data-redesign-id'),
                targetClass: inp.className,
                inRgbSection: rgbSection && rgbSection.contains && rgbSection.contains(inp),
                inHslSection: hslSection && hslSection.contains && hslSection.contains(inp),
                rgbInputsCount: rgbInputs.length,
                hslInputsCount: hslInputs.length
              });
              if (rgbInputs.length < 4 || hslInputs.length < 4) return;
              if (rgbSection.contains(inp)) {
                var r = parseNum(rgbInputs[0].value, 0), g = parseNum(rgbInputs[1].value, 0), b = parseNum(rgbInputs[2].value, 0);
                var a = rgbInputs[3] ? parseNum(rgbInputs[3].value, 255) : 255;
                if (a > 1) a = a / 255;
                var hsl = rgbToHsl(r, g, b, a);
                syncing = true;
                hslInputs[0].value = hsl.h; hslInputs[1].value = hsl.s; hslInputs[2].value = hsl.l;
                if (hslInputs[3]) hslInputs[3].value = (a <= 1 ? Math.round(a * 100) : 100);
                hslInputs.forEach(function(i) { i.dispatchEvent(new Event('input', { bubbles: true })); });
                setTimeout(function() { syncing = false; }, 0);
                var colorStr = a < 1 ? 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')' : 'rgb(' + r + ',' + g + ',' + b + ')';
                try { if (colorPickerInstance && colorPickerInstance.initColor) colorPickerInstance.initColor(colorStr); } catch (err) {}
              } else if (hslSection.contains(inp)) {
                var h = parseNum(hslInputs[0].value, 0), s = parseNum(hslInputs[1].value, 0), l = parseNum(hslInputs[2].value, 0);
                var a = hslInputs[3] ? parseNum(hslInputs[3].value, 100) : 100;
                if (a > 1) a = a / 100;
                var rgb = hslToRgb(h, s, l, a);
                syncing = true;
                rgbInputs[0].value = rgb.r; rgbInputs[1].value = rgb.g; rgbInputs[2].value = rgb.b;
                if (rgbInputs[3]) rgbInputs[3].value = (a < 1 ? Math.round(a * 255) : 255);
                rgbInputs.forEach(function(i) { i.dispatchEvent(new Event('input', { bubbles: true })); });
                setTimeout(function() { syncing = false; }, 0);
                var colorStr = a < 1 ? 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + a + ')' : 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
                try { if (colorPickerInstance && colorPickerInstance.initColor) colorPickerInstance.initColor(colorStr); } catch (err) {}
              }
            }, true);
            pickerBody.addEventListener('change', function(e) {
              var inp = e.target;
              if (!inp || !rgbSection || !hslSection || syncing) return;
              var rgbInputs = Array.from(rgbSection.querySelectorAll('.input-field .input, .input-field input'));
              var hslInputs = Array.from(hslSection.querySelectorAll('.input-field .input, .input-field input'));
              console.log('[ReDesign][CPSetup:change]', {
                pickerId: pickerBody.getAttribute('data-redesign-id'),
                targetClass: inp.className,
                inRgbSection: rgbSection && rgbSection.contains && rgbSection.contains(inp),
                inHslSection: hslSection && hslSection.contains && hslSection.contains(inp),
                rgbInputsCount: rgbInputs.length,
                hslInputsCount: hslInputs.length
              });
              if (rgbInputs.length < 4 || hslInputs.length < 4) return;
              if (rgbSection.contains(inp)) {
                var r = parseNum(rgbInputs[0].value, 0), g = parseNum(rgbInputs[1].value, 0), b = parseNum(rgbInputs[2].value, 0);
                var a = rgbInputs[3] ? parseNum(rgbInputs[3].value, 255) : 255;
                if (a > 1) a = a / 255;
                var hsl = rgbToHsl(r, g, b, a);
                syncing = true;
                hslInputs[0].value = hsl.h; hslInputs[1].value = hsl.s; hslInputs[2].value = hsl.l;
                if (hslInputs[3]) hslInputs[3].value = (a <= 1 ? Math.round(a * 100) : 100);
                setTimeout(function() { syncing = false; }, 0);
                var colorStr = a < 1 ? 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')' : 'rgb(' + r + ',' + g + ',' + b + ')';
                try { if (colorPickerInstance && colorPickerInstance.initColor) colorPickerInstance.initColor(colorStr); } catch (err) {}
              } else if (hslSection.contains(inp)) {
                var h = parseNum(hslInputs[0].value, 0), s = parseNum(hslInputs[1].value, 0), l = parseNum(hslInputs[2].value, 0);
                var a = hslInputs[3] ? parseNum(hslInputs[3].value, 100) : 100;
                if (a > 1) a = a / 100;
                var rgb = hslToRgb(h, s, l, a);
                syncing = true;
                rgbInputs[0].value = rgb.r; rgbInputs[1].value = rgb.g; rgbInputs[2].value = rgb.b;
                if (rgbInputs[3]) rgbInputs[3].value = (a < 1 ? Math.round(a * 255) : 255);
                setTimeout(function() { syncing = false; }, 0);
                var colorStr = a < 1 ? 'rgba(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ',' + a + ')' : 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
                try { if (colorPickerInstance && colorPickerInstance.initColor) colorPickerInstance.initColor(colorStr); } catch (err) {}
              }
            }, true);

            var scrollbarHideTimer = null;
            var SCROLLBAR_ZONE_PX = 10;
            pickerBody.addEventListener('scroll', function() {
              pickerBody.classList.add('is-scrolling');
              if (scrollbarHideTimer) clearTimeout(scrollbarHideTimer);
              scrollbarHideTimer = setTimeout(function() {
                scrollbarHideTimer = null;
                pickerBody.classList.remove('is-scrolling');
              }, 1000);
            }, { passive: true });
            pickerBody.addEventListener('mousemove', function(e) {
              var rect = pickerBody.getBoundingClientRect();
              if (e.clientX >= rect.right - SCROLLBAR_ZONE_PX) {
                pickerBody.classList.add('scrollbar-visible');
              } else {
                pickerBody.classList.remove('scrollbar-visible');
              }
            }, { passive: true });
            pickerBody.addEventListener('mouseleave', function() {
              pickerBody.classList.remove('scrollbar-visible');
            }, { passive: true });

            // PREV sync: set prev from lastPrevColor (captured when picker closed) when picker opens
                        (function setupPrevColorSync() {
                          var prevSynced = false;
                          var lastVisible = false;
                          var interval = setInterval(function() {
                            var picker = document.querySelector('.colorpicker-body');
                            if (!picker) return;
                            var rect = picker.getBoundingClientRect();
                            var visible = rect.width > 0 && rect.height > 0;
                            if (!visible) {
                              lastVisible = false;
                              prevSynced = false;
                              return;
                            }
                            if (visible && !lastVisible) prevSynced = false;
                            lastVisible = visible;
                            if (!visible || prevSynced) return;
                            var control = picker.querySelector('.control');
                            if (!control) return;
                            var swatches = Array.from(control.children).filter(function(c) { return c.classList && (c.classList.contains('color') || c.classList.contains('empty')); });
                            var prevEl = swatches[0];
                            if (!prevEl) return;
                            var bg = lastPrevColor || (swatches[1] ? window.getComputedStyle(swatches[1]).backgroundColor : null);
                            if (bg) {
                              prevEl.style.backgroundColor = bg;
                              prevSynced = true;
                            }
                          }, 80);
                        })();
                        
                        // PALETTE SECTION: Move dropdown inside .colorsets and setup toggle
                        function setupPaletteSection() {
                          const colorsets = pickerBody.querySelector('.colorsets');
                          const colorChooser = pickerBody.querySelector('.color-chooser');
                          const paletteBtn = pickerBody.querySelector('.color-sets-choose-btn');
                          if (!colorsets || !paletteBtn) {
                            return;
                          }
                          if (colorsets.hasAttribute('data-redesign-palette-setup')) {
                            return;
                          }
                          colorsets.setAttribute('data-redesign-palette-setup', '1');
                          console.log('[ReDesign] Setting up palette section...');
                          
                          // Chooser positioning: done synchronously via appendChild hook when picker is appended.
                          // Fallback move only if hook did not run (e.g. library uses different append target)
                          if (colorChooser && colorChooser.parentNode !== colorsets) {
                            const menu = colorsets.querySelector('.menu');
                            if (menu && menu.nextSibling) {
                              colorsets.insertBefore(colorChooser, menu.nextSibling);
                            } else {
                              colorsets.appendChild(colorChooser);
                            }
                            colorChooser.classList.remove('open');
                          }
                          
                          // Palette toggle handler
                          function togglePaletteSection(e) {
                            e.preventDefault();
                            e.stopPropagation();
                            e.stopImmediatePropagation();
                            
                            colorsets.classList.toggle('palette-collapsed');
                            if (!colorsets.classList.contains('palette-collapsed')) {
                              colorsets.classList.remove('chooser-collapsed');
                            }
                            const isCollapsed = colorsets.classList.contains('palette-collapsed');
                            console.log('[ReDesign] Palette section', isCollapsed ? 'collapsed' : 'expanded');
                          }
                          
                          // Replace library click handler with our toggle
                          paletteBtn.removeAttribute('onclick');
                          paletteBtn.addEventListener('click', togglePaletteSection, true);
                          
                          // X button (next to "Color Palettes"): toggle list (Material/Custom/Color Scale), keep header visible for reopen
                          var closeChooserBtn = colorChooser ? colorChooser.querySelector('.colorsets-item-header .items') : null;
                          if (closeChooserBtn) {
                            closeChooserBtn.addEventListener('click', function(e) {
                              e.preventDefault();
                              e.stopPropagation();
                              colorsets.classList.toggle('chooser-collapsed');
                              var collapsed = colorsets.classList.contains('chooser-collapsed');
                              closeChooserBtn.textContent = collapsed ? '+' : '\u00D7';
                              console.log('[ReDesign] Chooser', collapsed ? 'collapsed (click + to reopen)' : 'expanded');
                            }, true);
                            console.log('[ReDesign] Chooser toggle (X/+) button handler installed');
                          }
                          
                          // Chooser collapsed by default when picker opens
                          colorsets.classList.add('chooser-collapsed');
                          if (closeChooserBtn) closeChooserBtn.textContent = '+';
                          
                          console.log('[ReDesign] Palette toggle handler installed');
                          
                          // CONTEXT MENU: Wrapper inside pickerBody, coordinates include scrollTop/scrollLeft.
                          function setupContextMenuPositioning() {
                            var wrapper = document.createElement('div');
                            wrapper.style.cssText = 'position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:100001;';
                            wrapper.className = 'contextmenu-position-wrapper';
                            pickerBody.appendChild(wrapper);
                            var DEBUG = false;
                            function log() {
                              if (DEBUG && console && console.log) {
                                console.log.apply(console, ['[ReDesign][CMenu]'].concat(Array.prototype.slice.call(arguments)));
                              }
                            }
                            
                            function hideContextMenu(menu) {
                              if (menu) {
                                menu.classList.remove('show', 'repositioned');
                              }
                            }
                            
                            function repositionMenu(menu, clientX, clientY, clickTarget) {
                              if (!menu) return;
                              menu.classList.remove('repositioned');
                              wrapper.appendChild(menu);
                              menu.style.pointerEvents = 'auto';
                              var scrollTop = pickerBody.scrollTop || 0;
                              var scrollLeft = pickerBody.scrollLeft || 0;
                              var pickerRect = pickerBody.getBoundingClientRect();
                              var visibleX = clientX - pickerRect.left;
                              var visibleY = clientY - pickerRect.top;
                              var left = visibleX + scrollLeft + 4;
                              var top = visibleY + scrollTop - 4;
                              var pad = 6;
                              var menuRect = menu.getBoundingClientRect();
                              if (left + menuRect.width > pickerRect.width + scrollLeft - pad) {
                                left = visibleX + scrollLeft - menuRect.width - 4;
                              }
                              if (left < pad) left = pad;
                              if (top + menuRect.height > pickerRect.height + scrollTop - pad) {
                                top = visibleY + scrollTop - menuRect.height - 4;
                              }
                              if (top < pad) top = pad;
                              menu.style.left = left + 'px';
                              menu.style.top = top + 'px';
                              menu.classList.add('repositioned');
                            }
                            
                            function queryAllRoots(sel) {
                              var found = null;
                              function scan(root) {
                                if (found) return;
                                try {
                                  var r = root.querySelector(sel);
                                  if (r) { found = r; return; }
                                  var els = root.querySelectorAll('*');
                                  for (var i = 0; i < els.length && !found; i++) {
                                    if (els[i].shadowRoot) scan(els[i].shadowRoot);
                                  }
                                } catch (e) {}
                              }
                              var r = document.querySelector(sel);
                              if (r) return r;
                              scan(document);
                              return found;
                            }
                            function findContextMenu() {
                              var menu = queryAllRoots('.colorsets-contextmenu.show');
                              if (menu) return menu;
                              menu = queryAllRoots('.colorsets-contextmenu');
                              if (menu) return menu;
                              var li = document.querySelector('[data-type="clear-palette"]');
                              if (li) return li.closest('ul');
                              try {
                                var pd = window.parent && window.parent.document;
                                if (pd && pd !== document) {
                                  menu = pd.querySelector('.colorsets-contextmenu.show') || pd.querySelector('.colorsets-contextmenu');
                                  if (menu) return menu;
                                }
                              } catch (e) {}
                              return null;
                            }
                            
                            var pendingCx, pendingCy, pendingTarget;
                            function checkAndReposition(menu) {
                              if (menu && menu.classList.contains('show') && pendingCx != null) {
                                log('menu found via observer/poll');
                                repositionMenu(menu, pendingCx, pendingCy, pendingTarget);
                                pendingCx = null;
                              }
                            }
                            var menuObserver = new MutationObserver(function(mutations) {
                              var menu = findContextMenu();
                              if (menu) checkAndReposition(menu);
                            });
                            menuObserver.observe(document.body, { attributes: true, childList: true, subtree: true, attributeFilter: ['class'] });
                            
                            colorsets.addEventListener('contextmenu', function(e) {
                              var cx = e.clientX;
                              var cy = e.clientY;
                              var target = e.target && e.target.closest ? e.target.closest('.color-item, .add-color-item') : e.target;
                              log('contextmenu: clientX=' + cx + ', clientY=' + cy);
                              pendingCx = cx;
                              pendingCy = cy;
                              pendingTarget = target;
                              
                              function tryReposition(attempt) {
                                var menu = findContextMenu();
                                if (menu) {
                                  pendingCx = null;
                                  if (!menu.classList.contains('show')) menu.classList.add('show');
                                  repositionMenu(menu, cx, cy, target);
                                  return;
                                }
                                if (attempt < 12) {
                                  setTimeout(function() { tryReposition(attempt + 1); }, 20);
                                } else {
                                  pendingCx = null;
                                  var uls = document.querySelectorAll('ul');
                                  log('menu not found. Tip: right-click on Custom palette squares. ULs: ' + uls.length);
                                }
                              }
                              setTimeout(function() { tryReposition(0); }, 10);
                            }, false);
                            
                            document.addEventListener('mousedown', function(e) {
                              if (e.button === 2) return;
                              var menu = document.querySelector('.colorsets-contextmenu.show');
                              if (menu && !menu.contains(e.target)) hideContextMenu(menu);
                            }, false);
                            
                            document.addEventListener('keydown', function(e) {
                              if (e.key === 'Escape') {
                                var menu = document.querySelector('.colorsets-contextmenu.show');
                                if (menu) {
                                  e.preventDefault();
                                  hideContextMenu(menu);
                                }
                              }
                            }, false);
                            
                            pickerBody.addEventListener('scroll', function() {
                              var menu = document.querySelector('.colorsets-contextmenu.show');
                              if (menu) hideContextMenu(menu);
                            }, { passive: true });
                            
                            console.log('[ReDesign] Context menu handlers installed (lazy find)');
                          }
                          
                          setupContextMenuPositioning();
                        }
                        
                        // COLOR SCALE: Update palette from gradient-selected color (native: fixed scale red->yellow->black)
                        function setupColorScaleSync() {
                          var lastScaleColor = null;
                          function parseColorToRgb(str) {
                            if (!str || str === 'transparent' || str === 'rgba(0, 0, 0, 0)') return null;
                            var m = str.match(/rgb\\(\\s*(\\d+)\\s*,\\s*(\\d+)\\s*,\\s*(\\d+)/);
                            if (m) return { r: +m[1], g: +m[2], b: +m[3] };
                            m = str.match(/rgba\\(\\s*(\\d+)\\s*,\\s*(\\d+)\\s*,\\s*(\\d+)/);
                            if (m) return { r: +m[1], g: +m[2], b: +m[3] };
                            m = str.match(/#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/);
                            if (m) return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
                            m = str.match(/#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/);
                            if (m) return { r: parseInt(m[1]+m[1], 16), g: parseInt(m[2]+m[2], 16), b: parseInt(m[3]+m[3], 16) };
                            return null;
                          }
                          function blend(a, b, t) {
                            t = Math.max(0, Math.min(1, t));
                            return {
                              r: Math.round(a.r + (b.r - a.r) * t),
                              g: Math.round(a.g + (b.g - a.g) * t),
                              b: Math.round(a.b + (b.b - a.b) * t)
                            };
                          }
                          function scaleFromColor(rgb, count) {
                            var white = { r: 255, g: 255, b: 255 };
                            var black = { r: 0, g: 0, b: 0 };
                            var colors = [];
                            var n = Math.max(3, count || 9);
                            for (var i = 0; i < n; i++) {
                              var t = n > 1 ? i / (n - 1) : 0;
                              var c = t <= 0.5 ? blend(white, rgb, t * 2) : blend(rgb, black, (t - 0.5) * 2);
                              colors.push(c);
                            }
                            return colors.map(function(c) { return 'rgb(' + c.r + ',' + c.g + ',' + c.b + ')'; });
                          }
                          function updateColorScalePalette(rgb) {
                            var store = colorPickerInstance && (colorPickerInstance.$store || colorPickerInstance.store);
                            if (store && store.colorSetsList && store.colorSetsList[2]) {
                              var scalePalette = store.colorSetsList[2];
                              var hexColors = scaleFromColor(rgb, 9).map(function(c) {
                                var m = c.match(/rgb\\(\\s*(\\d+)\\s*,\\s*(\\d+)\\s*,\\s*(\\d+)/);
                                if (!m) return c;
                                var r = parseInt(m[1], 10).toString(16); if (r.length < 2) r = '0' + r;
                                var g = parseInt(m[2], 10).toString(16); if (g.length < 2) g = '0' + g;
                                var b = parseInt(m[3], 10).toString(16); if (b.length < 2) b = '0' + b;
                                return '#' + r + g + b;
                              });
                              scalePalette.colors = hexColors;
                              delete scalePalette.scale;
                              delete scalePalette.count;
                              try {
                                if (colorPickerInstance.dispatch) colorPickerInstance.dispatch('@changeCurrentColorSets');
                                if (colorPickerInstance.refresh) colorPickerInstance.refresh();
                              } catch (e) {}
                            }
                            var scaleSection = pickerBody.querySelector('.colorsets-item[data-colorsets-index="2"]');
                            if (scaleSection) {
                              var items = scaleSection.querySelector('.items');
                              if (items) {
                                var colorViews = items.querySelectorAll('.color-item .color-view');
                                var newColors = scaleFromColor(rgb, Math.max(colorViews.length, 9));
                                colorViews.forEach(function(v, i) {
                                  if (newColors[i]) v.style.backgroundColor = newColors[i];
                                });
                              }
                            }
                          }
                          setInterval(function() {
                            var picker = document.querySelector('.colorpicker-body');
                            if (!picker) return;
                            var control = picker.querySelector('.control');
                            if (!control) return;
                            var swatches = Array.from(control.children).filter(function(c) { return c.classList && (c.classList.contains('color') || c.classList.contains('empty')); });
                            var currEl = swatches[1];
                            if (!currEl) return;
                            var bg = window.getComputedStyle(currEl).backgroundColor;
                            var rgb = parseColorToRgb(bg);
                            if (!rgb) return;
                            var key = rgb.r + ',' + rgb.g + ',' + rgb.b;
                            if (lastScaleColor === key) return;
                            lastScaleColor = key;
                            updateColorScalePalette(rgb);
                          }, 150);
                          console.log('[ReDesign] Color Scale sync from gradient installed');
                        }
                        setupColorScaleSync();
                        setupPaletteSection();
          }

          const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
              mutation.addedNodes.forEach(function(node) {
                if (node.nodeType === 1) {
                  var body = node.querySelector ? node.querySelector('.colorpicker-body') : null;
                  var isBody = node.classList && node.classList.contains('colorpicker-body');
                  if (body || isBody) {
                    var pickerBody = isBody ? node : body;
                    cpObserverEventCount++;
                    console.log('[ReDesign][CPObserver] colorpicker-body detected', {
                      event: cpObserverEventCount,
                      nodeTag: node.tagName,
                      isBody: isBody,
                      hasBodyQuery: !!body,
                      existingPickerCount: document.querySelectorAll('.colorpicker-body').length
                    });
                    // Run setup after the library has finished its first render (Vue/ace-colorpicker).
                    // A single rAF was too early: refs and listeners ended up on placeholder DOM.
                    setTimeout(function() {
                      console.log('[ReDesign][CPObserver] invoking runColorPickerSetup from observer timeout', {
                        event: cpObserverEventCount,
                        hasPicker: !!pickerBody,
                        pickerId: pickerBody && pickerBody.getAttribute && pickerBody.getAttribute('data-redesign-id')
                      });
                      if (pickerBody && typeof runColorPickerSetup === 'function') runColorPickerSetup(pickerBody);
                    }, 120);
                  }
                }
              });
            });
          });
          observer.observe(document.body, {
            childList: true,
            subtree: true
          });

          // Test if color picker appears
          setTimeout(function() {
            const colorViews = document.querySelectorAll('.ace-colorview');
            const colorPickers = document.querySelectorAll('.ace-colorpicker');
            console.log('[ReDesign] Color views found:', colorViews.length);
            console.log('[ReDesign] Color pickers found:', colorPickers.length);

            if (colorViews.length > 0) {
              console.log('[ReDesign] First color view element:', colorViews[0]);
            }
          }, 2000);

        } catch (e) {
          console.error('[ReDesign] ✗ Failed to initialize color picker:', e);
          console.error('[ReDesign] Error stack:', e.stack);
        }
      } else {
        console.warn('[ReDesign] ✗ AceColorPicker not found - library may not have loaded');
        console.warn('[ReDesign] Check network tab for CDN errors');
      }
      }
      
    // Add intelligent context-aware CSS completers
      if (ace.require && typeof ace.require('ace/ext/language_tools') !== 'undefined') {
        try {
          const langTools = ace.require('ace/ext/language_tools');
          console.log('[ReDesign] Language tools loaded, adding context-aware completers...');

          // Complete CSS properties database
          const cssPropertiesDB = {
            'display': ['block', 'inline', 'inline-block', 'flex', 'inline-flex', 'grid', 'inline-grid', 'table', 'table-row', 'table-cell', 'none', 'contents', 'flow-root', 'list-item'],
            'position': ['static', 'relative', 'absolute', 'fixed', 'sticky'],
            'flex-direction': ['row', 'row-reverse', 'column', 'column-reverse'],
            'flex-wrap': ['nowrap', 'wrap', 'wrap-reverse'],
            'justify-content': ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly', 'start', 'end', 'left', 'right'],
            'align-items': ['flex-start', 'flex-end', 'center', 'baseline', 'stretch', 'start', 'end', 'self-start', 'self-end'],
            'align-content': ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly', 'stretch', 'start', 'end'],
            'align-self': ['auto', 'flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
            'flex-grow': ['0', '1', '2'],
            'flex-shrink': ['0', '1'],
            'flex-basis': ['auto', '0', '100%', 'content'],
            'order': ['0', '1', '-1'],
            'gap': ['0', '4px', '8px', '12px', '16px', '20px', '24px', '32px'],
            'row-gap': ['0', '4px', '8px', '12px', '16px', '20px', '24px'],
            'column-gap': ['0', '4px', '8px', '12px', '16px', '20px', '24px'],
            'grid-template-columns': ['none', 'auto', '1fr', '1fr 1fr', '1fr 2fr', 'repeat(auto-fit, minmax(200px, 1fr))', 'repeat(3, 1fr)'],
            'grid-template-rows': ['none', 'auto', '1fr', '1fr 1fr', 'repeat(3, 1fr)'],
            'grid-template-areas': ['none'],
            'grid-auto-columns': ['auto', 'min-content', 'max-content', '1fr'],
            'grid-auto-rows': ['auto', 'min-content', 'max-content', '1fr'],
            'grid-auto-flow': ['row', 'column', 'dense', 'row dense', 'column dense'],
            'margin': ['0', 'auto', '4px', '8px', '12px', '16px', '20px', '24px', '32px', '0 auto'],
            'margin-top': ['0', 'auto', '4px', '8px', '12px', '16px', '20px', '24px'],
            'margin-right': ['0', 'auto', '4px', '8px', '12px', '16px', '20px', '24px'],
            'margin-bottom': ['0', 'auto', '4px', '8px', '12px', '16px', '20px', '24px'],
            'margin-left': ['0', 'auto', '4px', '8px', '12px', '16px', '20px', '24px'],
            'padding': ['0', '4px', '8px', '12px', '16px', '20px', '24px', '32px'],
            'padding-top': ['0', '4px', '8px', '12px', '16px', '20px', '24px'],
            'padding-right': ['0', '4px', '8px', '12px', '16px', '20px', '24px'],
            'padding-bottom': ['0', '4px', '8px', '12px', '16px', '20px', '24px'],
            'padding-left': ['0', '4px', '8px', '12px', '16px', '20px', '24px'],
            'width': ['auto', '100%', 'fit-content', 'max-content', 'min-content', '0'],
            'height': ['auto', '100%', 'fit-content', 'max-content', 'min-content', '0'],
            'min-width': ['0', 'auto', 'fit-content', 'max-content', 'min-content'],
            'min-height': ['0', 'auto', 'fit-content', 'max-content', 'min-content'],
            'max-width': ['none', '100%', '1200px', '960px', '768px', 'fit-content'],
            'max-height': ['none', '100%', '100vh'],
            'box-sizing': ['content-box', 'border-box'],
            'font-family': ['inherit', 'sans-serif', 'serif', 'monospace', 'cursive', 'fantasy', 'system-ui'],
            'font-size': ['inherit', '10px', '12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px', '48px', '1rem', '1.2rem'],
            'font-weight': ['normal', 'bold', 'lighter', 'bolder', '100', '200', '300', '400', '500', '600', '700', '800', '900'],
            'font-style': ['normal', 'italic', 'oblique'],
            'text-align': ['left', 'center', 'right', 'justify', 'start', 'end'],
            'text-decoration': ['none', 'underline', 'overline', 'line-through', 'underline dotted', 'underline wavy'],
            'text-transform': ['none', 'uppercase', 'lowercase', 'capitalize'],
            'line-height': ['normal', '1', '1.2', '1.4', '1.5', '1.6', '1.8', '2'],
            'letter-spacing': ['normal', '0.05em', '0.1em', '0.2em', '-0.05em'],
            'word-spacing': ['normal', '0.1em', '0.2em', '0.3em'],
            'white-space': ['normal', 'nowrap', 'pre', 'pre-wrap', 'pre-line', 'break-spaces'],
            'color': ['inherit', 'currentColor', 'transparent', 'black', 'white'],
            'background': ['none', 'transparent'],
            'background-color': ['transparent', 'inherit'],
            'background-image': ['none', 'url()', 'linear-gradient()', 'radial-gradient()'],
            'background-size': ['auto', 'cover', 'contain', '100%', '100% 100%'],
            'background-position': ['center', 'top', 'bottom', 'left', 'right', 'center center', 'top left', 'top right', 'bottom left', 'bottom right'],
            'background-repeat': ['repeat', 'repeat-x', 'repeat-y', 'no-repeat', 'space', 'round'],
            'background-attachment': ['scroll', 'fixed', 'local'],
            'opacity': ['0', '0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9', '1'],
            'border': ['none', '1px solid', '2px solid', '1px dashed', '2px dashed', '1px dotted'],
            'border-style': ['none', 'solid', 'dashed', 'dotted', 'double', 'groove', 'ridge', 'inset', 'outset'],
            'border-width': ['0', '1px', '2px', '3px', '4px', 'thin', 'medium', 'thick'],
            'border-color': ['transparent', 'currentColor'],
            'border-radius': ['0', '2px', '4px', '6px', '8px', '12px', '16px', '50%', '999px'],
            'box-shadow': ['none', '0 1px 3px rgba(0,0,0,0.12)', '0 2px 4px rgba(0,0,0,0.1)', '0 4px 8px rgba(0,0,0,0.15)', '0 8px 16px rgba(0,0,0,0.2)'],
            'transform': ['none', 'translate(0, 0)', 'translateX(0)', 'translateY(0)', 'scale(1)', 'scaleX(1)', 'scaleY(1)', 'rotate(0deg)', 'skew(0deg)'],
            'transform-origin': ['center', 'top', 'bottom', 'left', 'right', 'top left', 'top right', 'bottom left', 'bottom right'],
            'transition': ['none', 'all 0.3s', 'all 0.3s ease', 'all 0.5s ease-in-out'],
            'transition-property': ['all', 'none', 'opacity', 'transform', 'color', 'background-color'],
            'transition-duration': ['0s', '0.1s', '0.2s', '0.3s', '0.5s', '1s'],
            'transition-timing-function': ['ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out', 'cubic-bezier(0.4, 0, 0.2, 1)'],
            'animation': ['none'],
            'animation-name': ['none'],
            'animation-duration': ['0s', '0.3s', '0.5s', '1s', '2s'],
            'animation-timing-function': ['ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out'],
            'animation-iteration-count': ['1', 'infinite'],
            'animation-direction': ['normal', 'reverse', 'alternate', 'alternate-reverse'],
            'cursor': ['auto', 'default', 'pointer', 'text', 'move', 'not-allowed', 'help', 'wait', 'crosshair', 'grab', 'grabbing'],
            'overflow': ['visible', 'hidden', 'scroll', 'auto', 'clip'],
            'overflow-x': ['visible', 'hidden', 'scroll', 'auto', 'clip'],
            'overflow-y': ['visible', 'hidden', 'scroll', 'auto', 'clip'],
            'overflow-wrap': ['normal', 'break-word', 'anywhere'],
            'word-break': ['normal', 'break-all', 'keep-all', 'break-word'],
            'z-index': ['auto', '0', '1', '10', '100', '1000', '-1'],
            'visibility': ['visible', 'hidden', 'collapse'],
            'pointer-events': ['auto', 'none', 'all'],
            'user-select': ['auto', 'none', 'text', 'all'],
            'list-style': ['none', 'disc', 'circle', 'square', 'decimal'],
            'list-style-type': ['none', 'disc', 'circle', 'square', 'decimal', 'lower-alpha', 'upper-alpha'],
            'list-style-position': ['inside', 'outside'],
            'vertical-align': ['baseline', 'top', 'middle', 'bottom', 'text-top', 'text-bottom', 'sub', 'super'],
            'object-fit': ['fill', 'contain', 'cover', 'none', 'scale-down'],
            'object-position': ['center', 'top', 'bottom', 'left', 'right'],
            'filter': ['none', 'blur(5px)', 'brightness(1)', 'contrast(1)', 'grayscale(0)', 'hue-rotate(0deg)', 'invert(0)', 'opacity(1)', 'saturate(1)', 'sepia(0)'],
            'backdrop-filter': ['none', 'blur(10px)'],
            'mix-blend-mode': ['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn'],
            'isolation': ['auto', 'isolate'],
            'content': ['none', 'normal', '""', 'attr()'],
            'quotes': ['none', 'auto'],
            'resize': ['none', 'both', 'horizontal', 'vertical'],
            'outline': ['none', '1px solid', '2px solid'],
            'outline-style': ['none', 'solid', 'dashed', 'dotted', 'double'],
            'outline-width': ['thin', 'medium', 'thick', '1px', '2px'],
            'outline-offset': ['0', '1px', '2px', '4px'],
            'appearance': ['none', 'auto'],
            'will-change': ['auto', 'transform', 'opacity', 'scroll-position']
          };

          // Context-aware completer
          const contextAwareCSSCompleter = {
            getCompletions: function(ed, session, pos, prefix, callback) {
              const line = session.getLine(pos.row);
              const beforeCursor = line.substring(0, pos.column);
              const afterCursor = line.substring(pos.column);
              console.log('[ReDesign] 🔧 Autocomplete triggered. Position:', pos, 'Prefix:', JSON.stringify(prefix));
              console.log('[ReDesign] 📝 Line:', JSON.stringify(line));
              console.log('[ReDesign] ⬅️ Before cursor:', JSON.stringify(beforeCursor));
              console.log('[ReDesign] ➡️ After cursor:', JSON.stringify(afterCursor));

              // Check if we're after a colon (suggesting values)
              const colonMatch = beforeCursor.match(/([a-z-]+)\s*:\s*([^;]*)$/i);
              console.log('[ReDesign] 🔍 Colon match:', colonMatch);

              if (colonMatch) {
                // We're suggesting values for a property
                const propertyName = colonMatch[1].trim();
                console.log('[ReDesign] Suggesting values for property:', propertyName);
                const values = cssPropertiesDB[propertyName] || [];

                const completions = values.map(val => ({
                  caption: val,
                  value: val + ';',  // Add semicolon after value
                  meta: 'value',
                  score: 1000
                }));

                console.log('[ReDesign] Returning', completions.length, 'value completions for property:', propertyName);
                callback(null, completions);
              } else {
                // We're suggesting property names
                console.log('[ReDesign] Suggesting property names');
                const completions = Object.keys(cssPropertiesDB).map(prop => ({
                  caption: prop,
                  value: prop + ': ',  // Only colon and space, NO semicolon
                  meta: 'property',
                  score: 900,
                  completer: {
                    insertMatch: function(editor, data) {
                      // Insert the property with colon and space
                      editor.completer.insertMatch({value: data.value});
                      // Insert semicolon
                      editor.insert(';');
                      // Move cursor before semicolon
                      const pos = editor.getCursorPosition();
                      editor.moveCursorTo(pos.row, pos.column - 1);
                      // Trigger value autocomplete immediately
                      setTimeout(function() {
                        editor.execCommand('startAutocomplete');
                      }, 0);
                    }
                  }
                }));

                console.log('[ReDesign] Returning', completions.length, 'property completions');
                callback(null, completions);
              }
            }
          };

          // Replace all completers with our custom one (don't add to existing)
          langTools.setCompleters([contextAwareCSSCompleter]);
          console.log('[ReDesign] ✓ Context-aware CSS completers set successfully (replaced defaults)');

          // Add custom space handler without removing default insertstring
          editor.commands.addCommand({
            name: 'customSpaceInsert',
            bindKey: {win: 'Space', mac: 'Space'},
            exec: function(ed) {
              console.log('[ReDesign] 🔍 Space key pressed');

              const pos = ed.getCursorPosition();
              const edSession = ed.session;
              const line = edSession.getLine(pos.row);
              const beforeCursor = line.substring(0, pos.column);
              const afterCursor = line.substring(pos.column);

              const colonBeforeCursor = /([a-z-]+):$/i.test(beforeCursor);
              const semicolonAfterCursor = /^;/.test(afterCursor);

              console.log('[ReDesign] 📍 Context:', {
                colonBefore: colonBeforeCursor,
                semicolonAfter: semicolonAfterCursor,
                beforeCursor: JSON.stringify(beforeCursor),
                afterCursor: JSON.stringify(afterCursor)
              });

              if (colonBeforeCursor && semicolonAfterCursor) {
                console.log('[ReDesign] ✓ Property colon pattern detected');

                // Remove semicolon, insert space, trigger autocomplete
                const Range = ace.require('ace/range').Range;
                const range = new Range(pos.row, pos.column, pos.row, pos.column + 1);
                edSession.remove(range);
                ed.insert(' ');

                setTimeout(function() {
                  console.log('[ReDesign] → Triggering autocomplete');
                  ed.execCommand('startAutocomplete');
                }, 50);
              } else {
                // Normal space insertion
                console.log('[ReDesign] ℹ️ Normal space');
                ed.insert(' ');
              }
            }
          });
          console.log('[ReDesign] ✓ Custom space handler registered');

        } catch (e) {
          console.error('[ReDesign] ✗ Failed to add custom completers:', e);
        }
      } else {
        console.warn('[ReDesign] ✗ Language tools not available');
      }

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
    initEditor();
  </script>
</body>
</html>`;

    // Cache the HTML and the settings used to generate it
    this.cachedEditorHTML = html;
    this.cachedVersion = this.cacheVersion;
    this.cachedPalette = paletteValue;
    this.cachedUiTheme = uiThemeValue;

    return html;
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
        <div
          ref={this.editorContainerRef}
          style={{
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
          }}
        >
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
