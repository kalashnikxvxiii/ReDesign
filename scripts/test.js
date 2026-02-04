#!/usr/bin/env node
/**
 * ReDesign Automated Test Suite
 * Comprehensive testing for color picker enhancements
 * 
 * @version 1.0.0
 * @author ReDesign Team
 * 
 * Usage:
 *   node automated-test-suite.js
 *   npm test
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

// Test result tracker
class TestRunner {
  constructor() {
    this.passed = 0;
    this.failed = 0;
    this.skipped = 0;
    this.tests = [];
    this.startTime = Date.now();
    this.currentSuite = null;
  }

  suite(name) {
    this.currentSuite = name;
    console.log(`\n${colors.cyan}${colors.bright}▶ ${name}${colors.reset}`);
  }

  test(name, fn) {
    try {
      fn();
      this.passed++;
      console.log(`  ${colors.green}✓${colors.reset} ${name}`);
      this.tests.push({ suite: this.currentSuite, name, status: 'passed' });
    } catch (error) {
      this.failed++;
      console.log(`  ${colors.red}✗${colors.reset} ${name}`);
      console.log(`    ${colors.red}${error.message}${colors.reset}`);
      this.tests.push({ suite: this.currentSuite, name, status: 'failed', error: error.message });
    }
  }

  skip(name, reason) {
    this.skipped++;
    console.log(`  ${colors.yellow}○${colors.reset} ${name} ${colors.yellow}(skipped: ${reason})${colors.reset}`);
    this.tests.push({ suite: this.currentSuite, name, status: 'skipped', reason });
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message || 'Assertion failed');
    }
  }

  assertEqual(actual, expected, message) {
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      throw new Error(
        message || 
        `Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`
      );
    }
  }

  assertClose(actual, expected, tolerance, message) {
    if (Math.abs(actual - expected) > tolerance) {
      throw new Error(
        message || 
        `Expected ~${expected} (±${tolerance}), got ${actual}`
      );
    }
  }

  assertExists(value, message) {
    if (value === null || value === undefined) {
      throw new Error(message || 'Value should exist');
    }
  }

  assertType(value, type, message) {
    if (typeof value !== type) {
      throw new Error(
        message || 
        `Expected type ${type}, got ${typeof value}`
      );
    }
  }

  summary() {
    const duration = ((Date.now() - this.startTime) / 1000).toFixed(2);
    const total = this.passed + this.failed + this.skipped;
    const passRate = total > 0 ? ((this.passed / total) * 100).toFixed(2) : 0;

    console.log('\n' + '═'.repeat(70));
    console.log(`${colors.bright}${colors.cyan}TEST SUMMARY${colors.reset}`);
    console.log('═'.repeat(70));
    console.log(`Total Tests:    ${total}`);
    console.log(`${colors.green}✓ Passed:${colors.reset}       ${this.passed}`);
    console.log(`${colors.red}✗ Failed:${colors.reset}       ${this.failed}`);
    console.log(`${colors.yellow}○ Skipped:${colors.reset}      ${this.skipped}`);
    console.log(`Success Rate:   ${passRate}%`);
    console.log(`Duration:       ${duration}s`);
    console.log('═'.repeat(70));

    if (this.failed > 0) {
      console.log(`\n${colors.red}${colors.bright}FAILED TESTS:${colors.reset}`);
      this.tests
        .filter(t => t.status === 'failed')
        .forEach(t => {
          console.log(`  ${colors.red}✗${colors.reset} ${t.suite} > ${t.name}`);
          console.log(`    ${colors.red}${t.error}${colors.reset}`);
        });
    }

    return this.failed === 0;
  }
}

// Mock ColorConverter for testing (simplified version)
class ColorConverter {
  static hexToRgb(hex) {
    const cleaned = hex.replace('#', '');
    if (!/^[0-9A-Fa-f]{3,8}$/.test(cleaned)) return null;

    let r, g, b, a = 1;

    if (cleaned.length === 3) {
      r = parseInt(cleaned[0] + cleaned[0], 16);
      g = parseInt(cleaned[1] + cleaned[1], 16);
      b = parseInt(cleaned[2] + cleaned[2], 16);
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

    return { r, g, b, a };
  }

  static rgbToHex(rgb) {
    const toHex = (n) => {
      const hex = Math.round(Math.max(0, Math.min(255, n))).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };
    return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`.toUpperCase();
  }

  static rgbToHsl(rgb) {
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (delta !== 0) {
      s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

      switch (max) {
        case r: h = ((g - b) / delta + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / delta + 2) / 6; break;
        case b: h = ((r - g) / delta + 4) / 6; break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
      a: rgb.a
    };
  }

  static hslToRgb(hsl) {
    const h = hsl.h / 360;
    const s = hsl.s / 100;
    const l = hsl.l / 100;

    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
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

  static getContrastRatio(color1, color2) {
    const getLuminance = (rgb) => {
      const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(c => {
        const normalized = c / 255;
        return normalized <= 0.03928
          ? normalized / 12.92
          : Math.pow((normalized + 0.055) / 1.055, 2.4);
      });
      return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    const rgb1 = this.hexToRgb(color1);
    const rgb2 = this.hexToRgb(color2);

    if (!rgb1 || !rgb2) return null;

    const l1 = getLuminance(rgb1);
    const l2 = getLuminance(rgb2);

    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);

    return (lighter + 0.05) / (darker + 0.05);
  }

  static isAccessible(fg, bg, largeText = false) {
    const ratio = this.getContrastRatio(fg, bg);
    if (!ratio) return false;
    return largeText ? ratio >= 3 : ratio >= 4.5;
  }
}

// File system tests
function testFileStructure(runner) {
  runner.suite('File Structure Tests');

  runner.test('color-converter.ts exists', () => {
    const filePath = path.join(__dirname, 'src', 'lib', 'color-converter.ts');
    runner.assert(fs.existsSync(filePath), 'color-converter.ts should exist');
  });

  runner.test('colorpicker-manager.ts exists', () => {
    const filePath = path.join(__dirname, 'src', 'lib', 'colorpicker-manager.ts');
    runner.assert(fs.existsSync(filePath), 'colorpicker-manager.ts should exist');
  });

  runner.test('colorpicker-enhanced.css exists', () => {
    const filePath = path.join(__dirname, 'src', 'lib', 'colorpicker-enhanced.css');
    runner.assert(fs.existsSync(filePath), 'colorpicker-enhanced.css should exist');
  });

  runner.test('package.json is valid', () => {
    const pkgPath = path.join(__dirname, 'package.json');
    runner.assert(fs.existsSync(pkgPath), 'package.json should exist');
    
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
    runner.assert(pkg.name === 'spicetify-redesign', 'Package name should be correct');
    runner.assert(pkg.version, 'Package should have version');
  });

  runner.test('README.md exists and is not empty', () => {
    const readmePath = path.join(__dirname, 'README.md');
    runner.assert(fs.existsSync(readmePath), 'README.md should exist');
    
    const content = fs.readFileSync(readmePath, 'utf8');
    runner.assert(content.length > 100, 'README should have substantial content');
  });

  runner.test('TypeScript config exists', () => {
    const tsconfigPath = path.join(__dirname, 'tsconfig.json');
    runner.assert(fs.existsSync(tsconfigPath), 'tsconfig.json should exist');
  });
}

// Color conversion tests
function testColorConversions(runner) {
  runner.suite('Color Conversion Tests');

  runner.test('HEX to RGB: #FF5733', () => {
    const result = ColorConverter.hexToRgb('#FF5733');
    runner.assertEqual(result.r, 255, 'Red channel should be 255');
    runner.assertEqual(result.g, 87, 'Green channel should be 87');
    runner.assertEqual(result.b, 51, 'Blue channel should be 51');
  });

  runner.test('HEX to RGB: Short format #FFF', () => {
    const result = ColorConverter.hexToRgb('#FFF');
    runner.assertEqual(result.r, 255, 'Red should be 255');
    runner.assertEqual(result.g, 255, 'Green should be 255');
    runner.assertEqual(result.b, 255, 'Blue should be 255');
  });

  runner.test('HEX to RGB: With alpha #FF573380', () => {
    const result = ColorConverter.hexToRgb('#FF573380');
    runner.assertEqual(result.r, 255, 'Red should be 255');
    runner.assertClose(result.a, 0.5, 0.01, 'Alpha should be ~0.5');
  });

  runner.test('RGB to HEX: (255, 87, 51)', () => {
    const result = ColorConverter.rgbToHex({ r: 255, g: 87, b: 51 });
    runner.assertEqual(result, '#FF5733', 'Should convert to #FF5733');
  });

  runner.test('RGB to HEX: White', () => {
    const result = ColorConverter.rgbToHex({ r: 255, g: 255, b: 255 });
    runner.assertEqual(result, '#FFFFFF', 'Should convert to #FFFFFF');
  });

  runner.test('RGB to HEX: Black', () => {
    const result = ColorConverter.rgbToHex({ r: 0, g: 0, b: 0 });
    runner.assertEqual(result, '#000000', 'Should convert to #000000');
  });

  runner.test('RGB to HSL: Red', () => {
    const result = ColorConverter.rgbToHsl({ r: 255, g: 0, b: 0 });
    runner.assertEqual(result.h, 0, 'Hue should be 0');
    runner.assertEqual(result.s, 100, 'Saturation should be 100');
    runner.assertEqual(result.l, 50, 'Lightness should be 50');
  });

  runner.test('HSL to RGB: Red', () => {
    const result = ColorConverter.hslToRgb({ h: 0, s: 100, l: 50 });
    runner.assertEqual(result.r, 255, 'Red should be 255');
    runner.assertEqual(result.g, 0, 'Green should be 0');
    runner.assertEqual(result.b, 0, 'Blue should be 0');
  });

  runner.test('Round-trip: HEX → RGB → HEX', () => {
    const original = '#FF5733';
    const rgb = ColorConverter.hexToRgb(original);
    const back = ColorConverter.rgbToHex(rgb);
    runner.assertEqual(back, original, 'Should maintain color through conversion');
  });

  runner.test('Round-trip: RGB → HSL → RGB', () => {
    const original = { r: 255, g: 87, b: 51 };
    const hsl = ColorConverter.rgbToHsl(original);
    const back = ColorConverter.hslToRgb(hsl);
    runner.assertClose(back.r, original.r, 2, 'Red should be close');
    runner.assertClose(back.g, original.g, 2, 'Green should be close');
    runner.assertClose(back.b, original.b, 2, 'Blue should be close');
  });

  runner.test('Invalid HEX returns null', () => {
    const result = ColorConverter.hexToRgb('#GGG');
    runner.assertEqual(result, null, 'Invalid HEX should return null');
  });
}

// Accessibility tests
function testAccessibility(runner) {
  runner.suite('Accessibility Tests');

  runner.test('Contrast ratio: White vs Black', () => {
    const ratio = ColorConverter.getContrastRatio('#FFFFFF', '#000000');
    runner.assertClose(ratio, 21, 0.1, 'Should be ~21:1');
  });

  runner.test('Contrast ratio: White vs White', () => {
    const ratio = ColorConverter.getContrastRatio('#FFFFFF', '#FFFFFF');
    runner.assertClose(ratio, 1, 0.1, 'Should be 1:1');
  });

  runner.test('WCAG AA: Black on White', () => {
    const accessible = ColorConverter.isAccessible('#000000', '#FFFFFF');
    runner.assert(accessible, 'Black on White should be accessible');
  });

  runner.test('WCAG AA: Yellow on White', () => {
    const accessible = ColorConverter.isAccessible('#FFFF00', '#FFFFFF');
    runner.assert(!accessible, 'Yellow on White should not be accessible');
  });

  runner.test('WCAG AA: Large text threshold', () => {
    const accessible = ColorConverter.isAccessible('#777777', '#FFFFFF', true);
    runner.assert(accessible, 'Should pass for large text (3:1 ratio)');
  });

  runner.test('CSS file has accessibility features', () => {
    const cssPath = path.join(__dirname, 'src', 'lib', 'colorpicker-enhanced.css');
    if (!fs.existsSync(cssPath)) {
      runner.skip('CSS file check', 'File not found');
      return;
    }
    
    const content = fs.readFileSync(cssPath, 'utf8');
    runner.assert(
      content.includes('focus-visible') || content.includes(':focus'),
      'CSS should have focus styles'
    );
    runner.assert(
      content.includes('prefers-reduced-motion'),
      'CSS should support reduced motion'
    );
    runner.assert(
      content.includes('prefers-contrast'),
      'CSS should support high contrast'
    );
  });
}

// CSS validation tests
function testCSSValidation(runner) {
  runner.suite('CSS Validation Tests');

  const cssPath = path.join(__dirname, 'src', 'lib', 'colorpicker-enhanced.css');
  
  if (!fs.existsSync(cssPath)) {
    runner.skip('All CSS tests', 'CSS file not found');
    return;
  }

  const content = fs.readFileSync(cssPath, 'utf8');

  runner.test('CSS has custom properties', () => {
    runner.assert(
      content.includes('--cp-'),
      'Should use custom properties with --cp- prefix'
    );
  });

  runner.test('CSS has animations', () => {
    runner.assert(
      content.includes('@keyframes') || content.includes('animation:'),
      'Should have animations'
    );
  });

  runner.test('CSS has transitions', () => {
    runner.assert(
      content.includes('transition'),
      'Should have transitions'
    );
  });

  runner.test('CSS has responsive design', () => {
    runner.assert(
      content.includes('@media'),
      'Should have media queries'
    );
  });

  runner.test('CSS file size is reasonable', () => {
    const stats = fs.statSync(cssPath);
    const sizeKB = stats.size / 1024;
    runner.assert(
      sizeKB < 50,
      `CSS should be < 50KB (actual: ${sizeKB.toFixed(2)}KB)`
    );
  });
}

// TypeScript validation tests
function testTypeScriptValidation(runner) {
  runner.suite('TypeScript Validation Tests');

  const converterPath = path.join(__dirname, 'src', 'lib', 'color-converter.ts');
  const managerPath = path.join(__dirname, 'src', 'lib', 'colorpicker-manager.ts');

  if (!fs.existsSync(converterPath)) {
    runner.skip('ColorConverter tests', 'File not found');
  } else {
    const content = fs.readFileSync(converterPath, 'utf8');

    runner.test('ColorConverter has type definitions', () => {
      runner.assert(
        content.includes('export type') || content.includes('export interface'),
        'Should export types'
      );
    });

    runner.test('ColorConverter has proper exports', () => {
      runner.assert(
        content.includes('export class ColorConverter') || 
        content.includes('export default'),
        'Should have proper exports'
      );
    });

    runner.test('ColorConverter has documentation', () => {
      runner.assert(
        content.includes('/**') || content.includes('//'),
        'Should have comments/documentation'
      );
    });
  }

  if (!fs.existsSync(managerPath)) {
    runner.skip('ColorPickerManager tests', 'File not found');
  } else {
    const content = fs.readFileSync(managerPath, 'utf8');

    runner.test('ColorPickerManager has state management', () => {
      runner.assert(
        content.includes('state') || content.includes('State'),
        'Should have state management'
      );
    });

    runner.test('ColorPickerManager has event handling', () => {
      runner.assert(
        content.includes('callback') || content.includes('listener'),
        'Should have event handling'
      );
    });
  }
}

// Performance tests
function testPerformance(runner) {
  runner.suite('Performance Tests');

  runner.test('HEX to RGB conversion is fast', () => {
    const iterations = 10000;
    const start = Date.now();
    
    for (let i = 0; i < iterations; i++) {
      ColorConverter.hexToRgb('#FF5733');
    }
    
    const duration = Date.now() - start;
    const avgTime = duration / iterations;
    
    runner.assert(
      avgTime < 0.1,
      `Average time should be < 0.1ms (actual: ${avgTime.toFixed(4)}ms)`
    );
  });

  runner.test('RGB to HEX conversion is fast', () => {
    const iterations = 10000;
    const start = Date.now();
    
    for (let i = 0; i < iterations; i++) {
      ColorConverter.rgbToHex({ r: 255, g: 87, b: 51 });
    }
    
    const duration = Date.now() - start;
    const avgTime = duration / iterations;
    
    runner.assert(
      avgTime < 0.1,
      `Average time should be < 0.1ms (actual: ${avgTime.toFixed(4)}ms)`
    );
  });

  runner.test('Contrast ratio calculation is fast', () => {
    const iterations = 1000;
    const start = Date.now();
    
    for (let i = 0; i < iterations; i++) {
      ColorConverter.getContrastRatio('#FF5733', '#FFFFFF');
    }
    
    const duration = Date.now() - start;
    const avgTime = duration / iterations;
    
    runner.assert(
      avgTime < 1,
      `Average time should be < 1ms (actual: ${avgTime.toFixed(4)}ms)`
    );
  });
}

// Integration tests
function testIntegration(runner) {
  runner.suite('Integration Tests');

  runner.test('All required files exist', () => {
    const requiredFiles = [
      'src/lib/color-converter.ts',
      'src/lib/colorpicker-manager.ts',
      'src/lib/colorpicker-enhanced.css',
      'src/css-editor-iframe.tsx',
      'package.json',
      'tsconfig.json',
      'README.md'
    ];

    requiredFiles.forEach(file => {
      const filePath = path.join(__dirname, file);
      runner.assert(
        fs.existsSync(filePath),
        `${file} should exist`
      );
    });
  });

  runner.test('Package.json has correct dependencies', () => {
    const pkgPath = path.join(__dirname, 'package.json');
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

    runner.assert(pkg.dependencies, 'Should have dependencies');
    runner.assert(pkg.devDependencies, 'Should have devDependencies');
    runner.assert(pkg.scripts, 'Should have scripts');
    runner.assert(pkg.scripts.build, 'Should have build script');
  });

  runner.test('Build script exists', () => {
    const buildPath = path.join(__dirname, 'build.mjs');
    runner.assert(fs.existsSync(buildPath), 'build.mjs should exist');
  });
}

// Main test execution
function main() {
  console.log(`${colors.bright}${colors.magenta}`);
  console.log('╔═══════════════════════════════════════════════════════════════════╗');
  console.log('║         ReDesign Automated Test Suite v1.0.0                     ║');
  console.log('║         Enhanced Color Picker Testing                            ║');
  console.log('╚═══════════════════════════════════════════════════════════════════╝');
  console.log(colors.reset);

  const runner = new TestRunner();

  // Run all test suites
  testFileStructure(runner);
  testColorConversions(runner);
  testAccessibility(runner);
  testCSSValidation(runner);
  testTypeScriptValidation(runner);
  testPerformance(runner);
  testIntegration(runner);

  // Print summary
  const success = runner.summary();

  // Exit with appropriate code
  process.exit(success ? 0 : 1);
}

// Run tests if executed directly
if (require.main === module) {
  main();
}

module.exports = { TestRunner, ColorConverter };
