import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';

// Script to inject the entry.client script tag into index.html after build
const indexPath = join(process.cwd(), 'build', 'client', 'index.html');
const assetsDir = join(process.cwd(), 'build', 'client', 'assets');

// Check if index.html exists
if (!existsSync(indexPath)) {
  console.error('index.html not found at', indexPath);
  process.exit(1);
}

// Read the index.html file
let indexHtml = readFileSync(indexPath, 'utf-8');

// Check if React Router has already properly generated the index.html with module scripts
if (indexHtml.includes('import("/assets/entry.client-') && indexHtml.includes('type="module"')) {
  console.log('React Router has already properly generated index.html with module scripts');
  process.exit(0);
}

// Check if our custom script tag already exists
if (indexHtml.includes('entry.client-') && indexHtml.includes('<script type="module" src="/assets/')) {
  console.log('Custom script tag already exists in index.html');
  process.exit(0);
}

// Find the entry.client file in assets directory
const assets = existsSync(assetsDir) ? readdirSync(assetsDir) : [];
const entryClientFile = assets.find(file => file.startsWith('entry.client-') && file.endsWith('.js'));

if (!entryClientFile) {
  console.error('entry.client file not found in assets directory');
  process.exit(1);
}

// Inject the script tag before the closing body tag
const scriptTag = `    <script type="module" src="/assets/${entryClientFile}"></script>`;
indexHtml = indexHtml.replace('</body>', `  ${scriptTag}\n  </body>`);

// Write the updated index.html file
writeFileSync(indexPath, indexHtml, 'utf-8');

console.log(`Successfully injected script tag for ${entryClientFile} into index.html`);