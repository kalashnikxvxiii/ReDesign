import * as esbuild from 'esbuild';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

// Get Spicetify extensions path
const spicetifyPath = path.join(
  process.env.APPDATA || path.join(os.homedir(), 'AppData', 'Roaming'),
  'spicetify',
  'Extensions'
);

const outFile = path.join(spicetifyPath, 'redesign.js');

console.log('Building ReDesign extension with esbuild...');

try {
  await esbuild.build({
    entryPoints: ['src/css-editor-iframe.tsx'],
    bundle: true,
    outfile: outFile,
    format: 'iife',
    target: 'es2020',
    platform: 'browser',
    jsx: 'transform',
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
    // Bundle both React and ReactDOM since they need to match versions
    external: [],
    define: {
      'process.env.NODE_ENV': '"production"',
    },
    banner: {
      js: '// @ts-nocheck\n',
    },
    footer: {
      js: '',
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
