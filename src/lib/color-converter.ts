/**
 * Color Converter Utility
 * Lightweight color conversion library supporting HEX, RGB, HSL, and OKLCH
 * No external dependencies - pure TypeScript implementation
 * 
 * @author ReDesign Team
 * @version 1.0.0
 */

export type ColorFormat = 'hex' | 'rgb' | 'hsl' | 'oklch';

export interface RGB {
  r: number; // 0-255
  g: number; // 0-255
  b: number; // 0-255
  a?: number; // 0-1
}

export interface HSL {
  h: number; // 0-360
  s: number; // 0-100
  l: number; // 0-100
  a?: number; // 0-1
}

export interface OKLCH {
  l: number; // 0-1 (lightness)
  c: number; // 0-0.4 (chroma)
  h: number; // 0-360 (hue)
  a?: number; // 0-1
}

export class ColorConverter {
  /**
   * Parse any color string to RGB
   */
  static parse(color: string): RGB | null {
    const trimmed = color.trim();
    
    // HEX
    if (trimmed.startsWith('#')) {
      return this.hexToRgb(trimmed);
    }
    
    // RGB/RGBA
    if (trimmed.startsWith('rgb')) {
      return this.parseRgbString(trimmed);
    }
    
    // HSL/HSLA
    if (trimmed.startsWith('hsl')) {
      const hsl = this.parseHslString(trimmed);
      return hsl ? this.hslToRgb(hsl) : null;
    }
    
    // OKLCH
    if (trimmed.startsWith('oklch')) {
      const oklch = this.parseOklchString(trimmed);
      return oklch ? this.oklchToRgb(oklch) : null;
    }
    
    return null;
  }

  /**
   * HEX to RGB conversion
   */
  static hexToRgb(hex: string): RGB | null {
    const cleaned = hex.replace('#', '');
    
    // Support 3, 4, 6, 8 digit hex
    let r: number, g: number, b: number, a: number = 1;
    
    if (cleaned.length === 3) {
      r = parseInt(cleaned[0] + cleaned[0], 16);
      g = parseInt(cleaned[1] + cleaned[1], 16);
      b = parseInt(cleaned[2] + cleaned[2], 16);
    } else if (cleaned.length === 4) {
      r = parseInt(cleaned[0] + cleaned[0], 16);
      g = parseInt(cleaned[1] + cleaned[1], 16);
      b = parseInt(cleaned[2] + cleaned[2], 16);
      a = parseInt(cleaned[3] + cleaned[3], 16) / 255;
    } else if (cleaned.length === 6) {
      r = parseInt(cleaned.substring(0, 2), 16);
      g = parseInt(cleaned.substring(2, 4), 16);
      b = parseInt(cleaned.substring(4, 6), 16);
    } else if (cleaned.length === 8) {
      r = parseInt(cleaned.substring(0, 2), 16);
      g = parseInt(cleaned.substring(2, 4), 16);
      b = parseInt(cleaned.substring(4, 6), 16);
      a = parseInt(cleaned.substring(6, 8), 16) / 255;
    } else {
      return null;
    }
    
    if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
    
    return { r, g, b, a };
  }

  /**
   * RGB to HEX conversion
   */
  static rgbToHex(rgb: RGB): string {
    const toHex = (n: number) => {
      const hex = Math.round(Math.max(0, Math.min(255, n))).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    
    let hex = `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
    
    if (rgb.a !== undefined && rgb.a < 1) {
      hex += toHex(rgb.a * 255);
    }
    
    return hex.toUpperCase();
  }

  /**
   * RGB to HSL conversion
   */
  static rgbToHsl(rgb: RGB): HSL {
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;
    
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;
    
    if (delta !== 0) {
      s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
      
      switch (max) {
        case r:
          h = ((g - b) / delta + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / delta + 2) / 6;
          break;
        case b:
          h = ((r - g) / delta + 4) / 6;
          break;
      }
    }
    
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
      a: rgb.a
    };
  }

  /**
   * HSL to RGB conversion
   */
  static hslToRgb(hsl: HSL): RGB {
    const h = hsl.h / 360;
    const s = hsl.s / 100;
    const l = hsl.l / 100;
    
    let r: number, g: number, b: number;
    
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    
    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
      a: hsl.a
    };
  }

  /**
   * RGB to OKLCH conversion (simplified, perceptually uniform)
   */
  static rgbToOklch(rgb: RGB): OKLCH {
    // Convert RGB to linear RGB
    const toLinear = (c: number) => {
      const normalized = c / 255;
      return normalized <= 0.04045
        ? normalized / 12.92
        : Math.pow((normalized + 0.055) / 1.055, 2.4);
    };
    
    const r = toLinear(rgb.r);
    const g = toLinear(rgb.g);
    const b = toLinear(rgb.b);
    
    // Convert to OKLab (simplified matrix transformation)
    const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
    const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
    const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;
    
    const l_ = Math.cbrt(l);
    const m_ = Math.cbrt(m);
    const s_ = Math.cbrt(s);
    
    const L = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_;
    const a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_;
    const b_ = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_;
    
    // Convert to LCH
    const C = Math.sqrt(a * a + b_ * b_);
    let H = Math.atan2(b_, a) * 180 / Math.PI;
    if (H < 0) H += 360;
    
    return {
      l: Math.max(0, Math.min(1, L)),
      c: Math.max(0, Math.min(0.4, C)),
      h: H,
      a: rgb.a
    };
  }

  /**
   * OKLCH to RGB conversion
   */
  static oklchToRgb(oklch: OKLCH): RGB {
    const { l: L, c: C, h: H, a: alpha } = oklch;
    
    // Convert LCH to Lab
    const hRad = H * Math.PI / 180;
    const a = C * Math.cos(hRad);
    const b = C * Math.sin(hRad);
    
    // Convert OKLab to linear RGB
    const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
    const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
    const s_ = L - 0.0894841775 * a - 1.2914855480 * b;
    
    const l = l_ * l_ * l_;
    const m = m_ * m_ * m_;
    const s = s_ * s_ * s_;
    
    const r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
    const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
    const b_ = -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s;
    
    // Convert linear RGB to sRGB
    const fromLinear = (c: number) => {
      return c <= 0.0031308
        ? 12.92 * c
        : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
    };
    
    return {
      r: Math.round(Math.max(0, Math.min(255, fromLinear(r) * 255))),
      g: Math.round(Math.max(0, Math.min(255, fromLinear(g) * 255))),
      b: Math.round(Math.max(0, Math.min(255, fromLinear(b_) * 255))),
      a: alpha
    };
  }

  /**
   * Format RGB to string
   */
  static rgbToString(rgb: RGB): string {
    if (rgb.a !== undefined && rgb.a < 1) {
      return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a.toFixed(2)})`;
    }
    return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  }

  /**
   * Format HSL to string
   */
  static hslToString(hsl: HSL): string {
    if (hsl.a !== undefined && hsl.a < 1) {
      return `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${hsl.a.toFixed(2)})`;
    }
    return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  }

  /**
   * Format OKLCH to string
   */
  static oklchToString(oklch: OKLCH): string {
    if (oklch.a !== undefined && oklch.a < 1) {
      return `oklch(${oklch.l.toFixed(3)} ${oklch.c.toFixed(3)} ${oklch.h.toFixed(1)} / ${oklch.a.toFixed(2)})`;
    }
    return `oklch(${oklch.l.toFixed(3)} ${oklch.c.toFixed(3)} ${oklch.h.toFixed(1)})`;
  }

  /**
   * Convert color to any format
   */
  static convert(color: string, toFormat: ColorFormat): string | null {
    const rgb = this.parse(color);
    if (!rgb) return null;
    
    switch (toFormat) {
      case 'hex':
        return this.rgbToHex(rgb);
      case 'rgb':
        return this.rgbToString(rgb);
      case 'hsl':
        return this.hslToString(this.rgbToHsl(rgb));
      case 'oklch':
        return this.oklchToString(this.rgbToOklch(rgb));
      default:
        return null;
    }
  }

  /**
   * Parse RGB string
   */
  private static parseRgbString(str: string): RGB | null {
    const match = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (!match) return null;
    
    return {
      r: parseInt(match[1]),
      g: parseInt(match[2]),
      b: parseInt(match[3]),
      a: match[4] ? parseFloat(match[4]) : undefined
    };
  }

  /**
   * Parse HSL string
   */
  private static parseHslString(str: string): HSL | null {
    const match = str.match(/hsla?\((\d+),\s*(\d+)%,\s*(\d+)%(?:,\s*([\d.]+))?\)/);
    if (!match) return null;
    
    return {
      h: parseInt(match[1]),
      s: parseInt(match[2]),
      l: parseInt(match[3]),
      a: match[4] ? parseFloat(match[4]) : undefined
    };
  }

  /**
   * Parse OKLCH string
   */
  private static parseOklchString(str: string): OKLCH | null {
    const match = str.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\)/);
    if (!match) return null;
    
    return {
      l: parseFloat(match[1]),
      c: parseFloat(match[2]),
      h: parseFloat(match[3]),
      a: match[4] ? parseFloat(match[4]) : undefined
    };
  }

  /**
   * Get contrast ratio between two colors (WCAG)
   */
  static getContrastRatio(color1: string, color2: string): number | null {
    const rgb1 = this.parse(color1);
    const rgb2 = this.parse(color2);
    
    if (!rgb1 || !rgb2) return null;
    
    const getLuminance = (rgb: RGB) => {
      const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(c => {
        const normalized = c / 255;
        return normalized <= 0.03928
          ? normalized / 12.92
          : Math.pow((normalized + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };
    
    const l1 = getLuminance(rgb1);
    const l2 = getLuminance(rgb2);
    
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    
    return (lighter + 0.05) / (darker + 0.05);
  }

  /**
   * Check if color meets WCAG AA standard
   */
  static isAccessible(foreground: string, background: string, largeText: boolean = false): boolean {
    const ratio = this.getContrastRatio(foreground, background);
    if (!ratio) return false;
    
    return largeText ? ratio >= 3 : ratio >= 4.5;
  }
}

export default ColorConverter;
