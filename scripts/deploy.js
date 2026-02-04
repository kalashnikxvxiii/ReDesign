#!/usr/bin/env node
/**
 * ReDesign Automated Build & Deploy Script
 * Builds the extension and deploys it to Spicetify Extensions folder
 * 
 * @version 1.0.0
 * @author ReDesign Team
 * 
 * Usage:
 *   node deploy.js
 *   npm run deploy
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ANSI colors
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Configuration
const CONFIG = {
  projectRoot: __dirname,
  // Auto-detect Spicetify path (Roaming takes precedence)
  spicetifyExtensionsPath: (() => {
    const roamingPath = 'C:\\Users\\Administrator\\AppData\\Roaming\\spicetify\\Extensions';
    const localPath = 'C:\\Users\\Administrator\\AppData\\Local\\spicetify\\Extensions';
    
    // Check Roaming first (newer Spicetify versions)
    if (fs.existsSync(roamingPath)) {
      return roamingPath;
    }
    // Fallback to Local
    if (fs.existsSync(localPath)) {
      return localPath;
    }
    // Default to Roaming if neither exists
    return roamingPath;
  })(),
  extensionName: 'redesign',
  buildCommand: 'npm run build',
  filesToDeploy: [
    'dist/extension.js',
    'dist/extension.js.map'
  ],
  // Note: build.mjs already deploys to Roaming, this script handles Local if needed
  syncBothPaths: true, // Deploy to both Roaming and Local if both exist
  backupEnabled: true,
  cleanOldFiles: true
};

class DeployManager {
  constructor(config) {
    this.config = config;
    this.startTime = Date.now();
    this.steps = [];
  }

  log(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();
    const prefix = {
      info: `${colors.blue}ℹ${colors.reset}`,
      success: `${colors.green}✓${colors.reset}`,
      error: `${colors.red}✗${colors.reset}`,
      warning: `${colors.yellow}⚠${colors.reset}`,
      step: `${colors.cyan}▶${colors.reset}`
    }[type] || '•';

    console.log(`[${timestamp}] ${prefix} ${message}`);
  }

  step(name) {
    this.log(name, 'step');
    this.steps.push({ name, status: 'running', startTime: Date.now() });
  }

  completeStep(success = true) {
    const step = this.steps[this.steps.length - 1];
    if (step) {
      step.status = success ? 'success' : 'failed';
      step.duration = Date.now() - step.startTime;
      this.log(
        `${step.name} ${success ? 'completed' : 'failed'} (${step.duration}ms)`,
        success ? 'success' : 'error'
      );
    }
  }

  async checkPrerequisites() {
    this.step('Checking prerequisites');

    try {
      // Check if package.json exists
      const pkgPath = path.join(this.config.projectRoot, 'package.json');
      if (!fs.existsSync(pkgPath)) {
        throw new Error('package.json not found');
      }

      // Check if build script exists
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      if (!pkg.scripts || !pkg.scripts.build) {
        throw new Error('Build script not found in package.json');
      }

      // Check if Spicetify extensions folder exists
      if (!fs.existsSync(this.config.spicetifyExtensionsPath)) {
        throw new Error(`Spicetify extensions folder not found: ${this.config.spicetifyExtensionsPath}`);
      }

      this.completeStep(true);
      return true;
    } catch (error) {
      this.log(error.message, 'error');
      this.completeStep(false);
      return false;
    }
  }

  async cleanOldFiles() {
    if (!this.config.cleanOldFiles) {
      this.log('Skipping old files cleanup (disabled)', 'info');
      return true;
    }

    this.step('Cleaning old extension files');

    try {
      const extensionFolder = path.join(
        this.config.spicetifyExtensionsPath,
        this.config.extensionName
      );

      if (fs.existsSync(extensionFolder)) {
        // Backup if enabled
        if (this.config.backupEnabled) {
          const backupFolder = `${extensionFolder}_backup_${Date.now()}`;
          this.log(`Creating backup: ${path.basename(backupFolder)}`, 'info');
          
          // Copy folder recursively
          this.copyFolderRecursive(extensionFolder, backupFolder);
          
          // Keep only last 3 backups
          this.cleanOldBackups();
        }

        // Remove old files
        this.log(`Removing old files from: ${extensionFolder}`, 'info');
        this.deleteFolderRecursive(extensionFolder);
      }

      // Create fresh folder
      fs.mkdirSync(extensionFolder, { recursive: true });

      this.completeStep(true);
      return true;
    } catch (error) {
      this.log(`Failed to clean old files: ${error.message}`, 'error');
      this.completeStep(false);
      return false;
    }
  }

  async runBuild() {
    this.step('Building extension');

    try {
      this.log('Running build command...', 'info');
      
      // Run build command
      const output = execSync(this.config.buildCommand, {
        cwd: this.config.projectRoot,
        encoding: 'utf8',
        stdio: 'pipe'
      });

      // Check if build output exists
      const distPath = path.join(this.config.projectRoot, 'dist');
      if (!fs.existsSync(distPath)) {
        throw new Error('Build output folder (dist) not found');
      }

      // Check if main extension file exists
      const mainFile = path.join(distPath, 'extension.js');
      if (!fs.existsSync(mainFile)) {
        throw new Error('Main extension file (extension.js) not found in dist');
      }

      const stats = fs.statSync(mainFile);
      const sizeKB = (stats.size / 1024).toFixed(2);
      this.log(`Built extension.js (${sizeKB} KB)`, 'success');

      this.completeStep(true);
      return true;
    } catch (error) {
      this.log(`Build failed: ${error.message}`, 'error');
      if (error.stdout) {
        console.log(error.stdout);
      }
      if (error.stderr) {
        console.error(error.stderr);
      }
      this.completeStep(false);
      return false;
    }
  }

  async deployFiles() {
    this.step('Deploying files to Spicetify');

    try {
      const targetFolder = path.join(
        this.config.spicetifyExtensionsPath,
        this.config.extensionName
      );

      // Ensure target folder exists
      if (!fs.existsSync(targetFolder)) {
        fs.mkdirSync(targetFolder, { recursive: true });
      }

      // Copy files
      let copiedFiles = 0;
      for (const file of this.config.filesToDeploy) {
        const sourcePath = path.join(this.config.projectRoot, file);
        
        if (!fs.existsSync(sourcePath)) {
          this.log(`Warning: ${file} not found, skipping`, 'warning');
          continue;
        }

        const fileName = path.basename(file);
        const targetPath = path.join(targetFolder, fileName);

        fs.copyFileSync(sourcePath, targetPath);
        
        const stats = fs.statSync(targetPath);
        const sizeKB = (stats.size / 1024).toFixed(2);
        this.log(`Copied ${fileName} (${sizeKB} KB)`, 'success');
        
        copiedFiles++;
      }

      if (copiedFiles === 0) {
        throw new Error('No files were deployed');
      }

      this.log(`Deployed ${copiedFiles} file(s) to: ${targetFolder}`, 'success');

      this.completeStep(true);
      return true;
    } catch (error) {
      this.log(`Deployment failed: ${error.message}`, 'error');
      this.completeStep(false);
      return false;
    }
  }

  async applySpicetify() {
    this.step('Applying Spicetify configuration');

    try {
      this.log('Running spicetify apply...', 'info');
      
      // Check if spicetify command exists
      try {
        execSync('spicetify --version', { stdio: 'pipe' });
      } catch {
        this.log('Spicetify CLI not found, skipping apply', 'warning');
        this.completeStep(true);
        return true;
      }

      // Run spicetify apply
      const output = execSync('spicetify apply', {
        encoding: 'utf8',
        stdio: 'pipe'
      });

      this.log('Spicetify applied successfully', 'success');
      this.completeStep(true);
      return true;
    } catch (error) {
      this.log(`Spicetify apply failed: ${error.message}`, 'warning');
      this.log('You may need to run "spicetify apply" manually', 'info');
      this.completeStep(true); // Don't fail deployment if apply fails
      return true;
    }
  }

  // Helper: Copy folder recursively
  copyFolderRecursive(source, target) {
    if (!fs.existsSync(target)) {
      fs.mkdirSync(target, { recursive: true });
    }

    const files = fs.readdirSync(source);
    
    for (const file of files) {
      const sourcePath = path.join(source, file);
      const targetPath = path.join(target, file);
      
      if (fs.statSync(sourcePath).isDirectory()) {
        this.copyFolderRecursive(sourcePath, targetPath);
      } else {
        fs.copyFileSync(sourcePath, targetPath);
      }
    }
  }

  // Helper: Delete folder recursively
  deleteFolderRecursive(folderPath) {
    if (fs.existsSync(folderPath)) {
      fs.readdirSync(folderPath).forEach(file => {
        const curPath = path.join(folderPath, file);
        if (fs.statSync(curPath).isDirectory()) {
          this.deleteFolderRecursive(curPath);
        } else {
          fs.unlinkSync(curPath);
        }
      });
      fs.rmdirSync(folderPath);
    }
  }

  // Helper: Clean old backups (keep only last 3)
  cleanOldBackups() {
    try {
      const backupPattern = new RegExp(`^${this.config.extensionName}_backup_\\d+$`);
      const allFolders = fs.readdirSync(this.config.spicetifyExtensionsPath);
      
      const backups = allFolders
        .filter(name => backupPattern.test(name))
        .map(name => ({
          name,
          path: path.join(this.config.spicetifyExtensionsPath, name),
          time: parseInt(name.split('_').pop())
        }))
        .sort((a, b) => b.time - a.time);

      // Keep only last 3 backups
      if (backups.length > 3) {
        const toDelete = backups.slice(3);
        for (const backup of toDelete) {
          this.log(`Removing old backup: ${backup.name}`, 'info');
          this.deleteFolderRecursive(backup.path);
        }
      }
    } catch (error) {
      this.log(`Failed to clean old backups: ${error.message}`, 'warning');
    }
  }

  printSummary() {
    const duration = ((Date.now() - this.startTime) / 1000).toFixed(2);
    const successful = this.steps.filter(s => s.status === 'success').length;
    const failed = this.steps.filter(s => s.status === 'failed').length;

    console.log('\n' + '═'.repeat(70));
    console.log(`${colors.bright}${colors.cyan}DEPLOYMENT SUMMARY${colors.reset}`);
    console.log('═'.repeat(70));
    console.log(`Total Steps:    ${this.steps.length}`);
    console.log(`${colors.green}✓ Successful:${colors.reset}   ${successful}`);
    console.log(`${colors.red}✗ Failed:${colors.reset}       ${failed}`);
    console.log(`Duration:       ${duration}s`);
    console.log('═'.repeat(70));

    if (failed === 0) {
      console.log(`\n${colors.green}${colors.bright}✓ DEPLOYMENT SUCCESSFUL!${colors.reset}`);
      console.log(`\n${colors.cyan}Next steps:${colors.reset}`);
      console.log(`  1. Restart Spotify`);
      console.log(`  2. Open ReDesign editor (F12)`);
      console.log(`  3. Test color picker functionality`);
    } else {
      console.log(`\n${colors.red}${colors.bright}✗ DEPLOYMENT FAILED${colors.reset}`);
      console.log(`\nFailed steps:`);
      this.steps
        .filter(s => s.status === 'failed')
        .forEach(s => console.log(`  ${colors.red}✗${colors.reset} ${s.name}`));
    }

    console.log('');
  }

  async run() {
    console.log(`${colors.bright}${colors.magenta}`);
    console.log('╔═══════════════════════════════════════════════════════════════════╗');
    console.log('║         ReDesign Automated Build & Deploy v1.0.0                 ║');
    console.log('║         Building and deploying to Spicetify...                    ║');
    console.log('╚══════════════════════════════════════════════════════���════════════╝');
    console.log(colors.reset);

    // Run deployment pipeline
    const steps = [
      () => this.checkPrerequisites(),
      () => this.cleanOldFiles(),
      () => this.runBuild(),
      () => this.deployFiles(),
      () => this.applySpicetify()
    ];

    for (const step of steps) {
      const success = await step();
      if (!success) {
        this.printSummary();
        process.exit(1);
      }
    }

    this.printSummary();
    process.exit(0);
  }
}

// Main execution
if (require.main === module) {
  const manager = new DeployManager(CONFIG);
  manager.run().catch(error => {
    console.error(`${colors.red}Fatal error: ${error.message}${colors.reset}`);
    process.exit(1);
  });
}

module.exports = { DeployManager, CONFIG };
