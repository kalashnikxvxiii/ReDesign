/**
 * Color Picker Manager
 * Manages color picker state, persistence, and multi-format support
 * 
 * Features:
 * - Robust state management
 * - Multi-format color support (HEX, RGB, HSL, OKLCH)
 * - Persistent picker (doesn't close unexpectedly)
 * - Format switching with live preview
 * - Accessibility features
 * 
 * @author ReDesign Team
 * @version 1.0.0
 */

import ColorConverter, { ColorFormat, RGB, HSL, OKLCH } from './color-converter';

export enum PickerState {
  CLOSED = 'closed',
  OPENING = 'opening',
  OPEN = 'open',
  CLOSING = 'closing'
}

export interface ColorPickerConfig {
  defaultFormat?: ColorFormat;
  showOKLCH?: boolean;
  persistOnInteraction?: boolean;
  closeOnEscape?: boolean;
  closeOnClickOutside?: boolean;
  showAccessibilityInfo?: boolean;
}

export interface ColorValue {
  hex: string;
  rgb: string;
  hsl: string;
  oklch: string;
  format: ColorFormat;
}

export class ColorPickerManager {
  private state: PickerState = PickerState.CLOSED;
  private currentColor: string = '#000000';
  private currentFormat: ColorFormat = 'hex';
  private pickerElement: HTMLElement | null = null;
  private config: Required<ColorPickerConfig>;
  private stateChangeCallbacks: Array<(state: PickerState) => void> = [];
  private colorChangeCallbacks: Array<(color: ColorValue) => void> = [];
  private preventCloseTimeout: number | null = null;
  private isInteracting: boolean = false;

  constructor(config: ColorPickerConfig = {}) {
    this.config = {
      defaultFormat: config.defaultFormat || 'hex',
      showOKLCH: config.showOKLCH !== false,
      persistOnInteraction: config.persistOnInteraction !== false,
      closeOnEscape: config.closeOnEscape !== false,
      closeOnClickOutside: config.closeOnClickOutside !== false,
      showAccessibilityInfo: config.showAccessibilityInfo || false
    };
    
    this.currentFormat = this.config.defaultFormat;
    this.initialize();
  }

  /**
   * Initialize the manager
   */
  private initialize(): void {
    console.log('[ColorPickerManager] Initializing...');
    
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupEventListeners());
    } else {
      this.setupEventListeners();
    }
  }

  /**
   * Setup event listeners
   */
  private setupEventListeners(): void {
    // Monitor for picker creation
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as HTMLElement;
            const pickerBody = element.querySelector?.('.colorpicker-body') || 
                             (element.classList?.contains('colorpicker-body') ? element : null);
            
            if (pickerBody) {
              this.onPickerCreated(pickerBody as HTMLElement);
            }
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Global keyboard handler
    if (this.config.closeOnEscape) {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.state === PickerState.OPEN) {
          this.closePicker();
        }
      });
    }

    // Click outside handler
    if (this.config.closeOnClickOutside) {
      document.addEventListener('mousedown', (e) => {
        if (this.state === PickerState.OPEN && this.pickerElement) {
          const target = e.target as HTMLElement;
          if (!this.pickerElement.contains(target) && !target.closest('.ace-colorview')) {
            this.closePicker();
          }
        }
      });
    }

    console.log('[ColorPickerManager] Event listeners setup complete');
  }

  /**
   * Called when picker is created in DOM
   */
  private onPickerCreated(pickerElement: HTMLElement): void {
    console.log('[ColorPickerManager] Picker created in DOM');
    
    this.pickerElement = pickerElement;
    this.setState(PickerState.OPEN);
    
    // Enhance picker with additional features
    this.enhancePicker(pickerElement);
    
    // Setup interaction tracking
    this.setupInteractionTracking(pickerElement);
    
    // Add format switcher if OKLCH is enabled
    if (this.config.showOKLCH) {
      this.addFormatSwitcher(pickerElement);
    }
    
    // Add accessibility info if enabled
    if (this.config.showAccessibilityInfo) {
      this.addAccessibilityInfo(pickerElement);
    }
  }

  /**
   * Enhance picker with additional features
   */
  private enhancePicker(pickerElement: HTMLElement): void {
    // Add data attribute for theming
    pickerElement.setAttribute('data-format', this.currentFormat);
    
    // Prevent picker from closing during interaction
    if (this.config.persistOnInteraction) {
      pickerElement.addEventListener('mouseenter', () => {
        this.isInteracting = true;
        if (this.preventCloseTimeout) {
          clearTimeout(this.preventCloseTimeout);
          this.preventCloseTimeout = null;
        }
      });
      
      pickerElement.addEventListener('mouseleave', () => {
        this.isInteracting = false;
        // Delay close to allow for re-entry
        this.preventCloseTimeout = window.setTimeout(() => {
          if (!this.isInteracting) {
            this.closePicker();
          }
        }, 300);
      });
    }
    
    // Monitor color changes
    this.monitorColorChanges(pickerElement);
  }

  /**
   * Setup interaction tracking
   */
  private setupInteractionTracking(pickerElement: HTMLElement): void {
    const interactiveElements = pickerElement.querySelectorAll(
      'input, button, .drag-pointer, .drag-bar, .color-item'
    );
    
    interactiveElements.forEach((element) => {
      element.addEventListener('mousedown', () => {
        this.isInteracting = true;
      });
      
      element.addEventListener('mouseup', () => {
        // Keep interacting flag for a moment
        setTimeout(() => {
          this.isInteracting = false;
        }, 100);
      });
    });
  }

  /**
   * Monitor color changes in picker
   */
  private monitorColorChanges(pickerElement: HTMLElement): void {
    const inputs = pickerElement.querySelectorAll('.input-field input');
    
    inputs.forEach((input) => {
      input.addEventListener('input', () => {
        this.updateCurrentColor(pickerElement);
      });
    });
    
    // Monitor drag interactions
    const dragElements = pickerElement.querySelectorAll('.drag-pointer, .drag-bar');
    dragElements.forEach((element) => {
      element.addEventListener('mouseup', () => {
        setTimeout(() => this.updateCurrentColor(pickerElement), 50);
      });
    });
  }

  /**
   * Update current color from picker
   */
  private updateCurrentColor(pickerElement: HTMLElement): void {
    // Try to extract color from inputs
    const inputs = pickerElement.querySelectorAll('.input-field input');
    if (inputs.length >= 3) {
      const values = Array.from(inputs).map((input) => (input as HTMLInputElement).value);
      
      // Determine format from button text
      const formatButton = pickerElement.querySelector('.format-change-button');
      const formatText = formatButton?.textContent?.trim().toLowerCase() || 'hex';
      
      let colorString = '';
      
      if (formatText.includes('hex')) {
        colorString = values[0].startsWith('#') ? values[0] : `#${values[0]}`;
      } else if (formatText.includes('rgb')) {
        colorString = `rgb(${values[0]}, ${values[1]}, ${values[2]})`;
      } else if (formatText.includes('hsl')) {
        colorString = `hsl(${values[0]}, ${values[1]}%, ${values[2]}%)`;
      }
      
      if (colorString) {
        this.currentColor = colorString;
        this.notifyColorChange();
      }
    }
  }

  /**
   * Add format switcher for OKLCH support
   */
  private addFormatSwitcher(pickerElement: HTMLElement): void {
    const formatButton = pickerElement.querySelector('.format-change-button');
    if (!formatButton) return;
    
    // Store original click handler
    const originalHandler = (formatButton as any).onclick;
    
    // Override with enhanced handler
    formatButton.addEventListener('click', (e) => {
      e.stopPropagation();
      
      // Call original handler first
      if (originalHandler) {
        originalHandler.call(formatButton, e);
      }
      
      // Cycle through formats including OKLCH
      setTimeout(() => {
        const currentText = formatButton.textContent?.trim().toLowerCase() || '';
        
        if (currentText.includes('hex')) {
          this.currentFormat = 'hex';
        } else if (currentText.includes('rgb')) {
          this.currentFormat = 'rgb';
        } else if (currentText.includes('hsl')) {
          this.currentFormat = 'hsl';
          // Add OKLCH option
          this.injectOKLCHFormat(pickerElement);
        }
        
        pickerElement.setAttribute('data-format', this.currentFormat);
      }, 50);
    });
  }

  /**
   * Inject OKLCH format option
   */
  private injectOKLCHFormat(pickerElement: HTMLElement): void {
    const formatButton = pickerElement.querySelector('.format-change-button');
    if (!formatButton) return;
    
    // Check if we're at HSL, then offer OKLCH
    const currentText = formatButton.textContent?.trim().toLowerCase() || '';
    
    if (currentText.includes('hsl')) {
      // Create OKLCH button
      const oklchButton = document.createElement('button');
      oklchButton.className = 'format-change-button';
      oklchButton.textContent = 'OKLCH';
      oklchButton.style.marginTop = '4px';
      
      oklchButton.addEventListener('click', () => {
        this.switchToOKLCH(pickerElement);
      });
      
      formatButton.parentElement?.appendChild(oklchButton);
    }
  }

  /**
   * Switch to OKLCH format
   */
  private switchToOKLCH(pickerElement: HTMLElement): void {
    this.currentFormat = 'oklch';
    pickerElement.setAttribute('data-format', 'oklch');
    
    // Update inputs to show OKLCH values
    const rgb = ColorConverter.parse(this.currentColor);
    if (!rgb) return;
    
    const oklch = ColorConverter.rgbToOklch(rgb);
    
    const inputs = pickerElement.querySelectorAll('.input-field input');
    const titles = pickerElement.querySelectorAll('.input-field .title');
    
    if (inputs.length >= 3 && titles.length >= 3) {
      (inputs[0] as HTMLInputElement).value = oklch.l.toFixed(3);
      (inputs[1] as HTMLInputElement).value = oklch.c.toFixed(3);
      (inputs[2] as HTMLInputElement).value = oklch.h.toFixed(1);
      
      titles[0].textContent = 'L';
      titles[1].textContent = 'C';
      titles[2].textContent = 'H';
    }
    
    console.log('[ColorPickerManager] Switched to OKLCH format:', oklch);
  }

  /**
   * Add accessibility information
   */
  private addAccessibilityInfo(pickerElement: HTMLElement): void {
    const rgb = ColorConverter.parse(this.currentColor);
    if (!rgb) return;
    
    // Check contrast with white and black
    const contrastWhite = ColorConverter.getContrastRatio(this.currentColor, '#FFFFFF');
    const contrastBlack = ColorConverter.getContrastRatio(this.currentColor, '#000000');
    
    if (contrastWhite === null || contrastBlack === null) return;
    
    // Create info element
    const infoDiv = document.createElement('div');
    infoDiv.className = 'cp-accessibility-info';
    infoDiv.style.cssText = `
      margin-top: 12px;
      padding: 8px;
      background: var(--cp-bg-primary);
      border: 1px solid var(--cp-border);
      border-radius: 4px;
      font-size: 11px;
      color: var(--cp-text-secondary);
    `;
    
    const wcagAA = contrastWhite >= 4.5 || contrastBlack >= 4.5;
    const wcagAAA = contrastWhite >= 7 || contrastBlack >= 7;
    
    infoDiv.innerHTML = `
      <div style="font-weight: 600; margin-bottom: 4px;">Accessibility</div>
      <div>Contrast (white): ${contrastWhite.toFixed(2)}:1</div>
      <div>Contrast (black): ${contrastBlack.toFixed(2)}:1</div>
      <div style="margin-top: 4px;">
        ${wcagAAA ? '✓ WCAG AAA' : wcagAA ? '✓ WCAG AA' : '✗ Not accessible'}
      </div>
    `;
    
    pickerElement.appendChild(infoDiv);
  }

  /**
   * Close picker
   */
  private closePicker(): void {
    if (this.state !== PickerState.OPEN) return;
    
    console.log('[ColorPickerManager] Closing picker');
    this.setState(PickerState.CLOSING);
    
    if (this.pickerElement) {
      this.pickerElement.style.display = 'none';
    }
    
    setTimeout(() => {
      this.setState(PickerState.CLOSED);
      this.pickerElement = null;
    }, 100);
  }

  /**
   * Set state and notify listeners
   */
  private setState(newState: PickerState): void {
    if (this.state === newState) return;
    
    console.log(`[ColorPickerManager] State: ${this.state} -> ${newState}`);
    this.state = newState;
    this.stateChangeCallbacks.forEach((callback) => callback(newState));
  }

  /**
   * Notify color change
   */
  private notifyColorChange(): void {
    const colorValue = this.getCurrentColorValue();
    if (colorValue) {
      this.colorChangeCallbacks.forEach((callback) => callback(colorValue));
    }
  }

  /**
   * Get current color in all formats
   */
  private getCurrentColorValue(): ColorValue | null {
    const rgb = ColorConverter.parse(this.currentColor);
    if (!rgb) return null;
    
    return {
      hex: ColorConverter.rgbToHex(rgb),
      rgb: ColorConverter.rgbToString(rgb),
      hsl: ColorConverter.hslToString(ColorConverter.rgbToHsl(rgb)),
      oklch: ColorConverter.oklchToString(ColorConverter.rgbToOklch(rgb)),
      format: this.currentFormat
    };
  }

  /**
   * Public API: Subscribe to state changes
   */
  public onStateChange(callback: (state: PickerState) => void): () => void {
    this.stateChangeCallbacks.push(callback);
    return () => {
      const index = this.stateChangeCallbacks.indexOf(callback);
      if (index > -1) {
        this.stateChangeCallbacks.splice(index, 1);
      }
    };
  }

  /**
   * Public API: Subscribe to color changes
   */
  public onColorChange(callback: (color: ColorValue) => void): () => void {
    this.colorChangeCallbacks.push(callback);
    return () => {
      const index = this.colorChangeCallbacks.indexOf(callback);
      if (index > -1) {
        this.colorChangeCallbacks.splice(index, 1);
      }
    };
  }

  /**
   * Public API: Get current state
   */
  public getState(): PickerState {
    return this.state;
  }

  /**
   * Public API: Get current color
   */
  public getCurrentColor(): string {
    return this.currentColor;
  }

  /**
   * Public API: Get current format
   */
  public getCurrentFormat(): ColorFormat {
    return this.currentFormat;
  }

  /**
   * Public API: Force close picker
   */
  public forceClose(): void {
    this.closePicker();
  }

  /**
   * Public API: Destroy manager
   */
  public destroy(): void {
    if (this.preventCloseTimeout) {
      clearTimeout(this.preventCloseTimeout);
    }
    
    this.stateChangeCallbacks = [];
    this.colorChangeCallbacks = [];
    this.pickerElement = null;
    
    console.log('[ColorPickerManager] Destroyed');
  }
}

export default ColorPickerManager;
