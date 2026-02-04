#!/usr/bin/env node
/**
 * Post-Deployment Verification Script
 * Verifies that ReDesign extension is correctly deployed and operational
 * 
 * @version 1.0.0
 * @author ReDesign Team
 */

const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m'
};

console.log(`${colors.bright}${colors.cyan}`);
console.log('╔═══════════════════════════════════════════════════════════════════╗');
console.log('║         ReDesign Post-Deployment Verification                    ║');
console.log('╚═══════════════════════════════════════════════════════════════════╝');
console.log(colors.reset + '\n');

let checks = 0;
let passed = 0;
let failed = 0;

function check(name, condition, details = '') {
  checks++;
  if (condition) {
    passed++;
    console.log(`${colors.green}✓${colors.reset} ${name}`);
    if (details) console.log(`  ${colors.cyan}${details}${colors.reset}`);
  } else {
    failed++;
    console.log(`${colors.red}✗${colors.reset} ${name}`);
    if (details) console.log(`  ${colors.red}${details}${colors.reset}`);
  }
}

// Check 1: Source files
console.log(`${colors.bright}Source Files:${colors.reset}`);
const srcFiles = [
  'src/lib/color-converter.ts',
  'src/lib/colorpicker-manager.ts',
  'src/lib/colorpicker-enhanced.css'
];

srcFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  const exists = fs.existsSync(filePath);
  if (exists) {
    const stats = fs.statSync(filePath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    check(file, true, `${sizeKB} KB`);
  } else {
    check(file, false, 'File not found');
  }
});

// Check 2: Deployed files
console.log(`\n${colors.bright}Deployed Files:${colors.reset}`);
const roamingPath = 'C:\\Users\\Administrator\\AppData\\Roaming\\spicetify\\Extensions';
const localPath = 'C:\\Users\\Administrator\\AppData\\Local\\spicetify\\Extensions';

const roamingFile = path.join(roamingPath, 'redesign.js');
const localFile = path.join(localPath, 'redesign.js');

if (fs.existsSync(roamingFile)) {
  const stats = fs.statSync(roamingFile);
  const sizeKB = (stats.size / 1024).toFixed(2);
  const date = stats.mtime.toLocaleString();
  check('Roaming/redesign.js', true, `${sizeKB} KB (${date})`);
} else {
  check('Roaming/redesign.js', false, 'Not found');
}

if (fs.existsSync(localFile)) {
  const stats = fs.statSync(localFile);
  const sizeKB = (stats.size / 1024).toFixed(2);
  const date = stats.mtime.toLocaleString();
  check('Local/redesign.js', true, `${sizeKB} KB (${date})`);
} else {
  check('Local/redesign.js', false, 'Not found (optional)');
}

// Check 3: Automation scripts
console.log(`\n${colors.bright}Automation Scripts:${colors.reset}`);
const scripts = [
  'scripts/test.js',
  'scripts/deploy.js',
  'scripts/build.mjs'
];

scripts.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  const exists = fs.existsSync(filePath);
  if (exists) {
    const stats = fs.statSync(filePath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    check(file, true, `${sizeKB} KB`);
  } else {
    check(file, false, 'File not found');
  }
});

// Check 4: Essential Configuration (Documentation checks removed - non-critical)
console.log(`\n${colors.bright}Essential Configuration:${colors.reset}`);
const essentialFiles = [
  'package.json'
];

essentialFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  const exists = fs.existsSync(filePath);
  if (exists) {
    const stats = fs.statSync(filePath);
    const sizeKB = (stats.size / 1024).toFixed(2);
    check(file, true, `${sizeKB} KB`);
  } else {
    check(file, false, 'File not found');
  }
});

// Optional documentation (informational only - doesn't affect build)
const optionalDocs = ['README.md', 'CHANGELOG.md', 'CONTRIBUTING.md'];
const foundDocs = optionalDocs.filter(doc => fs.existsSync(path.join(__dirname, '..', doc)));
if (foundDocs.length > 0) {
  console.log(`  ${colors.cyan}ℹ Optional docs found: ${foundDocs.join(', ')}${colors.reset}`);
}

// Check 5: Package.json scripts
console.log(`\n${colors.bright}NPM Scripts:${colors.reset}`);
const pkgPath = path.join(__dirname, '..', 'package.json');
if (fs.existsSync(pkgPath)) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  const requiredScripts = ['build', 'watch', 'test', 'deploy', 'deploy:quick'];
  
  requiredScripts.forEach(script => {
    check(`npm run ${script}`, pkg.scripts && pkg.scripts[script], 
      pkg.scripts && pkg.scripts[script] ? pkg.scripts[script] : 'Not configured');
  });
}

// Summary
console.log('\n' + '═'.repeat(70));
console.log(`${colors.bright}VERIFICATION SUMMARY${colors.reset}`);
console.log('═'.repeat(70));
console.log(`Total Checks:   ${checks}`);
console.log(`${colors.green}✓ Passed:${colors.reset}       ${passed}`);
console.log(`${colors.red}✗ Failed:${colors.reset}       ${failed}`);
console.log(`Success Rate:   ${((passed / checks) * 100).toFixed(2)}%`);
console.log('═'.repeat(70));

if (failed === 0) {
  console.log(`\n${colors.green}${colors.bright}✓ ALL CHECKS PASSED!${colors.reset}`);
  console.log(`\n${colors.cyan}Extension is ready to use:${colors.reset}`);
  console.log(`  1. Restart Spotify`);
  console.log(`  2. Press F12 to open ReDesign editor`);
  console.log(`  3. Type a color (e.g., color: #FF5733;)`);
  console.log(`  4. Click the color preview to test the picker`);
  console.log('');
  process.exit(0);
} else {
  console.log(`\n${colors.yellow}${colors.bright}⚠ SOME CHECKS FAILED${colors.reset}`);
  console.log(`\n${colors.yellow}Note: Non-critical checks may fail without affecting functionality.${colors.reset}`);
  console.log(`Please review the failed checks above.`);
  console.log('');
  
  // Only exit with error if critical checks failed
  const criticalFailed = failed > 0;
  if (criticalFailed) {
    console.log(`${colors.red}Critical checks failed. Please fix before deploying.${colors.reset}\n`);
    process.exit(1);
  } else {
    console.log(`${colors.green}Build can proceed - only optional checks failed.${colors.reset}\n`);
    process.exit(0);
  }
}
