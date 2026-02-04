import * as esbuild from 'esbuild';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Get Spicetify extensions path
const spicetifyPath = path.join(
  process.env.APPDATA || path.join(os.homedir(), 'AppData', 'Roaming'),
  'spicetify',
  'Extensions'
);

const outFile = path.join(spicetifyPath, 'redesign.js');
const projectRoot = path.join(__dirname, '..');
const aceColorPickerPath = path.join(projectRoot, 'src', 'lib', 'ace-colorpicker.min.js');

console.log('Building ReDesign extension with esbuild...');

// Read local ace-colorpicker (no livereload) for define
const aceColorPickerContent = fs.existsSync(aceColorPickerPath)
  ? fs.readFileSync(aceColorPickerPath, 'utf8')
  : '';

try {
  await esbuild.build({
    entryPoints: ['src/css-editor-iframe.tsx'],
    bundle: true,
    outfile: outFile,
    format: 'iife',
    globalName: 'ReDesignEditor',
    target: 'es2020',
    platform: 'browser',
    jsx: 'transform',
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
    // Bundle both React and ReactDOM since they need to match versions
    external: [],
    define: {
      'process.env.NODE_ENV': '"production"',
      '__ACE_COLORPICKER_INLINE__': JSON.stringify(aceColorPickerContent),
    },
    banner: {
      js: '// @ts-nocheck\n',
    },
    footer: {
      js: `
// Bootstrap the extension
(async function() {
  while (!Spicetify?.Platform || !Spicetify?.React || !Spicetify?.ReactDOM) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  console.log("[ReDesign] Initializing extension...");

  const { React, ReactDOM } = Spicetify;
  const container = document.createElement('div');
  container.id = 'redesign-editor-container';
  document.body.appendChild(container);

  // ReDesignEditor.default is the exported component
  ReactDOM.render(React.createElement(ReDesignEditor.default), container);

  console.log("[ReDesign] Extension initialized successfully!");
})();
`,
    },
  });

  console.log('✅ Build succeeded!');
  console.log(`   Output: ${outFile}`);

  // Get file size
  const stats = fs.statSync(outFile);
  const sizeKB = (stats.size / 1024).toFixed(2);
  console.log(`   Size: ${sizeKB} KB`);
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}
